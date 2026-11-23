import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import { dayKey } from "@/lib/studyTime";

/** Modo "estudar primeiro": atrito, não bloqueio. Até 2 adiamentos de 30 min por dia. */
export const STUDY_FIRST_KEY = "pobrelingo_study_first";
export const MAX_SNOOZES = 2;
export const SNOOZE_MS = 30 * 60_000;
export const START_GRACE_MS = 2 * 60 * 60_000;

export interface StudyFirstState {
	enabled: boolean;
	/** Dia local a que `snoozes` e `until` se referem. */
	day: string;
	snoozes: number;
	/** Epoch ms até quando a tela fica escondida. */
	until: number;
}

export const initialState = (): StudyFirstState => ({
	enabled: false,
	day: "",
	snoozes: 0,
	until: 0,
});

const sameDay = (s: StudyFirstState, now: Date) => s.day === dayKey(now);

export const snoozesLeft = (s: StudyFirstState, now: Date): number =>
	sameDay(s, now) ? Math.max(0, MAX_SNOOZES - s.snoozes) : MAX_SNOOZES;

/** A tela aparece quando está ligada, a meta de hoje não foi cumprida e não há adiamento ativo. */
export function shouldShowGate(
	s: StudyFirstState,
	now: Date,
	goalReached: boolean,
): boolean {
	if (!s.enabled || goalReached) return false;
	return !(sameDay(s, now) && now.getTime() < s.until);
}

export function snooze(s: StudyFirstState, now: Date): StudyFirstState {
	if (snoozesLeft(s, now) === 0) return s;
	const used = sameDay(s, now) ? s.snoozes : 0;
	return {
		...s,
		day: dayKey(now),
		snoozes: used + 1,
		until: now.getTime() + SNOOZE_MS,
	};
}

/** "Começar agora": dá 2 h para estudar sem gastar um adiamento. */
export function startSession(s: StudyFirstState, now: Date): StudyFirstState {
	const used = sameDay(s, now) ? s.snoozes : 0;
	return { ...s, day: dayKey(now), snoozes: used, until: now.getTime() + START_GRACE_MS };
}

export const loadStudyFirst = (): StudyFirstState => ({
	...initialState(),
	...getLocalStorageItem<Partial<StudyFirstState>>(STUDY_FIRST_KEY, {}),
});

export const saveStudyFirst = (s: StudyFirstState) =>
	setLocalStorageItem(STUDY_FIRST_KEY, s);
