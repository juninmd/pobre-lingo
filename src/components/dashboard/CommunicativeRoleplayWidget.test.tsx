vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CommunicativeRoleplayWidget } from "./CommunicativeRoleplayWidget";

const mockAddXp = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
}));

describe("CommunicativeRoleplayWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders correctly initially", () => {
		render(<CommunicativeRoleplayWidget />);
		expect(screen.getByText("Roleplay Prático")).toBeInTheDocument();
		expect(screen.getByText(/Gravar Resposta/i)).toBeInTheDocument();
	});

	it("simulates recording and awards XP on click", async () => {
		render(<CommunicativeRoleplayWidget />);

		const button = screen.getByText(/Gravar Resposta/i);
		fireEvent.click(button);

		// Button should show recording state
		expect(screen.getByText(/Gravando resposta/i)).toBeInTheDocument();

		// Fast forward timer
		act(() => {
			vi.advanceTimersByTime(3000);
		});

		// Now it should show the tip and have awarded XP
		expect(mockAddXp).toHaveBeenCalledWith(20);
		expect(screen.getByText(/Prática Concluída/i)).toBeInTheDocument();
	});

	it("does not allow multiple claims on the same day", () => {
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_communicative_roleplay_claimed", todayStr);

		render(<CommunicativeRoleplayWidget />);

		expect(screen.getByText(/Prática Concluída/i)).toBeInTheDocument();

		const claimedText = screen.getByText(/Prática Concluída/i);
		fireEvent.click(claimedText); // clicking shouldn't award xp again

		expect(mockAddXp).not.toHaveBeenCalled();
	});
});
