import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MindfulWidget } from "@/components/dashboard/trends/MindfulWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("MindfulWidget", () => {
    it("renders correctly", () => {
        render(<MindfulWidget />);
        expect(screen.getByText("Mindfulness")).toBeInTheDocument();
    });
});
