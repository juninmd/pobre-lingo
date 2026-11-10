/**
 * Motor de Repetição Espaçada.
 *
 * Cada item que o usuário erra — ou marca para revisar — vira um card com
 * agendamento próprio (FSRS, em srsScheduler.ts): o conteúdo difícil volta
 * rápido e o consolidado some do caminho. Persistido em localStorage.
 */

import { capCards } from "@/lib/srsCap";
import { scheduleCard } from "@/lib/srsScheduler";
import {
	GRADE_AGAIN,
	type NewCardInput,
	type ReviewCard,
} from "@/lib/srsTypes";

export {
	CARDS_KEY,
	getDueCards,
	getSrsStats,
	loadCards,
	type SrsStats,
} from "@/lib/srsCards";
export { previewInterval, scheduleCard } from "@/lib/srsScheduler";

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

	return capCards([...cards, createCard(input, now)]);
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
	return capCards([...cards, ...fresh.map((input) => createCard(input, now))]);
}
