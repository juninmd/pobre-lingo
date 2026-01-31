import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  condition?: (stats: { xp: number, streak: number, gems: number }) => boolean;
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: 'first_steps', title: 'Primeiros Passos', description: 'Ganhe seus primeiros 50 XP.', icon: 'Footprints' },
  { id: 'streak_3', title: 'Em Chamas', description: 'Alcance uma ofensiva de 3 dias.', icon: 'Flame' },
  { id: 'streak_7', title: 'Hábito Formado', description: 'Alcance uma ofensiva de 7 dias.', icon: 'CalendarCheck' },
  { id: 'rich', title: 'Acumulador', description: 'Junte 100 PobreCoins.', icon: 'Coins' },
  { id: 'scholar', title: 'Estudioso', description: 'Chegue ao Nível 5.', icon: 'GraduationCap' },
  { id: 'master', title: 'Mestre', description: 'Chegue ao Nível 10.', icon: 'Crown' },
];

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

  const loseHeart = () => {
    // Infinite lives: do nothing
    // User requested: "as pessoas podem errar a vontade"
  };

  const refillHearts = () => {
    setHearts(Infinity);
  };

  const addGem = (amount: number) => {
    setGems(prev => prev + amount);
  };

  const addStreak = () => {
     setStreak(prev => prev + 1);
     // Daily reward for streak: 10 PobreCoins
     addGem(10);
  };

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const unlockAchievement = (id: string) => {
    if (!unlockedAchievements.includes(id)) {
        setUnlockedAchievements(prev => [...prev, id]);
    }
  };

  return (
    <GamificationContext.Provider value={{
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
