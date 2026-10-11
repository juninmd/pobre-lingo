import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TPRWidget } from "./TPRWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("TPRWidget", () => {
	it("renders title and description", () => {
		render(<TPRWidget />);
		expect(screen.getByText("Total Physical Response")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Aprenda inglês através de movimentos e coordenação motora.",
			),
		).toBeInTheDocument();
	});
});
