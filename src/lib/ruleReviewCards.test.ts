import { describe, expect, it } from "vitest";
import { getRuleById } from "@/lib/grammarRules";
import { ruleReviewCards } from "@/lib/ruleReviewCards";

describe("ruleReviewCards", () => {
	it("asks the learner to produce the English sentence from Portuguese", () => {
		const rule = getRuleById("present-simple");
		if (!rule) throw new Error("present-simple rule is missing");
		const cards = ruleReviewCards(rule);
		expect(cards.length).toBeGreaterThan(0);
		expect(cards.length).toBeLessThanOrEqual(3);
		for (const card of cards) {
			expect(card.source).toBe("grammar");
			expect(card.front).toContain("Como se diz em inglês");
			expect(card.back).toMatch(/[a-z]/i);
		}
	});

	it("skips examples without a translation, which could not be reviewed", () => {
		const cards = ruleReviewCards({
			id: "x",
			title_pt: "X",
			title_en: "X",
			explanation_pt: "",
			examples: [{ sentence_en: "No translation here." }],
		});
		expect(cards).toEqual([]);
	});
});
