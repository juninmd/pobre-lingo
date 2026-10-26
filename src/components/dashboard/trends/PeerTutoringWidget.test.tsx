import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PeerTutoringWidget } from "./PeerTutoringWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify: vi.fn() }),
}));

describe("PeerTutoringWidget", () => {
	it("renders correctly", () => {
		render(<PeerTutoringWidget />);
		expect(screen.getByText("Peer Tutoring")).toBeInTheDocument();
		expect(screen.getByText("Aprendizagem colaborativa onde alunos ensinam uns aos outros.")).toBeInTheDocument();
	});
});
