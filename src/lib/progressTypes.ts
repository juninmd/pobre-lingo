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

export interface OverallProgressStats {
  totalModules: number;
  unlockedModules: number;
  completedModules: number;
  totalLessons: number;
  completedLessons: number;
  overallPercentage: number;
  totalXP: number;
  userLevel: number;
  xpToNextLevel: number;
  streak: number;
}
