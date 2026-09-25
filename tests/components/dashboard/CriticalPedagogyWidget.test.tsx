import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CriticalPedagogyWidget } from "@/components/dashboard/CriticalPedagogyWidget";

// Mock the gamification context and notifications hook
vi.mock("@/contexts/GamificationContext", () => ({
  useGamification: () => ({ addXp: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotifications: () => ({ notify: vi.fn() }),
}));

describe("CriticalPedagogyWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget title and description", () => {
    render(<CriticalPedagogyWidget />);
    expect(screen.getByText("Pedagogia Crítica")).toBeDefined();
    expect(screen.getByText("Reflita sobre o papel do idioma na sociedade e cultura.")).toBeDefined();
  });

  it("changes button text on click", () => {
    render(<CriticalPedagogyWidget />);
    const button = screen.getByRole("button", { name: /Acessar/i });
    fireEvent.click(button);
    expect(screen.getByText("Concluído")).toBeDefined();
  });
});
