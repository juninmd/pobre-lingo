import type { ConversationStep } from "./types";

export const defaultScenario: ConversationStep[] = [
	{
		id: "step1",
		mascotMessage: "Hello! My name is Pobrelingo. What is your name?",
		options: [
			{
				id: "opt1",
				text_en: "I am fine, thanks.",
				text_pt: "Estou bem, obrigado.",
				isCorrect: false,
				feedback: "I asked for your name!",
				feedbackPt: "Eu perguntei seu nome!",
			},
			{
				id: "opt2",
				text_en: "My name is Ana.",
				text_pt: "Meu nome é Ana.",
				isCorrect: true,
			},
			{
				id: "opt3",
				text_en: "Goodbye!",
				text_pt: "Tchau!",
				isCorrect: false,
				feedback: "We just started!",
				feedbackPt: "Acabamos de começar!",
			},
		],
	},
	{
		id: "step2",
		mascotMessage: "Nice to meet you! How are you today?",
		options: [
			{
				id: "opt1",
				text_en: "I am very happy!",
				text_pt: "Estou muito feliz!",
				isCorrect: true,
			},
			{
				id: "opt2",
				text_en: "Yes, I am.",
				text_pt: "Sim, eu sou.",
				isCorrect: false,
				feedback: "That doesn't answer 'how' you are.",
				feedbackPt: "Isso não responde 'como' você está.",
			},
			{ id: "opt3", text_en: "Blue.", text_pt: "Azul.", isCorrect: false },
		],
	},
	{
		id: "step3",
		mascotMessage: "That is great! Are you ready to learn English?",
		options: [
			{
				id: "opt1",
				text_en: "No, I want to sleep.",
				text_pt: "Não, quero dormir.",
				isCorrect: false,
				feedback: "Come on, it will be fun!",
				feedbackPt: "Vamos lá, vai ser divertido!",
			},
			{
				id: "opt2",
				text_en: "Yes, let's go!",
				text_pt: "Sim, vamos lá!",
				isCorrect: true,
			},
		],
	},
];

export const dailyConversations: ConversationStep[] = [
	{
		id: "c1",
		mascotMessage:
			"Hi there! Welcome to the coffee shop. What can I get for you?",
		options: [
			{
				id: "o1",
				text_en: "I am a student.",
				text_pt: "Eu sou um estudante.",
				isCorrect: false,
				feedback: "The barista asked for your order.",
				feedbackPt: "O atendente pediu seu pedido.",
			},
			{
				id: "o2",
				text_en: "I would like a coffee, please.",
				text_pt: "Eu gostaria de um café, por favor.",
				isCorrect: true,
			},
			{
				id: "o3",
				text_en: "Where is the bathroom?",
				text_pt: "Onde fica o banheiro?",
				isCorrect: false,
				feedback: "Maybe order first?",
				feedbackPt: "Que tal pedir primeiro?",
			},
		],
	},
	{
		id: "c2",
		mascotMessage: "Sure thing! Do you want milk and sugar with that?",
		options: [
			{
				id: "o1",
				text_en: "Yes, please.",
				text_pt: "Sim, por favor.",
				isCorrect: true,
			},
			{
				id: "o2",
				text_en: "No, I like dogs.",
				text_pt: "Não, eu gosto de cachorros.",
				isCorrect: false,
				feedback: "Unrelated!",
				feedbackPt: "Sem relação com a pergunta!",
			},
			{
				id: "o3",
				text_en: "It is five dollars.",
				text_pt: "São cinco dólares.",
				isCorrect: false,
			},
		],
	},
	{
		id: "c3",
		mascotMessage: "Here you go. Have a nice day!",
		options: [
			{
				id: "o1",
				text_en: "You too, thanks!",
				text_pt: "Você também, obrigado!",
				isCorrect: true,
			},
			{
				id: "o2",
				text_en: "I am sorry.",
				text_pt: "Desculpe.",
				isCorrect: false,
			},
		],
	},
];
