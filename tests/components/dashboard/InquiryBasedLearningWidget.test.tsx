import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InquiryBasedLearningWidget } from "@/components/dashboard/trends/InquiryBasedLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("InquiryBasedLearningWidget", () => {
    it("renders correctly and handles interaction", () => {
        render(<InquiryBasedLearningWidget />);
        expect(screen.getByText("Inquiry-Based Learning")).toBeInTheDocument();
        const button = screen.getByRole("button", { name: /praticar/i });
        fireEvent.click(button);
        expect(screen.getByRole("button", { name: /concluído/i })).toBeInTheDocument();
    });
});
