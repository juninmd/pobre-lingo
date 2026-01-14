import React, { createContext, useContext, useState, useEffect } from 'react';

// Deprecated: This context is being phased out in favor of specific hooks (e.g. useLearningStreak)
// and the removal of "lives/gems" mechanics.
interface GamificationContextType {
  hearts: number;
  maxHearts: number;
  gems: number;
  streak: number;
  loseHeart: () => void;
  refillHearts: () => void;
  addGem: (amount: number) => void;
  addStreak: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [streak, setStreak] = useState<number>(0);

  // Hearts and Gems are now mocked/disabled
  const hearts = 5;
  const maxHearts = 5;
  const gems = 0;

  useEffect(() => {
    // We can still try to load the legacy streak if needed, but for now we default to 0
    // or we could sync with useLearningStreak storage if we wanted deep integration.
    const storedStreak = localStorage.getItem('pl_streak');
    if (storedStreak) setStreak(parseInt(storedStreak));
  }, []);

  useEffect(() => {
    localStorage.setItem('pl_streak', streak.toString());
  }, [streak]);

  const loseHeart = () => {
    // No-op: Punishments removed
  };

  const refillHearts = () => {
    // No-op
  };

  const addGem = (_amount: number) => {
    // No-op: Currency removed
  };

  const addStreak = () => {
     setStreak(prev => prev + 1);
  };

  return (
    <GamificationContext.Provider value={{ hearts, maxHearts, gems, streak, loseHeart, refillHearts, addGem, addStreak }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
