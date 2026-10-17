import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EMIWidget } from "./EMIWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("EMIWidget", () => {
	it("renders title and description", () => {
		render(<EMIWidget />);
		expect(
			screen.getByText("EMI (English Medium Instruction)"),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Ensino de disciplinas acadêmicas usando a língua inglesa.",
			),
		).toBeInTheDocument();
	});
});
