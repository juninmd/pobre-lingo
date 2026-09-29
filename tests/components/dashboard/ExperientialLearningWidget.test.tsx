import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ExperientialLearningWidget } from "@/components/dashboard/ExperientialLearningWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("ExperientialLearningWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<ExperientialLearningWidget />);
    expect(screen.getByText("Aprendizado Experiencial")).toBeDefined();
    expect(screen.getByText("Aprenda fazendo e refletindo sobre suas experiências.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<ExperientialLearningWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
