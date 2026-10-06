import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DEIBWidget } from "@/components/dashboard/elt-trends/DEIBWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("DEIBWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<DEIBWidget />);
		expect(screen.getByText("Diversidade e Inclusão")).toBeInTheDocument();
	});
});
