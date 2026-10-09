import { useMemo, useState, useSyncExternalStore } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import {
	enrollCards,
	getDueCards,
	getSrsStats,
	type NewCardInput,
	type ReviewGrade,
	scheduleCard,
	upsertCard,
} from "@/lib/srs";
import { getCards, subscribeCards, updateCards } from "@/lib/srsStore";

const MIGRATION_FLAG = "pobrelingo_srs_migrated_v1";
const LEGACY_WRONG_KEY = "pobrelingo_wrong_answers";

interface LegacyWrongAnswer {
	id: string;
	exerciseType: string;
	question: string;
	correctAnswer: string;
}

const isLegacyWrongAnswer = (item: unknown): item is LegacyWrongAnswer =>
	typeof item === "object" &&
	item !== null &&
	["id", "exerciseType", "question", "correctAnswer"].every(
		(field) => typeof (item as Record<string, unknown>)[field] === "string",
	);

/**
 * Imports errors recorded by the legacy system into SRS, once. Without it,
 * existing users would open review with an empty queue.
 */
function migrateLegacyWrongAnswers(): void {
	if (getLocalStorageItem<boolean>(MIGRATION_FLAG, false)) return;

	const stored = getLocalStorageItem<unknown>(LEGACY_WRONG_KEY, []);
	const legacy = Array.isArray(stored)
		? stored.filter(isLegacyWrongAnswer)
		: [];
	updateCards((cards) => {
		let migrated = cards;
		for (const item of legacy) {
			if (migrated.some((c) => c.id === item.id)) continue;
			migrated = upsertCard(migrated, {
				id: item.id,
				source: "exercise",
				front: item.question,
				back: item.correctAnswer,
				hint: item.exerciseType,
			});
		}
		return migrated;
	});
	setLocalStorageItem(MIGRATION_FLAG, true);
}

/** Registers an item for future review (typically after a mistake). */
const addCard = (input: NewCardInput) =>
	updateCards((cards) => upsertCard(cards, input));

/** Enrolls newly studied items without penalizing existing ones. */
const enroll = (inputs: NewCardInput[]) =>
	updateCards((cards) => enrollCards(cards, inputs));

/** Applies the user's grade and reschedules the card. */
const gradeCard = (id: string, grade: ReviewGrade) =>
	updateCards((cards) =>
		cards.map((c) => (c.id === id ? scheduleCard(c, grade) : c)),
	);

const removeCard = (id: string) =>
	updateCards((cards) => cards.filter((c) => c.id !== id));

const resetCards = () => updateCards(() => []);

export function useSrs() {
	// Runs before the first snapshot so legacy items already show up.
	useState(migrateLegacyWrongAnswers);
	const cards = useSyncExternalStore(subscribeCards, getCards, getCards);

	const dueCards = useMemo(() => getDueCards(cards), [cards]);
	const stats = useMemo(() => getSrsStats(cards), [cards]);

	return {
		cards,
		dueCards,
		stats,
		addCard,
		enroll,
		gradeCard,
		removeCard,
		resetCards,
	};
}
