import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NanoLearningWidget } from "./NanoLearningWidget";

const mockAddXp = vi.fn();
const mockNotify = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({
        addXp: mockAddXp,
    }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({
        notify: mockNotify,
    }),
}));

describe("NanoLearningWidget", () => {
    it("renders title and description", () => {
        render(<NanoLearningWidget />);
        expect(screen.getByText("Nano-learning")).toBeInTheDocument();
        expect(screen.getByText("Módulos de aprendizagem ultra-rápidos e focados.")).toBeInTheDocument();
    });

    it("awards XP and shows completed state", () => {
        render(<NanoLearningWidget />);
        const button = screen.getByRole("button", { name: "Praticar" });
        fireEvent.click(button);
        expect(mockAddXp).toHaveBeenCalledWith(10);
        expect(mockNotify).toHaveBeenCalledWith(expect.objectContaining({
            category: "achievement"
        }));
    });
});
