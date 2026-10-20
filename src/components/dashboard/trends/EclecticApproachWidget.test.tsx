import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EclecticApproachWidget } from "./EclecticApproachWidget";

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

describe("EclecticApproachWidget", () => {
	it("renders the widget title correctly", () => {
		render(<EclecticApproachWidget />);
		expect(screen.getByText("Abordagem Eclética")).toBeInTheDocument();
	});

	it("renders the description correctly", () => {
		render(<EclecticApproachWidget />);
		expect(
			screen.getByText(
				"Combinação de várias abordagens e metodologias para atender às diversas necessidades dos alunos.",
			),
		).toBeInTheDocument();
	});

	it("opens the dialog and shows content when clicked", () => {
		render(<EclecticApproachWidget />);

		const card =
			screen.getByText("Abordagem Eclética").closest("div[role='button']") ||
			screen.getByText("Explorar Metodologia").closest("button");

		if (card) {
			fireEvent.click(card);
		}

		expect(screen.getByText(/A abordagem/i)).toBeInTheDocument();
	});
});
