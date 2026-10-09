import { describe, expect, it } from "vitest";
import { previewInterval, scheduleCard } from "@/lib/srsScheduler";
import { GRADE_AGAIN, GRADE_GOOD, type ReviewCard } from "@/lib/srsTypes";

const NOW = new Date("2026-07-30T12:00:00.000Z");
const DAY = 86_400_000;

const fsrs = (overrides: Record<string, unknown> = {}) => ({
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

const cardWith = (stored: unknown): ReviewCard => ({
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
	fsrs: stored as ReviewCard["fsrs"],
});

// The review page previews every grade during render: one throw blanks the page.
describe("scheduler against stored state ts-fsrs rejects", () => {
	it.each([
		["negative stability", fsrs({ stability: -5 })],
		["unknown state", fsrs({ state: 99 })],
		[
			"last review in the future (clock moved back)",
			fsrs({
				last_review: new Date(NOW.getTime() + 5 * DAY).toISOString(),
			}),
		],
		["fractional learning step", fsrs({ learning_steps: 0.5 })],
	])("falls back to a usable schedule for %s", (_label, stored) => {
		const card = cardWith(stored);

		for (const grade of [GRADE_AGAIN, GRADE_GOOD] as const) {
			expect(() => previewInterval(card, grade, NOW)).not.toThrow();
		}
		const next = scheduleCard(card, GRADE_GOOD, NOW);
		expect(new Date(next.dueAt).getTime()).toBeGreaterThan(NOW.getTime());
		expect(Number.isFinite(next.fsrs?.stability)).toBe(true);
	});
});
