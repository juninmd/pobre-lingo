import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AILanguagePartnerWidget } from "@/components/dashboard/elt-trends/AILanguagePartnerWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("AILanguagePartnerWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<AILanguagePartnerWidget />);
		expect(screen.getByText("IA Parceira de Idiomas")).toBeInTheDocument();
	});
});
