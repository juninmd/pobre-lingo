import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ImmersivePracticeSection } from "@/components/dashboard/ImmersivePracticeSection";
import { BrowserRouter } from "react-router-dom";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("ImmersivePracticeSection", () => {
	it("renders correctly with tabs", () => {
		render(
			<BrowserRouter>
				<ImmersivePracticeSection />
			</BrowserRouter>
		);

		expect(screen.getByRole("heading", { name: "Tendências 2025 & Prática Imersiva" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Digital & IA" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Conexão Social" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Cultura & Mundo" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Metodologias" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Essenciais" })).toBeInTheDocument();
	});
});
