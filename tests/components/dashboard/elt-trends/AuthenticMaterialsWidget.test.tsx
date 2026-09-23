import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthenticMaterialsWidget } from "@/components/dashboard/elt-trends/AuthenticMaterialsWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("AuthenticMaterialsWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<AuthenticMaterialsWidget />);
		expect(screen.getByText("Materiais Autênticos")).toBeInTheDocument();
	});
});
