import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	enrollCards,
	GRADE_AGAIN,
	GRADE_EASY,
	GRADE_GOOD,
	GRADE_HARD,
	getDueCards,
	getSrsStats,
	loadCards,
	previewInterval,
	type ReviewCard,
	scheduleCard,
	upsertCard,
} from "@/lib/srs";

const NOW = new Date("2026-07-30T12:00:00.000Z");

function makeCard(overrides: Partial<ReviewCard> = {}): ReviewCard {
	return {
		id: "card-1",
		source: "quiz",
		front: "How do you say 'obrigado'?",
		back: "Thank you",
		repetitions: 0,
		easeFactor: 2.5,
		intervalDays: 0,
		dueAt: NOW.toISOString(),
		lapses: 0,
		createdAt: NOW.toISOString(),
		...overrides,
	};
}

const DAY = 86_400_000;
const dueIn = (card: ReviewCard) =>
	new Date(card.dueAt).getTime() - NOW.getTime();

describe("scheduleCard (FSRS)", () => {
	it("agenda um card novo respondido corretamente para o futuro", () => {
		const next = scheduleCard(makeCard(), GRADE_GOOD, NOW);
		expect(dueIn(next)).toBeGreaterThan(0);
		expect(next.repetitions).toBe(1);
		expect(next.fsrs?.reps).toBe(1);
	});

	it("espaça cada vez mais quando o aluno continua acertando", () => {
		let card = makeCard();
		const gaps: number[] = [];
		let now = NOW;
		for (let i = 0; i < 4; i++) {
			card = scheduleCard(card, GRADE_GOOD, now);
			gaps.push(new Date(card.dueAt).getTime() - now.getTime());
			now = new Date(card.dueAt);
		}
		for (let i = 1; i < gaps.length; i++) {
			expect(gaps[i]).toBeGreaterThan(gaps[i - 1]);
		}
		expect(gaps.at(-1)).toBeGreaterThan(7 * DAY);
	});

	it("dá intervalos maiores para respostas mais fáceis", () => {
		const reviewed = scheduleCard(
			scheduleCard(makeCard(), GRADE_GOOD, NOW),
			GRADE_GOOD,
			new Date(NOW.getTime() + 2 * DAY),
		);
		const later = new Date(reviewed.dueAt);
		const hard = scheduleCard(reviewed, GRADE_HARD, later).intervalDays;
		const good = scheduleCard(reviewed, GRADE_GOOD, later).intervalDays;
		const easy = scheduleCard(reviewed, GRADE_EASY, later).intervalDays;
		expect(hard).toBeLessThan(good);
		expect(good).toBeLessThan(easy);
	});

	it("traz de volta ainda na sessão e conta lapso quando o aluno erra", () => {
		const mature = makeCard({
			repetitions: 5,
			intervalDays: 30,
			easeFactor: 2.5,
			lastReviewedAt: new Date(NOW.getTime() - 30 * DAY).toISOString(),
		});
		const next = scheduleCard(mature, GRADE_AGAIN, NOW);
		expect(next.repetitions).toBe(0);
		expect(next.lapses).toBe(1);
		expect(dueIn(next)).toBeLessThanOrEqual(DAY);
	});

	it("migra cards do SM-2 mantendo o que o aluno já consolidou", () => {
		const legacyMature = makeCard({
			repetitions: 5,
			intervalDays: 60,
			lastReviewedAt: new Date(NOW.getTime() - 60 * DAY).toISOString(),
		});
		const next = scheduleCard(legacyMature, GRADE_GOOD, NOW);
		expect(next.intervalDays).toBeGreaterThan(30);
	});
});

describe("previewInterval", () => {
	it("mostra minutos para erro e dias para acerto em um card maduro", () => {
		const mature = makeCard({
			repetitions: 5,
			intervalDays: 30,
			lastReviewedAt: new Date(Date.now() - 30 * DAY).toISOString(),
		});
		expect(previewInterval(mature, GRADE_AGAIN)).toMatch(/min$/);
		expect(previewInterval(mature, GRADE_GOOD)).toMatch(/dias|mês|meses/);
	});
});

describe("upsertCard", () => {
	it("cria um card novo já vencido para revisão imediata", () => {
		const cards = upsertCard(
			[],
			{ id: "novo", source: "exercise", front: "cat", back: "gato" },
			NOW,
		);

		expect(cards).toHaveLength(1);
		expect(cards[0].dueAt).toBe(NOW.toISOString());
		expect(getDueCards(cards, NOW)).toHaveLength(1);
	});

	it("antecipa e penaliza um card existente em vez de duplicá-lo", () => {
		const existing = makeCard({
			id: "novo",
			repetitions: 3,
			intervalDays: 20,
			easeFactor: 2.5,
			dueAt: new Date("2026-08-30T12:00:00.000Z").toISOString(),
		});

		const cards = upsertCard(
			[existing],
			{ id: "novo", source: "exercise", front: "cat", back: "gato" },
			NOW,
		);

		expect(cards).toHaveLength(1);
		expect(cards[0].repetitions).toBe(0);
		expect(cards[0].lapses).toBe(1);
		expect(
			new Date(cards[0].dueAt).getTime() - NOW.getTime(),
		).toBeLessThanOrEqual(10 * 60_000);
	});
});

