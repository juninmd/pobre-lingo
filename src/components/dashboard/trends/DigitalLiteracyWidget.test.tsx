import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DigitalLiteracyWidget } from "./DigitalLiteracyWidget";

const mockAddXp = vi.fn();
const mockNotify = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: mockAddXp }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: mockNotify }),
}));

describe("DigitalLiteracyWidget", () => {
	it("renders correctly", () => {
		render(<DigitalLiteracyWidget />);
		expect(screen.getByText("Digital & Media Literacy")).toBeInTheDocument();
		expect(
			screen.getByText("Desenvolva letramento digital e midiático em língua inglesa."),
		).toBeInTheDocument();
	});

	it("handles completion action", () => {
		render(<DigitalLiteracyWidget />);
		const button = screen.getByRole("button", { name: "Praticar" });
		fireEvent.click(button);
		expect(mockAddXp).toHaveBeenCalledWith(20);
		expect(mockNotify).toHaveBeenCalledWith({
			title: "Prática Concluída!",
			body: "Você ganhou 20 XP.",
			category: "achievement",
		});
	});
});
