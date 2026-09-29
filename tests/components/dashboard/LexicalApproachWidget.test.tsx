import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LexicalApproachWidget } from "@/components/dashboard/LexicalApproachWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("LexicalApproachWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<LexicalApproachWidget />);
    expect(screen.getByText("Abordagem Lexical")).toBeDefined();
    expect(screen.getByText("Aprenda blocos de palavras (chunks) em vez de gramática isolada.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<LexicalApproachWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
