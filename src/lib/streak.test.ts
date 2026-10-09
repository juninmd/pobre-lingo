import { beforeEach, describe, expect, it } from "vitest";
import {
	GRACE_DAYS,
	LAST_ACTIVITY_KEY,
	readStreak,
	recordStreakActivity,
	STREAK_KEY,
} from "@/lib/streak";
import { setupLocalEvening } from "@/test-utils/localEvening";

const lastStudied = new Date(2026, 9, 1, 12, 0);
const daysAfter = (days: number, hour = 12) =>
	new Date(2026, 9, 1 + days, hour, 0);

function seed(streak: number) {
	localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
	localStorage.setItem(
		LAST_ACTIVITY_KEY,
		JSON.stringify(lastStudied.toISOString()),
	);
}

describe("recordStreakActivity", () => {
	beforeEach(() => localStorage.clear());

	it("starts the streak at 1 on the first ever activity", () => {
		expect(recordStreakActivity(lastStudied)).toBe(1);
	});

	it("does not count twice on the same day", () => {
		seed(4);
		expect(recordStreakActivity(daysAfter(0, 23))).toBe(4);
	});

	it("increments when studying the next day", () => {
		seed(4);
		expect(recordStreakActivity(daysAfter(1))).toBe(5);
	});

	it("keeps the streak alive across the grace window (by design: one missed day is tolerated)", () => {
		seed(4);
		expect(recordStreakActivity(daysAfter(GRACE_DAYS + 1))).toBe(5);
	});

	it("resets to 1 once the gap exceeds the grace window", () => {
		seed(4);
		expect(recordStreakActivity(daysAfter(GRACE_DAYS + 2))).toBe(1);
	});

	it("reads a streak as broken only after the grace window passes", () => {
		seed(4);
		expect(readStreak(daysAfter(GRACE_DAYS + 1))).toBe(4);
		expect(readStreak(daysAfter(GRACE_DAYS + 2))).toBe(0);
	});
});

describe("recordStreakActivity across local midnight", () => {
	setupLocalEvening();
	beforeEach(() => localStorage.clear());

	it("counts 22:30 and 00:10 the next local day as consecutive days", () => {
		expect(recordStreakActivity(new Date())).toBe(1);
		expect(recordStreakActivity(new Date(2026, 9, 9, 0, 10))).toBe(2);
	});
});
