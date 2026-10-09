import { SCENARIOS } from "@/lib/conversationData";
import { curriculumData } from "@/lib/curriculumData";
import { gradedReaders } from "@/lib/gradedReaders";
import { getRuleById } from "@/lib/grammarRules";
import { getLessonLink } from "@/lib/lessonLink";

export type TrackStepKind =
	| "lesson"
	| "reader"
	| "rule"
	| "pronunciation"
	| "conversation"
	| "tutor";

export interface TrackStep {
	id: string;
	kind: TrackStepKind;
	title: string;
	href: string;
	minutes: number;
	/** Necessário para checar conclusão via useCurriculumProgress (lessons). */
	moduleId?: string;
	lessonId?: string;
	/** Necessário para checar conclusão via useReadingProgress (readers). */
	readerId?: string;
}

const moduleMap = new Map(curriculumData.modules.map((m) => [m.id, m]));
const readerMap = new Map(gradedReaders.map((r) => [r.id, r]));

export function lessonStep(moduleId: string, lessonId: string): TrackStep {
	const module = moduleMap.get(moduleId);
	const lesson = module?.lessons.find((l) => l.id === lessonId);
	if (!module || !lesson) {
		throw new Error(`Lição não encontrada: ${moduleId}/${lessonId}`);
	}
	return {
		id: `lesson-${lessonId}`,
		kind: "lesson",
		title: lesson.title_pt,
		href: getLessonLink(module, lesson),
		minutes: lesson.estimatedMinutes,
		moduleId,
		lessonId,
	};
}

export function readerStep(readerId: string): TrackStep {
	const reader = readerMap.get(readerId);
	if (!reader) {
		throw new Error(`Leitor não encontrado: ${readerId}`);
	}
	return {
		id: `reader-${readerId}`,
		kind: "reader",
		title: reader.title,
		href: `/reading/${readerId}`,
		minutes: 10,
		readerId,
	};
}

export function ruleStep(ruleId: string, minutes = 15): TrackStep {
	const rule = getRuleById(ruleId);
	if (!rule) {
		throw new Error(`Regra não encontrada: ${ruleId}`);
	}
	return {
		id: `rule-${ruleId}`,
		kind: "rule",
		title: rule.title_pt,
		href: `/rules?ruleIds=${ruleId}`,
		minutes,
	};
}

export function pronunciationStep(
	id: string,
	title: string,
	minutes = 10,
): TrackStep {
	return {
		id: `pronunciation-${id}`,
		kind: "pronunciation",
		title,
		href: "/pronunciation",
		minutes,
	};
}

export function tutorStep(
	id: string,
	title: string,
	scenario: string,
	minutes = 15,
): TrackStep {
	return {
		id: `tutor-${id}`,
		kind: "tutor",
		title,
		href: `/tutor?scenario=${scenario}`,
		minutes,
	};
}

export function conversationStep(
	scenario: string,
	title: string,
	minutes = 5,
): TrackStep {
	if (!SCENARIOS[scenario]) {
		throw new Error(`Conversa não encontrada: ${scenario}`);
	}
	return {
		id: `conversation-${scenario}`,
		kind: "conversation",
		title,
		href: `/exercises/conversation?scenario=${scenario}`,
		minutes,
	};
}
