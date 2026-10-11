import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AudioLingualWidget } from "./AudioLingualWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("AudioLingualWidget", () => {
	it("renders title and description", () => {
		render(<AudioLingualWidget />);
		expect(screen.getByText("Audio-Lingual Method")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Repetição de padrões e diálogos para formação de hábitos.",
			),
		).toBeInTheDocument();
	});
});
