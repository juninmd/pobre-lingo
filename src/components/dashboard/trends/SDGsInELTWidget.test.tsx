import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SDGsInELTWidget } from "./SDGsInELTWidget";

const mockAddXp = vi.fn();
const mockNotify = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: mockAddXp }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: mockNotify }),
}));

describe("SDGsInELTWidget", () => {
	it("renders correctly", () => {
		render(<SDGsInELTWidget />);
		expect(screen.getByText("SDGs in ELT")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Integre os Objetivos de Desenvolvimento Sustentável da ONU ao ensino de inglês.",
			),
		).toBeInTheDocument();
	});

	it("handles completion action", () => {
		render(<SDGsInELTWidget />);
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
