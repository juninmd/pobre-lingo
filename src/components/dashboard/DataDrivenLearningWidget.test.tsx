import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { DataDrivenLearningWidget } from "./DataDrivenLearningWidget";

describe("DataDrivenLearningWidget", () => {
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
					<DataDrivenLearningWidget />
				</GamificationProvider>
			</NotificationProvider>,
		);

		expect(screen.getByText("Data-Driven Learning")).toBeInTheDocument();
		expect(screen.getByText("Análise de Corpus")).toBeInTheDocument();
		expect(screen.getByText("Analisar Padrões (+35 XP)")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Analisar Padrões (+35 XP)"));

		expect(screen.getByText("Analisando...")).toBeInTheDocument();

		await act(async () => {
			vi.advanceTimersByTime(1500);
		});

		await waitFor(() => {
			expect(screen.getByText("Analisado!")).toBeInTheDocument();
		});

		const todayStr = new Date().toISOString().split("T")[0];
		expect(localStorage.getItem("daily_ddl_claimed")).toBe(todayStr);
	});

	it("restores claimed state from localStorage", () => {
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_ddl_claimed", todayStr);

		render(
			<NotificationProvider>
				<GamificationProvider>
					<DataDrivenLearningWidget />
				</GamificationProvider>
			</NotificationProvider>,
		);

		expect(screen.getByText("Analisado!")).toBeInTheDocument();
	});
});
