import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FlippedClassroomWidget } from "./FlippedClassroomWidget";

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

describe("FlippedClassroomWidget", () => {
    it("renders title and description", () => {
        render(<FlippedClassroomWidget />);
        expect(screen.getByText("Flipped Classroom")).toBeInTheDocument();
        expect(screen.getByText("Estude a teoria em casa e pratique ativamente na aula.")).toBeInTheDocument();
    });

    it("awards XP and shows completed state", () => {
        render(<FlippedClassroomWidget />);
        const button = screen.getByRole("button", { name: "Praticar" });
        fireEvent.click(button);
        expect(mockAddXp).toHaveBeenCalledWith(10);
        expect(mockNotify).toHaveBeenCalledWith(expect.objectContaining({
            category: "achievement"
        }));
    });
});
