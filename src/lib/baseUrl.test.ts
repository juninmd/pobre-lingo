import { describe, expect, it } from "vitest";
import { joinBase } from "./baseUrl";

describe("joinBase", () => {
	it("keeps paths as they are at the site root", () => {
		expect(joinBase("/", "/review")).toBe("/review");
		expect(joinBase("/", "pwa-192x192.png")).toBe("/pwa-192x192.png");
		expect(joinBase("/", "/")).toBe("/");
	});

	it("prefixes paths with a sub-path base", () => {
		expect(joinBase("/pobre-lingo/", "/review")).toBe("/pobre-lingo/review");
		expect(joinBase("/pobre-lingo/", "pwa-192x192.png")).toBe(
			"/pobre-lingo/pwa-192x192.png",
		);
		expect(joinBase("/pobre-lingo/", "/")).toBe("/pobre-lingo/");
	});

	it("keeps a hash or query after the path", () => {
		expect(joinBase("/pobre-lingo/", "/x?a=1#top")).toBe(
			"/pobre-lingo/x?a=1#top",
		);
	});
});
