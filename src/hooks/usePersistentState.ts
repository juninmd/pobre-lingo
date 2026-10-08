import { useEffect, useState } from "react";
export function usePersistentState<T>(key: string, initialValue: T) {
	const [state, setState] = useState<T>(() => {
		const stored = localStorage.getItem(key);
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch (_e) {
				return initialValue;
			}
		}
		return initialValue;
	});
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);
	return [state, setState] as const;
}