describe("enrollCards", () => {
	it("adds studied items without penalising cards the learner already has", () => {
		const existing = makeCard({ id: "cat", repetitions: 4, intervalDays: 20 });
		const cards = enrollCards(
			[existing],
			[
				{ id: "cat", source: "vocabulary", front: "cat", back: "gato" },
				{ id: "dog", source: "vocabulary", front: "dog", back: "cachorro" },
			],
			NOW,
		);
		expect(cards).toHaveLength(2);
		expect(cards[0]).toBe(existing);
		expect(cards[1].id).toBe("dog");
	});

	it("returns the same list when nothing is new, so storage is not rewritten", () => {
		const cards = [makeCard()];
		expect(
			enrollCards(cards, [
				{ id: "card-1", source: "quiz", front: "a", back: "b" },
			]),
		).toBe(cards);
	});
});

describe("getDueCards / getSrsStats", () => {
	it("retorna apenas os vencidos, mais atrasados primeiro", () => {
		const cards = [
			makeCard({ id: "futuro", dueAt: "2026-08-01T00:00:00.000Z" }),
			makeCard({ id: "atrasado", dueAt: "2026-07-01T00:00:00.000Z" }),
			makeCard({ id: "hoje", dueAt: "2026-07-30T00:00:00.000Z" }),
		];

		expect(getDueCards(cards, NOW).map((c) => c.id)).toEqual([
			"atrasado",
			"hoje",
		]);
	});

	it("classifica cards maduros e aponta a próxima revisão futura", () => {
		const cards = [
			makeCard({
				id: "maduro",
				intervalDays: 30,
				repetitions: 5,
				dueAt: "2026-08-05T00:00:00.000Z",
			}),
			makeCard({
				id: "novo",
				repetitions: 0,
				dueAt: "2026-08-02T00:00:00.000Z",
			}),
		];

		const stats = getSrsStats(cards, NOW);

		expect(stats.total).toBe(2);
		expect(stats.due).toBe(0);
		expect(stats.mature).toBe(1);
		expect(stats.learning).toBe(1);
		expect(stats.nextDueAt).toBe("2026-08-02T00:00:00.000Z");
	});
});

describe("card cap", () => {
	const crowded = () =>
		Array.from({ length: 500 }, (_, i) =>
			makeCard({ id: `c${i}`, intervalDays: i, createdAt: NOW.toISOString() }),
		);
	const fresh = {
		id: "new",
		source: "vocabulary",
		front: "a",
		back: "b",
	} as const;

	it("enroll evicts the best-consolidated card, never the ones the learner needs most", () => {
		const cards = enrollCards(crowded(), [fresh], NOW);

		const ids = cards.map((c) => c.id);
		expect(cards).toHaveLength(500);
		expect(ids).toContain("c0");
		expect(ids).toContain("new");
		expect(ids).not.toContain("c499");
	});

	it("upsert evicts the same way once the cap is hit", () => {
		const ids = upsertCard(crowded(), fresh, NOW).map((c) => c.id);

		expect(ids).toHaveLength(500);
		expect(ids).toContain("c0");
		expect(ids).toContain("new");
		expect(ids).not.toContain("c499");
	});

	it("keeps a brand-new card even when every card is equally unlearned", () => {
		const flat = Array.from({ length: 500 }, (_, i) =>
			makeCard({
				id: `f${i}`,
				createdAt: `2026-01-01T00:00:${String(i % 60).padStart(2, "0")}.000Z`,
			}),
		);

		const ids = enrollCards(flat, [fresh], NOW).map((c) => c.id);

		expect(ids).toHaveLength(500);
		expect(ids).toContain("new");
	});
});

describe("loadCards", () => {
	beforeEach(() => localStorage.clear());

	const store = (cards: unknown) =>
		localStorage.setItem("pobrelingo_srs_cards", JSON.stringify(cards));

	it("drops cards whose dates would crash the scheduler", () => {
		vi.spyOn(console, "warn").mockImplementation(() => {});
		store([
			makeCard({ id: "ok" }),
			makeCard({ id: "bad-due", dueAt: "garbage" }),
			makeCard({ id: "bad-created", createdAt: "garbage" }),
			{ id: "no-front", dueAt: NOW.toISOString() },
			"not-a-card",
			null,
		]);

		expect(loadCards().map((c) => c.id)).toEqual(["ok"]);
		expect(() => scheduleCard(loadCards()[0], GRADE_GOOD, NOW)).not.toThrow();
	});

	it("keeps a card whose last-review date is corrupt, minus that date", () => {
		store([makeCard({ id: "r", repetitions: 2, lastReviewedAt: "garbage" })]);

		const [card] = loadCards();

		expect(card.id).toBe("r");
		expect(card.lastReviewedAt).toBeUndefined();
		expect(() => scheduleCard(card, GRADE_GOOD, NOW)).not.toThrow();
	});

	it("falls back to the legacy schedule when the stored FSRS state is corrupt", () => {
		store([
			makeCard({
				id: "fsrs-bad",
				repetitions: 3,
				intervalDays: 10,
				lastReviewedAt: NOW.toISOString(),
				fsrs: { stability: "x", last_review: "garbage" } as never,
			}),
		]);

		const [card] = loadCards();

		expect(card.id).toBe("fsrs-bad");
		expect(card.fsrs).toBeUndefined();
		expect(() => scheduleCard(card, GRADE_GOOD, NOW)).not.toThrow();
	});

	it.each([
		["a string", '"x"'],
		["an object", '{"a":1}'],
		["the string null", "null"],
		["a number", "5"],
	])("returns an empty queue when the key holds %s", (_label, raw) => {
		localStorage.setItem("pobrelingo_srs_cards", raw);
		expect(loadCards()).toEqual([]);
	});
});
