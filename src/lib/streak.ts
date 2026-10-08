/**
 * Fonte única da ofensiva (streak).
 *
 * O app tinha três contadores independentes — um por hook — que divergiam
 * entre a barra lateral, o painel e as conquistas. Todo mundo passa a ler e
 * escrever daqui, sobre as mesmas chaves que o currículo já usava.
 */

import { differenceInCalendarDays, parseISO } from "date-fns";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

export const STREAK_KEY = "pobrelingo_streak";
export const LAST_ACTIVITY_KEY = "pobrelingo_last_activity_date";
/** Dias perdidos tolerados antes de zerar a ofensiva. */
export const GRACE_DAYS = 1;

function parseDate(iso: string | null): Date | null {
	if (!iso) return null;
	const parsed = parseISO(iso);
	return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Ofensiva atual, já considerando quebra por inatividade.
 * Leitura pura: não grava nada, para poder ser chamada em render.
 */
export function readStreak(now: Date = new Date()): number {
	const stored = getLocalStorageItem<number>(STREAK_KEY, 0);
	const lastActivity = parseDate(
		getLocalStorageItem<string | null>(LAST_ACTIVITY_KEY, null),
	);

	if (!lastActivity) return 0;
	// Tolera um dia perdido; só quebra após mais de um dia sem estudar.
	return differenceInCalendarDays(now, lastActivity) > GRACE_DAYS + 1
		? 0
		: stored;
}

export function readLastActivityDate(): string | null {
	return getLocalStorageItem<string | null>(LAST_ACTIVITY_KEY, null);
}

/**
 * Registra atividade de estudo hoje e devolve a ofensiva resultante.
 * Chamar mais de uma vez no mesmo dia é seguro — não incrementa duas vezes.
 */
export function recordStreakActivity(now: Date = new Date()): number {
	const stored = getLocalStorageItem<number>(STREAK_KEY, 0);
	const lastActivity = parseDate(
		getLocalStorageItem<string | null>(LAST_ACTIVITY_KEY, null),
	);

	let next: number;
	if (!lastActivity) {
		next = 1;
	} else {
		const gap = differenceInCalendarDays(now, lastActivity);
		if (gap === 0) return stored; // já contabilizado hoje
		next = gap <= GRACE_DAYS + 1 ? stored + 1 : 1;
	}

	setLocalStorageItem(STREAK_KEY, next);
	setLocalStorageItem(LAST_ACTIVITY_KEY, now.toISOString());
	return next;
}
