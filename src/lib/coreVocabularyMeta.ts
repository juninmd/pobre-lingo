import type { CEFRLevel } from "./cefr";

/**
 * Meta de vocabulário receptivo acumulado por nível (Milton & Meara, 2003).
 * Serve de referência de progresso — não é a lista completa, e sim o alvo.
 */
export const LEVEL_VOCAB_TARGETS: Record<CEFRLevel, number> = {
	A1: 1500,
	A2: 2500,
	B1: 3250,
	B2: 3750,
	C1: 4500,
	C2: 5000,
};

export const BAND_LABELS: Record<number, string> = {
	1: "1k · essencial",
	2: "2k · frequente",
	3: "3k · intermediário",
	4: "4k · avançado",
	5: "5k · acadêmico",
};
