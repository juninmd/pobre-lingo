import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NeuroELTWidget } from "./NeuroELTWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: vi.fn(),
	}),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({
		notify: vi.fn(),
	}),
}));

describe("NeuroELTWidget", () => {
	it("renders correctly", () => {
		render(<NeuroELTWidget />);

		expect(screen.getByText("NeuroELT")).toBeInTheDocument();
		expect(
			screen.getByText("Ensino baseado em neurociência para otimizar aprendizado."),
		).toBeInTheDocument();
	});
});
