import type { ConversationStep } from "./types";

export const jobInterview: ConversationStep[] = [
	{
		id: "j1",
		mascotMessage: "Welcome. Please, tell me a little about yourself.",
		options: [
			{
				id: "jo1",
				text_en: "I am very lazy.",
				text_pt: "Sou muito preguiçoso.",
				isCorrect: false,
				feedback: "Not a good thing to say!",
				feedbackPt: "Não é algo bom para dizer!",
			},
			{
				id: "jo2",
				text_en: "I am a software engineer with 5 years of experience.",
				text_pt: "Sou engenheiro de software com 5 anos de experiência.",
				isCorrect: true,
			},
			{
				id: "jo3",
				text_en: "I love pizza.",
				text_pt: "Eu amo pizza.",
				isCorrect: false,
				feedback: "Relevant professional info only.",
				feedbackPt: "Fale apenas de informações profissionais relevantes.",
			},
		],
	},
	{
		id: "j2",
		mascotMessage: "Impressive. Why do you want to work here?",
		options: [
			{
				id: "jo21",
				text_en: "I need money.",
				text_pt: "Preciso de dinheiro.",
				isCorrect: false,
				feedback: "Too honest. Try something about the company.",
				feedbackPt: "Sincero demais. Tente falar sobre a empresa.",
			},
			{
				id: "jo22",
				text_en: "I admire this company's innovation.",
				text_pt: "Admiro a inovação desta empresa.",
				isCorrect: true,
			},
		],
	},
	{
		id: "j3",
		mascotMessage: "Great answer. Do you have any questions for us?",
		options: [
			{
				id: "jo31",
				text_en: "When can I start?",
				text_pt: "Quando posso começar?",
				isCorrect: true,
			},
			{
				id: "jo32",
				text_en: "Can I sleep at work?",
				text_pt: "Posso dormir no trabalho?",
				isCorrect: false,
			},
		],
	},
];

export const jobInterviewSmalltalk: ConversationStep[] = [
	{
		id: "js1",
		mascotMessage: "Hi, thanks for coming in. Did you find the office okay?",
		options: [
			{
				id: "js1o1",
				text_en: "Yes, it was easy to find, thank you.",
				text_pt: "Sim, foi fácil de encontrar, obrigado.",
				isCorrect: true,
			},
			{
				id: "js1o2",
				text_en: "No, I am lost right now.",
				text_pt: "Não, estou perdido agora mesmo.",
				isCorrect: false,
				feedback: "That's not a great start!",
				feedbackPt: "Esse não é um bom começo!",
			},
		],
	},
	{
		id: "js2",
		mascotMessage: "Would you like some water or coffee?",
		options: [
			{
				id: "js2o1",
				text_en: "Water would be great, thanks.",
				text_pt: "Água seria ótimo, obrigado.",
				isCorrect: true,
			},
			{
				id: "js2o2",
				text_en: "I only drink juice.",
				text_pt: "Eu só bebo suco.",
				isCorrect: false,
				feedback: "Keep it simple and polite.",
				feedbackPt: "Mantenha a resposta simples e educada.",
			},
		],
	},
	{
		id: "js3",
		mascotMessage: "Great, let's get started with the interview.",
		options: [
			{
				id: "js3o1",
				text_en: "Sounds good, I'm ready.",
				text_pt: "Combinado, estou pronto.",
				isCorrect: true,
			},
		],
	},
];
