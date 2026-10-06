import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CLILWidget } from "@/components/dashboard/elt-trends/CLILWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() })
}));

describe("CLILWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<CLILWidget />);
		expect(screen.getByText("CLIL")).toBeInTheDocument();
	});
});
