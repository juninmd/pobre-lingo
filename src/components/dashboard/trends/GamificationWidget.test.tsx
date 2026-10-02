import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GamificationWidget } from "./GamificationWidget";

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

describe("GamificationWidget", () => {
    it("renders title and description", () => {
        render(<GamificationWidget />);
        expect(screen.getByText("Gamification in ELT")).toBeInTheDocument();
        expect(screen.getByText("Aprenda inglês de forma divertida com mecânicas de jogos.")).toBeInTheDocument();
    });

    it("awards XP and shows completed state", () => {
        render(<GamificationWidget />);
        const button = screen.getByRole("button", { name: "Praticar" });
        fireEvent.click(button);
        expect(mockAddXp).toHaveBeenCalledWith(10);
        expect(mockNotify).toHaveBeenCalledWith(expect.objectContaining({
            category: "achievement"
        }));
    });
});
