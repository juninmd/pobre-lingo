import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AIPromptCraftingWidget } from "@/components/dashboard/trends/AIPromptCraftingWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("AIPromptCraftingWidget", () => {
    it("renders correctly and handles interaction", () => {
        render(<AIPromptCraftingWidget />);
        expect(screen.getByText("Prompt Engineering")).toBeInTheDocument();
        const button = screen.getByRole("button", { name: /praticar/i });
        fireEvent.click(button);
        expect(screen.getByRole("button", { name: /concluído/i })).toBeInTheDocument();
    });
});
