import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AIEthicsWidget } from "./AIEthicsWidget";

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

describe("AIEthicsWidget", () => {
	it("renders the widget title correctly", () => {
		render(<AIEthicsWidget />);
		expect(screen.getByText("Ética em IA no ELT")).toBeInTheDocument();
	});

	it("renders the description correctly", () => {
		render(<AIEthicsWidget />);
		expect(
			screen.getByText(
				"Compreendendo o uso ético e responsável da Inteligência Artificial no ensino e aprendizagem de idiomas.",
			),
		).toBeInTheDocument();
	});

	it("opens the dialog and shows content when clicked", () => {
		render(<AIEthicsWidget />);

		const card = screen
			.getByText("Ética em IA no ELT")
			.closest("div[role='button']");
		if (card) {
			fireEvent.click(card);
		}

		expect(screen.getByText(/Com o rápido avanço da IA/)).toBeInTheDocument();
	});
});
