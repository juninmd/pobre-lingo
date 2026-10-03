// @ts-nocheck
import { useCallback, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

const WRONG_KEY = "pobrelingo_wrong_answers";
const MAX_ITEMS = 50;

export interface WrongAnswer {
	id: string;
	exerciseType: string;
	question: string;
	correctAnswer: string;
	wrongCount: number;
	lastWrongAt: string;
}

function load(): WrongAnswer[] {
	return getLocalStorageItem<WrongAnswer[]>(WRONG_KEY, []);
}

function save(items: WrongAnswer[]): void {
	setLocalStorageItem(WRONG_KEY, items);
}

export function useWrongAnswers() {
	const [items, setItems] = useState<WrongAnswer[]>(load);

	const recordWrong = useCallback(
		(entry: Omit<WrongAnswer, "wrongCount" | "lastWrongAt">) => {
			setItems((prev) => {
				const existing = prev.find((i) => i.id === entry.id);
				let updated: WrongAnswer[];
				if (existing) {
					updated = prev.map((i) =>
						i.id === entry.id
							? {
									...i,
									wrongCount: i.wrongCount + 1,
									lastWrongAt: new Date().toISOString(),
								}
							: i,
					);
				} else {
					const newItem: WrongAnswer = {
						...entry,
						wrongCount: 1,
						lastWrongAt: new Date().toISOString(),
					};
					const appended = [...prev, newItem];
					// Prune lowest wrongCount if over cap
					if (appended.length > MAX_ITEMS) {
						appended.sort((a, b) => b.wrongCount - a.wrongCount);
						updated = appended.slice(0, MAX_ITEMS);
					} else {
						updated = appended;
					}
				}
				save(updated);
				return updated;
			});
		},
		[],
	);

	const getTopWrong = useCallback(
		(n: number): WrongAnswer[] => {
			return [...items]
				.sort(
					(a, b) =>
						b.wrongCount - a.wrongCount ||
						b.lastWrongAt.localeCompare(a.lastWrongAt),
				)
				.slice(0, n);
		},
		[items],
	);

	const markReviewed = useCallback((id: string) => {
		setItems((prev) => {
			const updated = prev.filter((i) => i.id !== id);
			save(updated);
			return updated;
		});
	}, []);

	return { recordWrong, getTopWrong, markReviewed, totalWrong: items.length };
}
