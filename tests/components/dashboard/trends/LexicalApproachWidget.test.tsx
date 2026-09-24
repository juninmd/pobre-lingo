import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LexicalApproachWidget } from "@/components/dashboard/trends/LexicalApproachWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("LexicalApproachWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<LexicalApproachWidget />);
		expect(screen.getByText("Abordagem Lexical (Chunks)")).toBeInTheDocument();
		expect(screen.getByText("Aprenda blocos de palavras (chunks) em vez de gramática isolada.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Praticar Chunks" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Praticar Chunks" })).toBeInTheDocument();
		});
	});
});
