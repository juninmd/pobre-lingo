import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { ActionOrientedApproachWidget } from "./ActionOrientedApproachWidget";

// Mock the hooks
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: vi.fn(),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: vi.fn(),
}));

// Mock localDay to have predictable tests
vi.mock("@/lib/localDay", () => ({
	localDay: () => "2024-01-01",
}));

describe("ActionOrientedApproachWidget", () => {
	it("renders title and description", () => {
		vi.mocked(useGamification).mockReturnValue({ addXp: vi.fn() } as any);
		vi.mocked(useNotifications).mockReturnValue({ notify: vi.fn() } as any);

		render(<ActionOrientedApproachWidget />);

		expect(screen.getByText("Action-Oriented Approach")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Foca no uso da língua para realizar ações específicas e resolver problemas no mundo real.",
			),
		).toBeInTheDocument();
	});

	it("handles practice action", () => {
		const mockAddXp = vi.fn();
		const mockNotify = vi.fn();

		vi.mocked(useGamification).mockReturnValue({ addXp: mockAddXp } as any);
		vi.mocked(useNotifications).mockReturnValue({ notify: mockNotify } as any);

		render(<ActionOrientedApproachWidget />);

		const button = screen.getByRole("button", { name: "Praticar" });
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalledWith(10);
		expect(mockNotify).toHaveBeenCalledWith(
			expect.objectContaining({
				title: "Prática Concluída!",
				category: "achievement",
			}),
		);
		expect(button).toBeDisabled();
		expect(
			screen.getByRole("button", { name: "Concluído" }),
		).toBeInTheDocument();
	});
});
