import { useCallback } from "react";
import type { CEFRLevel } from "@/lib/curriculumData";
import { usePersistentState } from "./usePersistentState";

type CanDoState = {
	checked: string[];
	passed: CEFRLevel[];
};

const EMPTY: CanDoState = { checked: [], passed: [] };

export function useCanDo() {
	const [state, setState] = usePersistentState<CanDoState>(
		"pobrelingo_cando",
		EMPTY,
	);

	const toggleChecked = useCallback(
		(id: string) => {
			setState((prev) => ({
				...prev,
				checked: prev.checked.includes(id)
					? prev.checked.filter((item) => item !== id)
					: [...prev.checked, id],
			}));
		},
		[setState],
	);

	const markPassed = useCallback(
		(level: CEFRLevel) => {
			setState((prev) => ({
				...prev,
				passed: prev.passed.includes(level)
					? prev.passed
					: [...prev.passed, level],
			}));
		},
		[setState],
	);

	const isChecked = useCallback(
		(id: string) => state.checked.includes(id),
		[state.checked],
	);

	const isPassed = useCallback(
		(level: CEFRLevel) => state.passed.includes(level),
		[state.passed],
	);

	return { checked: state.checked, passed: state.passed, isChecked, isPassed, toggleChecked, markPassed };
}
