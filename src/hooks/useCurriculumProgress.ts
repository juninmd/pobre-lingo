import { useState, useEffect, useCallback, useMemo } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/localStorage';
import { curriculumData, Module, Lesson } from '@/lib/curriculumData';

const PROGRESS_STORAGE_KEY = 'pobrelingo_curriculum_progress';
const XP_STORAGE_KEY = 'pobrelingo_total_xp';
const LEVEL_STORAGE_KEY = 'pobrelingo_user_level';

export interface LessonProgress {
  lessonId: string;
  moduleId: string;
  completed: boolean;
  completedAt?: string;
  xpEarned: number;
}

export interface ModuleProgress {
  moduleId: string;
  unlocked: boolean;
  startedAt?: string;
  completedAt?: string;
  lessonsCompleted: number;
  totalLessons: number;
  completionPercentage: number;
}

export interface UserProgress {
  completedLessons: LessonProgress[];
  totalXP: number;
  userLevel: number;
  currentStreak: number;
  longestStreak: number;
}

export function useCurriculumProgress() {
  const [completedLessons, setCompletedLessons] = useState<LessonProgress[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);

  const completedLessonsSet = useMemo(() => {
    return new Set(completedLessons.map(l => `${l.moduleId}:${l.lessonId}`));
  }, [completedLessons]);

  // Carregar progresso do localStorage
  useEffect(() => {
    const savedProgress = getLocalStorageItem<LessonProgress[]>(PROGRESS_STORAGE_KEY, []);
    const savedXP = getLocalStorageItem<number>(XP_STORAGE_KEY, 0);
    const savedLevel = getLocalStorageItem<number>(LEVEL_STORAGE_KEY, 1);

    setCompletedLessons(savedProgress);
    setTotalXP(savedXP);
    setUserLevel(savedLevel);
  }, []);

  // Calcular nível baseado em XP (100 XP por nível)
  const calculateLevel = useCallback((xp: number) => {
    return Math.floor(xp / 100) + 1;
  }, []);

  // Marcar lição como concluída
  const completeLesson = useCallback((moduleId: string, lessonId: string, xpReward: number) => {
    setCompletedLessons(prev => {
      // Verificar se já foi concluída
      const alreadyCompleted = prev.some(
        l => l.moduleId === moduleId && l.lessonId === lessonId
      );

      if (alreadyCompleted) {
        return prev;
      }

      const newProgress: LessonProgress = {
        moduleId,
        lessonId,
        completed: true,
        completedAt: new Date().toISOString(),
        xpEarned: xpReward,
      };

      const updated = [...prev, newProgress];
      setLocalStorageItem(PROGRESS_STORAGE_KEY, updated);

      // Atualizar XP
      const newXP = totalXP + xpReward;
      setTotalXP(newXP);
      setLocalStorageItem(XP_STORAGE_KEY, newXP);

      // Atualizar nível
      const newLevel = calculateLevel(newXP);
      setUserLevel(newLevel);
      setLocalStorageItem(LEVEL_STORAGE_KEY, newLevel);

      return updated;
    });
  }, [totalXP, calculateLevel]);

  // Verificar se uma lição está concluída
  const isLessonCompleted = useCallback((moduleId: string, lessonId: string) => {
    return completedLessonsSet.has(`${moduleId}:${lessonId}`);
  }, [completedLessonsSet]);

  // Verificar se um módulo está desbloqueado
  const isModuleUnlocked = useCallback((module: Module) => {
    // Primeiro módulo sempre desbloqueado
    if (!module.prerequisites || module.prerequisites.length === 0) {
      return true;
    }

    // Verificar se todos os pré-requisitos estão completos
    return module.prerequisites.every(prereqId => {
      const prereqModule = curriculumData.modules.find(m => m.id === prereqId);
      if (!prereqModule) return false;

      const moduleProgress = getModuleProgress(prereqId);
      return moduleProgress.completionPercentage === 100;
    });
  }, [completedLessons]);

  // Obter progresso de um módulo específico
  const getModuleProgress = useCallback((moduleId: string): ModuleProgress => {
    const module = curriculumData.modules.find(m => m.id === moduleId);
    if (!module) {
      return {
        moduleId,
        unlocked: false,
        lessonsCompleted: 0,
        totalLessons: 0,
        completionPercentage: 0,
      };
    }

    const totalLessons = module.lessons.length;
    const lessonsCompleted = module.lessons.filter(lesson =>
      isLessonCompleted(moduleId, lesson.id)
    ).length;

    const completionPercentage = totalLessons > 0
      ? Math.round((lessonsCompleted / totalLessons) * 100)
      : 0;

    const completedLessonsData = completedLessons.filter(l => l.moduleId === moduleId);
    const startedAt = completedLessonsData.length > 0
      ? completedLessonsData[0].completedAt
      : undefined;
    const completedAt = completionPercentage === 100
      ? completedLessonsData[completedLessonsData.length - 1]?.completedAt
      : undefined;

    return {
      moduleId,
      unlocked: isModuleUnlocked(module),
      startedAt,
      completedAt,
      lessonsCompleted,
      totalLessons,
      completionPercentage,
    };
  }, [completedLessons, isLessonCompleted, isModuleUnlocked]);

  // Obter estatísticas gerais
  const getOverallProgress = useCallback(() => {
    const totalModules = curriculumData.modules.length;
    const totalLessons = curriculumData.modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0
    );
    const completedLessonsCount = completedLessons.length;
    const overallPercentage = totalLessons > 0
      ? Math.round((completedLessonsCount / totalLessons) * 100)
      : 0;

    const unlockedModules = curriculumData.modules.filter(m => isModuleUnlocked(m)).length;
    const completedModules = curriculumData.modules.filter(m => {
      const progress = getModuleProgress(m.id);
      return progress.completionPercentage === 100;
    }).length;

    return {
      totalModules,
      unlockedModules,
      completedModules,
      totalLessons,
      completedLessons: completedLessonsCount,
      overallPercentage,
      totalXP,
      userLevel,
      xpToNextLevel: (userLevel * 100) - totalXP,
    };
  }, [completedLessons, totalXP, userLevel, isModuleUnlocked, getModuleProgress]);

  // Resetar progresso (para testes)
  const resetProgress = useCallback(() => {
    setCompletedLessons([]);
    setTotalXP(0);
    setUserLevel(1);
    setLocalStorageItem(PROGRESS_STORAGE_KEY, []);
    setLocalStorageItem(XP_STORAGE_KEY, 0);
    setLocalStorageItem(LEVEL_STORAGE_KEY, 1);
  }, []);

  return {
    completedLessons,
    totalXP,
    userLevel,
    completeLesson,
    isLessonCompleted,
    isModuleUnlocked,
    getModuleProgress,
    getOverallProgress,
    resetProgress,
  };
}
