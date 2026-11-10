import { describe, expect, it } from "vitest";
import { formatRelativeTime } from "./relativeTime";

const NOW = new Date("2026-11-10T12:00:00Z");
const ago = (seconds: number) => new Date(NOW.getTime() - seconds * 1000);

describe("formatRelativeTime", () => {
	it("says 'agora' under a minute", () => {
		expect(formatRelativeTime(ago(20), NOW)).toBe("agora");
	});

	it("picks the largest unit that fits", () => {
		expect(formatRelativeTime(ago(5 * 60), NOW)).toBe("há 5 minutos");
		expect(formatRelativeTime(ago(3 * 3600), NOW)).toBe("há 3 horas");
		expect(formatRelativeTime(ago(3 * 86400), NOW)).toBe("há 3 dias");
	});

	it("uses the natural word for one day", () => {
		expect(formatRelativeTime(ago(86400), NOW)).toBe("ontem");
	});

	it("returns an empty string for an invalid date", () => {
		expect(formatRelativeTime(new Date("nope"), NOW)).toBe("");
	});
});
