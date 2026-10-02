import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NanoLearningWidget } from "./NanoLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({
        addXp: vi.fn(),
    }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({
        notify: vi.fn(),
    }),
}));

describe("NanoLearningWidget", () => {
    it("renders title and description", () => {
        render(<NanoLearningWidget />);
        expect(screen.getByText("Nano-learning")).toBeInTheDocument();
        expect(screen.getByText("Módulos de aprendizagem ultra-rápidos e focados.")).toBeInTheDocument();
    });
});
