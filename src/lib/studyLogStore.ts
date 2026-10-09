import {
	addStudySeconds,
	addWordsRead,
	emptyStudyLog,
	parseStudyLog,
	STUDY_LOG_KEY,
	type StudyKind,
	type StudyLog,
} from "./studyTime";

/**
 * Fonte única do registro de estudo: toda escrita relê o localStorage,
 * então vários componentes (timer, leitor, painel) não se sobrescrevem.
 */
const EVENT = "pobrelingo:study-log";

let cachedRaw: string | null = null;
let cached: StudyLog = emptyStudyLog();

export function getStudyLog(): StudyLog {
	let raw: string | null = null;
	try {
		raw = localStorage.getItem(STUDY_LOG_KEY);
	} catch {
		return cached;
	}
	if (raw === cachedRaw) return cached;
	cachedRaw = raw;
	try {
		cached = parseStudyLog(raw ? JSON.parse(raw) : null);
	} catch {
		cached = emptyStudyLog();
	}
	return cached;
}

function updateStudyLog(update: (log: StudyLog) => StudyLog) {
	const next = update(getStudyLog());
	try {
		localStorage.setItem(STUDY_LOG_KEY, JSON.stringify(next));
	} catch {
		return;
	}
	window.dispatchEvent(new Event(EVENT));
}

export function recordStudy(kind: StudyKind, seconds: number) {
	updateStudyLog((log) => addStudySeconds(log, kind, seconds, new Date()));
}

export function recordWordsRead(words: number) {
	updateStudyLog((log) => addWordsRead(log, words));
}

export function subscribeStudyLog(onChange: () => void): () => void {
	const onStorage = (event: StorageEvent) => {
		if (event.key === null || event.key === STUDY_LOG_KEY) onChange();
	};
	window.addEventListener(EVENT, onChange);
	window.addEventListener("storage", onStorage);
	return () => {
		window.removeEventListener(EVENT, onChange);
		window.removeEventListener("storage", onStorage);
	};
}
