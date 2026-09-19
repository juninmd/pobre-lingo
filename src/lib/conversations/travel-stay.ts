import type { ConversationStep } from "./types";

export const hotelCheckin: ConversationStep[] = [
	{
		id: "h1",
		mascotMessage: "Welcome! Do you have a reservation?",
		options: [
			{
				id: "h1o1",
				text_en: "Yes, under the name Silva.",
				text_pt: "Sim, no nome Silva.",
				isCorrect: true,
			},
			{
				id: "h1o2",
				text_en: "I want a pizza.",
				text_pt: "Eu quero uma pizza.",
				isCorrect: false,
				feedback: "This is a hotel, not a restaurant.",
				feedbackPt: "Isso é um hotel, não um restaurante.",
			},
		],
	},
	{
		id: "h2",
		mascotMessage: "Great. Would you like a room with a view?",
		options: [
			{
				id: "h2o1",
				text_en: "Yes, that would be lovely.",
				text_pt: "Sim, seria ótimo.",
				isCorrect: true,
			},
			{
				id: "h2o2",
				text_en: "I don't have eyes.",
				text_pt: "Eu não tenho olhos.",
				isCorrect: false,
				feedback: "Let's stay serious, please.",
				feedbackPt: "Vamos manter a seriedade, por favor.",
			},
		],
	},
	{
		id: "h3",
		mascotMessage: "Here is your key card. Enjoy your stay!",
		options: [
			{
				id: "h3o1",
				text_en: "Thank you very much.",
				text_pt: "Muito obrigado.",
				isCorrect: true,
			},
		],
	},
];

export const askingDirections: ConversationStep[] = [
	{
		id: "d1",
		mascotMessage: "Excuse me, I am lost. Can you help me?",
		options: [
			{
				id: "do1",
				text_en: "Of course. Where do you want to go?",
				text_pt: "Claro. Onde você quer ir?",
				isCorrect: true,
			},
			{
				id: "do2",
				text_en: "No, I am busy.",
				text_pt: "Não, estou ocupado.",
				isCorrect: false,
				feedback: "Be helpful!",
				feedbackPt: "Seja prestativo!",
			},
		],
	},
	{
		id: "d2",
		mascotMessage: "I am looking for the train station.",
		options: [
			{
				id: "do21",
				text_en: "It is two blocks straight ahead.",
				text_pt: "São dois quarteirões em frente.",
				isCorrect: true,
			},
			{
				id: "do22",
				text_en: "The train is big.",
				text_pt: "O trem é grande.",
				isCorrect: false,
				feedback: "Give directions.",
				feedbackPt: "Dê as instruções de como chegar.",
			},
		],
	},
	{
		id: "d3",
		mascotMessage: "Thank you so much!",
		options: [
			{
				id: "do31",
				text_en: "You're welcome.",
				text_pt: "De nada.",
				isCorrect: true,
			},
		],
	},
];
