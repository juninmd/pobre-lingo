import type { ConversationStep } from "./types";

export const pharmacy: ConversationStep[] = [
	{
		id: "p1",
		mascotMessage: "Hello! How can I help you today?",
		options: [
			{
				id: "p1o1",
				text_en: "I need something for a headache.",
				text_pt: "Preciso de algo para dor de cabeça.",
				isCorrect: true,
			},
			{
				id: "p1o2",
				text_en: "I want to buy a car.",
				text_pt: "Eu quero comprar um carro.",
				isCorrect: false,
				feedback: "This is a pharmacy.",
				feedbackPt: "Isso é uma farmácia.",
			},
		],
	},
	{
		id: "p2",
		mascotMessage: "Do you have any allergies?",
		options: [
			{
				id: "p2o1",
				text_en: "No, I don't.",
				text_pt: "Não, eu não tenho.",
				isCorrect: true,
			},
			{
				id: "p2o2",
				text_en: "I am allergic to work.",
				text_pt: "Sou alérgico a trabalho.",
				isCorrect: false,
				feedback: "I need real medical information.",
				feedbackPt: "Preciso de informações médicas reais.",
			},
		],
	},
	{
		id: "p3",
		mascotMessage: "Here you go. Take one pill every eight hours.",
		options: [
			{
				id: "p3o1",
				text_en: "Thank you, have a good day.",
				text_pt: "Obrigado, tenha um bom dia.",
				isCorrect: true,
			},
		],
	},
];

export const restaurantReservation: ConversationStep[] = [
	{
		id: "r1",
		mascotMessage: "Good evening! Do you have a table reserved?",
		options: [
			{
				id: "r1o1",
				text_en: "Yes, for two people at 8pm.",
				text_pt: "Sim, para duas pessoas às 20h.",
				isCorrect: true,
			},
			{
				id: "r1o2",
				text_en: "I like tables.",
				text_pt: "Eu gosto de mesas.",
				isCorrect: false,
				feedback: "I asked about your reservation.",
				feedbackPt: "Perguntei sobre sua reserva.",
			},
		],
	},
	{
		id: "r2",
		mascotMessage: "Perfect. Would you prefer indoor or outdoor seating?",
		options: [
			{
				id: "r2o1",
				text_en: "Outdoor, please.",
				text_pt: "Do lado de fora, por favor.",
				isCorrect: true,
			},
			{
				id: "r2o2",
				text_en: "I prefer Mondays.",
				text_pt: "Eu prefiro segundas-feiras.",
				isCorrect: false,
				feedback: "That doesn't answer where you want to sit.",
				feedbackPt: "Isso não responde onde você quer sentar.",
			},
		],
	},
	{
		id: "r3",
		mascotMessage: "This way, please. Enjoy your dinner!",
		options: [
			{
				id: "r3o1",
				text_en: "Thank you very much.",
				text_pt: "Muito obrigado.",
				isCorrect: true,
			},
		],
	},
];
