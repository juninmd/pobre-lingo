import { describe, expect, it } from "vitest";
import { calculateProficiency } from "@/lib/proficiency";
import { proficiencyQuestions } from "@/lib/proficiencyQuestions";

describe("calculateProficiency", () => {
	it("returns C2 when every CEFR band is passed", () => {
		const answers = Object.fromEntries(
			proficiencyQuestions.map((question) => [
				question.id,
				question.correctAnswer,
			]),
		);

		const result = calculateProficiency(answers, new Date("2026-06-21"));

		expect(result.level).toBe("C2");
		expect(result.score).toBe(proficiencyQuestions.length);
		expect(result.ielts).toBe("8.5-9.0");
		expect(result.date).toBe("2026-06-21");
		expect(result.confidence).toBe("alta");
		expect(result.skillReports.every((report) => report.percent === 100)).toBe(
			true,
		);
		expect(result.todayTip).toContain("Cronometre");
	});

	it("does not unlock B2 when higher-band answers are missing", () => {
		const answers = Object.fromEntries(
			proficiencyQuestions
				.filter((question) => ["A1", "A2", "B1"].includes(question.cefr))
				.map((question) => [question.id, question.correctAnswer]),
		);

		const result = calculateProficiency(answers, new Date("2026-06-21"));

		expect(result.level).toBe("B1");
		expect(result.cambridge).toBe("B1 Preliminary");
		expect(result.weakestSkill).toBe("certification");
	});
});
