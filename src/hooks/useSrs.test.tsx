import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSrs } from "@/hooks/useSrs";
import type { NewCardInput } from "@/lib/srs";

const CARDS_KEY = "pobrelingo_srs_cards";

const word = (id: string): NewCardInput => ({
	id,
	source: "dictionary",
	front: id,
	back: `${id}-pt`,
});

const storedCard = (id: string) => ({
	...word(id),
	repetitions: 0,
	easeFactor: 2.5,
	intervalDays: 0,
	dueAt: "2026-01-01T00:00:00.000Z",
	lapses: 0,
	createdAt: "2026-01-01T00:00:00.000Z",
});

const storedIds = (): string[] =>
	JSON.parse(localStorage.getItem(CARDS_KEY) ?? "[]").map(
		(card: { id: string }) => card.id,
	);

describe("useSrs shared store", () => {
	beforeEach(() => localStorage.clear());

	it("keeps words saved from different paragraphs instead of overwriting them", () => {
		const { result } = renderHook(() => [useSrs(), useSrs()]);

		act(() => result.current[0].addCard(word("lib-x")));
		act(() => result.current[1].addCard(word("lib-y")));

		expect(storedIds()).toEqual(["lib-x", "lib-y"]);
		for (const hook of result.current) {
			expect(hook.cards.map((card) => card.id)).toEqual(["lib-x", "lib-y"]);
		}
	});

	it("keeps every hook's due badge in sync after one of them grades a card", () => {
		const { result } = renderHook(() => [useSrs(), useSrs()]);
		act(() => result.current[0].addCard(word("lib-x")));
		expect(result.current[1].stats.due).toBe(1);

		act(() => result.current[0].removeCard("lib-x"));

		expect(result.current[1].stats.total).toBe(0);
		expect(storedIds()).toEqual([]);
	});

	it("picks up cards written by another tab", () => {
		const { result } = renderHook(() => useSrs());
		localStorage.setItem(CARDS_KEY, JSON.stringify([storedCard("from-tab-2")]));

		act(() => {
			window.dispatchEvent(new StorageEvent("storage", { key: CARDS_KEY }));
		});

		expect(result.current.cards.map((card) => card.id)).toEqual(["from-tab-2"]);
	});

	it("imports legacy wrong answers once", () => {
		localStorage.setItem(
			"pobrelingo_wrong_answers",
			JSON.stringify([
				{
					id: "q1",
					exerciseType: "quiz",
					question: "cat?",
					correctAnswer: "gato",
					wrongCount: 1,
					lastWrongAt: "2026-01-01T00:00:00.000Z",
				},
			]),
		);

		const first = renderHook(() => useSrs());
		expect(first.result.current.cards.map((c) => c.id)).toEqual(["q1"]);
		act(() => first.result.current.removeCard("q1"));

		const second = renderHook(() => useSrs());
		expect(second.result.current.cards).toEqual([]);
	});

	it("survives a corrupt legacy list and a corrupt card without bricking the screen", () => {
		vi.spyOn(console, "warn").mockImplementation(() => {});
		localStorage.setItem("pobrelingo_wrong_answers", '"not-a-list"');
		localStorage.setItem(
			CARDS_KEY,
			JSON.stringify([
				{
					id: "bad",
					source: "quiz",
					front: "a",
					back: "b",
					repetitions: 1,
					easeFactor: 2.5,
					intervalDays: 3,
					dueAt: "not-a-date",
					lapses: 0,
					createdAt: "2026-01-01T00:00:00.000Z",
				},
			]),
		);

		const { result } = renderHook(() => useSrs());
		act(() => result.current.addCard(word("good")));

		expect(result.current.cards.map((card) => card.id)).toEqual(["good"]);
		act(() => result.current.gradeCard("good", 4));
		expect(result.current.cards[0].repetitions).toBe(1);
	});
});
