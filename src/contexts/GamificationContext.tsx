import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Achievement, ACHIEVEMENTS_LIST } from '@/lib/gamification';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export { ACHIEVEMENTS_LIST };
export type { Achievement };

interface GamificationContextType {
  hearts: number;
  maxHearts: number;
  gems: number; // Internally gems, displayed as PobreCoins
  streak: number;
  xp: number;
  level: number;
  unlockedAchievements: string[];
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  setGems: React.Dispatch<React.SetStateAction<number>>;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
  loseHeart: () => void;
  refillHearts: () => void;
  addGem: (amount: number) => void;
  addStreak: () => void;
  addXp: (amount: number) => void;
  unlockAchievement: (id: string) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  // Infinite hearts: we keep the state for compatibility but logic won't decrease it
  const [hearts, setHearts] = useState<number>(Infinity);
  const maxHearts = Infinity;

  const [gems, setGems] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const stored = localStorage.getItem('pl_gems');
    return stored ? parseInt(stored) : 0;
  });

  const [streak, setStreak] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const stored = localStorage.getItem('pl_streak');
    return stored ? parseInt(stored) : 0;
  });

  const [xp, setXp] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const stored = localStorage.getItem('pl_xp');
    return stored ? parseInt(stored) : 0;
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('pl_achievements');
    return stored ? JSON.parse(stored) : [];
  });

  // Derived state for level
  // Formula: Level = floor(sqrt(xp / 100)) + 1
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;

  // Track previous level for animations
  const previousLevelRef = useRef(level);

  useEffect(() => {
    if (level > previousLevelRef.current) {
      // Level up animation
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eab308', '#3b82f6', '#22c55e', '#ef4444']
      });

      toast.success(`Nível Atualizado!`, {
        description: `Parabéns, você alcançou o Nível ${level}!`,
        icon: '👑',
        duration: 5000,
      });

      previousLevelRef.current = level;
    }
  }, [level]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pl_gems', gems.toString());
    localStorage.setItem('pl_streak', streak.toString());
    localStorage.setItem('pl_xp', xp.toString());
    localStorage.setItem('pl_achievements', JSON.stringify(unlockedAchievements));
    // We don't save hearts anymore
  }, [gems, streak, xp, unlockedAchievements]);

  // Check auto-unlocks based on stats
  useEffect(() => {
     const newUnlocks: string[] = [];

     if (xp >= 50 && !unlockedAchievements.includes('first_steps')) newUnlocks.push('first_steps');
     if (streak >= 3 && !unlockedAchievements.includes('streak_3')) newUnlocks.push('streak_3');
     if (streak >= 7 && !unlockedAchievements.includes('streak_7')) newUnlocks.push('streak_7');
     if (gems >= 100 && !unlockedAchievements.includes('rich')) newUnlocks.push('rich');
     if (level >= 5 && !unlockedAchievements.includes('scholar')) newUnlocks.push('scholar');
     if (level >= 10 && !unlockedAchievements.includes('master')) newUnlocks.push('master');

     if (newUnlocks.length > 0) {
         setUnlockedAchievements(prev => [...prev, ...newUnlocks]);
     }
  }, [xp, streak, gems, level, unlockedAchievements]);

  const loseHeart = useCallback(() => {
    // Infinite lives: do nothing
    // User requested: "as pessoas podem errar a vontade"
  }, []);

  const refillHearts = useCallback(() => {
    setHearts(Infinity);
  }, []);

  const addGem = useCallback((amount: number) => {
    setGems(prev => prev + amount);
    if (amount > 0) {
       toast.success(`+${amount} PobreCoins`, {
          icon: '🪙',
          duration: 3000,
       });

       // Trigger coin floating animation
       const numCoins = Math.min(amount, 10);
       const colors = ['#f59e0b', '#fbbf24', '#fcd34d']; // Gold colors
       confetti({
         particleCount: numCoins,
         spread: 60,
         origin: { y: 0.1, x: 0.8 }, // Top right corner near the coins counter
         colors: colors,
         shapes: ['circle'],
         gravity: 1.5,
         scalar: 1.2,
         ticks: 100,
         disableForReducedMotion: true
       });
    }
  }, []);

  const addStreak = useCallback(() => {
     setStreak(prev => prev + 1);
     // Daily reward for streak: 10 PobreCoins
     addGem(10);
  }, [addGem]);

  const addXp = useCallback((amount: number) => {
    setXp(prev => prev + amount);
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    setUnlockedAchievements(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  }, []);

  const contextValue = useMemo(() => ({
      hearts,
      maxHearts,
      gems,
      streak,
      xp,
      level,
      unlockedAchievements,
      setHearts,
      setGems,
      setStreak,
      loseHeart,
      refillHearts,
      addGem,
      addStreak,
      addXp,
      unlockAchievement
  }), [hearts, maxHearts, gems, streak, xp, level, unlockedAchievements, loseHeart, refillHearts, addGem, addStreak, addXp, unlockAchievement]);

  return (
    <GamificationContext.Provider value={contextValue}>
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
