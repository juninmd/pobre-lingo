import type { CEFRLevel } from "@/lib/curriculumData";

export interface LevelProfile {
	focus: string;
	dailyPlan: string[];
	tips: string[];
}

export const proficiencyProfiles: Record<CEFRLevel, LevelProfile> = {
	A1: {
		focus: "frases de sobrevivência, verbo to be e vocabulário essencial.",
		dailyPlan: ["10 palavras úteis", "5 frases em voz alta", "1 lição A1"],
		tips: ["Fale 5 frases sobre sua rotina usando I am / I have / I like."],
	},
	A2: {
		focus: "passado simples, perguntas, rotina e descrições curtas.",
		dailyPlan: ["1 diálogo curto", "10 min de listening lento", "1 quiz A2"],
		tips: ["Conte ontem em 6 frases: I went, I saw, I ate, I worked."],
	},
	B1: {
		focus: "conversas reais, leitura curta e controle de tempos verbais.",
		dailyPlan: ["1 notícia fácil", "shadowing por 5 min", "1 resposta escrita"],
		tips: [
			"Resuma uma notícia em 80 palavras e grave sua opinião em voz alta.",
		],
	},
	B2: {
		focus: "argumentação, fluência, phrasal verbs e precisão gramatical.",
		dailyPlan: ["1 speaking prompt", "20 min input nativo", "corrigir 5 erros"],
		tips: [
			"Defenda uma opinião por 2 minutos usando however, although e therefore.",
		],
	},
	C1: {
		focus: "nuance, escrita formal, coesão e compreensão de argumentos.",
		dailyPlan: ["1 essay outline", "10 collocations", "1 leitura complexa"],
		tips: ["Reescreva um parágrafo em tom formal e depois em tom natural."],
	},
	C2: {
		focus: "precisão, estilo, inferência e mediação entre textos.",
		dailyPlan: ["comparar 2 fontes", "reescrever 1 texto", "debater 1 tema"],
		tips: [
			"Compare duas fontes e escreva uma síntese distinguindo fatos e opiniões.",
		],
	},
};
