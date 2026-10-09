import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { upsertCard } from "@/lib/srs";
import { getCards, subscribeCards, updateCards } from "@/lib/srsStore";

const input = (id: string) => ({
	id,
	source: "dictionary" as const,
	front: id,
	back: id,
});

describe("srsStore", () => {
	beforeEach(() => localStorage.clear());
	afterEach(() => vi.restoreAllMocks());

	it("hands out the same snapshot until the stored cards change", () => {
		updateCards((cards) => upsertCard(cards, input("a")));
		const first = getCards();

		expect(getCards()).toBe(first);

		updateCards((cards) => upsertCard(cards, input("b")));
		expect(getCards()).not.toBe(first);
		expect(getCards().map((c) => c.id)).toEqual(["a", "b"]);
	});

	it("builds every update on what is stored now, not on a stale copy", () => {
		const stale = getCards();
		updateCards((cards) => upsertCard(cards, input("tab-1")));
		localStorage.setItem(
			"pobrelingo_srs_cards",
			JSON.stringify(upsertCard(getCards(), input("tab-2"))),
		);

		updateCards((cards) => upsertCard(cards, input("tab-3")));

		expect(stale).toEqual([]);
		expect(getCards().map((c) => c.id)).toEqual(["tab-1", "tab-2", "tab-3"]);
	});

	it("neither writes nor notifies when an update changes nothing", () => {
		const onChange = vi.fn();
		const unsubscribe = subscribeCards(onChange);
		const setItem = vi.spyOn(Storage.prototype, "setItem");

		updateCards((cards) => cards);

		expect(setItem).not.toHaveBeenCalled();
		expect(onChange).not.toHaveBeenCalled();
		unsubscribe();
	});

	it("does not announce an update that could not be saved", () => {
		vi.spyOn(console, "warn").mockImplementation(() => {});
		const onChange = vi.fn();
		subscribeCards(onChange);
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new DOMException("Full", "QuotaExceededError");
		});

		expect(() =>
			updateCards((cards) => upsertCard(cards, input("a"))),
		).not.toThrow();

		expect(onChange).not.toHaveBeenCalled();
		expect(getCards()).toEqual([]);
	});

	it("reads an empty queue when storage holds unparseable text", () => {
		localStorage.setItem("pobrelingo_srs_cards", "{oops");
		expect(getCards()).toEqual([]);
	});
});
