import { createChatRoutes } from "./chatRoutes.mjs";
import { createRateLimiter } from "./rateLimit.mjs";
import {
	hashSyncKey,
	MAX_BODY_BYTES,
	parseProgressBody,
	readSyncKey,
} from "./validate.mjs";

const send = (res, status, body, headers = {}) => {
	const payload = body === undefined ? "" : JSON.stringify(body);
	res.writeHead(status, {
		"Content-Type": "application/json; charset=utf-8",
		"Cache-Control": "no-store",
		...headers,
	});
	res.end(payload);
};

async function readJson(req, maxBytes = MAX_BODY_BYTES) {
	let size = 0;
	const chunks = [];
	for await (const chunk of req) {
		size += chunk.length;
		if (size > maxBytes) return { tooLarge: true };
		chunks.push(chunk);
	}
	try {
		return { body: JSON.parse(Buffer.concat(chunks).toString("utf8")) };
	} catch {
		return { body: undefined };
	}
}

/** Handler HTTP sem framework; o store é injetado (Postgres em produção). */
export function createApp({
	store,
	chat,
	allowedOrigin = "*",
	rateLimit = 120,
}) {
	const allow = createRateLimiter({ limit: rateLimit, windowMs: 60_000 });
	const cors = {
		"Access-Control-Allow-Origin": allowedOrigin,
		"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Authorization, Content-Type",
		"Access-Control-Max-Age": "86400",
		Vary: "Origin",
	};

	const chatRoutes = createChatRoutes({ chat, cors, send, readJson });

	async function progress(req, res, id) {
		if (req.method === "GET") {
			const row = await store.get(id);
			return row
				? send(res, 200, row, cors)
				: send(res, 404, { error: "not_found" }, cors);
		}
		if (req.method === "DELETE") {
			await store.remove(id);
			return send(res, 204, undefined, cors);
		}
		if (req.method !== "PUT") {
			return send(res, 405, { error: "method_not_allowed" }, cors);
		}
		const { body, tooLarge } = await readJson(req);
		if (tooLarge) return send(res, 413, { error: "payload_too_large" }, cors);
		const parsed = parseProgressBody(body);
		if (parsed.error) {
			return send(
				res,
				400,
				{ error: "invalid_body", detail: parsed.error },
				cors,
			);
		}
		const result = await store.put(id, parsed.data, parsed.baseVersion);
		if (result.ok) {
			const { version, updatedAt } = result;
			return send(res, 200, { version, updatedAt }, cors);
		}
		return send(res, 409, { error: "conflict", current: result.current }, cors);
	}

	return async (req, res) => {
		try {
			const { pathname } = new URL(req.url ?? "/", "http://localhost");
			if (req.method === "OPTIONS") return send(res, 204, undefined, cors);
			if (pathname === "/health") {
				await store.ping();
				return send(res, 200, { ok: true });
			}
			if (await chatRoutes(req, res, pathname)) return;
			if (pathname !== "/v1/progress") {
				return send(res, 404, { error: "not_found" }, cors);
			}
			const key = readSyncKey(req.headers.authorization);
			if (!key) return send(res, 401, { error: "unauthorized" }, cors);
			const id = hashSyncKey(key);
			if (!allow(id)) return send(res, 429, { error: "rate_limited" }, cors);
			return await progress(req, res, id);
		} catch (error) {
			console.error("request failed", error);
			return send(res, 500, { error: "internal_error" }, cors);
		}
	};
}
