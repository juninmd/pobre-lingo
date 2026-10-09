/**
 * Validates cards read from localStorage. A card with an invalid date breaks the
 * scheduler (RangeError in toISOString), so it is dropped on read.
 */
import { S_MIN, State } from "ts-fsrs";
import { isSafeInternalHref } from "@/lib/safeHref";
import type { CardSource, FsrsState, ReviewCard } from "@/lib/srsTypes";
import { isRecord } from "@/lib/storageGuards";

const SOURCES: readonly CardSource[] = [
	"vocabulary",
	"grammar",
	"exercise",
	"quiz",
	"listening",
	"dictionary",
];

const FSRS_NUMBERS = [
	"stability",
	"difficulty",
	"elapsed_days",
	"scheduled_days",
	"learning_steps",
	"reps",
	"lapses",
	"state",
] as const;

const isNumber = (v: unknown): v is number =>
	typeof v === "number" && Number.isFinite(v);

const isDate = (v: unknown): v is string =>
	typeof v === "string" && !Number.isNaN(new Date(v).getTime());

/** ts-fsrs rejects memory outside its minimums; only a fresh card may be all zeros. */
function hasUsableMemory(state: number, stability: number, difficulty: number) {
	if (state === State.New && stability === 0 && difficulty === 0) return true;
	return stability >= S_MIN && difficulty >= 1;
}

/**
 * A payload ts-fsrs would throw on (bad state, memory or dates) is dropped so
 * the card falls back to the legacy schedule instead of crashing the review.
 */
function parseFsrs(value: unknown): FsrsState | undefined {
	if (!isRecord(value)) return undefined;
	if (!FSRS_NUMBERS.every((key) => isNumber(value[key]))) return undefined;
	const { state, stability, difficulty, learning_steps } = value as Record<
		(typeof FSRS_NUMBERS)[number],
		number
	>;
	if (!Number.isInteger(state) || state < State.New) return undefined;
	if (state > State.Relearning) return undefined;
	if (!Number.isInteger(learning_steps) || learning_steps < 0) return undefined;
	if (!hasUsableMemory(state, stability, difficulty)) return undefined;
	for (const date of [value.last_review, value.due]) {
		if (date !== undefined && !isDate(date)) return undefined;
	}
	return value as unknown as FsrsState;
}

export function parseCard(value: unknown): ReviewCard | null {
	if (!isRecord(value)) return null;
	const { id, source, front, back, dueAt, createdAt } = value;
	if (typeof id !== "string" || id === "") return null;
	if (typeof front !== "string" || typeof back !== "string") return null;
	if (!SOURCES.includes(source as CardSource)) return null;
	if (!isDate(dueAt) || !isDate(createdAt)) return null;
	const { repetitions, easeFactor, intervalDays, lapses } = value;
	if (![repetitions, easeFactor, intervalDays, lapses].every(isNumber)) {
		return null;
	}

	// Invalid derived or optional fields are removed; the card stays usable.
	return {
		id,
		source: source as CardSource,
		front,
		back,
		hint: typeof value.hint === "string" ? value.hint : undefined,
		href: isSafeInternalHref(value.href) ? value.href : undefined,
		repetitions: repetitions as number,
		easeFactor: easeFactor as number,
		intervalDays: intervalDays as number,
		dueAt,
		lapses: lapses as number,
		createdAt,
		lastReviewedAt: isDate(value.lastReviewedAt)
			? value.lastReviewedAt
			: undefined,
		fsrs: parseFsrs(value.fsrs),
	};
}

export function parseCards(raw: unknown): ReviewCard[] {
	if (!Array.isArray(raw)) return [];
	const seen = new Set<string>();
	const cards: ReviewCard[] = [];
	for (const item of raw) {
		const card = parseCard(item);
		if (!card || seen.has(card.id)) continue;
		seen.add(card.id);
		cards.push(card);
	}
	return cards;
}
