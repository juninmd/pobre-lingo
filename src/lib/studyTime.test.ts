import { describe, expect, it } from "vitest";
import { LEVEL_HOURS, nextLevel, projectTo } from "./fluencyGoals";
import {
	addStudySeconds,
	addWordsRead,
	emptyStudyLog,
	MAX_CHUNK_SECONDS,
	MAX_LOG_DAYS,
	parseStudyLog,
	totalHours,
	totalsByKind,
	weeklyHours,
} from "./studyTime";

const at = (iso: string) => new Date(iso);

describe("study log", () => {
	it("accumulates seconds per kind and per day", () => {
		let log = emptyStudyLog();
		log = addStudySeconds(log, "reading", 60, at("2026-09-18T10:00:00"));
		log = addStudySeconds(log, "reading", 30, at("2026-09-19T10:00:00"));
		log = addStudySeconds(log, "speaking", 45, at("2026-09-19T11:00:00"));
		expect(totalsByKind(log).reading).toBe(90);
		expect(totalsByKind(log).speaking).toBe(45);
		expect(totalHours(log)).toBeCloseTo(135 / 3600);
	});

	it("never credits a forgotten tab: each chunk is capped", () => {
		const log = addStudySeconds(emptyStudyLog(), "study", 10_000, new Date());
		expect(totalsByKind(log).study).toBe(MAX_CHUNK_SECONDS);
		expect(addStudySeconds(log, "study", -5, new Date())).toBe(log);
	});

	it("counts only the last 7 days as this week's pace", () => {
		let log = emptyStudyLog();
		log = addStudySeconds(log, "writing", 120, at("2026-09-01T10:00:00"));
		log = addStudySeconds(log, "writing", 120, at("2026-09-15T10:00:00"));
		expect(weeklyHours(log, at("2026-09-19T12:00:00"))).toBeCloseTo(120 / 3600);
	});

	it("keeps at most MAX_LOG_DAYS days", () => {
		let log = emptyStudyLog();
		const day = at("2025-01-01T10:00:00");
		for (let i = 0; i < MAX_LOG_DAYS + 10; i++) {
			day.setDate(day.getDate() + 1);
			log = addStudySeconds(log, "study", 60, day);
		}
		expect(Object.keys(log.days)).toHaveLength(MAX_LOG_DAYS);
	});

	it("tracks words read and recovers from corrupted storage", () => {
		expect(addWordsRead(emptyStudyLog(), 250).wordsRead).toBe(250);
		expect(parseStudyLog("garbage")).toEqual(emptyStudyLog());
		expect(parseStudyLog({ days: {}, wordsRead: -3 }).wordsRead).toBe(0);
	});
});

describe("fluency projection", () => {
	it("projects weeks to the target at the current weekly pace", () => {
		const p = projectTo("B2", 500, 5);
		expect(p.hoursNeeded).toBe(LEVEL_HOURS.B2);
		expect(p.weeksLeft).toBe(20);
		expect(projectTo("B2", 500, 0).weeksLeft).toBeNull();
		expect(projectTo("A1", 150, 0).weeksLeft).toBe(0);
	});

	it("targets the level right above the learner's", () => {
		expect(nextLevel(null)).toBe("A1");
		expect(nextLevel("B1")).toBe("B2");
		expect(nextLevel("C2")).toBe("C2");
	});
});
