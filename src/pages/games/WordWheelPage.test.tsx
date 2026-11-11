import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { STORAGE_KEY } from "@/lib/wordWheel/logic";
import WordWheelPage from "./WordWheelPage";

const mocks = vi.hoisted(() => ({
	addXp: vi.fn(),
	logActivity: vi.fn(),
	completeLesson: vi.fn(),
}));

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: mocks.addXp }),
}));
vi.mock("@/hooks/useActivityLog", () => ({
	useActivityLog: () => ({ logActivity: mocks.logActivity }),
}));
vi.mock("@/hooks/useCurriculumProgress", () => ({
	useCurriculumProgress: () => ({ completeLesson: mocks.completeLesson }),
}));
vi.mock("@/lib/confetti", () => ({ fireConfetti: vi.fn() }));
vi.mock("@/lib/tts", () => ({ tts: { speak: vi.fn() } }));
vi.mock("@/lib/dictionaryData", () => ({
	dictionaryEntries: [{ id: "d1", word: "tear", translation_pt: "rasgar" }],
}));

const type = (word: string) => {
	for (const ch of word) fireEvent.keyDown(window, { key: ch });
	fireEvent.keyDown(window, { key: "Enter" });
};

const renderPage = () =>
	render(
		<MemoryRouter>
			<WordWheelPage />
		</MemoryRouter>,
	);

describe("WordWheelPage", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	it("finds a word typed on the keyboard and awards XP", () => {
		renderPage();
		expect(
			screen.getByRole("heading", { name: "Roda de Palavras" }),
		).toBeVisible();
		act(() => type("tea"));
		expect(screen.getByText("TEA = chá")).toBeVisible();
		expect(screen.getByRole("listitem", { name: "tea: chá" })).toBeVisible();
		expect(mocks.addXp).toHaveBeenCalledWith(10);
		const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
		expect(saved.found).toEqual(["tea"]);
	});

	it("builds a word with the letter buttons and rejects unknown ones", () => {
		renderPage();
		for (const ch of "TWA")
			fireEvent.click(screen.getByRole("button", { name: `Letra ${ch}` }));
		fireEvent.click(screen.getByRole("button", { name: "Enviar TWA" }));
		expect(screen.getByText("TWA não está na roda")).toBeVisible();
		expect(mocks.addXp).not.toHaveBeenCalled();
	});

	it("reveals a letter with a hint", () => {
		renderPage();
		fireEvent.click(screen.getByRole("button", { name: /Dica \(3\)/ }));
		expect(screen.getByRole("button", { name: /Dica \(2\)/ })).toBeVisible();
	});

	it("completes the level and moves on", () => {
		renderPage();
		for (const w of [
			"art",
			"eat",
			"tea",
			"war",
			"rate",
			"tear",
			"wear",
			"water",
		])
			act(() => type(w));
		expect(
			screen.getByRole("heading", { name: "Roda completa!" }),
		).toBeVisible();
		expect(mocks.logActivity).toHaveBeenCalledTimes(1);
		fireEvent.click(screen.getByRole("button", { name: /Próximo nível/ }));
		expect(screen.getByText("Nível 2 · A1")).toBeVisible();
	});
});
