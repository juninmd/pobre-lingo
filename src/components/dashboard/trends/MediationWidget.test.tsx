import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MediationWidget } from "./MediationWidget";

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

describe("MediationWidget", () => {
	it("renders the widget title and description correctly", () => {
		render(<MediationWidget />);

		// Verify title is present
		expect(
			screen.getByText("Language Mediation"),
		).toBeInTheDocument();

		// Verify description is present
		expect(
			screen.getByText(
				"Desenvolva habilidades de mediação linguística e resolução de problemas na comunicação.",
			),
		).toBeInTheDocument();
	});
});
