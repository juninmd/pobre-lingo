import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VisualThinkingWidget } from "./VisualThinkingWidget";

const mockAddXp = vi.fn();
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
}));

const mockNotify = vi.fn();
vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({
		notify: mockNotify,
	}),
}));

describe("VisualThinkingWidget", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2024, 0, 1));
		localStorage.clear();
		mockAddXp.mockClear();
		mockNotify.mockClear();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders title and description", () => {
		render(<VisualThinkingWidget />);
		expect(
			screen.getByText("Sketchnoting & Visual Thinking"),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Use desenhos simples e mapas visuais/i),
		).toBeInTheDocument();
	});

	it("handles practice action correctly", () => {
		render(<VisualThinkingWidget />);

		const button = screen.getByRole("button", { name: /praticar/i });
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalledWith(15);
		expect(mockNotify).toHaveBeenCalledWith(
			expect.objectContaining({
				category: "achievement",
			}),
		);
		expect(screen.getByRole("button")).toHaveTextContent(/concluído/i);
		expect(screen.getByRole("button")).toBeDisabled();
	});
});
