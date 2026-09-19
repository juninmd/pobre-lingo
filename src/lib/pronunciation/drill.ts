import type { MinimalPair } from "./types";

export type DiscriminationRound = {
	pair: MinimalPair;
	answer: "a" | "b";
};

export type DiscriminationResult = {
	round: DiscriminationRound;
	choice: "a" | "b";
	correct: boolean;
};

export type DiscriminationSummary = {
	total: number;
	correct: number;
	score: number;
	missedPairs: MinimalPair[];
};

/** RNG injetável para testes determinísticos (padrão: Math.random). */
export type Rng = () => number;

function shuffle<T>(items: T[], rng: Rng): T[] {
	const copy = [...items];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}

/**
 * Monta `roundCount` rodadas de discriminação a partir dos pares de um foco,
 * balanceando a/b e evitando que a mesma palavra-alvo se repita em rodadas
 * consecutivas (quando há variedade suficiente de pares).
 */
export function buildDiscriminationRounds(
	pairs: MinimalPair[],
	roundCount: number,
	rng: Rng = Math.random,
): DiscriminationRound[] {
	if (pairs.length === 0) return [];

	const pool = shuffle(pairs, rng);
	const rounds: DiscriminationRound[] = [];
	let lastWord = "";

	for (let i = 0; i < roundCount; i++) {
		const pair = pool[i % pool.length];
		const answer: "a" | "b" = i % 2 === 0 ? "a" : "b";
		const targetWord = answer === "a" ? pair.a : pair.b;

		if (targetWord === lastWord && pairs.length > 1) {
			// Troca de resposta para evitar repetir a mesma palavra-alvo.
			const swapped: "a" | "b" = answer === "a" ? "b" : "a";
			const swappedWord = swapped === "a" ? pair.a : pair.b;
			if (swappedWord !== lastWord) {
				rounds.push({ pair, answer: swapped });
				lastWord = swappedWord;
				continue;
			}
		}

		rounds.push({ pair, answer });
		lastWord = targetWord;
	}

	return rounds;
}

/** Avalia uma escolha do aluno contra a rodada de discriminação. */
export function gradeDiscriminationChoice(
	round: DiscriminationRound,
	choice: "a" | "b",
): DiscriminationResult {
	return { round, choice, correct: choice === round.answer };
}

/** Resume os resultados de uma sessão de discriminação. */
export function summarizeDiscrimination(
	results: DiscriminationResult[],
): DiscriminationSummary {
	const total = results.length;
	const correct = results.filter((r) => r.correct).length;
	const missedPairs = results
		.filter((r) => !r.correct)
		.map((r) => r.round.pair);
	const score = total === 0 ? 0 : Math.round((correct / total) * 100);
	return { total, correct, score, missedPairs };
}
