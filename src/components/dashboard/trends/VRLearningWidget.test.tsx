import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VRLearningWidget } from "./VRLearningWidget";

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

describe("VRLearningWidget", () => {
    it("renders title and description", () => {
        render(<VRLearningWidget />);
        expect(screen.getByText("VR/AR Immersive Learning")).toBeInTheDocument();
        expect(screen.getByText("Experimente simulações imersivas em realidade virtual.")).toBeInTheDocument();
    });

    it("awards XP and shows completed state", () => {
        render(<VRLearningWidget />);
        const button = screen.getByRole("button", { name: "Praticar" });
        fireEvent.click(button);
        expect(mockAddXp).toHaveBeenCalledWith(10);
        expect(mockNotify).toHaveBeenCalledWith(expect.objectContaining({
            category: "achievement"
        }));
    });
});
