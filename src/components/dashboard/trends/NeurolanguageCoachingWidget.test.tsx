import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NeurolanguageCoachingWidget } from "./NeurolanguageCoachingWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("NeurolanguageCoachingWidget", () => {
	it("renders correctly", () => {
		render(<NeurolanguageCoachingWidget />);
		expect(screen.getByText("Neurolanguage Coaching")).toBeInTheDocument();
		expect(screen.getByText("Combina neurociência com coaching para otimizar o aprendizado.")).toBeInTheDocument();
	});
});
