import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CLTWidget } from "./CLTWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("CLTWidget", () => {
	it("renders title and description", () => {
		render(<CLTWidget />);
		expect(screen.getByText("Communicative Language Teaching")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Foco na comunicação real e interação em situações práticas.",
			),
		).toBeInTheDocument();
	});
});
