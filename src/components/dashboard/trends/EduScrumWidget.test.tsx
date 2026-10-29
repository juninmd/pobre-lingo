import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EduScrumWidget } from "./EduScrumWidget";

// Mock the context hooks
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("EduScrumWidget", () => {
	it("renders the EduScrumWidget component", () => {
		render(<EduScrumWidget />);
		expect(
			screen.getByText("EduScrum & Metodologias Ágeis"),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Adaptação de frameworks ágeis para gerenciar a aprendizagem de idiomas de forma colaborativa.",
			),
		).toBeInTheDocument();
	});
});
