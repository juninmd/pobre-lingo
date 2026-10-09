/** Runtime check that a parsed value really has the shape the caller expects. */
export type StorageGuard<T> = (value: unknown) => value is T;

export function getLocalStorageItem<T>(
	key: string,
	defaultValue: T,
	isValid?: StorageGuard<T>,
): T {
	if (typeof window === "undefined") {
		return defaultValue;
	}
	try {
		const item = window.localStorage.getItem(key);
		if (!item) return defaultValue;
		const parsed: unknown = JSON.parse(item);
		// A stored JSON null is "no value", never something to hand back typed.
		if (parsed === null) return defaultValue;
		if (isValid && !isValid(parsed)) {
			console.warn(`Ignoring invalid value in localStorage key "${key}"`);
			return defaultValue;
		}
		return parsed as T;
	} catch (error) {
		console.warn(`Error reading localStorage key "${key}":`, error);
		return defaultValue;
	}
}

export function setLocalStorageItem<T>(key: string, value: T): void {
	if (typeof window === "undefined") {
		return;
	}
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.warn(`Error setting localStorage key "${key}":`, error);
	}
}
