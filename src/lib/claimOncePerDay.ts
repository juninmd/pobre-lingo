import { localDay } from "@/lib/localDay";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

/** True the first time `key` is claimed on a local calendar day, false afterwards. */
export function claimOncePerDay(key: string, now: Date = new Date()): boolean {
	const today = localDay(now);
	if (getLocalStorageItem<string>(key, "") === today) return false;
	setLocalStorageItem(key, today);
	return true;
}
