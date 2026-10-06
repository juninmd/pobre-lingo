import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SocialMediaReelsWidget } from "@/components/dashboard/elt-trends/SocialMediaReelsWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("SocialMediaReelsWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<SocialMediaReelsWidget />);
		expect(screen.getByText("Reels & Nano-learning")).toBeInTheDocument();
	});
});
