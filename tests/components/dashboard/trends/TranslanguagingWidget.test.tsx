import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TranslanguagingWidget } from "@/components/dashboard/trends/TranslanguagingWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("TranslanguagingWidget", () => {
    it("renders correctly", () => {
        render(<TranslanguagingWidget />);
        expect(screen.getByText("Translanguaging")).toBeInTheDocument();
    });
});
