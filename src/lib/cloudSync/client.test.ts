import { describe, expect, it, vi } from "vitest";
import { ApiError, createSyncClient } from "./client";

const reply = (status: number, body?: unknown) =>
	Promise.resolve(
		new Response(body === undefined ? null : JSON.stringify(body), { status }),
	);

describe("createSyncClient", () => {
	it("envia o código como Bearer e devolve null em 404", async () => {
		const fetchFn = vi.fn(() => reply(404, { error: "not_found" }));
		const client = createSyncClient(
			"k".repeat(32),
			"https://api.test",
			fetchFn,
		);
		expect(await client.get()).toBeNull();
		const [url, init] = fetchFn.mock.calls[0] as unknown as [
			string,
			RequestInit,
		];
		expect(url).toBe("https://api.test/v1/progress");
		expect(init.headers).toMatchObject({
			Authorization: `Bearer ${"k".repeat(32)}`,
		});
	});

	it("devolve o estado atual num 409", async () => {
		const current = { data: { pl_xp: "1" }, version: 2, updatedAt: "x" };
		const client = createSyncClient("k".repeat(32), "https://api.test", () =>
			reply(409, { error: "conflict", current }),
		);
		expect(await client.put({ pl_xp: "2" }, 1)).toEqual({ ok: false, current });
	});

	it("lança ApiError em falhas do servidor", async () => {
		const client = createSyncClient("k".repeat(32), "https://api.test", () =>
			reply(500),
		);
		await expect(client.get()).rejects.toBeInstanceOf(ApiError);
	});
});
