import { useState, useEffect, useCallback, useMemo } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/localStorage';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { LessonProgress, ModuleProgress } from '@/lib/progressTypes';
import {
  calculateLevel,
  getModuleProgress as getModuleProgressUtil,
  calculateOverallProgress,
  isLessonCompleted
} from '@/lib/progressUtils';
import { Module } from '@/lib/curriculumData';

const PROGRESS_STORAGE_KEY = 'pobrelingo_curriculum_progress';
const XP_STORAGE_KEY = 'pobrelingo_total_xp';
const LEVEL_STORAGE_KEY = 'pobrelingo_user_level';
const STREAK_STORAGE_KEY = 'pobrelingo_streak';
const LAST_ACTIVITY_DATE_KEY = 'pobrelingo_last_activity_date';

export function useCurriculumProgress() {
  const [completedLessons, setCompletedLessons] = useState<LessonProgress[]>(() => {
    return getLocalStorageItem<LessonProgress[]>(PROGRESS_STORAGE_KEY, []);
  });

  const [totalXP, setTotalXP] = useState(() => {
    return getLocalStorageItem<number>(XP_STORAGE_KEY, 0);
  });

  const [userLevel, setUserLevel] = useState(() => {
    return getLocalStorageItem<number>(LEVEL_STORAGE_KEY, 1);
  });

  const [lastActivityDate, setLastActivityDate] = useState<string | null>(() => {
    return getLocalStorageItem<string | null>(LAST_ACTIVITY_DATE_KEY, null);
  });

  const [streak, setStreak] = useState(() => {
    const savedStreak = getLocalStorageItem<number>(STREAK_STORAGE_KEY, 0);
    const savedLastDate = getLocalStorageItem<string | null>(LAST_ACTIVITY_DATE_KEY, null);

    if (savedLastDate) {
      const daysDiff = differenceInCalendarDays(new Date(), parseISO(savedLastDate));
      if (daysDiff > 1) return 0;
    }
    return savedStreak;
  });

  useEffect(() => {
     const savedStreak = getLocalStorageItem<number>(STREAK_STORAGE_KEY, 0);
     if (streak === 0 && savedStreak > 0) {
        setLocalStorageItem(STREAK_STORAGE_KEY, 0);
     }
  }, [streak]);

  const completedLessonsSet = useMemo(() => {
    return new Set(completedLessons.map(l => `${l.moduleId}:${l.lessonId}`));
  }, [completedLessons]);

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString();
    let newStreak = 1;

    if (lastActivityDate) {
      const daysDiff = differenceInCalendarDays(new Date(), parseISO(lastActivityDate));
      if (daysDiff === 0) return streak;
      if (daysDiff === 1) newStreak = streak + 1;
    }

    setStreak(newStreak);
    setLastActivityDate(today);
    setLocalStorageItem(STREAK_STORAGE_KEY, newStreak);
    setLocalStorageItem(LAST_ACTIVITY_DATE_KEY, today);
    return newStreak;
  }, [streak, lastActivityDate]);

  const completeLesson = useCallback((moduleId: string, lessonId: string, xpReward: number) => {
    setCompletedLessons(prev => {
      if (prev.some(l => l.moduleId === moduleId && l.lessonId === lessonId)) return prev;

      const newProgress: LessonProgress = {
        moduleId,
        lessonId,
        completed: true,
        completedAt: new Date().toISOString(),
        xpEarned: xpReward,
      };

      const updated = [...prev, newProgress];
      setLocalStorageItem(PROGRESS_STORAGE_KEY, updated);

      const newXP = totalXP + xpReward;
      setTotalXP(newXP);
      setLocalStorageItem(XP_STORAGE_KEY, newXP);

      const newLevel = calculateLevel(newXP);
      setUserLevel(newLevel);
      setLocalStorageItem(LEVEL_STORAGE_KEY, newLevel);

      updateStreak();
      return updated;
    });
  }, [totalXP, updateStreak]);

  // Fix: accept argument to match expected signature
  const isModuleUnlocked = useCallback((_module: Module) => true, []); // TODO: Implement module unlocking logic

  const getModuleProgress = useCallback((moduleId: string): ModuleProgress => {
    return getModuleProgressUtil(moduleId, completedLessons, completedLessonsSet);
  }, [completedLessons, completedLessonsSet]);

  const isLessonCompletedCallback = useCallback((moduleId: string, lessonId: string) => {
    return isLessonCompleted(completedLessonsSet, moduleId, lessonId);
  }, [completedLessonsSet]);

  const overallProgress = useMemo(() => {
    return calculateOverallProgress(completedLessons, totalXP, userLevel, streak, completedLessonsSet);
  }, [completedLessons, totalXP, userLevel, streak, completedLessonsSet]);

  const resetProgress = useCallback(() => {
    setCompletedLessons([]);
    setTotalXP(0);
    setUserLevel(1);
    setStreak(0);
    setLastActivityDate(null);
    setLocalStorageItem(PROGRESS_STORAGE_KEY, []);
    setLocalStorageItem(XP_STORAGE_KEY, 0);
    setLocalStorageItem(LEVEL_STORAGE_KEY, 1);
    setLocalStorageItem(STREAK_STORAGE_KEY, 0);
    setLocalStorageItem(LAST_ACTIVITY_DATE_KEY, null);
  }, []);

  return {
    completedLessons,
    totalXP,
    userLevel,
    streak,
    completeLesson,
    isLessonCompleted: isLessonCompletedCallback,
    isModuleUnlocked,
    getModuleProgress,
    overallProgress,
    resetProgress,
  };
}
