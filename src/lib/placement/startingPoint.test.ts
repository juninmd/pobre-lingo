import { describe, expect, it } from "vitest";
import { CEFR_ORDER } from "./adaptive";
import { getStartingPoint } from "./startingPoint";

describe("getStartingPoint", () => {
	it("returns the first lesson for every CEFR level", () => {
		for (const level of CEFR_ORDER) {
			const point = getStartingPoint(level);
			expect(point).not.toBeNull();
			expect(point?.lessonId).toMatch(/^.+:.+$/);
			expect(point?.href.length).toBeGreaterThan(0);
		}
	});

	it("A1 and C2 point to different lessons", () => {
		const a1 = getStartingPoint("A1");
		const c2 = getStartingPoint("C2");
		expect(a1?.lessonId).not.toBe(c2?.lessonId);
	});
});
