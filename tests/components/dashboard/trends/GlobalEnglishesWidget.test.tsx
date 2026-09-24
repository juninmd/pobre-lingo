import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GlobalEnglishesWidget } from "@/components/dashboard/trends/GlobalEnglishesWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("GlobalEnglishesWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<GlobalEnglishesWidget />);
		expect(screen.getByText("Global Englishes (ELF)")).toBeInTheDocument();
		expect(screen.getByText("Prepare-se para ouvir sotaques do mundo todo, não apenas de nativos.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Treinar Ouvidos" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Treinar Ouvidos" })).toBeInTheDocument();
		});
	});
});
