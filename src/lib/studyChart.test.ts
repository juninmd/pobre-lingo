import { describe, expect, it } from "vitest";
import { axisMax, dailyStudyMinutes, formatMinutes } from "./studyChart";
import { emptyStudyLog } from "./studyTime";

const NOW = new Date(2026, 10, 10, 9, 0, 0);

describe("dailyStudyMinutes", () => {
	it("returns one entry per day, oldest first, ending today", () => {
		const days = dailyStudyMinutes(emptyStudyLog(), NOW, 7);
		expect(days.map((day) => day.key)).toEqual([
			"2026-11-04",
			"2026-11-05",
			"2026-11-06",
			"2026-11-07",
			"2026-11-08",
			"2026-11-09",
			"2026-11-10",
		]);
		expect(days.every((day) => day.total === 0)).toBe(true);
	});

	it("converts seconds to minutes per strand and sums the day", () => {
		const log = {
			days: { "2026-11-10": { reading: 600, speaking: 150 } },
			wordsRead: 0,
		};
		const today = dailyStudyMinutes(log, NOW, 3).at(-1);
		expect(today?.minutes.reading).toBe(10);
		expect(today?.minutes.speaking).toBe(3);
		expect(today?.minutes.listening).toBe(0);
		expect(today?.total).toBe(13);
	});

	it("ignores days outside the window", () => {
		const log = { days: { "2026-10-01": { study: 6000 } }, wordsRead: 0 };
		const days = dailyStudyMinutes(log, NOW, 14);
		expect(days.reduce((sum, day) => sum + day.total, 0)).toBe(0);
	});
});

describe("axisMax", () => {
	it("rounds up to a readable step", () => {
		expect(axisMax(0)).toBe(10);
		expect(axisMax(25)).toBe(30);
		expect(axisMax(61)).toBe(90);
		expect(axisMax(800)).toBe(960);
	});
});

describe("formatMinutes", () => {
	it("formats minutes and hours", () => {
		expect(formatMinutes(45)).toBe("45 min");
		expect(formatMinutes(60)).toBe("1h");
		expect(formatMinutes(65)).toBe("1h 05min");
	});
});
