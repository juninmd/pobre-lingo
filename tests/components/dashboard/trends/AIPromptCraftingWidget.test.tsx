import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AIPromptCraftingWidget } from "@/components/dashboard/trends/AIPromptCraftingWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("AIPromptCraftingWidget", () => {
    it("renders correctly", () => {
        render(<AIPromptCraftingWidget />);
        expect(screen.getByText("Prompt Engineering")).toBeInTheDocument();
    });
});
