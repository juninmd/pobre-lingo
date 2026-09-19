import type { CEFRLevel } from "@/lib/curriculumData";
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

const profiles: Record<
	CEFRLevel,
	Omit<
		ProficiencyResult,
		| "level"
		| "score"
		| "total"
		| "date"
		| "skillReports"
		| "weakestSkill"
		| "todayTip"
		| "confidence"
	> & { tips: string[] }
> = {
	A1: {
		ielts: "pre-IELTS",
		toefl: "abaixo do iBT B1",
		cambridge: "Pre A1-A1",
		focus: "frases de sobrevivência, verbo to be e vocabulário essencial.",
		dailyPlan: ["10 palavras úteis", "5 frases em voz alta", "1 lição A1"],
		tips: ["Fale 5 frases sobre sua rotina usando I am / I have / I like."],
	},
	A2: {
		ielts: "3.0-3.5",
		toefl: "abaixo do iBT B1",
		cambridge: "A2 Key",
		focus: "passado simples, perguntas, rotina e descrições curtas.",
		dailyPlan: ["1 diálogo curto", "10 min de listening lento", "1 quiz A2"],
		tips: ["Conte ontem em 6 frases: I went, I saw, I ate, I worked."],
	},
	B1: {
		ielts: "4.0-5.0",
		toefl: "42-71",
		cambridge: "B1 Preliminary",
		focus: "conversas reais, leitura curta e controle de tempos verbais.",
		dailyPlan: ["1 notícia fácil", "shadowing por 5 min", "1 resposta escrita"],
		tips: [
			"Resuma uma notícia em 80 palavras e grave sua opinião em voz alta.",
		],
	},
	B2: {
		ielts: "5.5-6.5",
		toefl: "72-94",
		cambridge: "B2 First",
		focus: "argumentação, fluência, phrasal verbs e precisão gramatical.",
		dailyPlan: ["1 speaking prompt", "20 min input nativo", "corrigir 5 erros"],
		tips: [
			"Defenda uma opinião por 2 minutos usando however, although e therefore.",
		],
	},
	C1: {
		ielts: "7.0-8.0",
		toefl: "95-114",
		cambridge: "C1 Advanced",
		focus: "nuance, escrita formal, coesão e velocidade de prova.",
		dailyPlan: ["1 essay outline", "10 collocations", "1 leitura complexa"],
		tips: ["Reescreva um parágrafo em tom formal e depois em tom natural."],
	},
	C2: {
		ielts: "8.5-9.0",
		toefl: "115-120",
		cambridge: "C2 Proficiency",
		focus: "precisão quase nativa, estilo, inferência e timing de exame.",
		dailyPlan: [
			"1 simulado cronometrado",
			"reescrever 1 texto",
			"debater 1 tema",
		],
		tips: ["Cronometre uma resposta estilo prova e corte palavras vagas."],
	},
};

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
		...profiles[level],
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
	const tips = profiles[level].tips;
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
