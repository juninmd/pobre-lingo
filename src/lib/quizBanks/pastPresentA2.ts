import type { QuizQuestion } from "./types";

// A2 bank for the "past-present" lesson (unit 3).
export const pastPresentA2Bank: QuizQuestion[] = [
	{
		question: 'What is the Past Simple of "buy"?',
		options: ["bought", "buyed", "buy", "buying"],
		correctAnswer: 0,
		explanation:
			'"Buy" é irregular: buy - bought - bought. Não existe "buyed".',
	},
	{
		question: "Which sentence is in the Past Continuous?",
		options: [
			"I studied all night.",
			"I have studied all night.",
			"I was studying all night.",
			"I will study all night.",
		],
		correctAnswer: 2,
		explanation:
			"Past Continuous é formado por was/were + verbo com -ing e descreve uma ação em andamento no passado.",
	},
	{
		question: 'Complete: "Have you ___ sushi before?"',
		options: ["ate", "eating", "ever eat", "ever eaten"],
		correctAnswer: 3,
		explanation:
			'Com "ever" e "before" usamos o Present Perfect: "Have you ever eaten sushi?"',
	},
	{
		question: 'Complete: "She has lived here ___ 2015."',
		options: ["since", "for", "during", "from"],
		correctAnswer: 0,
		explanation:
			'"Since" indica o ponto de início no tempo (2015). "For" é usado com duração (for five years).',
	},
	{
		question: 'Complete: "I haven\'t finished my homework ___."',
		options: ["already", "still", "ever", "yet"],
		correctAnswer: 3,
		explanation:
			'Em negativas no Present Perfect, "yet" fica no final da frase: "I haven\'t finished yet."',
	},
	{
		question: "Look at those dark clouds! It ___ rain.",
		options: ["goes to", "is go to", "is going to", "went to"],
		correctAnswer: 2,
		explanation:
			'Para previsões baseadas em sinais visíveis usamos "be going to": "It is going to rain."',
	},
	{
		question: 'Complete: "Last week we ___ a new restaurant near the park."',
		options: ["find", "found", "finded", "finding"],
		correctAnswer: 1,
		explanation:
			'"Find" é irregular: find - found - found. No passado simples usamos "found".',
	},
	{
		question:
			'Complete: "She ___ to the party last night because she was sick."',
		options: ["doesn't go", "wasn't go", "didn't went", "didn't go"],
		correctAnswer: 3,
		explanation:
			"Na negativa do passado simples usamos didn't + verbo na forma base: didn't go.",
	},
	{
		question: "Listen! The baby ___.",
		options: ["is sleeping", "sleeps", "sleep", "has slept"],
		correctAnswer: 0,
		explanation:
			'"Listen!" indica algo acontecendo agora, então usamos o Present Continuous: "is sleeping".',
	},
	{
		question: 'Complete: "I ___ live in a small town when I was a child."',
		options: ["use to", "am used to", "used to", "used"],
		correctAnswer: 2,
		explanation:
			'"Used to" fala de hábitos ou situações que não são mais verdade: "I used to live in a small town."',
	},
];
