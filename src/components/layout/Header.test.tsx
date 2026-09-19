import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";

// Mock dependencies
vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ gems: 42, addXP: vi.fn() }),
	GamificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/contexts/ThemeContext", () => ({
	useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
}));

vi.mock("@/hooks/useCurriculumProgress", () => ({
	useCurriculumProgress: () => ({ userLevel: 5 }),
}));

vi.mock("@/components/ui/sidebar", () => ({
	SidebarTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/notifications/NotificationCenter", () => ({
	NotificationCenter: () => <div data-testid="notification-center">Notifications</div>,
}));

vi.mock("@/components/common/GlobalSearch", () => ({
	GlobalSearchTrigger: () => <button data-testid="search-trigger">Search</button>,
}));

describe("Header", () => {
	it("renders title, user level, and gems correctly", () => {
		const onSearchOpen = vi.fn();
		render(
			<BrowserRouter>
				<Header onSearchOpen={onSearchOpen} />
			</BrowserRouter>
		);

		// The title falls back to "PobreLingo" if the path doesn't match an item in allNavItems
		expect(screen.getAllByText("PobreLingo").length).toBeGreaterThan(0);

		// Gamification stats
		expect(screen.getByText("Nvl 5")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument(); // Pobrecoins

		// Notification center mock
		expect(screen.getByTestId("notification-center")).toBeInTheDocument();

		// Global search mock
		expect(screen.getByTestId("search-trigger")).toBeInTheDocument();
	});
});
