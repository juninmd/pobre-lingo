import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslanguagingWidget } from "./TranslanguagingWidget";

const mockAddXp = vi.fn();
const mockNotify = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: mockAddXp,
	}),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({
		notify: mockNotify,
	}),
}));

describe("TranslanguagingWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should render correctly", () => {
		render(<TranslanguagingWidget />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("should award XP and notify on click", () => {
		render(<TranslanguagingWidget />);
		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalled();
		expect(mockNotify).toHaveBeenCalledWith(
			expect.objectContaining({ category: "quest" }),
		);
	});

	it("should disable button after completion", () => {
		render(<TranslanguagingWidget />);
		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(button).toBeDisabled();
		expect(screen.getByText(/Concluído/i)).toBeInTheDocument();
	});
});
