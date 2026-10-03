import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GreenELTWidget } from "./GreenELTWidget";

const mockAddXp = vi.fn();
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
}));

describe("GreenELTWidget", () => {
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
		render(<GreenELTWidget />);

		expect(screen.getByText("Green ELT")).toBeInTheDocument();
		expect(screen.getByText("Upcycling")).toBeInTheDocument(); // Index 1
		expect(
			screen.getByText(
				"Reusing discarded objects or material in such a way as to create a product of higher quality or value than the original.",
			),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				'"She upcycled an old door into a beautiful dining table."',
			),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Plantar Semente/i }),
		).toBeInTheDocument();
	});

	it("allows acknowledging the topic and awards XP", () => {
		render(<GreenELTWidget />);

		const button = screen.getByRole("button", { name: /Plantar Semente/i });
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalledWith(15);
		expect(
			screen.queryByRole("button", { name: /Plantar Semente/i }),
		).not.toBeInTheDocument();
		expect(screen.getByText("Aprendizado Verde! (+15 XP)")).toBeInTheDocument();
	});

	it("prevents multiple claims on the same day", () => {
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_greenelt_claimed", todayStr);

		render(<GreenELTWidget />);

		expect(
			screen.queryByRole("button", { name: /Plantar Semente/i }),
		).not.toBeInTheDocument();
		expect(screen.getByText("Aprendizado Verde! (+15 XP)")).toBeInTheDocument();
		expect(mockAddXp).not.toHaveBeenCalled();
	});
});

vi.mock("@/contexts/NotificationContext", () => ({ useNotifications: () => ({ notify: vi.fn() }), NotificationProvider: ({ children }: any) => <>{children}</> }));
