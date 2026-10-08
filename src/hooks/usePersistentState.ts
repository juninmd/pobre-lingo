import { useCallback, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

export function usePersistentState<T>(key: string, initial: T) {
	const [value, setValue] = useState<T>(() =>
		getLocalStorageItem<T>(key, initial),
	);

	const update = useCallback(
		(next: T | ((prev: T) => T)) => {
			setValue((prev) => {
				const resolved =
					typeof next === "function" ? (next as (p: T) => T)(prev) : next;
				setLocalStorageItem(key, resolved);
				return resolved;
			});
		},
		[key],
	);

	return [value, update] as const;
}
