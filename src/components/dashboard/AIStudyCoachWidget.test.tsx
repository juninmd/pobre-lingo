import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AIStudyCoachWidget } from "./AIStudyCoachWidget";

const mockAddXp = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
}));

describe("AIStudyCoachWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders correctly initially", () => {
		render(<AIStudyCoachWidget />);
		expect(screen.getByText("AI Study Coach")).toBeInTheDocument();
		expect(screen.getByText(/Gerar Dica Diária/i)).toBeInTheDocument();
	});

	it("simulates analysis and awards XP on click", async () => {
		render(<AIStudyCoachWidget />);

		const button = screen.getByText(/Gerar Dica Diária/i);
		fireEvent.click(button);

		// Button should show loading state
		expect(screen.getByText(/Analisando Perfil/i)).toBeInTheDocument();

		// Fast forward timer and wrap in act
		act(() => {
			vi.advanceTimersByTime(1500);
		});

		// Now it should show the tip and have awarded XP
		expect(mockAddXp).toHaveBeenCalledWith(15);
		expect(screen.getByText(/Dica do Coach Lida!/i)).toBeInTheDocument();
	});

	it("does not allow multiple claims on the same day", () => {
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_ai_coach_claimed", todayStr);

		render(<AIStudyCoachWidget />);

		expect(screen.getByText(/Dica do Coach Lida!/i)).toBeInTheDocument();

		const claimedText = screen.getByText(/Dica do Coach Lida!/i);
		fireEvent.click(claimedText); // clicking shouldn't award xp again

		expect(mockAddXp).not.toHaveBeenCalled();
	});
});

vi.mock("@/contexts/NotificationContext", () => ({ useNotifications: () => ({ notify: vi.fn() }), NotificationProvider: ({ children }: any) => <>{children}</> }));
