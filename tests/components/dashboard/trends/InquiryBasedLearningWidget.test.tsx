import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InquiryBasedLearningWidget } from "@/components/dashboard/trends/InquiryBasedLearningWidget";
import React from "react";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("InquiryBasedLearningWidget", () => {
    it("renders correctly", () => {
        render(<InquiryBasedLearningWidget />);
        expect(screen.getByText("Inquiry-Based Learning")).toBeInTheDocument();
    });
});
