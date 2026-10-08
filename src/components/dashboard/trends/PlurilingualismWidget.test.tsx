import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlurilingualismWidget } from "./PlurilingualismWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: vi.fn(),
	}),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({
		notify: vi.fn(),
	}),
}));

describe("PlurilingualismWidget", () => {
	it("renders correctly", () => {
		render(<PlurilingualismWidget />);

		expect(screen.getByText("Plurilingualism")).toBeInTheDocument();
		expect(
			screen.getByText("Valorize e use todos os seus repertórios linguísticos."),
		).toBeInTheDocument();
	});
});
