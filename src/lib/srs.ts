/**
 * Motor de Repetição Espaçada.
 *
 * Cada item que o usuário erra — ou marca para revisar — vira um card com
 * agendamento próprio (FSRS, em srsScheduler.ts): o conteúdo difícil volta
 * rápido e o consolidado some do caminho. Persistido em localStorage.
 */

import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import { scheduleCard } from "@/lib/srsScheduler";
import {
	GRADE_AGAIN,
	type NewCardInput,
	type ReviewCard,
} from "@/lib/srsTypes";

export { previewInterval, scheduleCard } from "@/lib/srsScheduler";

const CARDS_KEY = "pobrelingo_srs_cards";
const MAX_CARDS = 500;

/** Campo legado do SM-2, mantido para cards antigos e backups. */
const DEFAULT_EASE_FACTOR = 2.5;

export type {
	CardSource,
	FsrsState,
	NewCardInput,
	ReviewCard,
	ReviewGrade,
} from "@/lib/srsTypes";
export {
	GRADE_AGAIN,
	GRADE_EASY,
	GRADE_GOOD,
	GRADE_HARD,
} from "@/lib/srsTypes";

export function loadCards(): ReviewCard[] {
	return getLocalStorageItem<ReviewCard[]>(CARDS_KEY, []);
}

export function saveCards(cards: ReviewCard[]): void {
	setLocalStorageItem(CARDS_KEY, cards);
}

function createCard(input: NewCardInput, now: Date): ReviewCard {
	return {
		...input,
		repetitions: 0,
		easeFactor: DEFAULT_EASE_FACTOR,
		intervalDays: 0,
		// Card novo entra devendo revisão imediata.
		dueAt: now.toISOString(),
		lapses: 0,
		createdAt: now.toISOString(),
	};
}

/**
 * Registra um item para revisão. Se o card já existe, apenas antecipa a
 * revisão (o usuário errou de novo) sem destruir o histórico de agendamento.
 */
export function upsertCard(
	cards: ReviewCard[],
	input: NewCardInput,
	now: Date = new Date(),
): ReviewCard[] {
	const existing = cards.find((c) => c.id === input.id);

	if (existing) {
		return cards.map((c) =>
			c.id === input.id
				? scheduleCard({ ...c, ...input }, GRADE_AGAIN, now)
				: c,
		);
	}

	const appended = [...cards, createCard(input, now)];
	if (appended.length <= MAX_CARDS) return appended;

	// Ao estourar o teto, descarta os cards mais consolidados (intervalo maior),
	// que são justamente os que o usuário menos precisa rever.
	return [...appended]
		.sort((a, b) => a.intervalDays - b.intervalDays)
		.slice(0, MAX_CARDS);
}

/**
 * Inscreve itens estudados (não errados) na revisão. Diferente de upsertCard,
 * não mexe em cards que já existem: concluir a lição de novo não é um erro.
 */
export function enrollCards(
	cards: ReviewCard[],
	inputs: NewCardInput[],
	now: Date = new Date(),
): ReviewCard[] {
	const known = new Set(cards.map((card) => card.id));
	const fresh = inputs.filter((input) => !known.has(input.id));
	if (fresh.length === 0) return cards;
	return [...cards, ...fresh.map((input) => createCard(input, now))].slice(
		-MAX_CARDS,
	);
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
