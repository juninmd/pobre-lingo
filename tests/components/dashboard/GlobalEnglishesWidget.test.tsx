import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GlobalEnglishesWidget } from "@/components/dashboard/GlobalEnglishesWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("GlobalEnglishesWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<GlobalEnglishesWidget />);
    expect(screen.getByText("Inglês Global (ELF)")).toBeDefined();
    expect(screen.getByText("Compreenda diferentes sotaques e o inglês como língua franca.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<GlobalEnglishesWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
