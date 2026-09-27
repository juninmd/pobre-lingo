import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GreenELTWidget } from "@/components/dashboard/trends/GreenELTWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("GreenELTWidget", () => {
    it("renders correctly", () => {
        render(<GreenELTWidget />);
        expect(screen.getByText("Green ELT")).toBeInTheDocument();
    });
});
