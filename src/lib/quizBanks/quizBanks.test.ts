import { describe, expect, it } from "vitest";
import { quizData } from "@/lib/quizData";
import { quizBanks } from "./index";

const NEW_KEYS = Object.keys(quizBanks);

describe("quizBanks", () => {
	it("covers the five lessons that had no bank plus the A2 tenses lesson", () => {
		expect(NEW_KEYS.sort()).toEqual(
			[
				"cultural-quiz",
				"fluency-challenge",
				"nuance-quiz",
				"past-present-quiz",
				"the-final-boss",
				"ultimate-challenge",
			].sort(),
		);
	});

	it.each(NEW_KEYS)("%s has 8 to 10 well-formed questions", (key) => {
		const questions = quizBanks[key];
		expect(questions.length).toBeGreaterThanOrEqual(8);
		expect(questions.length).toBeLessThanOrEqual(10);
		for (const q of questions) {
			expect(q.question.trim()).not.toBe("");
			expect(q.explanation.trim()).not.toBe("");
			expect(q.options).toHaveLength(4);
			expect(new Set(q.options).size).toBe(4);
			expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
			expect(q.correctAnswer).toBeLessThan(q.options.length);
		}
	});

	it("is merged into quizData under the same keys", () => {
		for (const key of NEW_KEYS) {
			expect(quizData[key]).toBe(quizBanks[key]);
		}
	});
});
