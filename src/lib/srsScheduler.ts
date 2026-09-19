/**
 * Agendamento FSRS (o mesmo algoritmo padrão do Anki): estima estabilidade e
 * dificuldade de cada card para revisar perto do ponto de esquecimento, com
 * 20–30% menos revisões que o SM-2 para a mesma retenção.
 */
import {
	type Card,
	createEmptyCard,
	fsrs,
	type Grade,
	Rating,
	State,
} from "ts-fsrs";
import type { FsrsState, ReviewCard, ReviewGrade } from "@/lib/srsTypes";

const scheduler = fsrs({ enable_fuzz: false });

function toRating(grade: ReviewGrade): Grade {
	if (grade < 3) return Rating.Again;
	if (grade === 3) return Rating.Hard;
	if (grade === 4) return Rating.Good;
	return Rating.Easy;
}

/** Converte um card do SM-2 antigo sem perder o que o aluno já consolidou. */
function fromLegacy(card: ReviewCard, now: Date): Card {
	const empty = createEmptyCard(now);
	if (card.repetitions === 0 || !card.lastReviewedAt) {
		return { ...empty, due: new Date(card.dueAt) };
	}
	// Ease 1.3 (difícil) → dificuldade 10; ease 3.0 (fácil) → 1.
	const difficulty = Math.min(
		10,
		Math.max(1, 10 - ((card.easeFactor - 1.3) / 1.7) * 9),
	);
	return {
		...empty,
		state: State.Review,
		stability: Math.max(1, card.intervalDays),
		difficulty,
		reps: card.repetitions,
		lapses: card.lapses,
		scheduled_days: card.intervalDays,
		last_review: new Date(card.lastReviewedAt),
		due: new Date(card.dueAt),
	};
}

function toFsrsCard(card: ReviewCard, now: Date): Card {
	if (!card.fsrs) return fromLegacy(card, now);
	return {
		...card.fsrs,
		due: new Date(card.dueAt),
		last_review: card.fsrs.last_review
			? new Date(card.fsrs.last_review)
			: undefined,
	};
}

function toFsrsState(card: Card): FsrsState {
	return {
		stability: card.stability,
		difficulty: card.difficulty,
		elapsed_days: card.elapsed_days,
		scheduled_days: card.scheduled_days,
		learning_steps: card.learning_steps,
		reps: card.reps,
		lapses: card.lapses,
		state: card.state,
		last_review: card.last_review?.toISOString(),
	};
}

/** Aplica a nota e devolve o card reagendado. Função pura. */
export function scheduleCard(
	card: ReviewCard,
	grade: ReviewGrade,
	now: Date = new Date(),
): ReviewCard {
	const next = scheduler.next(toFsrsCard(card, now), now, toRating(grade)).card;
	const failed = grade < 3;
	return {
		...card,
		fsrs: toFsrsState(next),
		repetitions: failed ? 0 : card.repetitions + 1,
		lapses: failed ? card.lapses + 1 : card.lapses,
		intervalDays: next.scheduled_days,
		lastReviewedAt: now.toISOString(),
		dueAt: next.due.toISOString(),
	};
}

/** Rótulo curto do próximo intervalo, para mostrar nos botões de nota. */
export function previewInterval(
	card: ReviewCard,
	grade: ReviewGrade,
	now: Date = new Date(),
): string {
	const next = scheduleCard(card, grade, now);
	const minutes = Math.round(
		(new Date(next.dueAt).getTime() - now.getTime()) / 60_000,
	);
	if (minutes < 60) return `${Math.max(1, minutes)} min`;
	if (minutes < 24 * 60) return `${Math.round(minutes / 60)} h`;
	const days = Math.round(minutes / (24 * 60));
	if (days === 1) return "1 dia";
	if (days < 30) return `${days} dias`;
	const months = Math.round(days / 30);
	return months === 1 ? "1 mês" : `${months} meses`;
}
