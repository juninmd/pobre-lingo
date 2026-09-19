import { LEVEL_VOCAB_TARGETS } from "@/lib/coreVocabulary";
import type { CEFRLevel } from "@/lib/curriculumData";
import {
	FLUENCY_LEVEL,
	LEVEL_HOURS,
	LEVEL_WORDS_READ,
	nextLevel,
	type Projection,
	projectTo,
} from "@/lib/fluencyGoals";
import {
	STRAND_ROUTES,
	STRAND_TIE_ORDER,
	STRAND_TIPS,
	type StrandKind,
} from "@/lib/fluencyStrands";
import {
	dayKey,
	STUDY_KINDS,
	type StudyKind,
	type StudyLog,
	totalHours,
	weeklyHours,
} from "@/lib/studyTime";

export type { StrandKind } from "@/lib/fluencyStrands";

export interface WeakestStrand {
	kind: StrandKind;
	minutes: number;
	recommendation: string;
	route: string;
}

export interface FluencyJourney {
	level: CEFRLevel | null;
	target: CEFRLevel;
	fluencyTarget: CEFRLevel;
	hoursDone: number;
	weeklyHours: number;
	projectionToTarget: Projection;
	projectionToFluency: Projection;
	projectionToTargetAtGoal: Projection;
	projectionToFluencyAtGoal: Projection;
	wordsRead: number;
	wordsReadTarget: number;
	vocabKnown: number;
	vocabTarget: number;
	strandMinutesThisWeek: Record<StrandKind, number>;
	weakestStrand: WeakestStrand;
}

export interface BuildJourneyInput {
	level: CEFRLevel | null;
	log: StudyLog;
	knownWords: number;
	now: Date;
	weeklyGoalHours: number;
}

/** Minutos por vertente nos últimos 7 dias (inclui hoje), como `weeklyHours` por vertente. */
function strandMinutesThisWeek(
	log: StudyLog,
	now: Date,
): Record<StudyKind, number> {
	const start = new Date(now);
	start.setDate(start.getDate() - 6);
	const startKey = dayKey(start);
	const totals = Object.fromEntries(
		STUDY_KINDS.map((kind) => [kind, 0]),
	) as Record<StudyKind, number>;
	for (const [key, day] of Object.entries(log.days)) {
		if (key < startKey) continue;
		for (const kind of STUDY_KINDS) totals[kind] += day[kind] ?? 0;
	}
	for (const kind of STUDY_KINDS) totals[kind] = Math.round(totals[kind] / 60);
	return totals;
}

function pickWeakestStrand(minutes: Record<StudyKind, number>): WeakestStrand {
	let weakest: StrandKind = STRAND_TIE_ORDER[0];
	let lowest = minutes[weakest];
	for (const kind of STRAND_TIE_ORDER) {
		if (minutes[kind] < lowest) {
			lowest = minutes[kind];
			weakest = kind;
		}
	}
	return {
		kind: weakest,
		minutes: minutes[weakest],
		recommendation: STRAND_TIPS[weakest],
		route: STRAND_ROUTES[weakest],
	};
}

/**
 * Visão consolidada do caminho até a fluência. `hoursDone` assume que o
 * nível de nivelamento já embute as horas guiadas típicas dele (Cambridge);
 * somamos só as horas registradas pelo app a partir daí, sem contar 2x.
 */
export function buildJourney({
	level,
	log,
	knownWords,
	now,
	weeklyGoalHours,
}: BuildJourneyInput): FluencyJourney {
	const target = nextLevel(level);
	const baseline = level ? LEVEL_HOURS[level] : 0;
	const hoursDone = baseline + totalHours(log);
	const weekly = weeklyHours(log, now);
	const goal = Math.max(0, weeklyGoalHours);

	const atWeekly = Math.max(weekly, 0);
	const projectionToTarget = projectTo(target, hoursDone, atWeekly);
	const projectionToFluency = projectTo(FLUENCY_LEVEL, hoursDone, atWeekly);
	const projectionToTargetAtGoal = projectTo(target, hoursDone, goal);
	const projectionToFluencyAtGoal = projectTo(FLUENCY_LEVEL, hoursDone, goal);

	const minutes = strandMinutesThisWeek(log, now);
	const strandMinutesThisWeekOut: Record<StrandKind, number> = {
		reading: minutes.reading,
		listening: minutes.listening,
		speaking: minutes.speaking,
		writing: minutes.writing,
	};

	return {
		level,
		target,
		fluencyTarget: FLUENCY_LEVEL,
		hoursDone,
		weeklyHours: weekly,
		projectionToTarget,
		projectionToFluency,
		projectionToTargetAtGoal,
		projectionToFluencyAtGoal,
		wordsRead: log.wordsRead,
		wordsReadTarget: LEVEL_WORDS_READ[target],
		vocabKnown: knownWords,
		vocabTarget: LEVEL_VOCAB_TARGETS[target],
		strandMinutesThisWeek: strandMinutesThisWeekOut,
		weakestStrand: pickWeakestStrand(minutes),
	};
}
