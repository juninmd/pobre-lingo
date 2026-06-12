import { useCallback } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

export const DAILY_GOAL = 5;
const ACTIVITY_LOG_KEY = "pobrelingo_activity_log";

interface ActivityEntry {
	date: string; // 'YYYY-MM-DD'
	count: number;
}

function todayStr(): string {
	return new Date().toISOString().slice(0, 10);
}

function getLog(): ActivityEntry[] {
	return getLocalStorageItem<ActivityEntry[]>(ACTIVITY_LOG_KEY, []);
}

function saveLog(log: ActivityEntry[]): void {
	// Keep only last 30 days
	const cutoff = new Date();
	cutoff.setDate(cutoff.getDate() - 30);
	const cutoffStr = cutoff.toISOString().slice(0, 10);
	const pruned = log.filter((e) => e.date >= cutoffStr);
	setLocalStorageItem(ACTIVITY_LOG_KEY, pruned);
}

export function useActivityLog() {
	const logActivity = useCallback(() => {
		const log = getLog();
		const today = todayStr();
		const existing = log.find((e) => e.date === today);
		if (existing) {
			existing.count += 1;
		} else {
			log.push({ date: today, count: 1 });
		}
		saveLog(log);
	}, []);

	const todayCount = useCallback((): number => {
		const log = getLog();
		const today = todayStr();
		return log.find((e) => e.date === today)?.count ?? 0;
	}, []);

	return { logActivity, todayCount, DAILY_GOAL };
}
