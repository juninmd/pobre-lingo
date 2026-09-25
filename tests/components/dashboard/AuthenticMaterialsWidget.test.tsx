import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthenticMaterialsWidget } from "@/components/dashboard/AuthenticMaterialsWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("AuthenticMaterialsWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<AuthenticMaterialsWidget />);
    expect(screen.getByText("Materiais Autênticos")).toBeDefined();
    expect(screen.getByText("Estude com textos e áudios reais, não adaptados para estudantes.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<AuthenticMaterialsWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
