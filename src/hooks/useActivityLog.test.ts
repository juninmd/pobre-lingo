import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useActivityLog } from "@/hooks/useActivityLog";
import {
	EVENING_LOCAL_DAY,
	EVENING_UTC_DAY,
	setupLocalEvening,
} from "@/test-utils/localEvening";

const LOG_KEY = "pobrelingo_activity_log";

function readLog(): { date: string; count: number }[] {
	return JSON.parse(localStorage.getItem(LOG_KEY) ?? "[]");
}

describe("useActivityLog day keys", () => {
	setupLocalEvening();
	beforeEach(() => localStorage.clear());

	it("files evening activity under the local day so the daily goal does not reset at 21:00", () => {
		const { result } = renderHook(() => useActivityLog());

		act(() => result.current.logActivity());

		expect(readLog()).toEqual([{ date: EVENING_LOCAL_DAY, count: 1 }]);
		expect(readLog().some((e) => e.date === EVENING_UTC_DAY)).toBe(false);
		expect(result.current.todayCount()).toBe(1);
	});

	it("matches the local-day keys the reminders read from the same log", () => {
		localStorage.setItem(
			LOG_KEY,
			JSON.stringify([{ date: EVENING_LOCAL_DAY, count: 4 }]),
		);
		const { result } = renderHook(() => useActivityLog());

		act(() => result.current.logActivity());

		expect(readLog()).toEqual([{ date: EVENING_LOCAL_DAY, count: 5 }]);
	});

	it("counts the 30-day lookback in local days: keeps day -30, drops day -31", () => {
		localStorage.setItem(
			LOG_KEY,
			JSON.stringify([
				{ date: "2026-09-07", count: 2 },
				{ date: "2026-09-08", count: 3 },
			]),
		);
		const { result } = renderHook(() => useActivityLog());

		act(() => result.current.logActivity());

		const dates = readLog().map((e) => e.date);
		expect(dates).toContain("2026-09-08");
		expect(dates).not.toContain("2026-09-07");
	});
});
