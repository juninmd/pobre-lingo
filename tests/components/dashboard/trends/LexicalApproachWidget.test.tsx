import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LexicalApproachWidget } from "@/components/dashboard/trends/LexicalApproachWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("LexicalApproachWidget", () => {
    it("renders correctly", () => {
        render(<LexicalApproachWidget />);
        expect(screen.getByText("Lexical Approach")).toBeInTheDocument();
    });
});
