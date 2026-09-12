import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PlurilingualismWidget } from "./PlurilingualismWidget";

const mockAddXp = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
}));

describe("PlurilingualismWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2024, 0, 1));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders correctly initially", () => {
		render(<PlurilingualismWidget />);
		expect(screen.getByText("Plurilinguismo")).toBeInTheDocument();
		expect(screen.getByText("TREND 2025")).toBeInTheDocument();
		expect(screen.getByText(/Refletir/i)).toBeInTheDocument();
	});

	it("simulates reflection and awards XP on click", () => {
		render(<PlurilingualismWidget />);

		const button = screen.getByText(/Refletir/i);
		fireEvent.click(button);

		// Button should show loading state
		expect(screen.getByText(/Refletindo.../i)).toBeInTheDocument();

		// Fast forward timer and wrap in act
		act(() => {
			vi.advanceTimersByTime(2000);
		});

		// Now it should show the tip and have awarded XP
		expect(mockAddXp).toHaveBeenCalledWith(15);
		expect(screen.getByText(/Reflexão Concluída!/i)).toBeInTheDocument();
	});

	it("does not allow multiple claims on the same day", () => {
		const todayStr = new Date(2024, 0, 1).toISOString().split("T")[0];
		localStorage.setItem("daily_pluri_claimed", todayStr);

		render(<PlurilingualismWidget />);

		expect(screen.getByText(/Reflexão Concluída!/i)).toBeInTheDocument();

		const claimedText = screen.getByText(/Reflexão Concluída!/i);
		fireEvent.click(claimedText); // clicking shouldn't award xp again

		expect(mockAddXp).not.toHaveBeenCalled();
	});
});
