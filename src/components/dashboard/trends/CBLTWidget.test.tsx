import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CBLTWidget } from "./CBLTWidget";

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

describe("CBLTWidget", () => {
	it("renders the widget title correctly", () => {
		render(<CBLTWidget />);
		expect(
			screen.getByText("Ensino Baseado em Competências"),
		).toBeInTheDocument();
	});

	it("renders the description correctly", () => {
		render(<CBLTWidget />);
		expect(
			screen.getByText(
				"Foco no que os alunos podem fazer com o idioma, focando em habilidades práticas e resultados mensuráveis.",
			),
		).toBeInTheDocument();
	});

	it("opens the dialog and shows content when clicked", () => {
		render(<CBLTWidget />);

		const card =
			screen
				.getByText("Ensino Baseado em Competências")
				.closest("div[role='button']") ||
			screen.getByText("Explorar Metodologia").closest("button");

		if (card) {
			fireEvent.click(card);
		}

		expect(screen.getByText(/O/)).toBeInTheDocument();
	});
});
