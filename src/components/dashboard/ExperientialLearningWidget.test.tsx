import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ExperientialLearningWidget } from "./ExperientialLearningWidget";

// Mock GamificationContext
const mockAddXp = vi.fn();
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
	GamificationProvider: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

describe("ExperientialLearningWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2024, 0, 1)); // Jan 1st
	});

	it("renders the widget correctly", () => {
		render(<ExperientialLearningWidget />);
		expect(screen.getByText("Experiential Learning")).toBeInTheDocument();
		expect(
			screen.getByText("Aprenda fazendo! Vivencie o idioma na prática."),
		).toBeInTheDocument();
	});

	it("handles task completion and awards XP", () => {
		render(<ExperientialLearningWidget />);

		const button = screen.getByRole("button", {
			name: /Concluir Experiência \(\+\d+ XP\)/i,
		});
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalled();
		expect(
			screen.getByText("Você completou a experiência de hoje!"),
		).toBeInTheDocument();
	});

	it("remembers completed state from localStorage", () => {
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_experiential_claimed", todayStr);

		render(<ExperientialLearningWidget />);

		expect(
			screen.getByText("Você completou a experiência de hoje!"),
		).toBeInTheDocument();
	});
});

vi.mock("@/contexts/NotificationContext", () => ({ useNotifications: () => ({ notify: vi.fn() }), NotificationProvider: ({ children }: any) => <>{children}</> }));
