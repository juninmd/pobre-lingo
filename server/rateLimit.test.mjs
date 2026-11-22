// @vitest-environment node
import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rateLimit.mjs";

describe("createRateLimiter", () => {
	it("bloqueia acima do limite e libera na janela seguinte", () => {
		let time = 0;
		const allow = createRateLimiter({
			limit: 2,
			windowMs: 1000,
			now: () => time,
		});
		expect([allow("a"), allow("a"), allow("a")]).toEqual([true, true, false]);
		time = 1000;
		expect(allow("a")).toBe(true);
	});

	it("chaves novas em massa não zeram o limite de quem já estourou", () => {
		const allow = createRateLimiter({
			limit: 1,
			windowMs: 1000,
			now: () => 0,
			maxKeys: 3,
		});
		allow("abuser");
		expect(allow("abuser")).toBe(false);
		allow("x1");
		allow("x2");
		allow("x3");
		expect(allow("abuser")).toBe(false);
	});

	it("ao lotar, reaproveita janelas vencidas e mantém bloqueios ativos", () => {
		let time = 0;
		const allow = createRateLimiter({
			limit: 1,
			windowMs: 1000,
			now: () => time,
			maxKeys: 2,
		});
		allow("old");
		time = 500;
		allow("active");
		expect(allow("active")).toBe(false);
		time = 1200;
		expect(allow("new")).toBe(true);
		expect(allow("active")).toBe(false);
		expect(allow("new")).toBe(false);
	});

	it("ao lotar, despeja a chave livre mais antiga e nunca uma bloqueada", () => {
		const allow = createRateLimiter({
			limit: 1,
			windowMs: 1000,
			now: () => 0,
			maxKeys: 3,
		});
		allow("blocked");
		allow("blocked");
		allow("free1");
		allow("free2");
		allow("x");
		expect(allow("free2")).toBe(false);
		expect(allow("blocked")).toBe(false);
		expect(allow("free1")).toBe(true);
	});
});
