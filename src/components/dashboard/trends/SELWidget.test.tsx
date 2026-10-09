import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SELWidget } from "./SELWidget";

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

describe("SELWidget", () => {
	it("renders title and description", () => {
		render(<SELWidget />);
		expect(
			screen.getByText("Social Emotional Learning (SEL)"),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Integração de habilidades socioemocionais para reduzir a ansiedade no aprendizado de idiomas.",
			),
		).toBeInTheDocument();
	});
});
