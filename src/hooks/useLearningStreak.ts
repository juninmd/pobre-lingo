"use client";

import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

const STREAK_COUNT_KEY = "pobrelingo_streak_count";
const LAST_ACTIVE_DATE_KEY = "pobrelingo_last_active_date";

export function useLearningStreak() {
	const [streak, setStreak] = useState<number>(0);
	const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);

	const updateStreak = useCallback(() => {
		const today = format(new Date(), "yyyy-MM-dd");
		const storedStreak = getLocalStorageItem<number>(STREAK_COUNT_KEY, 0);
		const storedLastActiveDate = getLocalStorageItem<string | null>(
			LAST_ACTIVE_DATE_KEY,
			null,
		);

		let currentStreak = storedStreak;

		if (storedLastActiveDate) {
			if (storedLastActiveDate === today) {
				// Already active today, no change
			} else {
				const yesterday = format(new Date(Date.now() - 86400000), "yyyy-MM-dd");
				if (storedLastActiveDate === yesterday) {
					currentStreak += 1; // Continued streak
				} else {
					currentStreak = 1; // Streak broken, reset to 1 for today
				}
				setLocalStorageItem(LAST_ACTIVE_DATE_KEY, today);
				setLocalStorageItem(STREAK_COUNT_KEY, currentStreak);
			}
		} else {
			// First time use or localStorage cleared
			currentStreak = 1;
			setLocalStorageItem(LAST_ACTIVE_DATE_KEY, today);
			setLocalStorageItem(STREAK_COUNT_KEY, currentStreak);
		}

		setStreak(currentStreak);
		setLastActiveDate(today);
	}, []);

	useEffect(() => {
		// eslint-disable-next-line
		updateStreak();
	}, [updateStreak]);

	return { streak, updateStreak, lastActiveDate };
}
