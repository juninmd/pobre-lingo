import { curriculumData, Module } from '@/lib/curriculumData';
import { LessonProgress, ModuleProgress, OverallProgressStats } from './progressTypes';

// Otimização: Mapa para busca O(1) de módulos
export const moduleMap = new Map(curriculumData.modules.map(m => [m.id, m]));

// Calcular nível baseado em XP (100 XP por nível)
export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

// Verificar se uma lição está concluída
export function isLessonCompleted(
  completedLessonsSet: Set<string>,
  moduleId: string,
  lessonId: string
): boolean {
  return completedLessonsSet.has(`${moduleId}:${lessonId}`);
}

// Helper para calcular estatísticas de conclusão de um módulo
export function calculateModuleStats(
  module: Module,
  completedLessonsSet: Set<string>
): { lessonsCompleted: number; totalLessons: number; completionPercentage: number } {
  const totalLessons = module.lessons.length;
  const lessonsCompleted = module.lessons.filter(lesson =>
    isLessonCompleted(completedLessonsSet, module.id, lesson.id)
  ).length;

  const completionPercentage = totalLessons > 0
    ? Math.round((lessonsCompleted / totalLessons) * 100)
    : 0;

  return { lessonsCompleted, totalLessons, completionPercentage };
}

// Obter progresso completo de um módulo específico
export function getModuleProgress(
  moduleId: string,
  completedLessons: LessonProgress[],
  completedLessonsSet: Set<string>
): ModuleProgress {
  const module = moduleMap.get(moduleId);
  if (!module) {
    return {
      moduleId,
      unlocked: false,
      lessonsCompleted: 0,
      totalLessons: 0,
      completionPercentage: 0,
    };
  }

  const { lessonsCompleted, totalLessons, completionPercentage } = calculateModuleStats(module, completedLessonsSet);

  const completedLessonsData = completedLessons.filter(l => l.moduleId === moduleId);
  const startedAt = completedLessonsData.length > 0
    ? completedLessonsData[0].completedAt
    : undefined;
  const completedAt = completionPercentage === 100
    ? completedLessonsData[completedLessonsData.length - 1]?.completedAt
    : undefined;

  // Assumindo que todos os módulos estão desbloqueados por padrão como na lógica original
  const unlocked = true;

  return {
    moduleId,
    unlocked,
    startedAt,
    completedAt,
    lessonsCompleted,
    totalLessons,
    completionPercentage,
  };
}

// Obter estatísticas gerais
export function calculateOverallProgress(
  completedLessons: LessonProgress[],
  totalXP: number,
  userLevel: number,
  streak: number,
  completedLessonsSet: Set<string>
): OverallProgressStats {
  const totalModules = curriculumData.modules.length;
  const totalLessons = curriculumData.modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );
  const completedLessonsCount = completedLessons.length;
  const overallPercentage = totalLessons > 0
    ? Math.round((completedLessonsCount / totalLessons) * 100)
    : 0;

  // Assumindo unlocked = true para todos
  const unlockedModules = totalModules;

  const completedModules = curriculumData.modules.filter(m => {
    const { completionPercentage } = calculateModuleStats(m, completedLessonsSet);
    return completionPercentage === 100;
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
    streak,
  };
}
