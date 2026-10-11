import type { QuizQuestion } from "./types";

// Fluency challenge (unit 10): professional English, collocations and register.
export const fluencyChallengeBank: QuizQuestion[] = [
	{
		question: "Which sentence follows up politely on an email with no reply?",
		options: [
			"Why didn't you answer my email?",
			"I'm just following up on my last email.",
			"Answer me immediately.",
			"I forgot to write you.",
		],
		correctAnswer: 1,
		explanation:
			'"Just following up" é uma forma educada e profissional de lembrar alguém sem pressionar.',
	},
	{
		question:
			'Complete: "We need to ___ progress on this project before the review."',
		options: ["do", "make", "have", "take"],
		correctAnswer: 1,
		explanation:
			'A colocação correta é "make progress". Não dizemos "do progress".',
	},
	{
		question:
			'Complete: "We had to ___ the meeting because the manager was ill."',
		options: ["call back", "call for", "call off", "call on"],
		correctAnswer: 2,
		explanation:
			'"Call off" significa cancelar. "Call back" é retornar uma ligação e "call for" é exigir.',
	},
	{
		question: "Which response is the most polite way to disagree in a meeting?",
		options: [
			"That's not true.",
			"No, that's a bad idea.",
			"You're completely wrong.",
			"I see your point, but I'm not sure I agree.",
		],
		correctAnswer: 3,
		explanation:
			'Reconhecer o argumento do outro antes de discordar, com "I see your point, but...", mantém o tom profissional.',
	},
	{
		question: "The client insisted that we ___ the contract before Friday.",
		options: ["sign", "would sign", "to sign", "signed"],
		correctAnswer: 0,
		explanation:
			'Depois de "insist that" usamos o verbo na forma base: "insisted that we sign".',
	},
	{
		question: 'What does "to be on the same page" mean?',
		options: [
			"To read a document together",
			"To be late for a meeting",
			"To agree or share the same understanding",
			"To change the subject",
		],
		correctAnswer: 2,
		explanation:
			'"To be on the same page" significa estar alinhado, com a mesma compreensão sobre algo.',
	},
	{
		question: 'Complete: "The new policy will have a ___ impact on sales."',
		options: ["significantly", "significance", "signify", "significant"],
		correctAnswer: 3,
		explanation:
			'Antes de substantivo usamos adjetivo: "significant impact" (impacto significativo).',
	},
	{
		question: 'Complete: "He asked me ___ the presentation was ready."',
		options: ["that", "which", "whether", "where"],
		correctAnswer: 2,
		explanation:
			'"Whether" introduz uma pergunta indireta de sim ou não: "He asked me whether the presentation was ready."',
	},
	{
		question: 'Complete: "Our team is ___ track to finish the project early."',
		options: ["in", "at", "by", "on"],
		correctAnswer: 3,
		explanation:
			'"On track" significa estar no caminho certo, dentro do cronograma.',
	},
	{
		question: 'Complete: "She is responsible ___ managing the budget."',
		options: ["for", "of", "to", "at"],
		correctAnswer: 0,
		explanation:
			'"Responsible for" é a preposição correta: "responsible for managing the budget".',
	},
];
