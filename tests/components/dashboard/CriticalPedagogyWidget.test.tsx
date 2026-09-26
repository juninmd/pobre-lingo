import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CriticalPedagogyWidget } from "@/components/dashboard/trends/CriticalPedagogyWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("CriticalPedagogyWidget", () => {
    it("renders correctly and handles interaction", () => {
        render(<CriticalPedagogyWidget />);
        expect(screen.getByText("Critical Pedagogy")).toBeInTheDocument();
        const button = screen.getByRole("button", { name: /praticar/i });
        fireEvent.click(button);
        expect(screen.getByRole("button", { name: /concluído/i })).toBeInTheDocument();
    });
});
