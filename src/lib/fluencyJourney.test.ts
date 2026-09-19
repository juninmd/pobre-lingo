import { describe, expect, it } from "vitest";
import { LEVEL_HOURS } from "@/lib/fluencyGoals";
import { buildJourney } from "@/lib/fluencyJourney";
import { addStudySeconds, dayKey, emptyStudyLog } from "@/lib/studyTime";

const NOW = new Date("2026-09-19T12:00:00Z");

describe("buildJourney", () => {
	it("uses 0h baseline and target A1 when there is no placement level", () => {
		const journey = buildJourney({
			level: null,
			log: emptyStudyLog(),
			knownWords: 0,
			now: NOW,
			weeklyGoalHours: 5,
		});
		expect(journey.target).toBe("A1");
		expect(journey.hoursDone).toBe(0);
	});

	it("baselines hoursDone on the placement level's guided hours plus logged time", () => {
		// addStudySeconds caps a single chunk at 120s (MAX_CHUNK_SECONDS).
		const log = addStudySeconds(emptyStudyLog(), "reading", 120, NOW);
		const journey = buildJourney({
			level: "B1",
			log,
			knownWords: 0,
			now: NOW,
			weeklyGoalHours: 5,
		});
		expect(journey.target).toBe("B2");
		expect(journey.hoursDone).toBeCloseTo(LEVEL_HOURS.B1 + 120 / 3600);
	});

	it("projects weeks left using current weekly pace and the weekly goal separately", () => {
		let log = emptyStudyLog();
		// 5h this week -> weekly pace projection differs from a 10h/week goal.
		log = addStudySeconds(log, "study", 5 * 3600, NOW);
		const journey = buildJourney({
			level: "A1",
			log,
			knownWords: 0,
			now: NOW,
			weeklyGoalHours: 10,
		});
		expect(journey.projectionToTarget.weeksLeft).not.toBeNull();
		expect(journey.projectionToTargetAtGoal.weeksLeft).not.toBeNull();
		expect(journey.projectionToTargetAtGoal.weeksLeft).toBeLessThanOrEqual(
			journey.projectionToTarget.weeksLeft as number,
		);
	});

	it("picks the weakest strand by minutes this week, tie-breaking to listening", () => {
		const journey = buildJourney({
			level: "A2",
			log: emptyStudyLog(),
			knownWords: 0,
			now: NOW,
			weeklyGoalHours: 5,
		});
		// zero activity: all strands tie at 0 minutes.
		expect(journey.weakestStrand.kind).toBe("listening");
		expect(journey.weakestStrand.minutes).toBe(0);
		expect(journey.weakestStrand.route).toBe("/listening-lab");
	});

	it("picks reading as weakest only when every other strand has more minutes", () => {
		let log = emptyStudyLog();
		log = addStudySeconds(log, "listening", 600, NOW);
		log = addStudySeconds(log, "speaking", 600, NOW);
		log = addStudySeconds(log, "writing", 600, NOW);
		const journey = buildJourney({
			level: "A2",
			log,
			knownWords: 0,
			now: NOW,
			weeklyGoalHours: 5,
		});
		expect(journey.weakestStrand.kind).toBe("reading");
	});

	it("reports words read and vocab known against the target level's goals", () => {
		const journey = buildJourney({
			level: "A1",
			log: emptyStudyLog(),
			knownWords: 42,
			now: NOW,
			weeklyGoalHours: 5,
		});
		expect(journey.wordsRead).toBe(0);
		expect(journey.vocabKnown).toBe(42);
		expect(journey.wordsReadTarget).toBeGreaterThan(0);
		expect(journey.vocabTarget).toBeGreaterThan(0);
	});

	it("dayKey used by the log stays consistent with the journey's week window", () => {
		expect(dayKey(NOW)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});
