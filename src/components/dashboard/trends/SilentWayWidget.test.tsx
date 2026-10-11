import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SilentWayWidget } from "./SilentWayWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("SilentWayWidget", () => {
	it("renders title and description", () => {
		render(<SilentWayWidget />);
		expect(screen.getByText("The Silent Way")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Descoberta autônoma guiada com mínima intervenção direta.",
			),
		).toBeInTheDocument();
	});
});
