import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AIPromptCraftingWidget } from "@/components/dashboard/trends/AIPromptCraftingWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("AIPromptCraftingWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<AIPromptCraftingWidget />);
		expect(screen.getByText("Engenharia de Prompts (IA)")).toBeInTheDocument();
		expect(screen.getByText("Aprenda a interagir com IAs em inglês para turbinar seus estudos.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Praticar Prompts" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Praticar Prompts" })).toBeInTheDocument();
		});
	});
});
