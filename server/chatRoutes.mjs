import { parseChatBody } from "./chat.mjs";
import { createRateLimiter } from "./rateLimit.mjs";

/** Rotas de conversa/correção; limite por IP porque não há login. */
export function createChatRoutes({ chat, cors, send, readJson, limit = 40 }) {
	const allow = createRateLimiter({ limit, windowMs: 60_000 });
	const clientIp = (req) =>
		String(req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "")
			.split(",")[0]
			.trim();

	return async (req, res, pathname) => {
		if (pathname !== "/v1/chat" && pathname !== "/v1/correct") return false;
		if (req.method !== "POST") {
			send(res, 405, { error: "method_not_allowed" }, cors);
			return true;
		}
		if (!chat?.enabled) {
			send(res, 503, { error: "ai_unavailable" }, cors);
			return true;
		}
		if (!allow(clientIp(req))) {
			send(res, 429, { error: "rate_limited" }, cors);
			return true;
		}
		const { body, tooLarge } = await readJson(req, 16 * 1024);
		if (tooLarge) {
			send(res, 413, { error: "payload_too_large" }, cors);
			return true;
		}
		try {
			if (pathname === "/v1/correct") {
				const text = typeof body?.text === "string" ? body.text : "";
				send(res, 200, await chat.correct(text), cors);
				return true;
			}
			const parsed = parseChatBody(body);
			if (parsed.error) {
				send(res, 400, { error: "invalid_body", detail: parsed.error }, cors);
				return true;
			}
			send(res, 200, await chat.converse(parsed), cors);
		} catch (error) {
			console.error("chat failed", error);
			send(res, 502, { error: "ai_failed" }, cors);
		}
		return true;
	};
}
