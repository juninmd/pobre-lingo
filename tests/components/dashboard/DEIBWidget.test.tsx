import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DEIBWidget } from "@/components/dashboard/DEIBWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("DEIBWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<DEIBWidget />);
    expect(screen.getByText("Diversidade & Inclusão")).toBeDefined();
    expect(screen.getByText("Explore linguagem inclusiva e perspectivas globais.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<DEIBWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
