import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CriticalPedagogyWidget } from "@/components/dashboard/trends/CriticalPedagogyWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("CriticalPedagogyWidget", () => {
    it("renders correctly", () => {
        render(<CriticalPedagogyWidget />);
        expect(screen.getByText("Critical Pedagogy")).toBeInTheDocument();
    });
});
