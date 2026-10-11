import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BlendedLearningWidget } from "./BlendedLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("BlendedLearningWidget", () => {
	it("renders title and description", () => {
		render(<BlendedLearningWidget />);
		expect(screen.getByText("Blended Learning")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Integração de ensino presencial e digital de forma híbrida.",
			),
		).toBeInTheDocument();
	});
});
