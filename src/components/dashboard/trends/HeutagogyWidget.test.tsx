import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeutagogyWidget } from "./HeutagogyWidget";

// Mock the context hooks
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("HeutagogyWidget", () => {
	it("renders the HeutagogyWidget component", () => {
		render(<HeutagogyWidget />);
		expect(
			screen.getByText("Heutagogia (Aprendizagem Autodeterminada)"),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Foco em alunos definindo seus próprios caminhos e objetivos de aprendizado.",
			),
		).toBeInTheDocument();
	});
});
