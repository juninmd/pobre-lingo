import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MatchingPairsGame } from "./MatchingPairsGame";

const gamification = vi.hoisted(() => ({
	loseHeart: vi.fn(),
	addGem: vi.fn(),
	addStreak: vi.fn(),
}));

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => gamification,
}));
vi.mock("@/lib/confetti", () => ({ triggerConfetti: vi.fn() }));
vi.mock("@/lib/exerciseData", () => ({
	matchingPairsExercises: [
		{
			id: "t1",
			topic: "Test",
			difficulty: "easy",
			pairs: [
				{ id: "p1", word: "Hello", translation: "Olá" },
				{ id: "p2", word: "Water", translation: "Água" },
				{ id: "p3", word: "Bread", translation: "Pão" },
			],
		},
	],
}));

const PAIRS: Array<[string, string]> = [
	["Hello", "Olá"],
	["Water", "Água"],
	["Bread", "Pão"],
];
// Budget turns an endless re-initialization loop into a failure instead of a hang.
const RANDOM_BUDGET = 500;

let randomCalls = 0;

const boardOrder = () =>
	screen.getAllByRole("button").map((button) => button.textContent);
const card = (text: string) => screen.getByRole("button", { name: text });
const settle = (ms: number) => act(() => vi.advanceTimersByTime(ms));

function matchPair([word, translation]: [string, string]) {
	fireEvent.click(card(word));
	fireEvent.click(card(translation));
	settle(500);
}

describe("MatchingPairsGame", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		randomCalls = 0;
		vi.spyOn(Math, "random").mockImplementation(() => {
			randomCalls += 1;
			if (randomCalls > RANDOM_BUDGET) {
				throw new Error("board was re-initialized repeatedly");
			}
			return (randomCalls * 0.6180339887) % 1;
		});
		for (const fn of Object.values(gamification)) fn.mockClear();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("deals the board once, not on every render", () => {
		const { rerender } = render(<MatchingPairsGame onComplete={vi.fn()} />);
		const dealtOrder = boardOrder();
		const callsAfterDeal = randomCalls;

		rerender(<MatchingPairsGame onComplete={vi.fn()} />);
		fireEvent.click(card("Hello"));

		expect(boardOrder()).toEqual(dealtOrder);
		expect(randomCalls).toBe(callsAfterDeal);
	});

	it("keeps a selected card selected so the pair can be matched", () => {
		render(<MatchingPairsGame onComplete={vi.fn()} />);

		matchPair(PAIRS[0]);

		expect(card("Hello")).toBeDisabled();
		expect(card("Olá")).toBeDisabled();
		expect(card("Água")).toBeEnabled();
	});

	it("penalizes a wrong pair and lets the player try again", () => {
		render(<MatchingPairsGame onComplete={vi.fn()} />);

		fireEvent.click(card("Hello"));
		fireEvent.click(card("Água"));
		settle(500);
		expect(gamification.loseHeart).toHaveBeenCalledTimes(1);
		settle(1000);

		matchPair(PAIRS[0]);
		expect(card("Hello")).toBeDisabled();
	});

	it("rewards once on completion and deals a fresh board on play again", () => {
		const onComplete = vi.fn();
		render(<MatchingPairsGame onComplete={onComplete} />);

		for (const pair of PAIRS) matchPair(pair);

		expect(screen.getByText("Excelente!")).toBeInTheDocument();
		expect(gamification.addGem).toHaveBeenCalledTimes(1);
		expect(gamification.addGem).toHaveBeenCalledWith(10);

		fireEvent.click(screen.getByRole("button", { name: /Jogar Novamente/ }));

		expect(screen.queryByText("Excelente!")).not.toBeInTheDocument();
		const cards = screen.getAllByRole("button");
		expect(cards).toHaveLength(PAIRS.length * 2);
		for (const button of cards) expect(button).toBeEnabled();

		matchPair(PAIRS[0]);
		expect(card("Hello")).toBeDisabled();
	});
});
