import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LexicalApproachWidget } from "@/components/dashboard/elt-trends/LexicalApproachWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("LexicalApproachWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<LexicalApproachWidget />);
		expect(screen.getByText("Abordagem Lexical")).toBeInTheDocument();
	});
});
