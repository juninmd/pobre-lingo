export type CardSource =
	| "vocabulary"
	| "grammar"
	| "exercise"
	| "quiz"
	| "listening"
	| "dictionary";

/**
 * Qualidade da resposta (0–5). A UI expõe só 4 opções:
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
	/** Estado do FSRS; ausente em cards criados antes da migração do SM-2. */
	fsrs?: FsrsState;
}

export interface FsrsState {
	stability: number;
	difficulty: number;
	elapsed_days: number;
	scheduled_days: number;
	learning_steps: number;
	reps: number;
	lapses: number;
	state: number;
	last_review?: string;
}

export type NewCardInput = Pick<
	ReviewCard,
	"id" | "source" | "front" | "back"
> &
	Partial<Pick<ReviewCard, "hint" | "href">>;
