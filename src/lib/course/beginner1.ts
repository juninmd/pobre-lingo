import type { GuidedLesson } from "./types";

export const beginner1Lessons: GuidedLesson[] = [
	{
		id: "hello",
		level: "Pré-A1",
		title: "Seu primeiro diálogo",
		goal: "Cumprimentar alguém e dizer seu nome.",
		explanation:
			"Você não precisa conhecer gramática para começar. Hello significa olá. My name is significa meu nome é. Use essas expressões inteiras como blocos. Em inglês, I (eu) sempre aparece em maiúscula. Ouça cada exemplo e repita devagar; entender vem antes de falar rápido.",
		examples: [
			{ en: "Hello!", pt: "Olá!" },
			{ en: "My name is Ana.", pt: "Meu nome é Ana." },
			{ en: "Nice to meet you.", pt: "Prazer em conhecer você." },
		],
		practice: [
			{
				id: "hello-p1",
				prompt: "Como você diz olá?",
				answers: ["hello"],
				explanation: "Hello é um cumprimento. Goodbye é despedida.",
			},
			{
				id: "hello-p2",
				prompt: "Complete: My ___ is Ana.",
				answers: ["name"],
				explanation: "Name significa nome. My name is apresenta seu nome.",
			},
		],
		check: [
			{
				id: "hello-c1",
				prompt: "Você encontra alguém. Escreva olá em inglês.",
				answers: ["hello", "hi"],
				explanation: "Hello e Hi são cumprimentos; Hi é mais informal.",
			},
			{
				id: "hello-c2",
				prompt: "Apresente Leo: Meu nome é Leo.",
				answers: ["my name is Leo", "I'm Leo", "I am Leo"],
				explanation: "My name is Leo ou I am Leo apresentam a pessoa que fala.",
			},
			{
				id: "hello-c3",
				prompt: "Complete a expressão: Nice to ___ you.",
				answers: ["meet"],
				explanation: "Nice to meet you é prazer em conhecer você.",
			},
		],
		mission:
			"Cumprimente uma pessoa imaginária, diga seu próprio nome e termine com Nice to meet you. Grave no celular e escute. Este ensaio não é uma avaliação automática de pronúncia.",
		practiceRoute: "/pronunciation",
	},
	{
		id: "help",
		level: "Pré-A1",
		title: "Peça ajuda sem travar",
		goal: "Avisar que não entendeu e pedir para repetir.",
		explanation:
			"Não entender é parte da aula. Please torna o pedido educado. Repeat significa repetir; slowly significa devagar. I don't understand é um bloco útil: eu não entendo. Não traduza palavra por palavra antes de usar uma expressão.",
		examples: [
			{ en: "Please repeat.", pt: "Por favor, repita." },
			{ en: "Speak slowly, please.", pt: "Fale devagar, por favor." },
			{ en: "I don't understand.", pt: "Eu não entendo." },
		],
		practice: [
			{
				id: "help-p1",
				prompt: "Escreva por favor em inglês.",
				answers: ["please"],
				explanation: "Please acompanha pedidos educados.",
			},
			{
				id: "help-p2",
				prompt: "Complete: I don't ___ (entendo).",
				answers: ["understand"],
				explanation: "Understand significa entender.",
			},
		],
		check: [
			{
				id: "help-c1",
				prompt: "Peça: Por favor, repita.",
				answers: ["please repeat", "repeat please"],
				explanation: "Please pode vir antes ou depois de repeat.",
			},
			{
				id: "help-c2",
				prompt: "Complete: Speak ___, please. (devagar)",
				answers: ["slowly"],
				explanation: "Slowly descreve como a pessoa deve falar.",
			},
			{
				id: "help-c3",
				prompt: "Diga: Eu não entendo.",
				answers: ["I don't understand", "I do not understand"],
				explanation: "Don't é a forma curta de do not.",
			},
		],
		mission:
			"Faça o diálogo anterior de novo. Desta vez, interrompa com Please repeat e Speak slowly, please. Você já consegue controlar o ritmo da conversa.",
		practiceRoute: "/exercises/conversation",
	},
];
