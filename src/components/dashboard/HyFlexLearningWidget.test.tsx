import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HyFlexLearningWidget } from './HyFlexLearningWidget';

// Mock the gamification context
const mockAddXP = vi.fn();
vi.mock('@/contexts/GamificationContext', () => ({
  useGamification: () => ({
    addXp: mockAddXP,
  }),
  GamificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('HyFlexLearningWidget', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockAddXP.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correctly', () => {
    render(<HyFlexLearningWidget />);
    expect(screen.getByText('HyFlex Learning')).toBeInTheDocument();
    expect(screen.getByText(/Escolha como você quer aprender hoje/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Síncrono/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /Assíncrono/i }).length).toBeGreaterThan(0);
  });

  it('awards XP when synchronous session is scheduled', async () => {
    render(<HyFlexLearningWidget />);

    const syncBtn = screen.getByText('Síncrono').closest('button');
    if (syncBtn) {
        fireEvent.click(syncBtn);
    }

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockAddXP).toHaveBeenCalledWith(15);
    expect(screen.getByText(/Modo Síncrono Selecionado/i)).toBeInTheDocument();
  });

  it('awards XP when asynchronous module is started', async () => {
    render(<HyFlexLearningWidget />);

    const asyncBtn = screen.getByText('Assíncrono').closest('button');
    if (asyncBtn) {
        fireEvent.click(asyncBtn);
    }

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockAddXP).toHaveBeenCalledWith(10);
    expect(screen.getByText(/Modo Assíncrono Selecionado/i)).toBeInTheDocument();
  });
});
