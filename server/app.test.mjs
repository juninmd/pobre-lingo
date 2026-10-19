// @vitest-environment node
import { createServer } from "node:http";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "./app.mjs";
import { hashSyncKey } from "./validate.mjs";

/** Store em memória com o mesmo contrato do store Postgres. */
function memoryStore() {
	const rows = new Map();
	return {
		rows,
		get: async (id) => rows.get(id) ?? null,
		put: async (id, data, baseVersion) => {
			const current = rows.get(id);
			if ((current?.version ?? 0) !== baseVersion) {
				return { ok: false, current: current ?? null };
			}
			const row = {
				data,
				version: baseVersion + 1,
				updatedAt: new Date().toISOString(),
			};
			rows.set(id, row);
			return { ok: true, ...row };
		},
		remove: async (id) => void rows.delete(id),
		ping: async () => {},
	};
}

const KEY = "a".repeat(32);
const auth = { Authorization: `Bearer ${KEY}` };
const json = { "Content-Type": "application/json" };

describe("pobre-lingo-api", () => {
	let server;
	let base;
	let store;

	beforeAll(async () => {
		store = memoryStore();
		server = createServer(createApp({ store, rateLimit: 1000 }));
		await new Promise((resolve) => server.listen(0, resolve));
		base = `http://127.0.0.1:${server.address().port}`;
	});
	afterAll(() => server.close());
	beforeEach(() => store.rows.clear());

	const put = (body, headers = auth) =>
		fetch(`${base}/v1/progress`, {
			method: "PUT",
			headers: { ...json, ...headers },
			body: JSON.stringify(body),
		});

	it("responde ao health check", async () => {
		const res = await fetch(`${base}/health`);
		expect(res.status).toBe(200);
	});

	it("exige o código de sincronização", async () => {
		expect((await fetch(`${base}/v1/progress`)).status).toBe(401);
		const weak = { Authorization: "Bearer curta" };
		expect((await fetch(`${base}/v1/progress`, { headers: weak })).status).toBe(
			401,
		);
	});

	it("devolve 404 quando não há progresso", async () => {
		const res = await fetch(`${base}/v1/progress`, { headers: auth });
		expect(res.status).toBe(404);
	});

	it("grava, lê e versiona o progresso; guarda só o hash do código", async () => {
		const first = await put({ data: { pl_xp: "10" }, baseVersion: 0 });
		expect(first.status).toBe(200);
		expect((await first.json()).version).toBe(1);
		const second = await put({ data: { pl_xp: "20" }, baseVersion: 1 });
		expect((await second.json()).version).toBe(2);

		const read = await fetch(`${base}/v1/progress`, { headers: auth });
		expect(await read.json()).toMatchObject({
			data: { pl_xp: "20" },
			version: 2,
		});
		expect([...store.rows.keys()]).toEqual([hashSyncKey(KEY)]);
	});

	it("recusa gravação com versão antiga e devolve o estado atual", async () => {
		await put({ data: { pl_xp: "10" }, baseVersion: 0 });
		const res = await put({ data: { pl_xp: "99" }, baseVersion: 0 });
		expect(res.status).toBe(409);
		expect((await res.json()).current.data).toEqual({ pl_xp: "10" });
	});

	it.each([
		[{ data: {}, baseVersion: 0 }],
		[{ data: { outra_chave: "1" }, baseVersion: 0 }],
		[{ data: { pobrelingo_analytics_consent: "true" }, baseVersion: 0 }],
		[{ data: { pl_xp: 10 }, baseVersion: 0 }],
		[{ data: { pl_xp: "1" }, baseVersion: -1 }],
		[[]],
	])("rejeita corpo inválido %#", async (body) => {
		expect((await put(body)).status).toBe(400);
	});

	it("rejeita corpo grande demais", async () => {
		const big = { pl_big: "x".repeat(1024 * 1024 + 1) };
		expect((await put({ data: big, baseVersion: 0 })).status).toBe(413);
	});

	it("apaga o progresso", async () => {
		await put({ data: { pl_xp: "10" }, baseVersion: 0 });
		const res = await fetch(`${base}/v1/progress`, {
			method: "DELETE",
			headers: auth,
		});
		expect(res.status).toBe(204);
		expect(store.rows.size).toBe(0);
	});

	it("responde ao preflight de CORS", async () => {
		const res = await fetch(`${base}/v1/progress`, { method: "OPTIONS" });
		expect(res.status).toBe(204);
		expect(res.headers.get("access-control-allow-headers")).toContain(
			"Authorization",
		);
	});
});

describe("rate limit", () => {
	it("devolve 429 acima do limite", async () => {
		const server = createServer(
			createApp({ store: memoryStore(), rateLimit: 2 }),
		);
		await new Promise((resolve) => server.listen(0, resolve));
		const url = `http://127.0.0.1:${server.address().port}/v1/progress`;
		const statuses = [];
		for (let i = 0; i < 3; i++) {
			statuses.push((await fetch(url, { headers: auth })).status);
		}
		server.close();
		expect(statuses).toEqual([404, 404, 429]);
	});
});
