import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ICCWidget } from "./ICCWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("ICCWidget", () => {
	it("renders title and description", () => {
		render(<ICCWidget />);
		expect(
			screen.getByText("Intercultural Competence"),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Desenvolvimento de habilidades para comunicação intercultural efetiva.",
			),
		).toBeInTheDocument();
	});
});
