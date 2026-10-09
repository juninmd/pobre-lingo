import { useCallback, useEffect, useRef, useState } from "react";
import {
	getLocalStorageItem,
	type StorageGuard,
	setLocalStorageItem,
} from "@/lib/localStorage";

export function usePersistentState<T>(
	key: string,
	initial: T,
	isValid?: StorageGuard<T>,
) {
	const [value, setValue] = useState<T>(() =>
		getLocalStorageItem<T>(key, initial, isValid),
	);

	const latest = useRef({ initial, isValid });
	latest.current = { initial, isValid };

	// Another tab wrote this key: adopt it so our next write builds on it.
	useEffect(() => {
		const onStorage = (event: StorageEvent) => {
			if (event.key !== null && event.key !== key) return;
			const { initial: fallback, isValid: guard } = latest.current;
			setValue(getLocalStorageItem<T>(key, fallback, guard));
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, [key]);

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
