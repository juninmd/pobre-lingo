import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";
import { Zap } from "lucide-react";

const mockAddXp = vi.fn();
const mockNotify = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: mockAddXp })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: mockNotify })
}));

describe("TrendWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly and handles interaction", () => {
		render(
			<TrendWidget
				title="Test Trend"
				description="Test Description"
				icon={Zap}
				actionText="Start"
			/>
		);

		expect(screen.getByText("Test Trend")).toBeInTheDocument();
		expect(screen.getByText("Test Description")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Start" });
		fireEvent.click(button);

		expect(mockAddXp).toHaveBeenCalledWith(10);
		expect(mockNotify).toHaveBeenCalled();
		expect(screen.getByRole("button", { name: "Explorado ✓" })).toBeDisabled();
	});
});
