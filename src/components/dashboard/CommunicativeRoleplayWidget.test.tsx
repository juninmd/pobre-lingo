vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { localDay } from "@/lib/localDay";
import {
	EVENING_LOCAL_DAY,
	setupLocalEvening,
} from "@/test-utils/localEvening";
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
		const todayStr = localDay();
		localStorage.setItem("daily_communicative_roleplay_claimed", todayStr);

		render(<CommunicativeRoleplayWidget />);

		expect(screen.getByText(/Prática Concluída/i)).toBeInTheDocument();

		const claimedText = screen.getByText(/Prática Concluída/i);
		fireEvent.click(claimedText); // clicking shouldn't award xp again

		expect(mockAddXp).not.toHaveBeenCalled();
	});
});

describe("CommunicativeRoleplayWidget daily claim at local evening", () => {
	setupLocalEvening();
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
	});

	it("keeps a claim made earlier the same local day (UTC already rolled over)", () => {
		localStorage.setItem(
			"daily_communicative_roleplay_claimed",
			EVENING_LOCAL_DAY,
		);

		render(<CommunicativeRoleplayWidget />);

		expect(screen.getByText(/Prática Concluída/i)).toBeInTheDocument();
		expect(mockAddXp).not.toHaveBeenCalled();
	});

	it("records the claim under the local day so a reload cannot claim twice", () => {
		render(<CommunicativeRoleplayWidget />);

		fireEvent.click(screen.getByText(/Gravar Resposta/i));
		act(() => {
			vi.advanceTimersByTime(3000);
		});

		expect(mockAddXp).toHaveBeenCalledTimes(1);
		expect(localStorage.getItem("daily_communicative_roleplay_claimed")).toBe(
			EVENING_LOCAL_DAY,
		);
	});
});
