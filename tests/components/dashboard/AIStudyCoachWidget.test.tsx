import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AIStudyCoachWidget } from "@/components/dashboard/trends/AIStudyCoachWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("AIStudyCoachWidget", () => {
    it("renders correctly and handles interaction", () => {
        render(<AIStudyCoachWidget />);
        expect(screen.getByText("AI Study Coach")).toBeInTheDocument();
        const button = screen.getByRole("button", { name: /praticar/i });
        fireEvent.click(button);
        expect(screen.getByRole("button", { name: /concluído/i })).toBeInTheDocument();
    });
});
