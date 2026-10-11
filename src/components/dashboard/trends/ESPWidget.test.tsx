import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ESPWidget } from "./ESPWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("ESPWidget", () => {
	it("renders title and description", () => {
		render(<ESPWidget />);
		expect(screen.getByText("English for Specific Purposes")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Inglês focado em áreas profissionais e acadêmicas.",
			),
		).toBeInTheDocument();
	});
});
