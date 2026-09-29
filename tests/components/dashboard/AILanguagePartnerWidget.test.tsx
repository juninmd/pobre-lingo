import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AILanguagePartnerWidget } from "@/components/dashboard/AILanguagePartnerWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("AILanguagePartnerWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<AILanguagePartnerWidget />);
    expect(screen.getByText("Parceiro de Idioma IA")).toBeDefined();
    expect(screen.getByText("Simule conversas reais para melhorar sua fluência.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<AILanguagePartnerWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
