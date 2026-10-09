import { describe, expect, it } from "vitest";
import { calculateProficiency, inferLevel } from "@/lib/proficiency";
import { proficiencyQuestions } from "@/lib/proficiencyQuestions";

describe("calculateProficiency", () => {
	it("does not recommend advanced content from isolated advanced answers", () => {
		expect(inferLevel(["C2", "C2"])).toBe("A1");
	});
	it("suggests advanced content without exam equivalencies when all bands are passed", () => {
		const answers = Object.fromEntries(
			proficiencyQuestions.map((question) => [
				question.id,
				question.correctAnswer,
			]),
		);

		const result = calculateProficiency(answers, new Date("2026-06-21"));

		expect(result.level).toBe("C2");
		expect(result.score).toBe(proficiencyQuestions.length);
		expect(result).not.toHaveProperty("ielts");
		expect(result).not.toHaveProperty("toefl");
		expect(result).not.toHaveProperty("cambridge");
		expect(result.date).toBe("2026-06-21");
		expect(result.basis).toBe("recognition");
		expect(result).not.toHaveProperty("confidence");
		expect(result.skillReports.every((report) => report.percent === 100)).toBe(
			true,
		);
		expect(result.todayTip).toContain("fontes");
	});

	it("does not unlock B2 when higher-band answers are missing", () => {
		const answers = Object.fromEntries(
			proficiencyQuestions
				.filter((question) => ["A1", "A2", "B1"].includes(question.cefr))
				.map((question) => [question.id, question.correctAnswer]),
		);

		const result = calculateProficiency(answers, new Date("2026-06-21"));

		expect(result.level).toBe("B1");
		expect(result.focus).toContain("conversas");
		expect(result.weakestSkill).toBe("reading");
	});
});
