import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TBLTWidget } from "./TBLTWidget";

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

describe("TBLTWidget", () => {
    it("renders title and description", () => {
        render(<TBLTWidget />);
        expect(screen.getByText("Task-Based Language Teaching")).toBeInTheDocument();
        expect(screen.getByText("Aprenda inglês focado na resolução de tarefas reais.")).toBeInTheDocument();
    });

    it("awards XP and shows completed state", () => {
        render(<TBLTWidget />);
        const button = screen.getByRole("button", { name: "Praticar" });
        fireEvent.click(button);
        expect(mockAddXp).toHaveBeenCalledWith(10);
        expect(mockNotify).toHaveBeenCalledWith(expect.objectContaining({
            category: "achievement"
        }));
    });
});
