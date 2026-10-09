import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MALLWidget } from "./MALLWidget";

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

describe("MALLWidget", () => {
	it("renders title and description", () => {
		render(<MALLWidget />);
		expect(
			screen.getByText("Mobile-Assisted Language Learning (MALL)"),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Aprenda inglês em qualquer lugar com micro-interações focadas em dispositivos móveis.",
			),
		).toBeInTheDocument();
	});
});
