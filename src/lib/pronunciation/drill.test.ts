import { describe, expect, it } from "vitest";
import {
	buildDiscriminationRounds,
	gradeDiscriminationChoice,
	summarizeDiscrimination,
} from "./drill";
import type { MinimalPair } from "./types";

const pairs: MinimalPair[] = [
	{ id: "p1", focus: "th", a: "think", b: "sink", tipPt: "tip1" },
	{ id: "p2", focus: "th", a: "thin", b: "fin", tipPt: "tip2" },
	{ id: "p3", focus: "th", a: "this", b: "dis", tipPt: "tip3" },
];

// RNG determinístico: sequência fixa de valores em [0, 1).
function fakeRng(values: number[]): () => number {
	let i = 0;
	return () => values[i++ % values.length];
}

describe("buildDiscriminationRounds", () => {
	it("returns empty when there are no pairs", () => {
		expect(buildDiscriminationRounds([], 10)).toEqual([]);
	});

	it("builds the requested number of rounds", () => {
		const rounds = buildDiscriminationRounds(
			pairs,
			10,
			fakeRng([0.1, 0.5, 0.9]),
		);
		expect(rounds).toHaveLength(10);
	});

	it("balances answers roughly evenly between a and b", () => {
		const rounds = buildDiscriminationRounds(
			pairs,
			20,
			fakeRng([0.2, 0.6, 0.4]),
		);
		const aCount = rounds.filter((r) => r.answer === "a").length;
		const bCount = rounds.filter((r) => r.answer === "b").length;
		expect(Math.abs(aCount - bCount)).toBeLessThanOrEqual(1);
	});

	it("never repeats the same target word in consecutive rounds", () => {
		const rounds = buildDiscriminationRounds(
			pairs,
			30,
			fakeRng([0.9, 0.1, 0.5, 0.3]),
		);
		for (let i = 1; i < rounds.length; i++) {
			const prevWord =
				rounds[i - 1].answer === "a"
					? rounds[i - 1].pair.a
					: rounds[i - 1].pair.b;
			const currWord =
				rounds[i].answer === "a" ? rounds[i].pair.a : rounds[i].pair.b;
			expect(currWord).not.toBe(prevWord);
		}
	});

	it("uses every pair from the pool at least once when rounds >= pairs.length", () => {
		const rounds = buildDiscriminationRounds(
			pairs,
			pairs.length,
			fakeRng([0.5]),
		);
		const usedIds = new Set(rounds.map((r) => r.pair.id));
		expect(usedIds.size).toBe(pairs.length);
	});
});

describe("gradeDiscriminationChoice", () => {
	it("marks correct when choice matches the round answer", () => {
		const round = { pair: pairs[0], answer: "a" as const };
		expect(gradeDiscriminationChoice(round, "a").correct).toBe(true);
		expect(gradeDiscriminationChoice(round, "b").correct).toBe(false);
	});
});

describe("summarizeDiscrimination", () => {
	it("computes score as a rounded percentage", () => {
		const round = { pair: pairs[0], answer: "a" as const };
		const results = [
			gradeDiscriminationChoice(round, "a"),
			gradeDiscriminationChoice(round, "a"),
			gradeDiscriminationChoice(round, "b"),
		];
		const summary = summarizeDiscrimination(results);
		expect(summary.total).toBe(3);
		expect(summary.correct).toBe(2);
		expect(summary.score).toBe(67);
	});

	it("returns 0 score for an empty result set", () => {
		expect(summarizeDiscrimination([])).toEqual({
			total: 0,
			correct: 0,
			score: 0,
			missedPairs: [],
		});
	});

	it("collects missed pairs for SRS review", () => {
		const round = { pair: pairs[1], answer: "b" as const };
		const results = [gradeDiscriminationChoice(round, "a")];
		const summary = summarizeDiscrimination(results);
		expect(summary.missedPairs).toEqual([pairs[1]]);
	});
});
