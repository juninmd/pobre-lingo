/**
 * Motor de Repetição Espaçada (SM-2 adaptado).
 *
 * Cada item que o usuário erra — ou marca para revisar — vira um card com
 * agendamento próprio. O algoritmo SM-2 ajusta o intervalo pela qualidade da
 * resposta, então o conteúdo difícil volta rápido e o consolidado some do
 * caminho. Persistido em localStorage (app é 100% client-side).
 */

import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

const CARDS_KEY = "pobrelingo_srs_cards";
const MAX_CARDS = 500;

/** Intervalo aplicado quando o usuário erra: revisar ainda na mesma sessão. */
const RELEARN_MINUTES = 10;
const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

export type CardSource =
	| "vocabulary"
	| "grammar"
	| "exercise"
	| "quiz"
	| "listening"
	| "dictionary";

/**
 * Qualidade da resposta no padrão SM-2 (0–5). A UI expõe só 4 opções:
 * Errei (1), Difícil (3), Bom (4), Fácil (5).
 */
export type ReviewGrade = 0 | 1 | 2 | 3 | 4 | 5;

export const GRADE_AGAIN: ReviewGrade = 1;
export const GRADE_HARD: ReviewGrade = 3;
export const GRADE_GOOD: ReviewGrade = 4;
export const GRADE_EASY: ReviewGrade = 5;

export interface ReviewCard {
	id: string;
	source: CardSource;
	/** Frente do card: a pergunta, ou a palavra em inglês. */
	front: string;
	/** Verso: a resposta correta. */
	back: string;
	/** Contexto opcional (frase de exemplo, explicação da regra). */
	hint?: string;
	/** Rota para estudar o assunto de origem. */
	href?: string;
	repetitions: number;
	easeFactor: number;
	intervalDays: number;
	dueAt: string;
	lapses: number;
	createdAt: string;
	lastReviewedAt?: string;
}

export type NewCardInput = Pick<
	ReviewCard,
	"id" | "source" | "front" | "back"
> &
	Partial<Pick<ReviewCard, "hint" | "href">>;

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
				? {
						...c,
						...input,
						lapses: c.lapses + 1,
						repetitions: 0,
						intervalDays: 0,
						easeFactor: Math.max(MIN_EASE_FACTOR, c.easeFactor - 0.2),
						dueAt: new Date(
							now.getTime() + RELEARN_MINUTES * 60_000,
						).toISOString(),
					}
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

/** Aplica SM-2 e devolve o card reagendado. Função pura. */
export function scheduleCard(
	card: ReviewCard,
	grade: ReviewGrade,
	now: Date = new Date(),
): ReviewCard {
	const easeFactor = Math.max(
		MIN_EASE_FACTOR,
		card.easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
	);

	if (grade < 3) {
		return {
			...card,
			repetitions: 0,
			intervalDays: 0,
			easeFactor,
			lapses: card.lapses + 1,
			lastReviewedAt: now.toISOString(),
			dueAt: new Date(now.getTime() + RELEARN_MINUTES * 60_000).toISOString(),
		};
	}

	const repetitions = card.repetitions + 1;
	let intervalDays: number;
	if (repetitions === 1) {
		intervalDays = 1;
	} else if (repetitions === 2) {
		intervalDays = 6;
	} else {
		intervalDays = Math.round(card.intervalDays * easeFactor);
	}

	return {
		...card,
		repetitions,
		intervalDays,
		easeFactor,
		lastReviewedAt: now.toISOString(),
		dueAt: new Date(now.getTime() + intervalDays * 86_400_000).toISOString(),
	};
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

/** Rótulo curto do próximo intervalo, para mostrar nos botões de nota. */
export function previewInterval(card: ReviewCard, grade: ReviewGrade): string {
	const next = scheduleCard(card, grade, new Date());
	if (next.intervalDays === 0) return `${RELEARN_MINUTES} min`;
	if (next.intervalDays === 1) return "1 dia";
	if (next.intervalDays < 30) return `${next.intervalDays} dias`;
	const months = Math.round(next.intervalDays / 30);
	return months === 1 ? "1 mês" : `${months} meses`;
}
