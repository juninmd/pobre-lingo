import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PodcastingWidget } from "./PodcastingWidget";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";

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

describe("PodcastingWidget", () => {
	it("renders title and description", () => {
		vi.mocked(useGamification).mockReturnValue({ addXp: vi.fn() } as any);
		vi.mocked(useNotifications).mockReturnValue({ notify: vi.fn() } as any);

		render(<PodcastingWidget />);

		expect(screen.getByText("Podcasting & Audio Learning")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Uso de podcasts para melhorar a escuta, pronúncia e oferecer imersão cultural no idioma.",
			),
		).toBeInTheDocument();
	});

	it("handles practice action", () => {
		const mockAddXp = vi.fn();
		const mockNotify = vi.fn();

		vi.mocked(useGamification).mockReturnValue({ addXp: mockAddXp } as any);
		vi.mocked(useNotifications).mockReturnValue({ notify: mockNotify } as any);

		render(<PodcastingWidget />);

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
		expect(screen.getByRole("button", { name: "Concluído" })).toBeInTheDocument();
	});
});
