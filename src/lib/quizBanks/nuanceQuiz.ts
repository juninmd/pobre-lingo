import type { QuizQuestion } from "./types";

// Nuance quiz (unit 11): commonly confused words and precise usage.
export const nuanceQuizBank: QuizQuestion[] = [
	{
		question: "From her long silence, we can ___ that she disagrees.",
		options: ["imply", "implicate", "inferring", "infer"],
		correctAnswer: 3,
		explanation:
			'"Infer" é tirar uma conclusão a partir de pistas. "Imply" é sugerir algo, e quem faz isso é quem fala.',
	},
	{
		question: "The new tax rules will have a major ___ on small businesses.",
		options: ["affect", "effective", "effect", "effectively"],
		correctAnswer: 2,
		explanation:
			'Como substantivo, "effect" (efeito) combina com "have a major effect on". "Affect" é verbo na maioria dos usos.',
	},
	{
		question: "She refused to compromise her ___.",
		options: ["principals", "principles", "principality", "principled"],
		correctAnswer: 1,
		explanation:
			'"Principles" (princípios, valores) é o correto aqui. "Principals" significa diretores de escola ou líderes.',
	},
	{
		question: "I'll ___ you my notes so you can catch up.",
		options: ["lend", "borrow", "rent", "steal"],
		correctAnswer: 0,
		explanation:
			'"Lend" é emprestar algo para outra pessoa. "Borrow" é pegar algo emprestado de alguém.',
	},
	{
		question: "The wine ___ the meal perfectly.",
		options: ["compliments", "complimentary", "complements", "complementary"],
		correctAnswer: 2,
		explanation:
			'"Complement" (combinar bem com) é o verbo certo. "Compliment" significa elogiar.',
	},
	{
		question: "___ the heavy rain, the concert went ahead as planned.",
		options: ["Although", "Despite", "However", "Because"],
		correctAnswer: 1,
		explanation:
			'"Despite" é seguido de substantivo: "Despite the heavy rain". "Although" exige uma oração completa.',
	},
	{
		question: "There were ___ people at the concert than we had expected.",
		options: ["less", "fewer", "lesser", "smaller"],
		correctAnswer: 1,
		explanation:
			'"Fewer" é usado com substantivos contáveis, como people. "Less" é usado com incontáveis.',
	},
	{
		question: "The storm is ___; we must leave the coast now.",
		options: ["eminent", "immanent", "imminent", "emergent"],
		correctAnswer: 2,
		explanation:
			'"Imminent" significa prestes a acontecer. "Eminent" significa renomado e "immanent" significa inerente.',
	},
	{
		question: "Please ___ that all the windows are closed before you leave.",
		options: ["assure", "endure", "insure", "ensure"],
		correctAnswer: 3,
		explanation:
			'"Ensure" significa garantir que algo aconteça. "Assure" é garantir algo a uma pessoa, e "insure" se refere a seguro.',
	},
	{
		question: "___ the cost, the plan carries serious risks for the team.",
		options: ["Besides", "Beside", "Between", "Behind"],
		correctAnswer: 0,
		explanation:
			'"Besides" significa "além de". "Beside" significa "ao lado de".',
	},
];
