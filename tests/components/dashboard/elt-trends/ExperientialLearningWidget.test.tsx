import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ExperientialLearningWidget } from "@/components/dashboard/elt-trends/ExperientialLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("ExperientialLearningWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<ExperientialLearningWidget />);
		expect(screen.getByText("Aprendizado Experiencial")).toBeInTheDocument();
	});
});
