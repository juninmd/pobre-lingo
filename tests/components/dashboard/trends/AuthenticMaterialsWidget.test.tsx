import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AuthenticMaterialsWidget } from "@/components/dashboard/trends/AuthenticMaterialsWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("AuthenticMaterialsWidget", () => {
    it("renders correctly", () => {
        render(<AuthenticMaterialsWidget />);
        expect(screen.getByText("Authentic Materials")).toBeInTheDocument();
    });
});
