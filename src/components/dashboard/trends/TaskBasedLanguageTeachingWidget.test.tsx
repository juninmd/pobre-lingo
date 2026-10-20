import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TaskBasedLanguageTeachingWidget } from "./TaskBasedLanguageTeachingWidget";

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

describe("TaskBasedLanguageTeachingWidget", () => {
	it("renders the widget title correctly", () => {
		render(<TaskBasedLanguageTeachingWidget />);
		expect(screen.getByText("Ensino Baseado em Tarefas")).toBeInTheDocument();
	});

	it("renders the description correctly", () => {
		render(<TaskBasedLanguageTeachingWidget />);
		expect(
			screen.getByText(
				"Foco no uso da linguagem autêntica para concluir tarefas significativas, promovendo a fluência através da prática real.",
			),
		).toBeInTheDocument();
	});

	it("opens the dialog and shows content when clicked", () => {
		render(<TaskBasedLanguageTeachingWidget />);

		const card =
			screen
				.getByText("Ensino Baseado em Tarefas")
				.closest("div[role='button']") ||
			screen.getByText("Explorar Metodologia").closest("button");

		if (card) {
			fireEvent.click(card);
		}

		expect(screen.getByText(/O/)).toBeInTheDocument();
	});
});
