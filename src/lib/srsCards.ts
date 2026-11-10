/**
 * Lado de leitura da repetição espaçada: carregar cards e saber o que vence.
 * Não importa o agendador (ts-fsrs), então a casca do app pode contar
 * revisões pendentes sem baixar o motor de agendamento.
 */

import { getLocalStorageItem } from "@/lib/localStorage";
import type { ReviewCard } from "@/lib/srsTypes";
import { parseCards } from "@/lib/srsValidation";

export const CARDS_KEY = "pobrelingo_srs_cards";

export function loadCards(): ReviewCard[] {
	return parseCards(getLocalStorageItem<unknown>(CARDS_KEY, []));
}

/** Cards vencidos, mais atrasados primeiro. */
export function getDueCards(
	cards: ReviewCard[],
	now: Date = new Date(),
): ReviewCard[] {
	const nowMs = now.getTime();
	return cards
		.filter((c) => new Date(c.dueAt).getTime() <= nowMs)
		.sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());
}

export interface SrsStats {
	total: number;
	due: number;
	/** Nunca respondidos com sucesso. */
	learning: number;
	/** Intervalo >= 21 dias: considerado memorizado. */
	mature: number;
	/** Próxima revisão agendada, se não houver nada vencido agora. */
	nextDueAt: string | null;
}

export function getSrsStats(
	cards: ReviewCard[],
	now: Date = new Date(),
): SrsStats {
	const due = getDueCards(cards, now);
	const upcoming = cards
		.filter((c) => new Date(c.dueAt).getTime() > now.getTime())
		.sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());

	return {
		total: cards.length,
		due: due.length,
		learning: cards.filter((c) => c.repetitions === 0).length,
		mature: cards.filter((c) => c.intervalDays >= 21).length,
		nextDueAt: upcoming[0]?.dueAt ?? null,
	};
}
