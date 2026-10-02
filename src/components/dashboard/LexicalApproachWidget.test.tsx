import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { LexicalApproachWidget } from "./LexicalApproachWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
	GamificationProvider: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
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
