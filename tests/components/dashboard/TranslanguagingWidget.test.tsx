import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TranslanguagingWidget } from "@/components/dashboard/trends/TranslanguagingWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("TranslanguagingWidget", () => {
    it("renders correctly and handles interaction", () => {
        render(<TranslanguagingWidget />);
        expect(screen.getByText("Translanguaging")).toBeInTheDocument();
        const button = screen.getByRole("button", { name: /praticar/i });
        fireEvent.click(button);
        expect(screen.getByRole("button", { name: /concluído/i })).toBeInTheDocument();
    });
});
