import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TBLTWidget } from "./TBLTWidget";

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

describe("TBLTWidget", () => {
	it("renders title and description", () => {
		render(<TBLTWidget />);
		expect(
			screen.getByText("Task-Based Language Teaching"),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Aprenda inglês focado na resolução de tarefas do mundo real.",
			),
		).toBeInTheDocument();
	});
});
