import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslanguagingWidget } from "./TranslanguagingWidget";

// Mock the context
const mockAddXp = vi.fn();
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
}));

describe("TranslanguagingWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
		// Mock Date to return a specific day for predictable topics
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2024, 0, 1)); // Jan 1, 2024 (day 1)
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders correctly with today's topic", () => {
		render(<TranslanguagingWidget />);

		expect(screen.getByText("Translanguaging")).toBeInTheDocument();
		// Day 1 maps to index 1 (Idioms Bridge) due to dayOfYear calculation
		expect(screen.getByText("Idioms Bridge")).toBeInTheDocument();
		expect(screen.getByText("Chutar o balde")).toBeInTheDocument();
		expect(screen.getByText("To throw in the towel")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Revelar Conexão/i }),
		).toBeInTheDocument();
	});

	it("allows acknowledging the connection and awards XP", () => {
		render(<TranslanguagingWidget />);

		const button = screen.getByRole("button", { name: /Revelar Conexão/i });
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalledWith(15);

		// The button should be gone and the explanation should be visible
		expect(
			screen.queryByRole("button", { name: /Revelar Conexão/i }),
		).not.toBeInTheDocument();
		expect(screen.getByText("Conexão Feita! (+15 XP)")).toBeInTheDocument();
		expect(
			screen.getByText(/Embora a tradução literal seja diferente/i),
		).toBeInTheDocument();

		// It should persist in localStorage
		const todayStr = new Date().toISOString().split("T")[0];
		expect(localStorage.getItem("daily_translanguaging_claimed")).toBe(
			todayStr,
		);
	});

	it("prevents multiple claims on the same day", () => {
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_translanguaging_claimed", todayStr);

		render(<TranslanguagingWidget />);

		// Should already be in the claimed state
		expect(
			screen.queryByRole("button", { name: /Revelar Conexão/i }),
		).not.toBeInTheDocument();
		expect(screen.getByText("Conexão Feita! (+15 XP)")).toBeInTheDocument();
		expect(mockAddXp).not.toHaveBeenCalled();
	});
});

vi.mock("@/contexts/NotificationContext", () => ({ useNotifications: () => ({ notify: vi.fn() }), NotificationProvider: ({ children }: any) => <>{children}</> }));
