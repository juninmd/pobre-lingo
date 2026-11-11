import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

export const MIN_WORD_LENGTH = 3;
export const HINTS_PER_LEVEL = 3;
export const STORAGE_KEY = "pobrelingo_word_wheel";

export type GuessResult = "found" | "repeat" | "bonus" | "short" | "invalid";

/** Só letras a-z, minúsculas: o que a roda consegue formar. */
export const normalizeWord = (word: string) =>
	word.toLowerCase().replace(/[^a-z]/g, "");

/** A palavra cabe nas letras da roda (cada letra usada no máximo quantas vezes aparece)? */
export function canForm(word: string, letters: string): boolean {
	const pool = new Map<string, number>();
	for (const ch of letters.toLowerCase()) pool.set(ch, (pool.get(ch) ?? 0) + 1);
	for (const ch of normalizeWord(word)) {
		const left = pool.get(ch) ?? 0;
		if (left === 0) return false;
		pool.set(ch, left - 1);
	}
	return word.length > 0;
}

interface ClassifyInput {
	targets: string[];
	found: string[];
	bonusFound: string[];
	bonusPool: ReadonlySet<string>;
	letters: string;
}

export function classifyGuess(raw: string, input: ClassifyInput): GuessResult {
	const word = normalizeWord(raw);
	if (word.length < MIN_WORD_LENGTH) return "short";
	if (input.found.includes(word) || input.bonusFound.includes(word))
		return "repeat";
	if (input.targets.includes(word)) return "found";
	if (input.bonusPool.has(word) && canForm(word, input.letters)) return "bonus";
	return "invalid";
}

/** Embaralha uma ordem de índices garantindo que ela mude (com 2+ letras). */
export function shuffleOrder(order: number[], random = Math.random): number[] {
	if (order.length < 2) return [...order];
	let next = [...order];
	do {
		next = [...order];
		for (let i = next.length - 1; i > 0; i--) {
			const j = Math.floor(random() * (i + 1));
			[next[i], next[j]] = [next[j], next[i]];
		}
	} while (next.every((v, i) => v === order[i]));
	return next;
}

/** Centro de cada letra na roda, em % do quadrado (0-100), começando no topo. */
export function wheelPositions(count: number, radius = 36) {
	return Array.from({ length: count }, (_, i) => {
		const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
		return {
			x: 50 + radius * Math.cos(angle),
			y: 50 + radius * Math.sin(angle),
		};
	});
}

/** Palavra mais curta ainda não achada: é a que a dica revela primeiro. */
export function nextHintTarget(targets: string[], found: string[]) {
	return [...targets]
		.filter((w) => !found.includes(w))
		.sort((a, b) => a.length - b.length || a.localeCompare(b))[0];
}

export interface WordWheelSave {
	level: number;
	found: string[];
	bonus: string[];
	reveals: Record<string, number>;
	hintsUsed: number;
}

export const emptySave = (level = 0): WordWheelSave => ({
	level,
	found: [],
	bonus: [],
	reveals: {},
	hintsUsed: 0,
});

const isStrings = (v: unknown): v is string[] =>
	Array.isArray(v) && v.every((s) => typeof s === "string");

export const isWordWheelSave = (v: unknown): v is WordWheelSave => {
	if (typeof v !== "object" || v === null) return false;
	const s = v as Record<string, unknown>;
	return (
		Number.isInteger(s.level) &&
		(s.level as number) >= 0 &&
		isStrings(s.found) &&
		isStrings(s.bonus) &&
		typeof s.reveals === "object" &&
		s.reveals !== null &&
		typeof s.hintsUsed === "number"
	);
};

export const loadSave = () =>
	getLocalStorageItem(STORAGE_KEY, emptySave(), isWordWheelSave);
export const persistSave = (save: WordWheelSave) =>
	setLocalStorageItem(STORAGE_KEY, save);
