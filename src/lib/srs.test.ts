import { describe, expect, it } from "vitest";
import {
	GRADE_AGAIN,
	GRADE_EASY,
	GRADE_GOOD,
	getDueCards,
	getSrsStats,
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

describe("scheduleCard", () => {
	it("agenda a primeira revisão bem-sucedida para o dia seguinte", () => {
		const next = scheduleCard(makeCard(), GRADE_GOOD, NOW);

		expect(next.repetitions).toBe(1);
		expect(next.intervalDays).toBe(1);
		expect(new Date(next.dueAt).getTime()).toBe(NOW.getTime() + 86_400_000);
	});

	it("usa o intervalo fixo de 6 dias na segunda revisão", () => {
		const next = scheduleCard(
			makeCard({ repetitions: 1, intervalDays: 1 }),
			GRADE_GOOD,
			NOW,
		);

		expect(next.repetitions).toBe(2);
		expect(next.intervalDays).toBe(6);
	});

	it("multiplica pelo ease factor a partir da terceira revisão", () => {
		const card = makeCard({
			repetitions: 2,
			intervalDays: 6,
			easeFactor: 2.5,
		});

		const next = scheduleCard(card, GRADE_GOOD, NOW);

		// ease permanece 2.5 para nota 4 → 6 * 2.5 = 15
		expect(next.easeFactor).toBeCloseTo(2.5, 5);
		expect(next.intervalDays).toBe(15);
	});

	it("reaprende em minutos e conta lapso quando o usuário erra", () => {
		const card = makeCard({ repetitions: 4, intervalDays: 30, lapses: 1 });

		const next = scheduleCard(card, GRADE_AGAIN, NOW);

		expect(next.repetitions).toBe(0);
		expect(next.intervalDays).toBe(0);
		expect(next.lapses).toBe(2);
		expect(new Date(next.dueAt).getTime()).toBe(NOW.getTime() + 10 * 60_000);
	});

	it("nunca deixa o ease factor cair abaixo de 1.3", () => {
		let card = makeCard({ easeFactor: 1.3 });
		for (let i = 0; i < 5; i++) {
			card = scheduleCard(card, GRADE_AGAIN, NOW);
		}

		expect(card.easeFactor).toBeGreaterThanOrEqual(1.3);
	});

	it("aumenta o ease factor quando a resposta é fácil", () => {
		const next = scheduleCard(makeCard(), GRADE_EASY, NOW);
		expect(next.easeFactor).toBeGreaterThan(2.5);
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
		expect(cards[0].easeFactor).toBeCloseTo(2.3, 5);
		expect(new Date(cards[0].dueAt).getTime()).toBe(
			NOW.getTime() + 10 * 60_000,
		);
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
