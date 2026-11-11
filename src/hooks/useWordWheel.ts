import { useCallback, useMemo, useState } from "react";
import {
	classifyGuess,
	emptySave,
	type GuessResult,
	HINTS_PER_LEVEL,
	loadSave,
	nextHintTarget,
	normalizeWord,
	persistSave,
	shuffleOrder,
	type WordWheelSave,
} from "@/lib/wordWheel/logic";
import { WORD_WHEEL_PUZZLES } from "@/lib/wordWheel/puzzles";

export interface GuessFeedback {
	result: GuessResult;
	word: string;
	/** Muda a cada palpite para reiniciar a animação mesmo com o mesmo resultado. */
	key: number;
}

/** Estado de um nível da Roda de Palavras, salvo no aparelho a cada mudança. */
export function useWordWheel(bonusPool: ReadonlySet<string>) {
	const [save, setSave] = useState<WordWheelSave>(loadSave);
	const puzzle = WORD_WHEEL_PUZZLES[save.level % WORD_WHEEL_PUZZLES.length];
	const targets = useMemo(
		() =>
			Object.keys(puzzle.words).sort(
				(a, b) => a.length - b.length || a.localeCompare(b),
			),
		[puzzle],
	);
	const [order, setOrder] = useState(() =>
		shuffleOrder([...puzzle.letters].map((_, i) => i)),
	);
	const [feedback, setFeedback] = useState<GuessFeedback | null>(null);

	const update = useCallback((next: WordWheelSave) => {
		setSave(next);
		persistSave(next);
	}, []);

	const submit = useCallback(
		(raw: string): GuessResult => {
			const word = normalizeWord(raw);
			const result = classifyGuess(word, {
				targets,
				found: save.found,
				bonusFound: save.bonus,
				bonusPool,
				letters: puzzle.letters,
			});
			if (result === "found") update({ ...save, found: [...save.found, word] });
			if (result === "bonus") update({ ...save, bonus: [...save.bonus, word] });
			setFeedback((f) => ({ result, word, key: (f?.key ?? 0) + 1 }));
			return result;
		},
		[bonusPool, puzzle.letters, save, targets, update],
	);

	const hint = useCallback(() => {
		const target = nextHintTarget(targets, save.found);
		if (!target || save.hintsUsed >= HINTS_PER_LEVEL) return;
		const shown = Math.min((save.reveals[target] ?? 0) + 1, target.length);
		update({
			...save,
			hintsUsed: save.hintsUsed + 1,
			reveals: { ...save.reveals, [target]: shown },
		});
	}, [save, targets, update]);

	const nextLevel = useCallback(() => {
		const level = save.level + 1;
		const next = WORD_WHEEL_PUZZLES[level % WORD_WHEEL_PUZZLES.length];
		update(emptySave(level));
		setOrder(shuffleOrder([...next.letters].map((_, i) => i)));
		setFeedback(null);
	}, [save.level, update]);

	return {
		puzzle,
		targets,
		order,
		found: save.found,
		bonus: save.bonus,
		reveals: save.reveals,
		level: save.level,
		hintsLeft: HINTS_PER_LEVEL - save.hintsUsed,
		complete: targets.every((w) => save.found.includes(w)),
		feedback,
		submit,
		hint,
		shuffle: () => setOrder((o) => shuffleOrder(o)),
		nextLevel,
	};
}
