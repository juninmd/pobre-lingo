import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GreenELTWidget } from "@/components/dashboard/trends/GreenELTWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("GreenELTWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<GreenELTWidget />);
		expect(screen.getByText("Green ELT")).toBeInTheDocument();
		expect(screen.getByText("Pratique inglês discutindo sustentabilidade e meio ambiente.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Aprender sobre Sustentabilidade" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Aprender sobre Sustentabilidade" })).toBeInTheDocument();
		});
	});
});
