import type { CEFRLevel } from "./curriculumData";

export type FluencyPrompt = {
	id: string;
	level: CEFRLevel;
	prompt: string;
	promptPt: string;
	tips: string[];
};

export type ShadowingLine = {
	id: string;
	level: CEFRLevel;
	en: string;
	pt: string;
};

/** Tarefas de fala cronometrada 4/3/2 (Nation): repetir o mesmo tema em menos tempo. */
export const fluencyPrompts: FluencyPrompt[] = [
	{
		id: "a1-myself",
		level: "A1",
		prompt: "Talk about yourself: your name, your city and your job.",
		promptPt: "Fale sobre você: nome, cidade e trabalho.",
		tips: ["Use o verbo TO BE", "Fale devagar e claro"],
	},
	{
		id: "a1-my-day",
		level: "A1",
		prompt: "Describe your normal day, from morning to night.",
		promptPt: "Descreva seu dia normal, da manhã à noite.",
		tips: ["Use o Present Simple", "Comece com 'I wake up...'"],
	},
	{
		id: "a2-last-weekend",
		level: "A2",
		prompt: "Tell what you did last weekend.",
		promptPt: "Conte o que você fez no fim de semana passado.",
		tips: ["Use o Past Simple", "Inclua verbos irregulares (went, ate, saw)"],
	},
	{
		id: "b1-plans",
		level: "B1",
		prompt: "Explain your plans for the next year and why.",
		promptPt: "Explique seus planos para o próximo ano e por quê.",
		tips: ["Use going to e will", "Justifique com 'because'"],
	},
	{
		id: "b2-opinion",
		level: "B2",
		prompt: "Give your opinion on remote work.",
		promptPt: "Dê sua opinião sobre o trabalho remoto.",
		tips: ["Use conectores: however, therefore", "Defenda um ponto de vista"],
	},
	{
		id: "c1-debate",
		level: "C1",
		prompt: "Discuss whether technology makes us more productive or more distracted.",
		promptPt: "Discuta se a tecnologia nos torna mais produtivos ou mais distraídos.",
		tips: ["Use hedging: it seems, arguably", "Reconheça o outro lado"],
	},
];

/** Frases curtas para shadowing: ouça e repita imitando ritmo e entonação. */
export const shadowingLines: ShadowingLine[] = [
	{ id: "s-a1-1", level: "A1", en: "Nice to meet you.", pt: "Prazer em conhecê-lo." },
	{ id: "s-a1-2", level: "A1", en: "How are you doing today?", pt: "Como você está hoje?" },
	{ id: "s-a2-1", level: "A2", en: "I'd like a coffee, please.", pt: "Eu gostaria de um café, por favor." },
	{ id: "s-a2-2", level: "A2", en: "Could you say that again?", pt: "Você poderia repetir isso?" },
	{ id: "s-b1-1", level: "B1", en: "I've been working here for two years.", pt: "Eu trabalho aqui há dois anos." },
	{ id: "s-b1-2", level: "B1", en: "That's exactly what I was thinking.", pt: "É exatamente o que eu estava pensando." },
	{ id: "s-b2-1", level: "B2", en: "It depends on how you look at it.", pt: "Depende de como você encara isso." },
	{ id: "s-c1-1", level: "C1", en: "I couldn't agree more, to be honest.", pt: "Não poderia concordar mais, sinceramente." },
];
