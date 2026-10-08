import type { CEFRLevel } from "@/lib/curriculumData";
import { proficiencyProfiles } from "@/lib/proficiencyProfiles";
import { proficiencyQuestions } from "@/lib/proficiencyQuestions";

export const PROFICIENCY_RESULT_KEY = "pobrelingo_proficiency_result";

export interface ProficiencyResult {
	level: CEFRLevel;
	score: number;
	total: number;
	date: string;
	ielts: string;
	toefl: string;
	cambridge: string;
	focus: string;
	dailyPlan: string[];
	skillReports: SkillReport[];
	weakestSkill: string;
	todayTip: string;
	confidence: "baixa" | "media" | "alta";
}

export interface SkillReport {
	skill: string;
	correct: number;
	total: number;
	percent: number;
}

export function calculateProficiency(
	answers: Record<number, string>,
	now = new Date(),
): ProficiencyResult {
	const correct = proficiencyQuestions.filter(
		(question) => answers[question.id] === question.correctAnswer,
	);
	const score = correct.length;
	const level = inferLevel(correct.map((question) => question.cefr));
	const skillReports = buildSkillReports(answers);
	const weakestSkill = [...skillReports].sort(
		(a, b) => a.percent - b.percent,
	)[0].skill;
	return {
		level,
		score,
		total: proficiencyQuestions.length,
		date: now.toISOString().split("T")[0],
		skillReports,
		weakestSkill,
		todayTip: getDailyTip(level, now),
		confidence: score >= 10 ? "alta" : score >= 7 ? "media" : "baixa",
		...proficiencyProfiles[level],
	};
}

export function buildSkillReports(
	answers: Record<number, string>,
): SkillReport[] {
	const skills = [
		...new Set(proficiencyQuestions.map((question) => question.skill)),
	];
	return skills.map((skill) => {
		const questions = proficiencyQuestions.filter(
			(question) => question.skill === skill,
		);
		const correct = questions.filter(
			(question) => answers[question.id] === question.correctAnswer,
		).length;
		return {
			skill,
			correct,
			total: questions.length,
			percent: Math.round((correct / questions.length) * 100),
		};
	});
}

export function getDailyTip(level: CEFRLevel, now = new Date()): string {
	const tips = proficiencyProfiles[level].tips;
	const day = Math.floor(
		(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
			Date.UTC(now.getFullYear(), 0, 0)) /
			86400000,
	);
	return tips[day % tips.length];
}

export function inferLevel(passedLevels: CEFRLevel[]): CEFRLevel {
	const levels: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
	let unlocked: CEFRLevel = "A1";

	for (const level of levels) {
		const total = proficiencyQuestions.filter((q) => q.cefr === level).length;
		const passed = passedLevels.filter((value) => value === level).length;
		if (total > 0 && passed / total >= 0.5) {
			unlocked = level;
		}
	}

	return unlocked;
}

export function loadProficiencyResult(): ProficiencyResult | null {
	try {
		const raw = localStorage.getItem(PROFICIENCY_RESULT_KEY);
		const parsed = raw ? JSON.parse(raw) : null;
		return parsed?.skillReports ? parsed : null;
	} catch {
		return null;
	}
}

export function saveProficiencyResult(result: ProficiencyResult): void {
	try {
		localStorage.setItem(PROFICIENCY_RESULT_KEY, JSON.stringify(result));
	} catch {}
}
