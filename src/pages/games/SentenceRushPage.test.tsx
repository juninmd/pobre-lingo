import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SentenceRushPage from "./SentenceRushPage";

const mocks = vi.hoisted(() => ({
	logActivity: vi.fn(),
	completeLesson: vi.fn(),
	toast: vi.fn(),
}));

vi.mock("@/hooks/use-toast", () => ({
	useToast: () => ({ toast: mocks.toast }),
}));
vi.mock("@/hooks/useActivityLog", () => ({
	useActivityLog: () => ({ logActivity: mocks.logActivity }),
}));
vi.mock("@/hooks/useCurriculumProgress", () => ({
	useCurriculumProgress: () => ({ completeLesson: mocks.completeLesson }),
}));
vi.mock("@/lib/confetti", () => ({ fireConfetti: vi.fn() }));
vi.mock("@/lib/exerciseData", () => ({
	sentenceOrderingExercises: [
		{
			id: "s1",
			correctSentence: "I like green tea",
			words: ["I", "like", "green", "tea"],
		},
	],
}));

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));

describe("SentenceRushPage countdown", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		for (const fn of Object.values(mocks)) fn.mockClear();
		render(
			<MemoryRouter>
				<SentenceRushPage />
			</MemoryRouter>,
		);
		fireEvent.click(screen.getByRole("button", { name: /Começar Agora/ }));
	});

	afterEach(() => vi.useRealTimers());

	it("keeps counting down while the player is busy moving words", () => {
		// Each move re-renders the page; the clock must not restart on every render.
		for (let i = 0; i < 4; i++) {
			fireEvent.click(screen.getByRole("button", { name: "like" }));
			advance(400);
			fireEvent.click(screen.getByRole("button", { name: "like" }));
			advance(400);
		}

		expect(screen.getByText("57s")).toBeInTheDocument();
	});

	it("ends the game once when the time runs out", () => {
		advance(60_000);

		expect(screen.getByText("Fim de Jogo!")).toBeInTheDocument();
		expect(mocks.logActivity).toHaveBeenCalledTimes(1);
	});
});
