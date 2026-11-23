import { describe, expect, it } from "vitest";
import { joinRoute } from "./baseUrl";

describe("joinRoute", () => {
	it("uses the base path on the web", () => {
		expect(joinRoute(false, "/pobre-lingo/", "/review")).toBe(
			"/pobre-lingo/review",
		);
		expect(joinRoute(false, "/", "review")).toBe("/review");
	});

	it("uses a hash route on desktop, ignoring the base", () => {
		expect(joinRoute(true, "/", "/review")).toBe("#/review");
		expect(joinRoute(true, "/", "review")).toBe("#/review");
		expect(joinRoute(true, "/", "/")).toBe("#/");
	});
});
