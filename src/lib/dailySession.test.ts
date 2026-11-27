import { describe, expect, it } from "vitest";
import { clampGoal, minutesToday, weekSplit } from "./dailySession";
import { addStudySeconds, emptyStudyLog, type StudyKind } from "./studyTime";

const NOW = new Date(2026, 10, 23, 10, 0, 0);
const day = (offset: number) => {
	const d = new Date(NOW);
	d.setDate(d.getDate() - offset);
	return d;
};
function log(entries: [number, StudyKind, number][]) {
	let l = emptyStudyLog();
	for (const [offset, kind, minutes] of entries) {
		// addStudySeconds limita cada registro a 120 s: soma em blocos.
		for (let i = 0; i < minutes * 30; i++)
			l = addStudySeconds(l, kind, 2, day(offset));
	}
	return l;
}

describe("clampGoal", () => {
	it("keeps the goal between 5 and 120 and falls back on garbage", () => {
		expect(clampGoal(1)).toBe(5);
		expect(clampGoal(999)).toBe(120);
		expect(clampGoal(Number.NaN)).toBe(15);
		expect(clampGoal(20.4)).toBe(20);
	});
});

describe("minutesToday", () => {
	it("sums every strand for the local day only", () => {
		const l = log([
			[0, "reading", 4],
			[0, "speaking", 3],
			[1, "reading", 50],
		]);
		expect(minutesToday(l, NOW)).toBe(7);
	});
});

describe("weekSplit", () => {
	it("does not judge with little data", () => {
		const s = weekSplit(log([[0, "reading", 10]]), NOW);
		expect(s.share).toBeNull();
		expect(s.lowProduction).toBe(false);
	});
	it("flags low production and ignores 'study'", () => {
		const s = weekSplit(
			log([
				[0, "reading", 30],
				[1, "listening", 20],
				[2, "speaking", 5],
				[2, "study", 90],
			]),
			NOW,
		);
		expect(s.productionMin).toBe(5);
		expect(s.consumptionMin).toBe(50);
		expect(s.lowProduction).toBe(true);
	});
	it("is fine at or above the target and ignores days older than a week", () => {
		const s = weekSplit(
			log([
				[0, "reading", 20],
				[1, "speaking", 12],
				[8, "reading", 500],
			]),
			NOW,
		);
		expect(s.lowProduction).toBe(false);
		expect(s.consumptionMin).toBe(20);
	});
});
