// @ts-nocheck
import { useCallback, useEffect, useMemo, useState } from "react";
import { useActivityLog } from "@/hooks/useActivityLog";
import { curriculumData, type Module } from "@/lib/curriculumData";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import {
	readLastActivityDate,
	readStreak,
	recordStreakActivity,
} from "@/lib/streak";

// Otimização: Mapa para busca O(1) de módulos
const moduleMap = new Map(curriculumData.modules.map((m) => [m.id, m]));

const PROGRESS_STORAGE_KEY = "pobrelingo_curriculum_progress";
const XP_STORAGE_KEY = "pobrelingo_total_xp";
const LEVEL_STORAGE_KEY = "pobrelingo_user_level";
const STREAK_STORAGE_KEY = "pobrelingo_streak";
const LAST_ACTIVITY_DATE_KEY = "pobrelingo_last_activity_date";

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
	const { logActivity } = useActivityLog();
	const [completedLessons, setCompletedLessons] = useState<LessonProgress[]>(
		() => {
			return getLocalStorageItem<LessonProgress[]>(PROGRESS_STORAGE_KEY, []);
		},
	);

	const [totalXP, setTotalXP] = useState(() => {
		return getLocalStorageItem<number>(XP_STORAGE_KEY, 0);
	});

	const [userLevel, setUserLevel] = useState(() => {
		return getLocalStorageItem<number>(LEVEL_STORAGE_KEY, 1);
	});

	const [lastActivityDate, setLastActivityDate] = useState<string | null>(() =>
		readLastActivityDate(),
	);

	const [streak, setStreak] = useState(() => readStreak());

	// Sequência quebrada: persiste o zero para as demais telas lerem o mesmo valor.
	useEffect(() => {
		const savedStreak = getLocalStorageItem<number>(STREAK_STORAGE_KEY, 0);
		if (streak === 0 && savedStreak > 0) {
			setLocalStorageItem(STREAK_STORAGE_KEY, 0);
		}
	}, [streak]);

	const completedLessonsSet = useMemo(() => {
		return new Set(completedLessons.map((l) => `${l.moduleId}:${l.lessonId}`));
	}, [completedLessons]);

	// Calcular nível baseado em XP (100 XP por nível)
	const calculateLevel = useCallback((xp: number) => {
		return Math.floor(xp / 100) + 1;
	}, []);

	// Update streak logic — delega para a fonte única (lib/streak).
	const updateStreak = useCallback(() => {
		const newStreak = recordStreakActivity();
		setStreak(newStreak);
		setLastActivityDate(readLastActivityDate());
		return newStreak;
	}, []);

	// Marcar lição como concluída
	const completeLesson = useCallback(
		(moduleId: string, lessonId: string, xpReward: number) => {
			setCompletedLessons((prev) => {
				// Verificar se já foi concluída
				const alreadyCompleted = prev.some(
					(l) => l.moduleId === moduleId && l.lessonId === lessonId,
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

				// Atualizar Streak
				updateStreak();

				// Log activity for daily goal tracking
				logActivity();

				return updated;
			});
		},
		[
			totalXP,
			calculateLevel,
			updateStreak, // Log activity for daily goal tracking
			logActivity,
		],
	);

	// Verificar se uma lição está concluída
	const isLessonCompleted = useCallback(
		(moduleId: string, lessonId: string) => {
			return completedLessonsSet.has(`${moduleId}:${lessonId}`);
		},
		[completedLessonsSet],
	);

	// Helper para calcular porcentagem de conclusão sem dependências circulares
	const getModuleCompletionStats = useCallback(
		(module: Module) => {
			const totalLessons = module.lessons.length;
			const lessonsCompleted = module.lessons.filter((lesson) =>
				isLessonCompleted(module.id, lesson.id),
			).length;

			const completionPercentage =
				totalLessons > 0
					? Math.round((lessonsCompleted / totalLessons) * 100)
					: 0;

			return { lessonsCompleted, totalLessons, completionPercentage };
		},
		[isLessonCompleted],
	);

	// Verificar se um módulo está desbloqueado
	const isModuleUnlocked = useCallback((_module: Module) => {
		// Agora todos os módulos estão desbloqueados por padrão a pedido do usuário
		return true;
	}, []);

	// Obter progresso completo de um módulo específico
	const getModuleProgress = useCallback(
		(moduleId: string): ModuleProgress => {
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

			const { lessonsCompleted, totalLessons, completionPercentage } =
				getModuleCompletionStats(module);

			const completedLessonsData = completedLessons.filter(
				(l) => l.moduleId === moduleId,
			);
			const startedAt =
				completedLessonsData.length > 0
					? completedLessonsData[0].completedAt
					: undefined;
			const completedAt =
				completionPercentage === 100
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
		},
		[completedLessons, getModuleCompletionStats, isModuleUnlocked],
	);

	// Obter estatísticas gerais
	const overallProgress = useMemo(() => {
		const totalModules = curriculumData.modules.length;
		const totalLessons = curriculumData.modules.reduce(
			(sum, module) => sum + module.lessons.length,
			0,
		);
		const completedLessonsCount = completedLessons.length;
		const overallPercentage =
			totalLessons > 0
				? Math.round((completedLessonsCount / totalLessons) * 100)
				: 0;

		const unlockedModules = curriculumData.modules.filter((m) =>
			isModuleUnlocked(m),
		).length;
		const completedModules = curriculumData.modules.filter((m) => {
			const { completionPercentage } = getModuleCompletionStats(m);
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
			xpToNextLevel: userLevel * 100 - totalXP,
			streak,
		};
	}, [
		completedLessons,
		totalXP,
		userLevel,
		isModuleUnlocked,
		getModuleCompletionStats,
		streak,
	]);

	// Resetar progresso (para testes)
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
		lastActivityDate,
		completeLesson,
		isLessonCompleted,
		isModuleUnlocked,
		getModuleProgress,
		overallProgress,
		resetProgress,
	};
}
