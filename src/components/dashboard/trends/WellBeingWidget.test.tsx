import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WellBeingWidget } from "./WellBeingWidget";

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

describe("WellBeingWidget", () => {
	it("renders the widget title and description correctly", () => {
		render(<WellBeingWidget />);

		// Verify title is present
		expect(screen.getByText("Well-Being in ELT")).toBeInTheDocument();

		// Verify description is present
		expect(
			screen.getByText(
				"Foque no bem-estar emocional de alunos e professores no processo de aprendizado.",
			),
		).toBeInTheDocument();
	});
});
