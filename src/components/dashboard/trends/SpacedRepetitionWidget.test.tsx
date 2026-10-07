import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SpacedRepetitionWidget } from "./SpacedRepetitionWidget";

// Mock the context hooks
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

describe("SpacedRepetitionWidget", () => {
	it("renders the widget successfully", () => {
		render(<SpacedRepetitionWidget />);

		// Basic check to see if it renders without crashing
		const container = screen.getByRole("button").closest(".glass-card");
		expect(container).toBeInTheDocument();
	});
});
