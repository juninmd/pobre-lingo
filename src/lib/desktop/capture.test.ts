import { describe, expect, it } from "vitest";
import { buildCaptureCard, normalizeCapture } from "./capture";

describe("normalizeCapture", () => {
	it("collapses whitespace and trims", () => {
		expect(normalizeCapture("  to \n postpone  ")).toBe("to postpone");
	});
	it("returns null for empty text and caps the length", () => {
		expect(normalizeCapture("   ")).toBeNull();
		expect(normalizeCapture("a".repeat(500))?.length).toBe(120);
	});
});

describe("buildCaptureCard", () => {
	it("builds a stable id from the front, case-insensitive", () => {
		const a = buildCaptureCard("Reliable", "confiável");
		const b = buildCaptureCard("reliable", "confiável");
		expect(a?.id).toBe("capture:reliable");
		expect(a?.id).toBe(b?.id);
	});
	it("needs both sides", () => {
		expect(buildCaptureCard("reliable", " ")).toBeNull();
		expect(buildCaptureCard("", "x")).toBeNull();
	});
});
