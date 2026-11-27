import { describe, expect, it } from "vitest";
import {
	initialState,
	MAX_SNOOZES,
	SNOOZE_MS,
	shouldShowGate,
	snooze,
	snoozesLeft,
	startSession,
} from "./studyFirst";

const T = new Date(2026, 10, 23, 8, 0, 0);
const on = { ...initialState(), enabled: true };

describe("studyFirst", () => {
	it("shows only when enabled and the goal is not reached", () => {
		expect(shouldShowGate(initialState(), T, false)).toBe(false);
		expect(shouldShowGate(on, T, true)).toBe(false);
		expect(shouldShowGate(on, T, false)).toBe(true);
	});

	it("hides during a snooze and returns after it", () => {
		const s = snooze(on, T);
		expect(
			shouldShowGate(s, new Date(T.getTime() + SNOOZE_MS - 1), false),
		).toBe(false);
		expect(shouldShowGate(s, new Date(T.getTime() + SNOOZE_MS), false)).toBe(
			true,
		);
	});

	it("allows at most 2 snoozes per day and resets the next day", () => {
		let s = on;
		for (let i = 0; i < MAX_SNOOZES + 2; i++) s = snooze(s, T);
		expect(s.snoozes).toBe(MAX_SNOOZES);
		expect(snoozesLeft(s, T)).toBe(0);
		const tomorrow = new Date(2026, 10, 24, 8, 0, 0);
		expect(snoozesLeft(s, tomorrow)).toBe(MAX_SNOOZES);
		expect(shouldShowGate(s, tomorrow, false)).toBe(true);
	});

	it("starting a session does not spend a snooze", () => {
		const s = startSession(snooze(on, T), T);
		expect(s.snoozes).toBe(1);
		expect(shouldShowGate(s, new Date(T.getTime() + 60 * 60_000), false)).toBe(
			false,
		);
	});
});
