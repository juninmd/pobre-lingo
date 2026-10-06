import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SpacedRepetitionWidget } from "@/components/dashboard/trends/SpacedRepetitionWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("SpacedRepetitionWidget", () => {
    it("renders correctly and handles interaction", () => {
        render(<SpacedRepetitionWidget />);
        expect(screen.getByText("Spaced Repetition")).toBeInTheDocument();
        const button = screen.getByRole("button", { name: /praticar/i });
        fireEvent.click(button);
        expect(screen.getByRole("button", { name: /concluído/i })).toBeInTheDocument();
    });
});
