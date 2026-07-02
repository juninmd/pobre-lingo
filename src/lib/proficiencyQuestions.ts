import type { CEFRLevel } from "@/lib/curriculumData";

export interface ProficiencyQuestion {
	id: number;
	skill: "grammar" | "vocabulary" | "reading" | "certification";
	cefr: CEFRLevel;
	question: string;
	options: string[];
	correctAnswer: string;
}

export const proficiencyQuestions: ProficiencyQuestion[] = [
	{
		id: 1,
		skill: "grammar",
		cefr: "A1",
		question: "Choose the correct sentence.",
		options: ["She are tired.", "She is tired.", "She be tired."],
		correctAnswer: "She is tired.",
	},
	{
		id: 2,
		skill: "vocabulary",
		cefr: "A1",
		question: 'What does "cheap" mean?',
		options: ["Barato", "Caro", "Rápido"],
		correctAnswer: "Barato",
	},
	{
		id: 3,
		skill: "grammar",
		cefr: "A2",
		question: 'Complete: "I ___ to work yesterday."',
		options: ["go", "went", "gone"],
		correctAnswer: "went",
	},
	{
		id: 4,
		skill: "reading",
		cefr: "A2",
		question: 'If a sign says "No refunds", what does it mean?',
		options: ["Sem trocas", "Sem reembolso", "Sem entrada"],
		correctAnswer: "Sem reembolso",
	},
	{
		id: 5,
		skill: "grammar",
		cefr: "B1",
		question: 'Complete: "I have lived here ___ 2020."',
		options: ["for", "since", "during"],
		correctAnswer: "since",
	},
	{
		id: 6,
		skill: "reading",
		cefr: "B1",
		question: 'Best paraphrase: "The meeting was called off."',
		options: ["It was cancelled.", "It was delayed.", "It was confirmed."],
		correctAnswer: "It was cancelled.",
	},
	{
		id: 7,
		skill: "grammar",
		cefr: "B2",
		question: 'Choose the natural option: "Had I known, I ___ earlier."',
		options: ["would arrive", "would have arrived", "will arrive"],
		correctAnswer: "would have arrived",
	},
	{
		id: 8,
		skill: "certification",
		cefr: "B2",
		question:
			"Which skill is usually weakest when you can read well but freeze in interviews?",
		options: ["Speaking fluency", "Spelling only", "Alphabet"],
		correctAnswer: "Speaking fluency",
	},
	{
		id: 9,
		skill: "grammar",
		cefr: "C1",
		question: 'Complete: "No sooner had she arrived ___ the phone rang."',
		options: ["than", "when", "then"],
		correctAnswer: "than",
	},
	{
		id: 10,
		skill: "vocabulary",
		cefr: "C1",
		question: 'Closest meaning of "nevertheless".',
		options: ["However", "Therefore", "Besides"],
		correctAnswer: "However",
	},
	{
		id: 11,
		skill: "reading",
		cefr: "C2",
		question: 'Meaning of "His apology rang hollow."',
		options: ["It sounded sincere.", "It sounded fake.", "It was too loud."],
		correctAnswer: "It sounded fake.",
	},
	{
		id: 12,
		skill: "certification",
		cefr: "C2",
		question: "What should a C2 candidate train most before a formal exam?",
		options: [
			"Task timing and precision",
			"Only basic colors",
			"The verb to be",
		],
		correctAnswer: "Task timing and precision",
	},
];
