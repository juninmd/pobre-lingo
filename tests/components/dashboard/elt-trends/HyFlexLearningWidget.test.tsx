import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { HyFlexLearningWidget } from "@/components/dashboard/elt-trends/HyFlexLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("HyFlexLearningWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<HyFlexLearningWidget />);
		expect(screen.getByText("Aprendizado HyFlex")).toBeInTheDocument();
	});
});
