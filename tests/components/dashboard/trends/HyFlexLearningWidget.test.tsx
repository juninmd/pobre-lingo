import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HyFlexLearningWidget } from "@/components/dashboard/trends/HyFlexLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("HyFlexLearningWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<HyFlexLearningWidget />);
		expect(screen.getByText("Aprendizado HyFlex")).toBeInTheDocument();
		expect(screen.getByText("Combine estudo online e offline de forma fluida e adaptável.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Sincronizar" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Sincronizar" })).toBeInTheDocument();
		});
	});
});
