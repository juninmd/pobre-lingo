import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DogmeELTWidget } from "@/components/dashboard/trends/DogmeELTWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("DogmeELTWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<DogmeELTWidget />);
		expect(screen.getByText("Dogme ELT")).toBeInTheDocument();
		expect(screen.getByText("Foco na conversação emergente, sem depender de materiais didáticos pesados.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Conversar Livremente" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Conversar Livremente" })).toBeInTheDocument();
		});
	});
});
