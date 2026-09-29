import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CriticalPedagogyWidget } from "@/components/dashboard/elt-trends/CriticalPedagogyWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("CriticalPedagogyWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<CriticalPedagogyWidget />);
		expect(screen.getByText("Pedagogia Crítica")).toBeInTheDocument();
	});
});
