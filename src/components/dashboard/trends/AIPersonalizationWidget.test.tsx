import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AIPersonalizationWidget } from "./AIPersonalizationWidget";

const mockAddXp = vi.fn();
const mockNotify = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: mockAddXp }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: mockNotify }),
}));

describe("AIPersonalizationWidget", () => {
	it("renders correctly", () => {
		render(<AIPersonalizationWidget />);
		expect(screen.getByText("AI Personalization")).toBeInTheDocument();
		expect(
			screen.getByText("Utilize IA para personalizar o aprendizado de cada aluno."),
		).toBeInTheDocument();
	});

	it("handles completion action", () => {
		render(<AIPersonalizationWidget />);
		const button = screen.getByRole("button", { name: "Praticar" });
		fireEvent.click(button);
		expect(mockAddXp).toHaveBeenCalledWith(20);
		expect(mockNotify).toHaveBeenCalledWith({
			title: "Prática Concluída!",
			body: "Você ganhou 20 XP.",
			category: "achievement",
		});
	});
});
