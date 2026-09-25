import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SpacedRepetitionWidget } from "@/components/dashboard/SpacedRepetitionWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("SpacedRepetitionWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<SpacedRepetitionWidget />);
    expect(screen.getByText("Repetição Espaçada")).toBeDefined();
    expect(screen.getByText("Fixe vocabulário revisando no momento exato antes de esquecer.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<SpacedRepetitionWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
