import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MicrocredentialsWidget } from "./MicrocredentialsWidget";

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

describe("MicrocredentialsWidget", () => {
	it("renders the widget title correctly", () => {
		render(<MicrocredentialsWidget />);
		expect(screen.getByText("Microcredenciais em ELT")).toBeInTheDocument();
	});

	it("renders the description correctly", () => {
		render(<MicrocredentialsWidget />);
		expect(
			screen.getByText(
				"Certificações de curta duração focadas em habilidades específicas e tendências emergentes.",
			),
		).toBeInTheDocument();
	});

	it("opens the dialog and shows content when clicked", () => {
		render(<MicrocredentialsWidget />);

		const card = screen
			.getByText("Microcredenciais em ELT")
			.closest("div[role='button']");
		if (card) {
			fireEvent.click(card);
		}

		expect(
			screen.getByText(
				/As microcredenciais oferecem uma forma flexível e ágil para professores de inglês comprovarem novas competências e se manterem atualizados/,
			),
		).toBeInTheDocument();
	});
});
