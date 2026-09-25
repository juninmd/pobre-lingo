import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIPromptCraftingWidget } from "@/components/dashboard/AIPromptCraftingWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("AIPromptCraftingWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<AIPromptCraftingWidget />);
    expect(screen.getByText("Engenharia de Prompts")).toBeDefined();
    expect(screen.getByText("Aprenda a criar prompts eficazes para praticar inglês com IAs.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<AIPromptCraftingWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
