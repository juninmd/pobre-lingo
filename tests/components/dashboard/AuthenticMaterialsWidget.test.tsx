import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AuthenticMaterialsWidget } from "@/components/dashboard/trends/AuthenticMaterialsWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("AuthenticMaterialsWidget", () => {
    it("renders correctly and handles interaction", () => {
        render(<AuthenticMaterialsWidget />);
        expect(screen.getByText("Authentic Materials")).toBeInTheDocument();
        const button = screen.getByRole("button", { name: /praticar/i });
        fireEvent.click(button);
        expect(screen.getByRole("button", { name: /concluído/i })).toBeInTheDocument();
    });
});
