import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CLILWidget } from "./CLILWidget";

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

describe("CLILWidget", () => {
	it("renders the widget successfully", () => {
		render(<CLILWidget />);

		// Basic check to see if it renders without crashing
		const container = screen.getByRole("button").closest(".glass-card");
		expect(container).toBeInTheDocument();
	});
});
