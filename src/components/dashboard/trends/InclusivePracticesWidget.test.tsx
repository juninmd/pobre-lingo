import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InclusivePracticesWidget } from "./InclusivePracticesWidget";

// Mock the context providers used by TrendWidget
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("InclusivePracticesWidget", () => {
	it("renders correctly", () => {
		render(<InclusivePracticesWidget />);
		expect(screen.getByText("Práticas Inclusivas")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Garanta que todos os alunos tenham acesso igualitário ao aprendizado, adaptando materiais e métodos para atender a diversas necessidades e estilos.",
			),
		).toBeInTheDocument();
	});
});
