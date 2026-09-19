import type { CEFRLevel } from "@/lib/curriculumData";
import type { AdaptiveAnswer } from "@/lib/placement/adaptive";
import {
	getDailyTip,
	type ProficiencyResult,
	type SkillReport,
} from "@/lib/proficiency";
import { proficiencyProfiles } from "@/lib/proficiencyProfiles";

/** Builds a ProficiencyResult from an adaptive placement session (same shape/storage as the legacy quiz). */
export function calculateProficiencyFromAdaptive(
	answers: AdaptiveAnswer[],
	level: CEFRLevel,
	now = new Date(),
): ProficiencyResult {
	const total = answers.length || 1;
	const score = answers.filter((a) => a.correct).length;
	const skillReports = buildAdaptiveSkillReports(answers);
	const weakest = [...skillReports].sort((a, b) => a.percent - b.percent)[0];
	const ratio = score / total;
	return {
		level,
		score,
		total: answers.length,
		date: now.toISOString().split("T")[0],
		skillReports,
		weakestSkill: weakest?.skill ?? "grammar",
		todayTip: getDailyTip(level, now),
		confidence: ratio >= 0.75 ? "alta" : ratio >= 0.5 ? "media" : "baixa",
		...proficiencyProfiles[level],
	};
}

function buildAdaptiveSkillReports(answers: AdaptiveAnswer[]): SkillReport[] {
	const skills = [...new Set(answers.map((a) => a.skill))];
	return skills.map((skill) => {
		const items = answers.filter((a) => a.skill === skill);
		const correct = items.filter((a) => a.correct).length;
		return {
			skill,
			correct,
			total: items.length,
			percent: Math.round((correct / items.length) * 100),
		};
	});
}
