import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AILanguagePartnerWidget } from "./AILanguagePartnerWidget";

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

describe("AILanguagePartnerWidget", () => {
	it("renders the widget successfully", () => {
		render(<AILanguagePartnerWidget />);

		// Basic check to see if it renders without crashing
		const container = screen.getByRole("button").closest(".glass-card");
		expect(container).toBeInTheDocument();
	});
});
