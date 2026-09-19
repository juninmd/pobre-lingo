import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NeuroELTWidget } from "./NeuroELTWidget";

const mockAddXp = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
}));

describe("NeuroELTWidget", () => {
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
		render(<NeuroELTWidget />);
		expect(screen.getByText("Neuro ELT")).toBeInTheDocument();
		expect(screen.getByText("TREND 2025")).toBeInTheDocument();
		expect(screen.getByText(/Calibrar Foco/i)).toBeInTheDocument();
	});

	it("simulates calibration and awards XP on click", () => {
		render(<NeuroELTWidget />);

		const button = screen.getByText(/Calibrar Foco/i);
		fireEvent.click(button);

		// Button should show loading state
		expect(screen.getByText(/Calibrando Foco/i)).toBeInTheDocument();

		// Fast forward timer and wrap in act
		act(() => {
			vi.advanceTimersByTime(2000);
		});

		// Now it should show the tip and have awarded XP
		expect(mockAddXp).toHaveBeenCalledWith(15);
		expect(screen.getByText(/Mente Otimizada!/i)).toBeInTheDocument();
	});

	it("does not allow multiple claims on the same day", () => {
		const todayStr = new Date(2024, 0, 1).toISOString().split("T")[0];
		localStorage.setItem("daily_neuro_elt_claimed", todayStr);

		render(<NeuroELTWidget />);

		expect(screen.getByText(/Mente Otimizada!/i)).toBeInTheDocument();

		const claimedText = screen.getByText(/Mente Otimizada!/i);
		fireEvent.click(claimedText); // clicking shouldn't award xp again

		expect(mockAddXp).not.toHaveBeenCalled();
	});
});
