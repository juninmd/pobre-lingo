import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GreenELTWidget } from "@/components/dashboard/GreenELTWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("GreenELTWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<GreenELTWidget />);
    expect(screen.getByText("Inglês Sustentável")).toBeDefined();
    expect(screen.getByText("Aprenda vocabulário sobre sustentabilidade e meio ambiente.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<GreenELTWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
