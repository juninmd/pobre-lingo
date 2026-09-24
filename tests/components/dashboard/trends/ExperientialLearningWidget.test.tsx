import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ExperientialLearningWidget } from "@/components/dashboard/trends/ExperientialLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("ExperientialLearningWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<ExperientialLearningWidget />);
		expect(screen.getByText("Aprendizado Experiencial")).toBeInTheDocument();
		expect(screen.getByText("Aprenda fazendo: simule situações da vida real e reflita sobre a experiência.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Iniciar Simulação" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Iniciar Simulação" })).toBeInTheDocument();
		});
	});
});
