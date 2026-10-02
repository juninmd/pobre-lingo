import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { GlobalEnglishesWidget } from "./GlobalEnglishesWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
	GamificationProvider: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

vi.useFakeTimers();

describe("GlobalEnglishesWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(
			<NotificationProvider>
				<GamificationProvider>
					<GlobalEnglishesWidget />
				</GamificationProvider>
			</NotificationProvider>,
		);
		expect(screen.getByText("Inglês Global (ELF)")).toBeInTheDocument();
	});

	it("handles interaction and awards XP", () => {
		render(
			<NotificationProvider>
				<GamificationProvider>
					<GlobalEnglishesWidget />
				</GamificationProvider>
			</NotificationProvider>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(screen.getByText("Concluído")).toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(screen.getByText("Concluído")).toBeInTheDocument();
	});
});
