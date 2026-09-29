import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIPromptCraftingWidget } from "@/components/dashboard/elt-trends/AIPromptCraftingWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("AIPromptCraftingWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<AIPromptCraftingWidget />);
		expect(screen.getByText("Engenharia de Prompts")).toBeInTheDocument();
	});
});
