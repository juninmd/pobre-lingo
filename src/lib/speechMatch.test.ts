import { describe, expect, it } from "vitest";
import { scoreSpeech } from "./speechMatch";

describe("scoreSpeech", () => {
	const target = "I would like a cup of coffee, please.";

	it("accepts the full phrase regardless of case and punctuation", () => {
		const result = scoreSpeech(target, "i would like a cup of coffee please");
		expect(result.score).toBe(100);
		expect(result.passed).toBe(true);
	});

	it("rejects an empty transcript instead of treating it as a match", () => {
		expect(scoreSpeech(target, "").passed).toBe(false);
		expect(scoreSpeech(target, "   ").score).toBe(0);
	});

	it("rejects saying a single word of a long phrase", () => {
		const result = scoreSpeech(target, "coffee");
		expect(result.passed).toBe(false);
		expect(result.score).toBeLessThan(20);
	});

	it("tolerates one recognition slip in a long phrase", () => {
		const result = scoreSpeech(target, "I would like a cup of toffee please");
		expect(result.passed).toBe(true);
	});

	it("does not reward the right words in scrambled order", () => {
		const result = scoreSpeech(target, "please coffee of cup a like would I");
		expect(result.passed).toBe(false);
	});

	it("marks which target words were heard, for feedback", () => {
		const result = scoreSpeech("think about it", "sink about it");
		expect(result.words).toEqual([
			{ word: "think", heard: false },
			{ word: "about", heard: true },
			{ word: "it", heard: true },
		]);
	});

	it("treats contractions and their expansion as the same speech", () => {
		expect(scoreSpeech("I don't know", "I do not know").passed).toBe(true);
	});
});
