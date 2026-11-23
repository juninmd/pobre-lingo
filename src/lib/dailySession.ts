import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import { dayKey, type StudyLog, totalsByKind } from "@/lib/studyTime";

/** Ler e ouvir é consumo; falar e escrever é produção. "study" (exercícios) não entra na proporção. */
export const PRODUCTION_TARGET = 0.35;
/** Só avalia a proporção com pelo menos 20 min de consumo+produção na semana. */
const MIN_SPLIT_SECONDS = 20 * 60;

export const GOAL_KEY = "pobrelingo_daily_goal_min";
export const DEFAULT_GOAL_MIN = 15;
export const MIN_GOAL_MIN = 5;
export const MAX_GOAL_MIN = 120;

export const clampGoal = (minutes: number): number =>
	Number.isFinite(minutes)
		? Math.min(MAX_GOAL_MIN, Math.max(MIN_GOAL_MIN, Math.round(minutes)))
		: DEFAULT_GOAL_MIN;

export const loadGoalMinutes = (): number =>
	clampGoal(getLocalStorageItem<number>(GOAL_KEY, DEFAULT_GOAL_MIN));

export const saveGoalMinutes = (minutes: number) =>
	setLocalStorageItem(GOAL_KEY, clampGoal(minutes));

/** Minutos estudados no dia local de `now`, somando todas as vertentes. */
export function minutesToday(log: StudyLog, now: Date): number {
	const day = log.days[dayKey(now)] ?? {};
	const seconds = Object.values(day).reduce((sum, s) => sum + (s ?? 0), 0);
	return Math.floor(seconds / 60);
}

export interface WeekSplit {
	productionMin: number;
	consumptionMin: number;
	/** Fração 0-1 de produção; null quando há pouco dado para opinar. */
	share: number | null;
	lowProduction: boolean;
}

/** Produção vs consumo nos últimos 7 dias (inclui hoje). */
export function weekSplit(log: StudyLog, now: Date): WeekSplit {
	const start = new Date(now);
	start.setDate(start.getDate() - 6);
	const t = totalsByKind(log, dayKey(start));
	const production = t.speaking + t.writing;
	const consumption = t.reading + t.listening;
	const total = production + consumption;
	const share = total >= MIN_SPLIT_SECONDS ? production / total : null;
	return {
		productionMin: Math.round(production / 60),
		consumptionMin: Math.round(consumption / 60),
		share,
		lowProduction: share !== null && share < PRODUCTION_TARGET,
	};
}
