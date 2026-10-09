import { CARDS_KEY } from "@/lib/srs";
import type { ReviewCard } from "@/lib/srsTypes";
import { parseCards } from "@/lib/srsValidation";

/**
 * Single source of truth for cards: every write re-reads localStorage, so several
 * useSrs instances (reader paragraph, nav bar, review screen) never overwrite
 * each other's cards.
 */
const EVENT = "pobrelingo:srs";

let cachedRaw: string | null | undefined;
let cached: ReviewCard[] = [];

/** Stable snapshot: same array until the stored content changes. */
export function getCards(): ReviewCard[] {
	let raw: string | null;
	try {
		raw = localStorage.getItem(CARDS_KEY);
	} catch {
		return cached;
	}
	if (raw === cachedRaw) return cached;
	cachedRaw = raw;
	try {
		cached = parseCards(raw ? JSON.parse(raw) : []);
	} catch {
		cached = [];
	}
	return cached;
}

export function updateCards(
	update: (cards: ReviewCard[]) => ReviewCard[],
): void {
	const previous = getCards();
	const next = update(previous);
	if (next === previous) return;
	const serialized = JSON.stringify(next);
	try {
		localStorage.setItem(CARDS_KEY, serialized);
	} catch (error) {
		console.warn("Could not save review cards:", error);
		return;
	}
	cachedRaw = serialized;
	cached = next;
	window.dispatchEvent(new Event(EVENT));
}

export function subscribeCards(onChange: () => void): () => void {
	const onStorage = (event: StorageEvent) => {
		if (event.key === null || event.key === CARDS_KEY) onChange();
	};
	window.addEventListener(EVENT, onChange);
	window.addEventListener("storage", onStorage);
	return () => {
		window.removeEventListener(EVENT, onChange);
		window.removeEventListener("storage", onStorage);
	};
}
