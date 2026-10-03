import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SpacedRepetitionWidget } from "./SpacedRepetitionWidget";

// Mock the gamification context
const mockAddXp = vi.fn();
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
	GamificationProvider: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

describe("SpacedRepetitionWidget", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		mockAddXp.mockClear();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders the widget correctly", () => {
		render(<SpacedRepetitionWidget />);

		expect(screen.getByText("Repetição Espaçada (SRS)")).toBeInTheDocument();
		expect(screen.getByText("TREND 2025")).toBeInTheDocument();
		expect(screen.getByText("Hoje: 15 Cards")).toBeInTheDocument();
		expect(screen.getByText("Iniciar Revisão")).toBeInTheDocument();
	});

	it("handles the review process and awards XP", () => {
		render(<SpacedRepetitionWidget />);

		const button = screen.getByRole("button", { name: /Iniciar Revisão/i });

		fireEvent.click(button);

		// Button should show loading state
		expect(screen.getByText("Revisando...")).toBeInTheDocument();
		expect(button).toBeDisabled();

		// Advance timers by 2 seconds to complete the review
		act(() => {
			vi.advanceTimersByTime(2000);
		});

		// Button should show completed state
		expect(screen.getByText("Concluído (+15 XP)")).toBeInTheDocument();
		expect(button).toBeDisabled();

		// Verify XP was awarded
		expect(mockAddXp).toHaveBeenCalledWith(15);
		expect(mockAddXp).toHaveBeenCalledTimes(1);
	});

	it("prevents multiple XP awards for the same session", () => {
		render(<SpacedRepetitionWidget />);

		const button = screen.getByRole("button", { name: /Iniciar Revisão/i });

		fireEvent.click(button);

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(mockAddXp).toHaveBeenCalledTimes(1);

		// Button is disabled, but if we somehow force a click (e.g. if disabled state failed)
		fireEvent.click(button);

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		// XP should still only be awarded once
		expect(mockAddXp).toHaveBeenCalledTimes(1);
	});
});

vi.mock("@/contexts/NotificationContext", () => ({ useNotifications: () => ({ notify: vi.fn() }), NotificationProvider: ({ children }: any) => <>{children}</> }));
