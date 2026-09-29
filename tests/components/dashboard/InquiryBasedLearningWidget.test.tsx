import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { InquiryBasedLearningWidget } from "@/components/dashboard/InquiryBasedLearningWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("InquiryBasedLearningWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<InquiryBasedLearningWidget />);
    expect(screen.getByText("Aprendizado por Investigação")).toBeDefined();
    expect(screen.getByText("Desenvolva o idioma formulando perguntas investigativas.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<InquiryBasedLearningWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
