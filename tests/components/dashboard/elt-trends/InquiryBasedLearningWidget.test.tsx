import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { InquiryBasedLearningWidget } from "@/components/dashboard/elt-trends/InquiryBasedLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("InquiryBasedLearningWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<InquiryBasedLearningWidget />);
		expect(screen.getByText("Inquiry-Based Learning")).toBeInTheDocument();
	});
});
