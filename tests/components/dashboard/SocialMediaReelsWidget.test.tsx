import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SocialMediaReelsWidget } from "@/components/dashboard/SocialMediaReelsWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("SocialMediaReelsWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<SocialMediaReelsWidget />);
    expect(screen.getByText("Nano-learning em Reels")).toBeDefined();
    expect(screen.getByText("Pratique com vídeos curtos e autênticos das redes sociais.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<SocialMediaReelsWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
