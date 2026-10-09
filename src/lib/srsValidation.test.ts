import { describe, expect, it } from "vitest";
import {
	GRADE_AGAIN,
	GRADE_EASY,
	GRADE_GOOD,
	GRADE_HARD,
	previewInterval,
	scheduleCard,
} from "@/lib/srs";
import { parseCard } from "@/lib/srsValidation";

const NOW = new Date("2026-07-30T12:00:00.000Z");
const DAY = 86_400_000;
const GRADES = [GRADE_AGAIN, GRADE_HARD, GRADE_GOOD, GRADE_EASY] as const;

const fsrsState = (overrides: Record<string, unknown> = {}) => ({
	stability: 12,
	difficulty: 5.5,
	elapsed_days: 3,
	scheduled_days: 12,
	learning_steps: 0,
	reps: 4,
	lapses: 0,
	state: 2,
	last_review: new Date(NOW.getTime() - 3 * DAY).toISOString(),
	...overrides,
});

const rawCard = (fsrs?: unknown) => ({
	id: "c1",
	source: "quiz",
	front: "front",
	back: "back",
	repetitions: 4,
	easeFactor: 2.5,
	intervalDays: 12,
	dueAt: NOW.toISOString(),
	lapses: 0,
	createdAt: NOW.toISOString(),
	lastReviewedAt: new Date(NOW.getTime() - 3 * DAY).toISOString(),
	fsrs,
});

describe("parseCard fsrs payload", () => {
	it("keeps a payload the scheduler itself wrote", () => {
		const written = scheduleCard(
			parseCard(rawCard()) as never,
			GRADE_GOOD,
			NOW,
		);
		expect(parseCard(JSON.parse(JSON.stringify(written)))?.fsrs).toBeDefined();
	});

	it("keeps a brand-new card's zeroed memory state", () => {
		const fresh = fsrsState({ state: 0, stability: 0, difficulty: 0 });
		expect(parseCard(rawCard(fresh))?.fsrs).toBeDefined();
	});

	// Each of these makes ts-fsrs throw when ReviewPage previews the card.
	it.each([
		["negative stability", fsrsState({ stability: -5 })],
		["zero stability on a reviewed card", fsrsState({ stability: 0 })],
		["stability under ts-fsrs minimum", fsrsState({ stability: 0.0001 })],
		["difficulty below 1", fsrsState({ difficulty: 0.5 })],
		["unknown state 99", fsrsState({ state: 99 })],
		["fractional state", fsrsState({ state: 1.5 })],
		["negative state", fsrsState({ state: -1 })],
		["non-integer learning step", fsrsState({ learning_steps: 0.5 })],
		["unparseable due", fsrsState({ due: "garbage" })],
		["unparseable last_review", fsrsState({ last_review: "garbage" })],
	])("drops the fsrs field but keeps the card: %s", (_label, fsrs) => {
		const card = parseCard(rawCard(fsrs));

		expect(card?.id).toBe("c1");
		expect(card?.fsrs).toBeUndefined();
		for (const grade of GRADES) {
			expect(() => previewInterval(card as never, grade, NOW)).not.toThrow();
		}
	});
});
