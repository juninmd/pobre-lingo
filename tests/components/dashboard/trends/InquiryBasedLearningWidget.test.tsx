import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InquiryBasedLearningWidget } from "@/components/dashboard/trends/InquiryBasedLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("InquiryBasedLearningWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<InquiryBasedLearningWidget />);
		expect(screen.getByText("Inquiry-Based Learning")).toBeInTheDocument();
		expect(screen.getByText("Faça perguntas, pesquise e descubra a língua inglesa de forma investigativa.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Investigar" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Investigar" })).toBeInTheDocument();
		});
	});
});
