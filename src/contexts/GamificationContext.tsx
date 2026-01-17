import React, { createContext, useContext, useState, useEffect } from 'react';

interface GamificationContextType {
  hearts: number;
  maxHearts: number;
  gems: number;
  streak: number;
  xp: number;
  level: number;
  loseHeart: () => void;
  refillHearts: () => void;
  addGem: (amount: number) => void;
  addStreak: () => void;
  addXp: (amount: number) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [hearts, setHearts] = useState<number>(5);
  const maxHearts = 5;
  const [gems, setGems] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);

  // Derived state for level
  // Formula: Level = floor(sqrt(xp / 100)) + 1
  // XP 0 -> Lvl 1
  // XP 100 -> Lvl 2
  // XP 400 -> Lvl 3
  // XP 900 -> Lvl 4
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;

  // Load from localStorage on mount
  useEffect(() => {
    const storedHearts = localStorage.getItem('pl_hearts');
    const storedGems = localStorage.getItem('pl_gems');
    const storedStreak = localStorage.getItem('pl_streak');
    const storedXp = localStorage.getItem('pl_xp');

    if (storedHearts) setHearts(parseInt(storedHearts));
    if (storedGems) setGems(parseInt(storedGems));
    if (storedStreak) setStreak(parseInt(storedStreak));
    if (storedXp) setXp(parseInt(storedXp));

    // Simple refill logic: if it's been more than 24h (mock), refill.
    // For now, let's just default to 5 if nothing stored or valid.
    if (!storedHearts) setHearts(5);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pl_hearts', hearts.toString());
    localStorage.setItem('pl_gems', gems.toString());
    localStorage.setItem('pl_streak', streak.toString());
    localStorage.setItem('pl_xp', xp.toString());
  }, [hearts, gems, streak, xp]);

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

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  return (
    <GamificationContext.Provider value={{
      hearts,
      maxHearts,
      gems,
      streak,
      xp,
      level,
      loseHeart,
      refillHearts,
      addGem,
      addStreak,
      addXp
    }}>
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
