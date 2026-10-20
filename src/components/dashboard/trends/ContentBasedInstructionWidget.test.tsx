import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContentBasedInstructionWidget } from "./ContentBasedInstructionWidget";

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

describe("ContentBasedInstructionWidget", () => {
	it("renders the widget title correctly", () => {
		render(<ContentBasedInstructionWidget />);
		expect(
			screen.getByText("Instrução Baseada em Conteúdo"),
		).toBeInTheDocument();
	});

	it("renders the description correctly", () => {
		render(<ContentBasedInstructionWidget />);
		expect(
			screen.getByText(
				"Ensino de idioma através do estudo de um assunto acadêmico, onde a língua é o meio de aprender o conteúdo.",
			),
		).toBeInTheDocument();
	});

	it("opens the dialog and shows content when clicked", () => {
		render(<ContentBasedInstructionWidget />);

		const card =
			screen
				.getByText("Instrução Baseada em Conteúdo")
				.closest("div[role='button']") ||
			screen.getByText("Explorar Metodologia").closest("button");

		if (card) {
			fireEvent.click(card);
		}

		expect(screen.getByText(/Na/)).toBeInTheDocument();
	});
});
