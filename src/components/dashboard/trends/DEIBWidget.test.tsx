import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEIBWidget } from "./DEIBWidget";

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

describe("DEIBWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should render correctly", () => {
		render(<DEIBWidget />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("should award XP and notify on click", () => {
		render(<DEIBWidget />);
		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalled();
		expect(mockNotify).toHaveBeenCalledWith(
			expect.objectContaining({ category: "achievement" }),
		);
	});

	it("should disable button after completion", () => {
		render(<DEIBWidget />);
		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(button).toBeDisabled();
		expect(screen.getByText(/Concluído/i)).toBeInTheDocument();
	});
});
