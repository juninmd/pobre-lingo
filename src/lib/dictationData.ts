import type { CEFRLevel } from "./curriculumData";

export type DictationItem = {
	id: string;
	level: CEFRLevel;
	sentence: string;
	translation: string;
};

export type WritingPrompt = {
	id: string;
	level: CEFRLevel;
	prompt: string;
	promptPt: string;
	minWords: number;
	/** Palavras que devem aparecer no texto (feedback heurístico). */
	keywords: string[];
};

export const dictations: DictationItem[] = [
	{
		id: "d-a1-1",
		level: "A1",
		sentence: "I am a student.",
		translation: "Eu sou um estudante.",
	},
	{
		id: "d-a1-2",
		level: "A1",
		sentence: "She has two brothers.",
		translation: "Ela tem dois irmãos.",
	},
	{
		id: "d-a1-3",
		level: "A1",
		sentence: "We live in a big city.",
		translation: "Nós moramos em uma cidade grande.",
	},
	{
		id: "d-a2-1",
		level: "A2",
		sentence: "I went to the market yesterday.",
		translation: "Eu fui ao mercado ontem.",
	},
	{
		id: "d-a2-2",
		level: "A2",
		sentence: "They are going to travel next week.",
		translation: "Eles vão viajar na próxima semana.",
	},
	{
		id: "d-a2-3",
		level: "A2",
		sentence: "Could you help me, please?",
		translation: "Você poderia me ajudar, por favor?",
	},
	{
		id: "d-b1-1",
		level: "B1",
		sentence: "I have worked here for three years.",
		translation: "Eu trabalho aqui há três anos.",
	},
	{
		id: "d-b1-2",
		level: "B1",
		sentence: "She said she would call me later.",
		translation: "Ela disse que me ligaria mais tarde.",
	},
	{
		id: "d-b1-3",
		level: "B1",
		sentence: "If I had more time, I would travel more.",
		translation: "Se eu tivesse mais tempo, viajaria mais.",
	},
	{
		id: "d-b2-1",
		level: "B2",
		sentence: "The report was written by the marketing team.",
		translation: "O relatório foi escrito pela equipe de marketing.",
	},
	{
		id: "d-b2-2",
		level: "B2",
		sentence: "Despite the rain, we decided to continue.",
		translation: "Apesar da chuva, decidimos continuar.",
	},
	{
		id: "d-b2-3",
		level: "B2",
		sentence: "He had already left when we arrived.",
		translation: "Ele já tinha saído quando chegamos.",
	},
];

export const writingPrompts: WritingPrompt[] = [
	{
		id: "w-a1-1",
		level: "A1",
		prompt: "Write 3 sentences about your family.",
		promptPt: "Escreva 3 frases sobre sua família.",
		minWords: 15,
		keywords: ["is", "are", "have"],
	},
	{
		id: "w-a2-1",
		level: "A2",
		prompt: "Describe what you did last weekend.",
		promptPt: "Descreva o que você fez no fim de semana passado.",
		minWords: 40,
		keywords: ["went", "was", "and"],
	},
	{
		id: "w-b1-1",
		level: "B1",
		prompt: "Write about your plans for the next year.",
		promptPt: "Escreva sobre seus planos para o próximo ano.",
		minWords: 60,
		keywords: ["going to", "will", "because"],
	},
	{
		id: "w-b2-1",
		level: "B2",
		prompt: "Give your opinion on social media in education.",
		promptPt: "Dê sua opinião sobre redes sociais na educação.",
		minWords: 80,
		keywords: ["however", "therefore", "although"],
	},
];

export function getDictationsByLevel(level: CEFRLevel): DictationItem[] {
	return dictations.filter((item) => item.level === level);
}
