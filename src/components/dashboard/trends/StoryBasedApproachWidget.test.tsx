import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StoryBasedApproachWidget } from "./StoryBasedApproachWidget";

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

describe("StoryBasedApproachWidget", () => {
	it("renders the widget title correctly", () => {
		render(<StoryBasedApproachWidget />);
		expect(
			screen.getByText("Abordagem Baseada em Histórias"),
		).toBeInTheDocument();
	});

	it("renders the description correctly", () => {
		render(<StoryBasedApproachWidget />);
		expect(
			screen.getByText(
				"Uso de narrativas e histórias como o veículo principal para o ensino de idiomas, contextualizando o vocabulário e a gramática.",
			),
		).toBeInTheDocument();
	});

	it("opens the dialog and shows content when clicked", () => {
		render(<StoryBasedApproachWidget />);

		const card =
			screen
				.getByText("Abordagem Baseada em Histórias")
				.closest("div[role='button']") ||
			screen.getByText("Explorar Metodologia").closest("button");

		if (card) {
			fireEvent.click(card);
		}

		expect(screen.getByText(/Através/)).toBeInTheDocument();
	});
});
