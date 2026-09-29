import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ImmersivePracticeSection } from "@/components/dashboard/ImmersivePracticeSection";
import React from "react";
import { BrowserRouter } from "react-router-dom";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("ImmersivePracticeSection", () => {
    it("renders tabs correctly", () => {
        render(
            <BrowserRouter>
                <ImmersivePracticeSection />
            </BrowserRouter>
        );
        expect(screen.getByText("Digital & IA")).toBeInTheDocument();
        expect(screen.getByText("Conexão Humana & Social")).toBeInTheDocument();
        expect(screen.getByText("Cultura")).toBeInTheDocument();
        expect(screen.getByText("Metodologias")).toBeInTheDocument();
        expect(screen.getByText("Essenciais")).toBeInTheDocument();
    });
});
