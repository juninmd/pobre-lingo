import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GlobalEnglishesWidget } from "@/components/dashboard/trends/GlobalEnglishesWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("GlobalEnglishesWidget", () => {
    it("renders correctly", () => {
        render(<GlobalEnglishesWidget />);
        expect(screen.getByText("Global Englishes")).toBeInTheDocument();
    });
});
