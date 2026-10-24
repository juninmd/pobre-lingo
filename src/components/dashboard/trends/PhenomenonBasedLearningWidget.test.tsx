import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { PhenomenonBasedLearningWidget } from "./PhenomenonBasedLearningWidget";

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

describe("PhenomenonBasedLearningWidget", () => {
	it("renders title and description", () => {
		vi.mocked(useGamification).mockReturnValue({
			addXp: vi.fn(),
		} as unknown as ReturnType<typeof useGamification>);
		vi.mocked(useNotifications).mockReturnValue({
			notify: vi.fn(),
		} as unknown as ReturnType<typeof useGamification>);

		render(<PhenomenonBasedLearningWidget />);

		expect(screen.getByText("Phenomenon-Based Learning")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Aprendizado baseado em fenômenos reais, focando em contextos multidisciplinares em vez de matérias isoladas.",
			),
		).toBeInTheDocument();
	});

	it("handles practice action", () => {
		const mockAddXp = vi.fn();
		const mockNotify = vi.fn();

		vi.mocked(useGamification).mockReturnValue({
			addXp: mockAddXp,
		} as unknown as ReturnType<typeof useGamification>);
		vi.mocked(useNotifications).mockReturnValue({
			notify: mockNotify,
		} as unknown as ReturnType<typeof useGamification>);

		render(<PhenomenonBasedLearningWidget />);

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
