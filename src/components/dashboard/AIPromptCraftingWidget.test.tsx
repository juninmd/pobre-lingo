import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AIPromptCraftingWidget } from './AIPromptCraftingWidget';

// Mock the gamification context
const mockAddXP = vi.fn();
vi.mock('@/contexts/GamificationContext', () => ({
  useGamification: () => ({
    addXp: mockAddXP,
  }),
  GamificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('AIPromptCraftingWidget', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 0, 1)); // Jan 1st
    mockAddXP.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correctly with the daily topic', () => {
    render(<AIPromptCraftingWidget />);
    expect(screen.getByText('AI Prompt Crafting')).toBeInTheDocument();
    expect(screen.getByText('Missão de Hoje')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar Prompt/i })).toBeInTheDocument();
  });

  it('awards XP and changes state when prompt is submitted', async () => {
    render(<AIPromptCraftingWidget />);

    const textarea = screen.getByPlaceholderText(/Write your prompt here in English/i);
    fireEvent.change(textarea, { target: { value: 'Revise this email context' } });

    const submitBtn = screen.getByRole('button', { name: /Enviar Prompt/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Analisando Prompt/i)).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(mockAddXP).toHaveBeenCalledWith(20);
    expect(screen.getByText(/Prompt Enviado!/i)).toBeInTheDocument();
  });
});
