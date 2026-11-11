import { describe, expect, it } from "vitest";
import {
	canForm,
	classifyGuess,
	isWordWheelSave,
	nextHintTarget,
	shuffleOrder,
	wheelPositions,
} from "./logic";
import { WORD_WHEEL_PUZZLES } from "./puzzles";

describe("word wheel puzzles", () => {
	it.each(WORD_WHEEL_PUZZLES)("$id: every word fits the wheel", (p) => {
		for (const word of Object.keys(p.words)) {
			expect(canForm(word, p.letters), word).toBe(true);
			expect(word.length).toBeGreaterThanOrEqual(3);
		}
		expect(Object.keys(p.words)).toContain(p.letters.toLowerCase());
	});

	it("has unique ids", () => {
		const ids = WORD_WHEEL_PUZZLES.map((p) => p.id);
		expect(new Set(ids).size).toBe(ids.length);
	});
});

describe("canForm", () => {
	it("respects letter counts", () => {
		expect(canForm("tree", "TEACHER")).toBe(true);
		expect(canForm("teeth", "TEACHER")).toBe(false);
		expect(canForm("", "ABC")).toBe(false);
	});
});

describe("classifyGuess", () => {
	const base = {
		targets: ["heart", "hat"],
		found: ["hat"],
		bonusFound: [],
		bonusPool: new Set(["tar", "zoo"]),
		letters: "HEART",
	};
	it("classifies each case", () => {
		expect(classifyGuess("HEART", base)).toBe("found");
		expect(classifyGuess("hat", base)).toBe("repeat");
		expect(classifyGuess("tar", base)).toBe("bonus");
		expect(classifyGuess("zoo", base)).toBe("invalid");
		expect(classifyGuess("he", base)).toBe("short");
	});
});

describe("helpers", () => {
	it("shuffleOrder always changes the order", () => {
		const order = [0, 1, 2, 3];
		for (let i = 0; i < 20; i++) {
			const next = shuffleOrder(order);
			expect([...next].sort()).toEqual(order);
			expect(next).not.toEqual(order);
		}
	});

	it("wheelPositions starts at the top", () => {
		const [first] = wheelPositions(4);
		expect(first.x).toBeCloseTo(50);
		expect(first.y).toBeCloseTo(14);
	});

	it("nextHintTarget picks the shortest unfound word", () => {
		expect(nextHintTarget(["heart", "hat", "ear"], ["ear"])).toBe("hat");
	});

	it("validates saves", () => {
		expect(
			isWordWheelSave({
				level: 1,
				found: [],
				bonus: [],
				reveals: {},
				hintsUsed: 0,
			}),
		).toBe(true);
		expect(isWordWheelSave({ level: -1 })).toBe(false);
	});
});
