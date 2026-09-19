import type { Token, WordToken } from "./tokenize";

/**
 * Cobertura lexical (Hu & Nation, 2000): com ~98% das palavras corridas
 * conhecidas a leitura é confortável; abaixo de ~95% o texto fica difícil.
 */
export const COMFORT_COVERAGE = 0.98;
export const MIN_COVERAGE = 0.95;

export type Coverage = {
	running: number;
	knownRunning: number;
	unknownTypes: string[];
	ratio: number;
	band: "comfortable" | "challenging" | "hard";
};

export function textCoverage(
	tokens: Token[],
	isKnown: (token: WordToken) => boolean,
): Coverage {
	let running = 0;
	let knownRunning = 0;
	const unknown = new Set<string>();
	for (const token of tokens) {
		if (token.kind !== "word") continue;
		running += 1;
		if (isKnown(token)) knownRunning += 1;
		else unknown.add(token.key);
	}
	const ratio = running === 0 ? 1 : knownRunning / running;
	const band =
		ratio >= COMFORT_COVERAGE
			? "comfortable"
			: ratio >= MIN_COVERAGE
				? "challenging"
				: "hard";
	return { running, knownRunning, unknownTypes: [...unknown], ratio, band };
}
