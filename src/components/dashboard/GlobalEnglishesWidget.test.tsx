import { render, screen, fireEvent, act } from "@testing-library/react";
import { GlobalEnglishesWidget } from "./GlobalEnglishesWidget";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
  GamificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
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

		expect(screen.getByText("Ouvindo...")).toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(screen.getByText("Concluído (+20 XP)")).toBeInTheDocument();
	});
});
