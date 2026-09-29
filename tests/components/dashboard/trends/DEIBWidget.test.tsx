import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DEIBWidget } from "@/components/dashboard/trends/DEIBWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("DEIBWidget", () => {
    it("renders correctly", () => {
        render(<DEIBWidget />);
        expect(screen.getByText("DEIB")).toBeInTheDocument();
    });
});
