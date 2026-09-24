import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CriticalPedagogyWidget } from "@/components/dashboard/trends/CriticalPedagogyWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("CriticalPedagogyWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<CriticalPedagogyWidget />);
		expect(screen.getByText("Pedagogia Crítica")).toBeInTheDocument();
		expect(screen.getByText("Questione o papel do inglês no mundo e o poder por trás das palavras.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Refletir Criticamente" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Refletir Criticamente" })).toBeInTheDocument();
		});
	});
});
