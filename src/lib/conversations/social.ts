import type { ConversationStep } from "./types";

export const firstDate: ConversationStep[] = [
	{
		id: "dt1",
		mascotMessage: "Hi! You look nice tonight.",
		options: [
			{
				id: "dto1",
				text_en: "Thank you! You look great too.",
				text_pt: "Obrigado! Você está ótimo também.",
				isCorrect: true,
			},
			{
				id: "dto2",
				text_en: "I know.",
				text_pt: "Eu sei.",
				isCorrect: false,
				feedback: "A bit arrogant!",
				feedbackPt: "Um pouco arrogante!",
			},
		],
	},
	{
		id: "dt2",
		mascotMessage: "So, what do you like to do for fun?",
		options: [
			{
				id: "dto21",
				text_en: "I love reading and traveling.",
				text_pt: "Amo ler e viajar.",
				isCorrect: true,
			},
			{
				id: "dto22",
				text_en: "I hate fun.",
				text_pt: "Odeio diversão.",
				isCorrect: false,
				feedback: "Don't be a killjoy!",
				feedbackPt: "Não seja estraga-prazeres!",
			},
		],
	},
];

export const doctorAppointment: ConversationStep[] = [
	{
		id: "doc1",
		mascotMessage: "Hello. What seems to be the problem today?",
		options: [
			{
				id: "dopt1",
				text_en: "I have a terrible headache.",
				text_pt: "Estou com uma dor de cabeça terrível.",
				isCorrect: true,
			},
			{
				id: "dopt2",
				text_en: "I like hospitals.",
				text_pt: "Eu gosto de hospitais.",
				isCorrect: false,
				feedback: "Tell me your symptoms.",
				feedbackPt: "Me conte seus sintomas.",
			},
			{
				id: "dopt3",
				text_en: "My car is broken.",
				text_pt: "Meu carro está quebrado.",
				isCorrect: false,
				feedback: "I am a doctor, not a mechanic!",
				feedbackPt: "Eu sou médico, não mecânico!",
			},
		],
	},
	{
		id: "doc2",
		mascotMessage: "I see. How long have you had this pain?",
		options: [
			{
				id: "dopt21",
				text_en: "Since yesterday morning.",
				text_pt: "Desde ontem de manhã.",
				isCorrect: true,
			},
			{
				id: "dopt22",
				text_en: "For 100 years.",
				text_pt: "Por 100 anos.",
				isCorrect: false,
				feedback: "That's impossible.",
				feedbackPt: "Isso é impossível.",
			},
		],
	},
	{
		id: "doc3",
		mascotMessage: "Okay. Take this medicine twice a day.",
		options: [
			{
				id: "dopt31",
				text_en: "Thank you, doctor.",
				text_pt: "Obrigado, doutor.",
				isCorrect: true,
			},
		],
	},
];
