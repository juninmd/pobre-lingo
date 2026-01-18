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
  { id: 'rich', title: 'Acumulador', description: 'Junte 100 gemas.', icon: 'Gem' },
  { id: 'scholar', title: 'Estudioso', description: 'Chegue ao Nível 5.', icon: 'GraduationCap' },
  { id: 'master', title: 'Mestre', description: 'Chegue ao Nível 10.', icon: 'Crown' },
];

interface GamificationContextType {
  hearts: number;
  maxHearts: number;
  gems: number;
  streak: number;
  xp: number;
  level: number;
  unlockedAchievements: string[];
  loseHeart: () => void;
  refillHearts: () => void;
  addGem: (amount: number) => void;
  addStreak: () => void;
  addXp: (amount: number) => void;
  unlockAchievement: (id: string) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [hearts, setHearts] = useState<number>(5);
  const maxHearts = 5;
  const [gems, setGems] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

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
    const storedAchievements = localStorage.getItem('pl_achievements');

    if (storedHearts) setHearts(parseInt(storedHearts));
    if (storedGems) setGems(parseInt(storedGems));
    if (storedStreak) setStreak(parseInt(storedStreak));
    if (storedXp) setXp(parseInt(storedXp));
    if (storedAchievements) setUnlockedAchievements(JSON.parse(storedAchievements));

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
    localStorage.setItem('pl_achievements', JSON.stringify(unlockedAchievements));
  }, [hearts, gems, streak, xp, unlockedAchievements]);

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
         // Could trigger a toast here if we had access to it,
         // but contexts shouldn't ideally trigger UI side effects directly without a callback.
         // For now, we rely on the UI to show the "New" state.
     }
  }, [xp, streak, gems, level, unlockedAchievements]);

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
