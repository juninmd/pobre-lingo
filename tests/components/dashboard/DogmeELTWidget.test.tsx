import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DogmeELTWidget } from "@/components/dashboard/DogmeELTWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("DogmeELTWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<DogmeELTWidget />);
    expect(screen.getByText("Dogme ELT")).toBeDefined();
    expect(screen.getByText("Foco na comunicação real sem dependência excessiva de materiais.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<DogmeELTWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
