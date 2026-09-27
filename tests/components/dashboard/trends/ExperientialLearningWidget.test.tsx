import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ExperientialLearningWidget } from "@/components/dashboard/trends/ExperientialLearningWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("ExperientialLearningWidget", () => {
    it("renders correctly", () => {
        render(<ExperientialLearningWidget />);
        expect(screen.getByText("Experiential Learning")).toBeInTheDocument();
    });
});
