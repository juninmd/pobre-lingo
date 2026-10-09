import type { ReviewCard } from "@/lib/srsTypes";

const MAX_CARDS = 500;

/**
 * Over the cap, drops the most consolidated cards (longest interval): they are
 * the ones the user needs to review least. Ties drop the oldest; kept cards
 * keep their order.
 */
export function capCards(cards: ReviewCard[]): ReviewCard[] {
	const excess = cards.length - MAX_CARDS;
	if (excess <= 0) return cards;
	const evicted = new Set(
		[...cards]
			.sort(
				(a, b) =>
					b.intervalDays - a.intervalDays ||
					a.createdAt.localeCompare(b.createdAt),
			)
			.slice(0, excess),
	);
	return cards.filter((card) => !evicted.has(card));
}
