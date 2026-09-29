import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SocialMediaReelsWidget } from "@/components/dashboard/trends/SocialMediaReelsWidget";

vi.mock("@/contexts/GamificationContext", () => ({
    useGamification: () => ({ addXp: vi.fn() })
}));

vi.mock("@/contexts/NotificationContext", () => ({
    useNotifications: () => ({ notify: vi.fn() })
}));

describe("SocialMediaReelsWidget", () => {
    it("renders correctly and handles interaction", () => {
        render(<SocialMediaReelsWidget />);
        expect(screen.getByText("Nano-learning Reels")).toBeInTheDocument();
        const button = screen.getByRole("button", { name: /praticar/i });
        fireEvent.click(button);
        expect(screen.getByRole("button", { name: /concluído/i })).toBeInTheDocument();
    });
});
