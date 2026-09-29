import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HyFlexLearningWidget } from "@/components/dashboard/trends/HyFlexLearningWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("HyFlexLearningWidget", () => {
    it("renders correctly", () => {
        render(<HyFlexLearningWidget />);
        expect(screen.getByText("HyFlex Learning")).toBeInTheDocument();
    });
});
