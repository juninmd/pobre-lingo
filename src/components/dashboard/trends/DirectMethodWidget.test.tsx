import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DirectMethodWidget } from "./DirectMethodWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("DirectMethodWidget", () => {
	it("renders title and description", () => {
		render(<DirectMethodWidget />);
		expect(screen.getByText("Direct Method")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Aprenda a pensar em inglês sem o uso de tradução.",
			),
		).toBeInTheDocument();
	});
});
