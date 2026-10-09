/**
 * Rule engine: evaluates local state and returns what deserves a notification.
 * Dedupe by key is the consumer's job (notificationStorage).
 */

import { localDay } from "@/lib/localDay";
import { getLocalStorageItem } from "@/lib/localStorage";
import type {
	AppNotification,
	NotificationCategory,
	NotificationPrefs,
} from "@/lib/notificationCatalog";
import { isSafeInternalHref } from "@/lib/safeHref";
import { getDueCards, loadCards } from "@/lib/srs";
import { isNonNegativeNumber, isRecord } from "@/lib/storageGuards";

const DAILY_GOAL = 5;

export interface NotificationSignals {
	now: Date;
	streak: number;
	lastActivityDate: string | null;
	activityToday: number;
	dueReviews: number;
	reminderHour: number;
	reminderMinute: number;
}

function daysSince(iso: string | null, now: Date): number | null {
	if (!iso) return null;
	const then = new Date(iso);
	if (Number.isNaN(then.getTime())) return null;
	const a = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
	).getTime();
	const b = new Date(
		then.getFullYear(),
		then.getMonth(),
		then.getDate(),
	).getTime();
	return Math.round((a - b) / 86_400_000);
}

const isString = (value: unknown): value is string => typeof value === "string";

/** Same log and local-day key that useActivityLog writes. */
function activityCountOn(day: string): number {
	const log = getLocalStorageItem<unknown>("pobrelingo_activity_log", []);
	if (!Array.isArray(log)) return 0;
	const entry = log.find((e) => isRecord(e) && e.date === day);
	return isRecord(entry) && isNonNegativeNumber(entry.count) ? entry.count : 0;
}

/** Reads the persisted state the rules need. */
export function collectSignals(
	prefs: NotificationPrefs,
	now: Date = new Date(),
): NotificationSignals {
	const [hourRaw, minuteRaw] = prefs.reminderTime.split(":");
	const reminderHour = Number.parseInt(hourRaw, 10);
	const reminderMinute = Number.parseInt(minuteRaw, 10);

	return {
		now,
		streak: getLocalStorageItem<number>(
			"pobrelingo_streak",
			0,
			isNonNegativeNumber,
		),
		lastActivityDate: getLocalStorageItem<string | null>(
			"pobrelingo_last_activity_date",
			null,
			isString,
		),
		activityToday: activityCountOn(localDay(now)),
		dueReviews: getDueCards(loadCards(), now).length,
		reminderHour: Number.isNaN(reminderHour) ? 19 : reminderHour,
		reminderMinute: Number.isNaN(reminderMinute) ? 0 : reminderMinute,
	};
}

export interface NotificationCandidate {
	/** Dedupe key — usually `rule:YYYY-MM-DD`. */
	key: string;
	category: NotificationCategory;
	title: string;
	body: string;
	href?: string;
}

/**
 * Evaluates every rule and returns what should be notified now.
 * Dedupe by key is the consumer's job.
 */
export function evaluateRules(
	signals: NotificationSignals,
): NotificationCandidate[] {
	const { now, streak, activityToday, dueReviews, lastActivityDate } = signals;
	const day = localDay(now);
	const hour = now.getHours();
	const idleDays = daysSince(lastActivityDate, now);
	const studiedToday = activityToday > 0;
	const candidates: NotificationCandidate[] = [];

	// At-risk streak: only matters in the evening and before any study today.
	if (streak > 0 && !studiedToday && hour >= 18) {
		candidates.push({
			key: `streak-risk:${day}`,
			category: "streak",
			title: `🔥 Sua ofensiva de ${streak} ${streak === 1 ? "dia" : "dias"} está em risco`,
			body: "Faça uma atividade rápida antes da meia-noite para manter a sequência viva.",
			href: "/",
		});
	}

	// Comeback after the user went idle.
	if (idleDays !== null && idleDays >= 3) {
		candidates.push({
			key: `comeback:${day}`,
			category: "streak",
			title: "Bora retomar? 👋",
			body: `Você está há ${idleDays} dias sem estudar. Cinco minutos já recolocam você nos trilhos.`,
			href: "/",
		});
	}

	// Overdue reviews: the strongest pedagogical signal.
	if (dueReviews > 0) {
		candidates.push({
			key: `reviews-due:${day}`,
			category: "review",
			title: `🧠 ${dueReviews} ${dueReviews === 1 ? "card pronto" : "cards prontos"} para revisão`,
			body: "Revisar no momento certo é o que fixa o vocabulário de verdade.",
			href: "/review",
		});
	}

	// Daily reminder at the user's chosen time.
	if (!studiedToday && hour >= signals.reminderHour) {
		candidates.push({
			key: `daily-reminder:${day}`,
			category: "quest",
			title: "Hora do inglês ⏰",
			body: "Sua sessão de hoje ainda não começou. Que tal uma lição rápida agora?",
			href: "/",
		});
	}

	// Half of the daily goal: a nudge to close the day.
	if (studiedToday && activityToday < DAILY_GOAL && hour >= 12) {
		const missing = DAILY_GOAL - activityToday;
		candidates.push({
			key: `daily-goal:${day}`,
			category: "quest",
			title: "Você está quase lá 🎯",
			body: `Faltam ${missing} ${missing === 1 ? "atividade" : "atividades"} para completar a meta de hoje.`,
			href: "/",
		});
	}

	// Word of the day: light content for users who already did the rest.
	candidates.push({
		key: `word-of-day:${day}`,
		category: "content",
		title: "📖 Palavra do dia disponível",
		body: "Uma palavra nova te espera no painel. Leva 30 segundos.",
		href: "/",
	});

	return candidates;
}

/** Builds a notification ready for the inbox. */
export function createNotification(
	input: Omit<AppNotification, "id" | "createdAt" | "read"> & { id?: string },
): AppNotification {
	return {
		id:
			input.id ??
			`${input.category}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
		category: input.category,
		title: input.title,
		body: input.body,
		// Navigation only to internal routes, even if the caller passes something else.
		href: isSafeInternalHref(input.href) ? input.href : undefined,
		createdAt: new Date().toISOString(),
		read: false,
	};
}
