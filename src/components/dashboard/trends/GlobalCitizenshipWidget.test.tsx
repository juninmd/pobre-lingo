import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GlobalCitizenshipWidget } from "./GlobalCitizenshipWidget";

// Mock the context providers used by TrendWidget
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("GlobalCitizenshipWidget", () => {
	it("renders correctly", () => {
		render(<GlobalCitizenshipWidget />);
		expect(screen.getByText("Global Citizenship")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Desenvolva uma consciência global através de aulas focadas em cidadania global, preparando os alunos para interagirem em um mundo multicultural e interconectado.",
			),
		).toBeInTheDocument();
	});
});
