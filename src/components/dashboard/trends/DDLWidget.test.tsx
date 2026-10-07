import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DDLWidget } from "./DDLWidget";

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

describe("DDLWidget", () => {
	it("renders the widget successfully", () => {
		render(<DDLWidget />);

		// Basic check to see if it renders without crashing
		const container = screen.getByRole("button").closest(".glass-card");
		expect(container).toBeInTheDocument();
	});
});
