import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MindfulWidget } from "@/components/dashboard/trends/MindfulWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("MindfulWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<MindfulWidget />);
		expect(screen.getByText("Mindfulness & Inglês")).toBeInTheDocument();
		expect(screen.getByText("Afirmações positivas e relaxamento para reduzir a ansiedade ao falar.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Respirar e Falar" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Respirar e Falar" })).toBeInTheDocument();
		});
	});
});
