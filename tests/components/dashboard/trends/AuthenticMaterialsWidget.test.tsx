import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AuthenticMaterialsWidget } from "@/components/dashboard/trends/AuthenticMaterialsWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("AuthenticMaterialsWidget", () => {
	it("renders correctly and handles interaction", async () => {
		render(<AuthenticMaterialsWidget />);
		expect(screen.getByText("Materiais Autênticos")).toBeInTheDocument();
		expect(screen.getByText("Aprenda com podcasts, notícias e vídeos feitos para nativos.")).toBeInTheDocument();

		const button = screen.getByRole("button", { name: "Explorar Conteúdo" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "Processando..." })).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Explorar Conteúdo" })).toBeInTheDocument();
		});
	});
});
