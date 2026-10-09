import { useState } from "react";
import { CAN_DO_KEY, type CanDoState, readCanDo } from "@/lib/canDo";
import type { CEFRLevel } from "@/lib/curriculumData";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

export function useCanDo() {
	const [state, setState] = useState(() =>
		readCanDo(getLocalStorageItem<unknown>(CAN_DO_KEY, null)),
	);
	const commit = (next: CanDoState) => {
		const valid = readCanDo(next);
		setLocalStorageItem(CAN_DO_KEY, valid);
		const stored = readCanDo(getLocalStorageItem<unknown>(CAN_DO_KEY, null));
		const saved = JSON.stringify(valid) === JSON.stringify(stored);
		if (saved) setState(stored);
		return saved;
	};
	return {
		checked: state.checked,
		passed: state.passed,
		isChecked: (id: string) => state.checked.includes(id),
		isPassed: (level: CEFRLevel) => state.passed.includes(level),
		toggleChecked: (id: string) =>
			commit({
				...state,
				checked: state.checked.includes(id)
					? state.checked.filter((value) => value !== id)
					: [...state.checked, id],
			}),
		markPassed: (level: CEFRLevel) =>
			commit({ ...state, passed: [...new Set([...state.passed, level])] }),
	};
}
