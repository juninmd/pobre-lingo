import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EFLPedagogyWidget } from "./EFLPedagogyWidget";

// Mock the context providers used by TrendWidget
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

describe("EFLPedagogyWidget", () => {
	it("renders the widget title correctly", () => {
		render(<EFLPedagogyWidget />);
		expect(screen.getByText("EFL Pedagogy")).toBeInTheDocument();
	});

	it("renders the description correctly", () => {
		render(<EFLPedagogyWidget />);
		expect(
			screen.getByText(
				"Explorando os fundamentos do English as a Foreign Language e suas aplicações contemporâneas.",
			),
		).toBeInTheDocument();
	});

	it("opens the dialog and shows content when clicked", () => {
		render(<EFLPedagogyWidget />);

		const card = screen.getByText("EFL Pedagogy").closest("div[role='button']");
		if (card) {
			fireEvent.click(card);
		}

		expect(
			screen.getByText(/A pedagogia EFL continua a evoluir/),
		).toBeInTheDocument();
	});
});
