import { describe, expect, it } from "vitest";
import { MAX_ITEMS, runAdaptiveSession } from "./adaptive";
import { placementBank } from "./bank";
import type { PlacementItem } from "./types";

/** Deterministic pseudo-random generator (LCG) so tests never flake. */
function seededRng(seed: number): () => number {
	let state = seed;
	return () => {
		state = (state * 1103515245 + 12345) & 0x7fffffff;
		return state / 0x7fffffff;
	};
}

const LEVEL_RANK: Record<string, number> = {
	A1: 0,
	A2: 1,
	B1: 2,
	B2: 3,
	C1: 4,
	C2: 5,
};

describe("runAdaptiveSession", () => {
	it("a perfect learner (always correct) climbs to C2", () => {
		const state = runAdaptiveSession(placementBank, () => true, seededRng(1));
		expect(state.finalLevel).toBe("C2");
	});

	it("a learner who always fails lands on A1", () => {
		const state = runAdaptiveSession(placementBank, () => false, seededRng(2));
		expect(state.finalLevel).toBe("A1");
	});

	it("a simulated B1 learner (correct up to B1, wrong above) lands on B1", () => {
		const answerFn = (item: PlacementItem) =>
			LEVEL_RANK[item.level] <= LEVEL_RANK.B1;
		const state = runAdaptiveSession(placementBank, answerFn, seededRng(3));
		expect(state.finalLevel).toBe("B1");
	});

	it("never repeats an item", () => {
		const state = runAdaptiveSession(placementBank, () => true, seededRng(4));
		const ids = state.answers.map((a) => a.itemId);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("terminates within the max item budget", () => {
		const state = runAdaptiveSession(placementBank, () => true, seededRng(5));
		expect(state.answers.length).toBeLessThanOrEqual(MAX_ITEMS);

		const failState = runAdaptiveSession(
			placementBank,
			() => false,
			seededRng(6),
		);
		expect(failState.answers.length).toBeLessThanOrEqual(MAX_ITEMS);
	});

	it("mixes skills instead of asking only one skill per level", () => {
		const state = runAdaptiveSession(placementBank, () => true, seededRng(7));
		const skillsAtA2 = state.answers
			.filter((a) => a.level === "A2")
			.map((a) => a.skill);
		expect(new Set(skillsAtA2).size).toBeGreaterThan(1);
	});
});
