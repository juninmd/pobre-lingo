import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TranslanguagingWidget } from "@/components/dashboard/trends/TranslanguagingWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("TranslanguagingWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<TranslanguagingWidget />);
		expect(screen.getByText("Translanguaging")).toBeInTheDocument();
		expect(screen.getByText("Use seu português estrategicamente para construir pontes com o inglês.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Comparar Estruturas" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Comparar Estruturas" })).toBeInTheDocument();
		});
	});
});
