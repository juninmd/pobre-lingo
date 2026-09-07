import { render, screen, fireEvent } from "@testing-library/react";
import { LexicalApproachWidget } from "./LexicalApproachWidget";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { vi, describe, it, expect } from "vitest";

vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
  GamificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));


describe("LexicalApproachWidget", () => {
	it("renders correctly", () => {
		render(
			<NotificationProvider>
      <GamificationProvider>
				<LexicalApproachWidget />
			</GamificationProvider>
      </NotificationProvider>,
		);
		expect(screen.getByText("Abordagem Lexical")).toBeInTheDocument();
	});

	it("handles interaction and awards XP", () => {
		render(
			<NotificationProvider>
      <GamificationProvider>
				<LexicalApproachWidget />
			</GamificationProvider>
      </NotificationProvider>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(screen.getByText("Praticado (+15 XP)")).toBeInTheDocument();
	});
});
