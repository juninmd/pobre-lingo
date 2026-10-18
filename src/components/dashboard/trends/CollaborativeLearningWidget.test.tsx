import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CollaborativeLearningWidget } from "./CollaborativeLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("CollaborativeLearningWidget", () => {
	it("renders title and description", () => {
		render(<CollaborativeLearningWidget />);
		expect(screen.getByText("Collaborative Learning")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Trabalho em grupo e aprendizado mútuo entre os estudantes.",
			),
		).toBeInTheDocument();
	});
});
