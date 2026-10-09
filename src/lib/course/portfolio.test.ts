import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	getPortfolio,
	PORTFOLIO_KEY,
	readMissionDraft,
	readPortfolio,
	saveMission,
} from "./portfolio";

beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe("mission portfolio", () => {
	it("restores safe draft fields including the reflection", () => {
		expect(
			readMissionDraft({ text: "Hello!", reflection: "Como digo prazer?" }),
		).toEqual({ text: "Hello!", reflection: "Como digo prazer?" });
		expect(readMissionDraft({ text: [], reflection: 2 })).toEqual({
			text: "",
			reflection: "",
		});
		expect(readMissionDraft(null)).toEqual({ text: "", reflection: "" });
	});
	it("preserves productions and reflections without assigning a grade", () => {
		expect(
			saveMission("hello", " Hello! My name is Lu. ", "Preciso praticar meet."),
		).toBe(true);
		expect(getPortfolio()).toHaveLength(1);
		expect(getPortfolio()[0]).toMatchObject({
			lessonId: "hello",
			text: "Hello! My name is Lu.",
			reflection: "Preciso praticar meet.",
		});
		expect(getPortfolio()[0]).not.toHaveProperty("score");
	});
	it("ignores corrupt records and invalid lessons", () => {
		expect(readPortfolio({ hello: "text" })).toEqual([]);
		expect(readPortfolio([null, { lessonId: "hello", text: 2 }])).toEqual([]);
		expect(saveMission("missing", "hello", "")).toBe(false);
		expect(saveMission("hello", " ", "")).toBe(false);
		expect(saveMission("hello", "a".repeat(4001), "")).toBe(false);
	});
	it("retains distinct attempts but does not duplicate a completion retry", () => {
		saveMission("hello", "Hello!", "");
		saveMission("hello", "Hello!", "");
		expect(getPortfolio()).toHaveLength(1);
		saveMission("hello", "Hello! My name is Lu.", "");
		expect(getPortfolio()).toHaveLength(2);
	});
	it("reports failure when storage cannot persist a new production", () => {
		vi.spyOn(console, "warn").mockImplementation(() => {});
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new Error("quota");
		});
		expect(saveMission("hello", "Hello!", "")).toBe(false);
		expect(localStorage.getItem(PORTFOLIO_KEY)).toBeNull();
	});
	it("keeps the latest 200 valid records", () => {
		const entries = Array.from({ length: 201 }, (_, i) => ({
			id: `${i}`,
			lessonId: "hello",
			text: "hello",
			reflection: "",
			createdAt: "2026-09-30T12:00:00Z",
		}));
		expect(readPortfolio(entries)).toHaveLength(200);
		expect(readPortfolio(entries)[0].id).toBe("1");
	});
});
