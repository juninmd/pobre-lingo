import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ConnectivismWidget } from "./ConnectivismWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("ConnectivismWidget", () => {
	it("renders correctly", () => {
		render(<ConnectivismWidget />);
		expect(screen.getByText("Connectivism")).toBeInTheDocument();
		expect(screen.getByText("Aprendizado como uma rede de conexões na era digital.")).toBeInTheDocument();
	});
});
