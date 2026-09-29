import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DogmeELTWidget } from "@/components/dashboard/trends/DogmeELTWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("DogmeELTWidget", () => {
    it("renders correctly", () => {
        render(<DogmeELTWidget />);
        expect(screen.getByText("Dogme ELT")).toBeInTheDocument();
    });
});
