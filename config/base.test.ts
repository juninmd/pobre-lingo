import { describe, expect, it } from "vitest";
import { normalizeBase } from "./base";

describe("normalizeBase", () => {
	it("defaults to the site root", () => {
		expect(normalizeBase(undefined)).toBe("/");
		expect(normalizeBase("")).toBe("/");
		expect(normalizeBase("/")).toBe("/");
	});

	it("always ends and starts with a slash", () => {
		expect(normalizeBase("pobre-lingo")).toBe("/pobre-lingo/");
		expect(normalizeBase("/pobre-lingo")).toBe("/pobre-lingo/");
		expect(normalizeBase("/pobre-lingo/")).toBe("/pobre-lingo/");
		expect(normalizeBase(" //a/b// ")).toBe("/a/b/");
	});
});
