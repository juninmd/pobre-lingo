import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AILanguagePartnerWidget } from "@/components/dashboard/trends/AILanguagePartnerWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("AILanguagePartnerWidget", () => {
    it("renders correctly and handles interaction", () => {
        render(<AILanguagePartnerWidget />);
        expect(screen.getByText("AI Language Partner")).toBeInTheDocument();
        const button = screen.getByRole("button", { name: /praticar/i });
        fireEvent.click(button);
        expect(screen.getByRole("button", { name: /concluído/i })).toBeInTheDocument();
    });
});
