import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { AIPersonalizationWidget } from "./AIPersonalizationWidget";

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

describe("AIPersonalizationWidget", () => {
	it("renders correctly", () => {
		render(<AIPersonalizationWidget />);
		expect(screen.getByText("AI Personalization")).toBeInTheDocument();
	});
});
