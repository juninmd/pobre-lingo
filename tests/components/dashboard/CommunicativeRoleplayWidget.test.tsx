import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CommunicativeRoleplayWidget } from "@/components/dashboard/trends/CommunicativeRoleplayWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("CommunicativeRoleplayWidget", () => {
    it("renders correctly and handles interaction", () => {
        render(<CommunicativeRoleplayWidget />);
        expect(screen.getByText("Communicative Roleplay")).toBeInTheDocument();
        const button = screen.getByRole("button", { name: /praticar/i });
        fireEvent.click(button);
        expect(screen.getByRole("button", { name: /concluído/i })).toBeInTheDocument();
    });
});
