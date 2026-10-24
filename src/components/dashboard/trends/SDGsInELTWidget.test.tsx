import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SDGsInELTWidget } from "./SDGsInELTWidget";

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

describe("SDGsInELTWidget", () => {
	it("renders correctly", () => {
		render(<SDGsInELTWidget />);
		expect(screen.getByText("SDGs in ELT")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Sustainable Development Goals integrados ao ensino de inglês.",
			),
		).toBeInTheDocument();
	});
});
