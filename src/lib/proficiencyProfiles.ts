import type { CEFRLevel } from "@/lib/curriculumData";
import type { ProficiencyResult } from "@/lib/proficiency";

export type LevelProfile = Omit<
	ProficiencyResult,
	| "level"
	| "score"
	| "total"
	| "date"
	| "skillReports"
	| "weakestSkill"
	| "todayTip"
	| "confidence"
> & { tips: string[] };

export const proficiencyProfiles: Record<CEFRLevel, LevelProfile> = {
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
