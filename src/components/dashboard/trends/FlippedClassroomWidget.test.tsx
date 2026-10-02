import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FlippedClassroomWidget } from "./FlippedClassroomWidget";

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

describe("FlippedClassroomWidget", () => {
    it("renders title and description", () => {
        render(<FlippedClassroomWidget />);
        expect(screen.getByText("Flipped Classroom")).toBeInTheDocument();
        expect(screen.getByText("Estude a teoria em casa e pratique intensamente na aula.")).toBeInTheDocument();
    });
});
