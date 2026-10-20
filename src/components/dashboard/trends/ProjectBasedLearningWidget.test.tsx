import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectBasedLearningWidget } from "./ProjectBasedLearningWidget";

// Mock the context providers used by TrendWidget
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: vi.fn(),
	}),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({
		notify: vi.fn(),
	}),
}));

describe("ProjectBasedLearningWidget", () => {
	it("renders the widget title correctly", () => {
		render(<ProjectBasedLearningWidget />);
		expect(
			screen.getByText("Aprendizagem Baseada em Projetos"),
		).toBeInTheDocument();
	});

	it("renders the description correctly", () => {
		render(<ProjectBasedLearningWidget />);
		expect(
			screen.getByText(
				"Alunos adquirem conhecimento e habilidades trabalhando por um longo período para investigar e responder a um desafio ou problema complexo.",
			),
		).toBeInTheDocument();
	});

	it("opens the dialog and shows content when clicked", () => {
		render(<ProjectBasedLearningWidget />);

		const card =
			screen
				.getByText("Aprendizagem Baseada em Projetos")
				.closest("div[role='button']") ||
			screen.getByText("Explorar Metodologia").closest("button");

		if (card) {
			fireEvent.click(card);
		}

		expect(screen.getByText(/A Aprendizagem/i)).toBeInTheDocument();
	});
});
