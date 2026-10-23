import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InvisibleLearningWidget } from "./InvisibleLearningWidget";

// Mock the context hooks
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("InvisibleLearningWidget", () => {
	it("renders the InvisibleLearningWidget component", () => {
		render(<InvisibleLearningWidget />);
		expect(screen.getByText("Aprendizagem Invisível")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Integração das aprendizagens informais e não formais que ocorrem fora da sala de aula.",
			),
		).toBeInTheDocument();
	});
});
