import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VRLearningWidget } from "./VRLearningWidget";

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

describe("VRLearningWidget", () => {
    it("renders title and description", () => {
        render(<VRLearningWidget />);
        expect(screen.getByText("VR/AR Immersive Learning")).toBeInTheDocument();
        expect(screen.getByText("Experimente simulações imersivas em realidade virtual.")).toBeInTheDocument();
    });
});
