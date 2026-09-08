import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ProjectBasedLearningWidget } from "./ProjectBasedLearningWidget";

describe("ProjectBasedLearningWidget", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders correctly and allows submission", async () => {
		render(
			<NotificationProvider>
				<GamificationProvider>
					<ProjectBasedLearningWidget />
				</GamificationProvider>
			</NotificationProvider>,
		);

		expect(screen.getByText("Project-Based Learning")).toBeInTheDocument();
		expect(screen.getByText("Pitch de Startup")).toBeInTheDocument();
		expect(screen.getByText("Entregar Etapa (+40 XP)")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Entregar Etapa (+40 XP)"));

		expect(screen.getByText("Trabalhando...")).toBeInTheDocument();

		await act(async () => {
			vi.advanceTimersByTime(1500);
		});

		await waitFor(() => {
			expect(screen.getByText("Entregue!")).toBeInTheDocument();
		});

		const todayStr = new Date().toISOString().split("T")[0];
		expect(localStorage.getItem("daily_pbl_claimed")).toBe(todayStr);
	});

	it("restores claimed state from localStorage", () => {
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_pbl_claimed", todayStr);

		render(
			<NotificationProvider>
				<GamificationProvider>
					<ProjectBasedLearningWidget />
				</GamificationProvider>
			</NotificationProvider>,
		);

		expect(screen.getByText("Entregue!")).toBeInTheDocument();
	});
});
