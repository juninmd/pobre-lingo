import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InquiryBasedLearningWidget } from "./InquiryBasedLearningWidget";

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

describe("InquiryBasedLearningWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2024, 0, 1)); // Jan 1st
	});

	it("renders the widget correctly", () => {
		render(<InquiryBasedLearningWidget />);
		expect(screen.getByText("Inquiry-Based Learning")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Seja curioso! Investigue e descubra como o idioma funciona.",
			),
		).toBeInTheDocument();
	});

	it("handles task completion and awards XP", () => {
		render(<InquiryBasedLearningWidget />);

		const button = screen.getByRole("button", {
			name: /Concluir Investigação \(\+\d+ XP\)/i,
		});
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalled();
		expect(
			screen.getByText("Investigação concluída com sucesso!"),
		).toBeInTheDocument();
	});

	it("remembers completed state from localStorage", () => {
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_inquiry_claimed", todayStr);

		render(<InquiryBasedLearningWidget />);

		expect(
			screen.getByText("Investigação concluída com sucesso!"),
		).toBeInTheDocument();
	});
});
