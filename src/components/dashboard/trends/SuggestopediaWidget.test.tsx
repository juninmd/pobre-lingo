import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SuggestopediaWidget } from "./SuggestopediaWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("SuggestopediaWidget", () => {
	it("renders title and description", () => {
		render(<SuggestopediaWidget />);
		expect(screen.getByText("Suggestopedia")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Aprendizado acelerado usando relaxamento e música.",
			),
		).toBeInTheDocument();
	});
});
