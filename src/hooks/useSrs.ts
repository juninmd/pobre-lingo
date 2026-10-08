import { useCallback, useMemo, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import {
	enrollCards,
	getDueCards,
	getSrsStats,
	loadCards,
	type NewCardInput,
	type ReviewCard,
	type ReviewGrade,
	saveCards,
	scheduleCard,
	upsertCard,
} from "@/lib/srs";

const MIGRATION_FLAG = "pobrelingo_srs_migrated_v1";
const LEGACY_WRONG_KEY = "pobrelingo_wrong_answers";

interface LegacyWrongAnswer {
	id: string;
	exerciseType: string;
	question: string;
	correctAnswer: string;
	wrongCount: number;
	lastWrongAt: string;
}

/**
 * Importa os erros registrados pelo sistema antigo para o SRS, uma única vez.
 * Sem isso o usuário existente abriria a revisão com a fila vazia.
 */
function migrateLegacyWrongAnswers(): ReviewCard[] {
	const cards = loadCards();
	if (getLocalStorageItem<boolean>(MIGRATION_FLAG, false)) return cards;

	const legacy = getLocalStorageItem<LegacyWrongAnswer[]>(LEGACY_WRONG_KEY, []);
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

	if (migrated !== cards) saveCards(migrated);
	setLocalStorageItem(MIGRATION_FLAG, true);
	return migrated;
}

export function useSrs() {
	const [cards, setCards] = useState<ReviewCard[]>(migrateLegacyWrongAnswers);

	/** Registra um item para revisão futura (tipicamente após um erro). */
	const addCard = useCallback((input: NewCardInput) => {
		setCards((prev) => {
			const next = upsertCard(prev, input);
			saveCards(next);
			return next;
		});
	}, []);

	/** Inscreve itens recém-estudados sem penalizar os que já existem. */
	const enroll = useCallback((inputs: NewCardInput[]) => {
		setCards((prev) => {
			const next = enrollCards(prev, inputs);
			if (next !== prev) saveCards(next);
			return next;
		});
	}, []);

	/** Aplica a nota do usuário e reagenda o card. */
	const gradeCard = useCallback((id: string, grade: ReviewGrade) => {
		setCards((prev) => {
			const next = prev.map((c) => (c.id === id ? scheduleCard(c, grade) : c));
			saveCards(next);
			return next;
		});
	}, []);

	const removeCard = useCallback((id: string) => {
		setCards((prev) => {
			const next = prev.filter((c) => c.id !== id);
			saveCards(next);
			return next;
		});
	}, []);

	const resetCards = useCallback(() => {
		setCards([]);
		saveCards([]);
	}, []);

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
