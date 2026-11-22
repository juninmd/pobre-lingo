import { describe, expect, it } from "vitest";
import { localDayNumber } from "./localDay";

/** Instant in UTC with the calendar fields a Brasília (UTC-3) user sees. */
const brasilia = (iso: string, y: number, m: number, d: number) =>
	Object.assign(new Date(iso), {
		getFullYear: () => y,
		getMonth: () => m,
		getDate: () => d,
	});

describe("localDayNumber", () => {
	it("keeps the same day until local midnight, even after midnight UTC", () => {
		const morning = brasilia("2026-11-22T11:00:00Z", 2026, 10, 22);
		const night = brasilia("2026-11-23T01:30:00Z", 2026, 10, 22);
		const next = brasilia("2026-11-23T03:05:00Z", 2026, 10, 23);
		expect(localDayNumber(night)).toBe(localDayNumber(morning));
		expect(localDayNumber(next)).toBe(localDayNumber(morning) + 1);
		expect(Number.isInteger(localDayNumber(morning))).toBe(true);
	});
});
