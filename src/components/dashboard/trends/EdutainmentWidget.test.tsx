import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EdutainmentWidget } from "./EdutainmentWidget";

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

describe("EdutainmentWidget", () => {
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
		render(<EdutainmentWidget />);
		expect(screen.getByText("Edutainment")).toBeInTheDocument();
		expect(screen.getByText(/Aprenda inglês combinando/i)).toBeInTheDocument();
	});

	it("handles practice action correctly", () => {
		render(<EdutainmentWidget />);

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
