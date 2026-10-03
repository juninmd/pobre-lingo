import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEIBWidget } from "./DEIBWidget";

const mockAddXp = vi.fn();
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
}));

describe("DEIBWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2024, 0, 1)); // Jan 1, 2024
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders correctly with today's topic", () => {
		render(<DEIBWidget />);

		expect(screen.getByText("DEIB Focus")).toBeInTheDocument();
		expect(screen.getByText("Inclusive Greetings")).toBeInTheDocument(); // Index 1
		expect(
			screen.getByText("Avoiding gendered terms when addressing groups."),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Instead of saying 'Hey guys' or 'Ladies and gentlemen', try using more inclusive terms that encompass everyone.",
			),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Aprender e Incluir/i }),
		).toBeInTheDocument();
	});

	it("allows acknowledging the topic and awards XP", () => {
		render(<DEIBWidget />);

		const button = screen.getByRole("button", { name: /Aprender e Incluir/i });
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalledWith(15);
		expect(
			screen.queryByRole("button", { name: /Aprender e Incluir/i }),
		).not.toBeInTheDocument();
		expect(
			screen.getByText("Linguagem Inclusiva! (+15 XP)"),
		).toBeInTheDocument();
	});

	it("prevents multiple claims on the same day", () => {
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_deib_claimed", todayStr);

		render(<DEIBWidget />);

		expect(
			screen.queryByRole("button", { name: /Aprender e Incluir/i }),
		).not.toBeInTheDocument();
		expect(
			screen.getByText("Linguagem Inclusiva! (+15 XP)"),
		).toBeInTheDocument();
		expect(mockAddXp).not.toHaveBeenCalled();
	});
});

vi.mock("@/contexts/NotificationContext", () => ({ useNotifications: () => ({ notify: vi.fn() }), NotificationProvider: ({ children }: any) => <>{children}</> }));
