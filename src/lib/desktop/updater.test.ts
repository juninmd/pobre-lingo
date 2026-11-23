import { describe, expect, it } from "vitest";
import { percentOf } from "./updater";

describe("percentOf", () => {
	it("rounds and clamps", () => {
		expect(percentOf(50, 200)).toBe(25);
		expect(percentOf(300, 200)).toBe(100);
	});
	it("is null without a known total", () => {
		expect(percentOf(10, undefined)).toBeNull();
		expect(percentOf(10, 0)).toBeNull();
	});
});
