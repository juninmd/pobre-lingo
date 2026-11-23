import { describe, expect, it } from "vitest";
import { isDesktopMode, resolveBase } from "./target";

describe("desktop target", () => {
	it("recognizes only the desktop mode", () => {
		expect(isDesktopMode("desktop")).toBe(true);
		expect(isDesktopMode("production")).toBe(false);
		expect(isDesktopMode("test")).toBe(false);
	});

	it("forces the root base on desktop, even with a Pages VITE_BASE", () => {
		expect(resolveBase("desktop", "/pobre-lingo/")).toBe("/");
		expect(resolveBase("production", "/pobre-lingo/")).toBe("/pobre-lingo/");
	});
});
