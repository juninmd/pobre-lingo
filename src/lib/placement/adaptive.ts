import type { CEFRLevel } from "../curriculumData";
import type { PlacementItem, PlacementSkill } from "./types";

export const CEFR_ORDER: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
export const MAX_ITEMS = 20;
const MIN_ITEMS_PER_LEVEL = 3;
const PASS_RATIO = 2 / 3;

export interface AdaptiveAnswer {
	itemId: string;
	level: CEFRLevel;
	skill: PlacementSkill;
	correct: boolean;
}

export interface AdaptiveState {
	currentLevel: CEFRLevel;
	streakCorrect: number;
	askedIds: string[];
	answers: AdaptiveAnswer[];
	finalLevel: CEFRLevel;
}

export function createAdaptiveState(): AdaptiveState {
	return {
		currentLevel: "A2",
		streakCorrect: 0,
		askedIds: [],
		answers: [],
		finalLevel: "A1",
	};
}

export function isComplete(state: AdaptiveState): boolean {
	return state.answers.length >= MAX_ITEMS;
}

/** Picks the next unseen item at the current level, prioritizing skills used least so far. */
export function pickNextItem(
	bank: PlacementItem[],
	state: AdaptiveState,
	rng: () => number = Math.random,
): PlacementItem | null {
	const candidates = bank.filter(
		(item) =>
			item.level === state.currentLevel && !state.askedIds.includes(item.id),
	);
	if (candidates.length === 0) return null;

	const usedAtLevel = state.answers.filter(
		(a) => a.level === state.currentLevel,
	);
	const skillUsage = (skill: PlacementSkill) =>
		usedAtLevel.filter((a) => a.skill === skill).length;

	const ranked = [...candidates].sort((a, b) => {
		const diff = skillUsage(a.skill) - skillUsage(b.skill);
		if (diff !== 0) return diff;
		return rng() - 0.5;
	});
	return ranked[0];
}

/** Applies an answer to the state: 2 correct in a row moves the level up, 1 wrong moves it down. */
export function applyAnswer(
	state: AdaptiveState,
	item: PlacementItem,
	correct: boolean,
): AdaptiveState {
	const answers = [
		...state.answers,
		{ itemId: item.id, level: item.level, skill: item.skill, correct },
	];
	const askedIds = [...state.askedIds, item.id];
	const idx = CEFR_ORDER.indexOf(state.currentLevel);

	let currentLevel = state.currentLevel;
	let streakCorrect = state.streakCorrect;

	if (correct) {
		streakCorrect += 1;
		if (streakCorrect >= 2) {
			streakCorrect = 0;
			currentLevel = CEFR_ORDER[Math.min(idx + 1, CEFR_ORDER.length - 1)];
		}
	} else {
		streakCorrect = 0;
		currentLevel = CEFR_ORDER[Math.max(idx - 1, 0)];
	}

	return {
		currentLevel,
		streakCorrect,
		askedIds,
		answers,
		finalLevel: computeFinalLevel(answers),
	};
}

/**
 * Final level = highest CEFR level with >= 3 answered items there and >= 2/3 correct.
 * Falls back to A1 when no level meets the bar.
 */
export function computeFinalLevel(answers: AdaptiveAnswer[]): CEFRLevel {
	let result: CEFRLevel = "A1";
	for (const level of CEFR_ORDER) {
		const atLevel = answers.filter((a) => a.level === level);
		if (atLevel.length < MIN_ITEMS_PER_LEVEL) continue;
		const correct = atLevel.filter((a) => a.correct).length;
		if (correct / atLevel.length >= PASS_RATIO) {
			result = level;
		}
	}
	return result;
}

/** Runs a full session with a pure answer function; useful for tests and simulations. */
export function runAdaptiveSession(
	bank: PlacementItem[],
	answerFn: (item: PlacementItem) => boolean,
	rng: () => number = Math.random,
): AdaptiveState {
	let state = createAdaptiveState();
	while (!isComplete(state)) {
		const item = pickNextItem(bank, state, rng);
		if (!item) break;
		state = applyAnswer(state, item, answerFn(item));
	}
	return state;
}
