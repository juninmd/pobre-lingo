import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TeacherpreneurshipWidget } from "./TeacherpreneurshipWidget";

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

describe("TeacherpreneurshipWidget", () => {
	it("renders the widget title and description correctly", () => {
		render(<TeacherpreneurshipWidget />);

		// Verify title is present
		expect(screen.getByText("Teacherpreneurship")).toBeInTheDocument();

		// Verify description is present
		expect(
			screen.getByText(
				"Explore estratégias para professores empreenderem no ensino de idiomas.",
			),
		).toBeInTheDocument();
	});
});
