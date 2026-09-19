import type { CEFRLevel } from "./curriculumData";

export type CanDoStatement = { id: string; text: string };

export type CheckpointQuestion = {
	id: string;
	question: string;
	options: string[];
	answerIndex: number;
};

export const canDoStatements: Record<CEFRLevel, CanDoStatement[]> = {
	A1: [
		{ id: "a1-1", text: "Consigo me apresentar e falar de dados pessoais." },
		{ id: "a1-2", text: "Consigo entender frases simples ditas devagar." },
		{ id: "a1-3", text: "Consigo usar o verbo TO BE e o Present Simple." },
	],
	A2: [
		{
			id: "a2-1",
			text: "Consigo lidar com situações do dia a dia (compras, viagem).",
		},
		{
			id: "a2-2",
			text: "Consigo falar do passado com verbos regulares e irregulares.",
		},
		{ id: "a2-3", text: "Consigo falar de planos com going to." },
	],
	B1: [
		{
			id: "b1-1",
			text: "Consigo descrever experiências e justificar opiniões.",
		},
		{
			id: "b1-2",
			text: "Consigo usar Present Perfect e condicionais básicas.",
		},
		{ id: "b1-3", text: "Consigo me virar em viagens e imprevistos." },
	],
	B2: [
		{
			id: "b2-1",
			text: "Consigo argumentar um ponto de vista com conectores.",
		},
		{
			id: "b2-2",
			text: "Consigo entender textos complexos sobre temas conhecidos.",
		},
		{ id: "b2-3", text: "Consigo usar voz passiva e Past Perfect." },
	],
	C1: [
		{
			id: "c1-1",
			text: "Consigo me expressar com fluência sem muito esforço.",
		},
		{
			id: "c1-2",
			text: "Consigo usar a língua com flexibilidade no trabalho e estudo.",
		},
		{ id: "c1-3", text: "Consigo compreender significados implícitos." },
	],
	C2: [
		{
			id: "c2-1",
			text: "Consigo entender praticamente tudo que ouço ou leio.",
		},
		{
			id: "c2-2",
			text: "Consigo resumir e argumentar a partir de várias fontes.",
		},
		{ id: "c2-3", text: "Consigo me expressar com precisão e nuances." },
	],
};

export const checkpointQuestions: Record<CEFRLevel, CheckpointQuestion[]> = {
	A1: [
		{
			id: "cp-a1-1",
			question: "Complete: ___ a student.",
			options: ["I am", "I is", "I are"],
			answerIndex: 0,
		},
		{
			id: "cp-a1-2",
			question: "Complete: She ___ coffee every morning.",
			options: ["drink", "drinks", "drinking"],
			answerIndex: 1,
		},
		{
			id: "cp-a1-3",
			question: "Qual frase está correta?",
			options: ["There are a book.", "There is a book.", "There a book is."],
			answerIndex: 1,
		},
	],
	A2: [
		{
			id: "cp-a2-1",
			question: "Complete: We ___ to the beach yesterday.",
			options: ["go", "went", "gone"],
			answerIndex: 1,
		},
		{
			id: "cp-a2-2",
			question: "Complete: I ___ visit my aunt next week.",
			options: ["am going to", "go to", "am go to"],
			answerIndex: 0,
		},
		{
			id: "cp-a2-3",
			question: "Complete: I didn't ___ the film.",
			options: ["watched", "watch", "watching"],
			answerIndex: 1,
		},
	],
	B1: [
		{
			id: "cp-b1-1",
			question: "Complete: I ___ here for three years.",
			options: ["work", "have worked", "worked"],
			answerIndex: 1,
		},
		{
			id: "cp-b1-2",
			question: "Complete: If it rains, we ___ at home.",
			options: ["stay", "will stay", "would stay"],
			answerIndex: 1,
		},
		{
			id: "cp-b1-3",
			question:
				"Escolha o conector correto: I was tired, ___ I finished the work.",
			options: ["but", "so", "because"],
			answerIndex: 0,
		},
	],
	B2: [
		{
			id: "cp-b2-1",
			question: "Complete (passive): The email ___ yesterday.",
			options: ["sent", "was sent", "is sent"],
			answerIndex: 1,
		},
		{
			id: "cp-b2-2",
			question: "Complete (past perfect): The train ___ before we arrived.",
			options: ["left", "had left", "has left"],
			answerIndex: 1,
		},
		{
			id: "cp-b2-3",
			question: "Complete: ___ the rain, we went out.",
			options: ["Despite", "Although", "Because"],
			answerIndex: 0,
		},
	],
	C1: [
		{
			id: "cp-c1-1",
			question: "Complete: Not only ___ late, but he also forgot the file.",
			options: ["he was", "was he", "he is"],
			answerIndex: 1,
		},
		{
			id: "cp-c1-2",
			question: "Complete: It's high time we ___ a decision.",
			options: ["make", "made", "will make"],
			answerIndex: 1,
		},
		{
			id: "cp-c1-3",
			question: "Complete: Had I known, I ___ differently.",
			options: ["would act", "would have acted", "acted"],
			answerIndex: 1,
		},
	],
	C2: [
		{
			id: "cp-c2-1",
			question: "Complete: Little ___ that he was being watched.",
			options: ["he knew", "did he know", "he did know"],
			answerIndex: 1,
		},
		{
			id: "cp-c2-2",
			question: "Complete: The proposal, ___ merits are clear, was approved.",
			options: ["which", "whose", "that"],
			answerIndex: 1,
		},
		{
			id: "cp-c2-3",
			question:
				"Complete: ___ more carefully, she would have avoided the error.",
			options: ["Had she checked", "If she checked", "She had checked"],
			answerIndex: 0,
		},
	],
};
