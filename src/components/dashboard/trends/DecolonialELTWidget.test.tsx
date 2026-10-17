import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DecolonialELTWidget } from "./DecolonialELTWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("DecolonialELTWidget", () => {
	it("renders title and description", () => {
		render(<DecolonialELTWidget />);
		expect(
			screen.getByText("Decolonial ELT"),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Desconstrução de hierarquias e foco em vozes locais no ensino.",
			),
		).toBeInTheDocument();
	});
});
