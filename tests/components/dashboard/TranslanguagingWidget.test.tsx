import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TranslanguagingWidget } from "@/components/dashboard/TranslanguagingWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("TranslanguagingWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<TranslanguagingWidget />);
    expect(screen.getByText("Translanguaging")).toBeDefined();
    expect(screen.getByText("Use seu português como ponte para construir fluência no inglês.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<TranslanguagingWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
