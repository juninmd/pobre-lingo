import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calculateProficiency } from "./proficiency";
import { calculateProficiencyFromAdaptive } from "./proficiencyAdaptive";
import {
	loadProficiencyResult,
	PROFICIENCY_RESULT_KEY,
	readProficiencyResult,
	saveProficiencyResult,
} from "./proficiencyStorage";

beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe("study suggestions", () => {
	it("persists only a validated recognition result", () => {
		const result = calculateProficiency({});
		expect(saveProficiencyResult(result)).toBe(true);
		expect(loadProficiencyResult()).toMatchObject({
			version: 2,
			basis: "recognition",
			level: "A1",
			score: 0,
		});
	});
	it("does not import unverified exam mappings or legacy classifications", () => {
		expect(readProficiencyResult({ level: "C2", skillReports: [] })).toBeNull();
		const result = {
			...calculateProficiency({}),
			ielts: "9.0",
			focus: "Nível oficial",
			dailyPlan: null,
		};
		expect(readProficiencyResult(result)).not.toHaveProperty("ielts");
		expect(readProficiencyResult(result)?.focus).not.toBe("Nível oficial");
	});
	it("rejects malformed grades, unknown skills and contradictory totals", () => {
		const result = calculateProficiency({});
		expect(
			readProficiencyResult({ ...result, skillReports: [null] }),
		).toBeNull();
		expect(readProficiencyResult({ ...result, score: -1 })).toBeNull();
		expect(readProficiencyResult({ ...result, total: 0 })).toBeNull();
		expect(
			readProficiencyResult({
				...result,
				skillReports: [
					{ skill: "toString", total: 12, correct: 0, percent: 0 },
				],
			}),
		).toBeNull();
	});
	it("reports failed saves without presenting stored success", () => {
		vi.spyOn(console, "warn").mockImplementation(() => {});
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new Error("quota");
		});
		expect(saveProficiencyResult(calculateProficiency({}))).toBe(false);
		expect(localStorage.getItem(PROFICIENCY_RESULT_KEY)).toBeNull();
	});
	it("does not score listening when audio was unavailable", () => {
		const result = calculateProficiencyFromAdaptive([
			{ itemId: "a1-l1", level: "A1", skill: "listening", correct: null },
		]);
		expect(result.total).toBe(0);
		expect(
			result.skillReports.find((report) => report.skill === "listening"),
		).toMatchObject({ total: 0, percent: null });
		expect(result.weakestSkill).toBeNull();
		expect(saveProficiencyResult(result)).toBe(true);
	});
});
