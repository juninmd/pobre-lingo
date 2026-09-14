import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CriticalPedagogyWidget } from "./CriticalPedagogyWidget";

// Mock the gamification context completely to avoid provider issues
const mockAddXp = vi.fn();
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
	GamificationProvider: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

describe("CriticalPedagogyWidget", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2024, 0, 1)); // January 1st, 2024
		localStorage.clear();
		mockAddXp.mockClear();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders correctly with the daily topic", () => {
		render(<CriticalPedagogyWidget />);

		// The day of year calculation for Jan 1st is 1. The modulo math will pick an item.
		// Since the test focuses on rendering, we just ensure key elements exist.
		expect(screen.getByText("Critical Pedagogy")).toBeInTheDocument();
		expect(screen.getByText("Reflection:")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Refletir & Ganhar/i })).toBeInTheDocument();
	});

	it("awards XP and shows claimed state when button is clicked", () => {
		render(<CriticalPedagogyWidget />);

		const button = screen.getByRole("button", { name: /Refletir & Ganhar/i });
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalledWith(15);
		expect(screen.getByText(/Reflexão Completa!/i)).toBeInTheDocument();
		expect(button).not.toBeInTheDocument();
	});

	it("prevents multiple claims on the same day via localStorage", () => {
		// Simulate already claimed today
		const todayStr = new Date(2024, 0, 1).toISOString().split("T")[0];
		localStorage.setItem("daily_criticalpedagogy_claimed", todayStr);

		render(<CriticalPedagogyWidget />);

		expect(screen.getByText(/Reflexão Completa!/i)).toBeInTheDocument();
		expect(screen.queryByRole("button", { name: /Refletir & Ganhar/i })).not.toBeInTheDocument();

		// XP should not have been added automatically on render
		expect(mockAddXp).not.toHaveBeenCalled();
	});
});
