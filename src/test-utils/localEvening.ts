import { afterEach, beforeEach, vi } from "vitest";

export const EVENING_LOCAL_DAY = "2026-10-08";
export const EVENING_UTC_DAY = "2026-10-09";

/** Freezes the clock at 22:30 local in a UTC-3 zone, where toISOString() already reads the next day. */
export function setupLocalEvening() {
	beforeEach(() => {
		vi.stubEnv("TZ", "America/Sao_Paulo");
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2026, 9, 8, 22, 30));
	});
	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllEnvs();
	});
}
