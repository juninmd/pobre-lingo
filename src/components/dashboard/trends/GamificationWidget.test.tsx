import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GamificationWidget } from "./GamificationWidget";

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

describe("GamificationWidget", () => {
    it("renders title and description", () => {
        render(<GamificationWidget />);
        expect(screen.getByText("Gamification in ELT")).toBeInTheDocument();
        expect(screen.getByText("Aprenda inglês de forma divertida com mecânicas de jogos.")).toBeInTheDocument();
    });
});
