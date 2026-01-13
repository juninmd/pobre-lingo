import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [hearts, setHearts] = useState<number>(5);
  const maxHearts = 5;
  const [gems, setGems] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    const storedHearts = localStorage.getItem('pl_hearts');
    const storedGems = localStorage.getItem('pl_gems');
    const storedStreak = localStorage.getItem('pl_streak');
    const lastHeartLoss = localStorage.getItem('pl_last_heart_loss');

    if (storedHearts) setHearts(parseInt(storedHearts));
    if (storedGems) setGems(parseInt(storedGems));
    if (storedStreak) setStreak(parseInt(storedStreak));

    // Simple refill logic: if it's been more than 24h (mock), refill.
    // For now, let's just default to 5 if nothing stored or valid.
    if (!storedHearts) setHearts(5);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pl_hearts', hearts.toString());
    localStorage.setItem('pl_gems', gems.toString());
    localStorage.setItem('pl_streak', streak.toString());
  }, [hearts, gems, streak]);

  const loseHeart = () => {
    if (hearts > 0) {
      setHearts(prev => prev - 1);
      localStorage.setItem('pl_last_heart_loss', Date.now().toString());
    }
  };

  const refillHearts = () => {
    setHearts(maxHearts);
  };

  const addGem = (amount: number) => {
    setGems(prev => prev + amount);
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
