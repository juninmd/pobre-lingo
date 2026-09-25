import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { HyFlexLearningWidget } from "@/components/dashboard/HyFlexLearningWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("HyFlexLearningWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<HyFlexLearningWidget />);
    expect(screen.getByText("Ensino Híbrido Flexível")).toBeDefined();
    expect(screen.getByText("Combine aprendizado síncrono e assíncrono no seu ritmo.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<HyFlexLearningWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
