import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DEIBWidget } from "@/components/dashboard/trends/DEIBWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("DEIBWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<DEIBWidget />);
		expect(screen.getByText("DEIB no Inglês")).toBeInTheDocument();
		expect(screen.getByText("Diversidade, Equidade, Inclusão e Pertencimento na linguagem.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Estudar Inclusão" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Estudar Inclusão" })).toBeInTheDocument();
		});
	});
});
