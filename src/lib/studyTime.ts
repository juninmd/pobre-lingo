/** Minutos de estudo por dia e por vertente, para medir o caminho até a fluência. */

export type StudyKind =
	| "reading"
	| "listening"
	| "speaking"
	| "writing"
	| "study";

export const STUDY_KINDS: StudyKind[] = [
	"reading",
	"listening",
	"speaking",
	"writing",
	"study",
];

/** Segundos por vertente, por dia local (AAAA-MM-DD). */
export type StudyLog = {
	days: Record<string, Partial<Record<StudyKind, number>>>;
	wordsRead: number;
};

export const STUDY_LOG_KEY = "pobrelingo_study_log";
export const MAX_LOG_DAYS = 400;
/** Teto por registro: um evento isolado nunca soma mais que isso (aba esquecida aberta). */
export const MAX_CHUNK_SECONDS = 120;

export const emptyStudyLog = (): StudyLog => ({ days: {}, wordsRead: 0 });

export function dayKey(date: Date): string {
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function prune(days: StudyLog["days"]): StudyLog["days"] {
	const keys = Object.keys(days).sort();
	if (keys.length <= MAX_LOG_DAYS) return days;
	const keep = new Set(keys.slice(-MAX_LOG_DAYS));
	return Object.fromEntries(Object.entries(days).filter(([k]) => keep.has(k)));
}

export function addStudySeconds(
	log: StudyLog,
	kind: StudyKind,
	seconds: number,
	now: Date,
): StudyLog {
	const add = Math.min(Math.max(0, Math.round(seconds)), MAX_CHUNK_SECONDS);
	if (add === 0) return log;
	const key = dayKey(now);
	const day = log.days[key] ?? {};
	const days = {
		...log.days,
		[key]: { ...day, [kind]: (day[kind] ?? 0) + add },
	};
	return { ...log, days: prune(days) };
}

export function addWordsRead(log: StudyLog, words: number): StudyLog {
	const add = Math.max(0, Math.round(words));
	return add ? { ...log, wordsRead: log.wordsRead + add } : log;
}

export function totalsByKind(
	log: StudyLog,
	fromDay?: string,
): Record<StudyKind, number> {
	const totals = Object.fromEntries(STUDY_KINDS.map((k) => [k, 0])) as Record<
		StudyKind,
		number
	>;
	for (const [key, day] of Object.entries(log.days)) {
		if (fromDay && key < fromDay) continue;
		for (const kind of STUDY_KINDS) totals[kind] += day[kind] ?? 0;
	}
	return totals;
}

export function totalHours(log: StudyLog): number {
	const totals = totalsByKind(log);
	return STUDY_KINDS.reduce((sum, k) => sum + totals[k], 0) / 3600;
}

/** Horas nos últimos 7 dias (inclui hoje). */
export function weeklyHours(log: StudyLog, now: Date): number {
	const start = new Date(now);
	start.setDate(start.getDate() - 6);
	const totals = totalsByKind(log, dayKey(start));
	return STUDY_KINDS.reduce((sum, k) => sum + totals[k], 0) / 3600;
}

export function parseStudyLog(raw: unknown): StudyLog {
	if (!raw || typeof raw !== "object") return emptyStudyLog();
	const value = raw as Partial<StudyLog>;
	const days = value.days && typeof value.days === "object" ? value.days : {};
	const wordsRead =
		typeof value.wordsRead === "number" && value.wordsRead >= 0
			? value.wordsRead
			: 0;
	return { days, wordsRead };
}
