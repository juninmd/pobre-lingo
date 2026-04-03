import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Achievement, ACHIEVEMENTS_LIST } from '@/lib/gamification';
import { triggerLevelUpAnimation, triggerCoinAnimation } from './gamificationAnimations';

export { ACHIEVEMENTS_LIST };
export type { Achievement };

interface GamificationContextType {
  hearts: number;
  maxHearts: number;
  gems: number;
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

const getStorage = (key: string, defaultVal: number | any[]) => {
  if (typeof window === 'undefined') return defaultVal;
  const stored = localStorage.getItem(key);
  if (!stored) return defaultVal;
  return typeof defaultVal === 'number' ? parseInt(stored) : JSON.parse(stored);
};

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [hearts, setHearts] = useState<number>(Infinity);
  const maxHearts = Infinity;
  const [gems, setGems] = useState<number>(() => getStorage('pl_gems', 0) as number);
  const [streak, setStreak] = useState<number>(() => getStorage('pl_streak', 0) as number);
  const [xp, setXp] = useState<number>(() => getStorage('pl_xp', 0) as number);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => getStorage('pl_achievements', []) as string[]);

  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const previousLevelRef = useRef(level);

  useEffect(() => {
    if (level > previousLevelRef.current) {
      triggerLevelUpAnimation(level);
      previousLevelRef.current = level;
    }
  }, [level]);

  useEffect(() => {
    localStorage.setItem('pl_gems', gems.toString());
    localStorage.setItem('pl_streak', streak.toString());
    localStorage.setItem('pl_xp', xp.toString());
    localStorage.setItem('pl_achievements', JSON.stringify(unlockedAchievements));
  }, [gems, streak, xp, unlockedAchievements]);

  useEffect(() => {
     const newUnlocks: string[] = [];
     if (xp >= 50 && !unlockedAchievements.includes('first_steps')) newUnlocks.push('first_steps');
     if (streak >= 3 && !unlockedAchievements.includes('streak_3')) newUnlocks.push('streak_3');
     if (streak >= 7 && !unlockedAchievements.includes('streak_7')) newUnlocks.push('streak_7');
     if (gems >= 100 && !unlockedAchievements.includes('rich')) newUnlocks.push('rich');
     if (level >= 5 && !unlockedAchievements.includes('scholar')) newUnlocks.push('scholar');
     if (level >= 10 && !unlockedAchievements.includes('master')) newUnlocks.push('master');
     if (newUnlocks.length > 0) setUnlockedAchievements(prev => [...prev, ...newUnlocks]);
  }, [xp, streak, gems, level, unlockedAchievements]);

  const loseHeart = useCallback(() => {}, []);
  const refillHearts = useCallback(() => setHearts(Infinity), []);
  const addGem = useCallback((amount: number) => {
    setGems(prev => prev + amount);
    if (amount > 0) triggerCoinAnimation(amount);
  }, []);
  const addStreak = useCallback(() => {
     setStreak(prev => prev + 1);
     addGem(10);
  }, [addGem]);
  const addXp = useCallback((amount: number) => setXp(prev => prev + amount), []);
  const unlockAchievement = useCallback((id: string) => setUnlockedAchievements(prev => !prev.includes(id) ? [...prev, id] : prev), []);

  const contextValue = useMemo(() => ({
      hearts, maxHearts, gems, streak, xp, level, unlockedAchievements,
      setHearts, setGems, setStreak, loseHeart, refillHearts, addGem, addStreak, addXp, unlockAchievement
  }), [hearts, maxHearts, gems, streak, xp, level, unlockedAchievements, loseHeart, refillHearts, addGem, addStreak, addXp, unlockAchievement]);

  return <GamificationContext.Provider value={contextValue}>{children}</GamificationContext.Provider>;
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) throw new Error('useGamification must be used within a GamificationProvider');
  return context;
}
