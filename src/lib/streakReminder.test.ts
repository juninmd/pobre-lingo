import { describe, expect, it } from "vitest";
import { localDay } from "./streakReminder";

describe("localDay", () => {
	it("uses the learner's local calendar day, not UTC", () => {
		// 23:30 local on Jan 5 is already Jan 6 in UTC for Brazil (UTC-3).
		expect(localDay(new Date(2026, 0, 5, 23, 30))).toBe("2026-01-05");
	});

	it("zero-pads month and day so the service worker compares equal strings", () => {
		expect(localDay(new Date(2026, 8, 9))).toBe("2026-09-09");
	});
});
