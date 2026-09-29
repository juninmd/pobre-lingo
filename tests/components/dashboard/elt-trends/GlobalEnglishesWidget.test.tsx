import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GlobalEnglishesWidget } from "@/components/dashboard/elt-trends/GlobalEnglishesWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("GlobalEnglishesWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<GlobalEnglishesWidget />);
		expect(screen.getByText("Inglês Global (ELF)")).toBeInTheDocument();
	});
});
