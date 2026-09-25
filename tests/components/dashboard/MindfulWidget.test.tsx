import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MindfulWidget } from "@/components/dashboard/MindfulWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("MindfulWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<MindfulWidget />);
    expect(screen.getByText("Mindfulness no Ensino")).toBeDefined();
    expect(screen.getByText("Reduza a ansiedade ao falar inglês com práticas de presença.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<MindfulWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
