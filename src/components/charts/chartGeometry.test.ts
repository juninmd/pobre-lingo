import { describe, expect, it } from "vitest";
import { dailyStudyMinutes } from "@/lib/studyChart";
import { buildColumns, plotArea, yScale } from "./chartGeometry";
import { STUDY_SERIES } from "./chartSeries";

const NOW = new Date(2026, 10, 10, 9, 0, 0);
const log = {
	days: {
		"2026-11-10": { reading: 600, listening: 300 },
		"2026-11-09": { study: 1200 },
	},
	wordsRead: 0,
};
const days = dailyStudyMinutes(log, NOW, 7);

describe("yScale", () => {
	it("maps zero to the baseline and the max to the top of the plot", () => {
		const area = plotArea(400);
		expect(yScale(0, 60)).toBe(area.bottom);
		expect(yScale(60, 60)).toBe(area.top);
	});
});

describe("buildColumns", () => {
	const columns = buildColumns(days, STUDY_SERIES, 400, 30);

	it("creates one column per day, evenly spaced inside the plot", () => {
		expect(columns).toHaveLength(7);
		const area = plotArea(400);
		expect(columns[0].center).toBeGreaterThan(area.left);
		expect(columns[6].center).toBeLessThan(area.right);
		expect(columns[1].center - columns[0].center).toBeCloseTo(columns[0].slot);
	});

	it("draws only the strands that have minutes, in series order", () => {
		expect(columns[6].segments.map((segment) => segment.kind)).toEqual([
			"reading",
			"listening",
		]);
		expect(columns[5].segments.map((segment) => segment.kind)).toEqual([
			"study",
		]);
		expect(columns[0].segments).toHaveLength(0);
	});

	it("rounds only the free end of the stack", () => {
		const [bottom, top] = columns[6].segments;
		expect(bottom.path).not.toContain("Q");
		expect(top.path).toContain("Q");
	});

	it("keeps each strand's colour regardless of its position", () => {
		const study = columns[5].segments[0];
		expect(study.color).toBe(
			STUDY_SERIES.find((series) => series.kind === "study")?.color,
		);
	});
});
