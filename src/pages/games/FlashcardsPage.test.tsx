import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { press, tab } from "@/test/keyboard";
import FlashcardsPage from "./FlashcardsPage";

const mocks = vi.hoisted(() => ({
	addXp: vi.fn(),
	addStreak: vi.fn(),
	logActivity: vi.fn(),
	completeLesson: vi.fn(),
}));

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: mocks.addXp, addStreak: mocks.addStreak }),
}));
vi.mock("@/hooks/useActivityLog", () => ({
	useActivityLog: () => ({ logActivity: mocks.logActivity }),
}));
vi.mock("@/hooks/useCurriculumProgress", () => ({
	useCurriculumProgress: () => ({ completeLesson: mocks.completeLesson }),
}));
vi.mock("@/lib/confetti", () => ({ triggerConfetti: vi.fn() }));
vi.mock("@/lib/dictionaryData", () => ({
	dictionaryEntries: Array.from({ length: 12 }, (_, i) => ({
		id: `w${i}`,
		word: `word${i}`,
		translation_pt: `palavra${i}`,
		phonetic_transcription_en: "",
		meaning_en: `meaning${i}`,
		example_sentence_en: `example en ${i}`,
		example_sentence_pt: `exemplo pt ${i}`,
	})),
}));

const tabUntilFocused = (target: HTMLElement) => {
	for (let i = 0; i < 20 && document.activeElement !== target; i++) tab();
	expect(target).toHaveFocus();
};

describe("FlashcardsPage keyboard operation", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.spyOn(Math, "random").mockReturnValue(0.5); // keeps the deck order stable
		for (const fn of Object.values(mocks)) fn.mockClear();
		render(
			<MemoryRouter>
				<FlashcardsPage />
			</MemoryRouter>,
		);
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("flips the card with Enter and with Space", () => {
		const card = screen.getByRole("button", { name: /Inglês.*word0/ });
		tabUntilFocused(card);

		press("Enter");
		expect(screen.getByRole("button", { name: /Português.*palavra0/ })).toBe(
			card,
		);

		press(" ");
		expect(screen.getByRole("button", { name: /Inglês.*word0/ })).toBe(card);
	});

	it("only exposes the visible face to assistive technology", () => {
		const card = screen.getByRole("button", { name: /Inglês/ });

		expect(card).not.toHaveAccessibleName(expect.stringContaining("palavra0"));
	});

	it("advances to the next card after answering from the keyboard", () => {
		expect(screen.getByText("1 / 10")).toBeInTheDocument();

		tabUntilFocused(screen.getByRole("button", { name: /Já sei/ }));
		press("Enter");
		act(() => vi.advanceTimersByTime(200));

		expect(mocks.addXp).toHaveBeenCalledWith(10);
		expect(screen.getByText("2 / 10")).toBeInTheDocument();
	});
});
