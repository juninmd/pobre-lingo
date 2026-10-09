import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { press, tab } from "@/test/keyboard";
import BubblePopPage from "./BubblePopPage";

const mocks = vi.hoisted(() => ({
	completeLesson: vi.fn(),
	logActivity: vi.fn(),
	addXp: vi.fn(),
	addGem: vi.fn(),
}));

vi.mock("@/hooks/useCurriculumProgress", () => ({
	useCurriculumProgress: () => ({ completeLesson: mocks.completeLesson }),
}));
vi.mock("@/hooks/useActivityLog", () => ({
	useActivityLog: () => ({ logActivity: mocks.logActivity }),
}));
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: mocks.addXp, addGem: mocks.addGem }),
}));
vi.mock("@/components/curriculum/LessonCompleteModal", () => ({
	LessonCompleteModal: ({ isOpen }: { isOpen: boolean }) =>
		isOpen ? <p>Lição concluída</p> : null,
}));
vi.mock("@/lib/dictionaryData", () => ({
	getWordsByTopic: () => [],
	dictionaryEntries: Array.from({ length: 10 }, (_, i) => ({
		id: `w${i}`,
		word: `word${i}`,
		translation_pt: `palavra${i}`,
	})),
}));

const PAIRS = 6;

function pressBubble(name: string) {
	const bubble = screen.getByRole("button", { name });
	for (let i = 0; i < 40 && document.activeElement !== bubble; i++) tab();
	expect(bubble).toHaveFocus();
	press("Enter");
}

function startRound() {
	const start = screen.getByRole("button", { name: /Começar/ });
	for (let i = 0; i < 10 && document.activeElement !== start; i++) tab();
	press("Enter");
}

describe("BubblePopPage keyboard operation", () => {
	beforeEach(() => {
		vi.spyOn(Math, "random").mockReturnValue(0.5);
		// The drift animation is irrelevant here and would update state outside act.
		vi.spyOn(window, "requestAnimationFrame").mockReturnValue(0);
		for (const fn of Object.values(mocks)) fn.mockClear();
		render(
			<MemoryRouter initialEntries={["/?module=m1&lesson=l1"]}>
				<BubblePopPage />
			</MemoryRouter>,
		);
		startRound();
	});

	afterEach(() => vi.restoreAllMocks());

	it("marks the selected bubble as pressed", () => {
		pressBubble("word0");

		expect(screen.getByRole("button", { name: "word0" })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
		expect(screen.getByRole("button", { name: "palavra0" })).toHaveAttribute(
			"aria-pressed",
			"false",
		);
	});

	it("finishes the round once, with the keyboard alone", () => {
		for (let i = 0; i < PAIRS; i++) {
			pressBubble(`word${i}`);
			pressBubble(`palavra${i}`);
		}

		expect(screen.getByText("Lição concluída")).toBeInTheDocument();
		expect(mocks.logActivity).toHaveBeenCalledTimes(1);
		expect(mocks.completeLesson).toHaveBeenCalledTimes(1);
	});
});
