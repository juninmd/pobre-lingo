import type { ConversationStep } from "./types";

export const airportCheckin: ConversationStep[] = [
	{
		id: "a1",
		mascotMessage: "Good morning! Can I see your passport and ticket, please?",
		options: [
			{
				id: "ao1",
				text_en: "Here they are.",
				text_pt: "Aqui estão.",
				isCorrect: true,
			},
			{
				id: "ao2",
				text_en: "I like planes.",
				text_pt: "Eu gosto de aviões.",
				isCorrect: false,
				feedback: "Focus on the documents.",
				feedbackPt: "Foque nos documentos.",
			},
			{
				id: "ao3",
				text_en: "No, thank you.",
				text_pt: "Não, obrigado.",
				isCorrect: false,
				feedback: "You need to show them to fly!",
				feedbackPt: "Você precisa mostrá-los para embarcar!",
			},
		],
	},
	{
		id: "a2",
		mascotMessage: "Thank you. Are you checking any bags?",
		options: [
			{
				id: "ao21",
				text_en: "Yes, just this suitcase.",
				text_pt: "Sim, apenas esta mala.",
				isCorrect: true,
			},
			{
				id: "ao22",
				text_en: "I am checking the time.",
				text_pt: "Estou checando a hora.",
				isCorrect: false,
				feedback: "Checked bags go in the cargo hold.",
				feedbackPt: "Malas despachadas vão no porão de bagagem.",
			},
		],
	},
	{
		id: "a3",
		mascotMessage: "Okay. Here is your boarding pass. Gate B12.",
		options: [
			{
				id: "ao31",
				text_en: "Thank you, have a nice day.",
				text_pt: "Obrigado, tenha um bom dia.",
				isCorrect: true,
			},
		],
	},
];

export const immigrationDesk: ConversationStep[] = [
	{
		id: "im1",
		mascotMessage: "Good afternoon. What is the purpose of your visit?",
		options: [
			{
				id: "im1o1",
				text_en: "I am here on vacation.",
				text_pt: "Estou aqui a passeio.",
				isCorrect: true,
			},
			{
				id: "im1o2",
				text_en: "I like airports.",
				text_pt: "Eu gosto de aeroportos.",
				isCorrect: false,
				feedback: "That's not the purpose of your trip.",
				feedbackPt: "Isso não é o motivo da sua viagem.",
			},
			{
				id: "im1o3",
				text_en: "No, thank you.",
				text_pt: "Não, obrigado.",
				isCorrect: false,
				feedback: "You need to answer the question.",
				feedbackPt: "Você precisa responder à pergunta.",
			},
		],
	},
	{
		id: "im2",
		mascotMessage: "How long will you be staying?",
		options: [
			{
				id: "im2o1",
				text_en: "For two weeks.",
				text_pt: "Por duas semanas.",
				isCorrect: true,
			},
			{
				id: "im2o2",
				text_en: "I am forty years old.",
				text_pt: "Eu tenho quarenta anos.",
				isCorrect: false,
				feedback: "I asked about your stay, not your age.",
				feedbackPt: "Perguntei sobre sua estadia, não sua idade.",
			},
		],
	},
	{
		id: "im3",
		mascotMessage: "Where will you be staying?",
		options: [
			{
				id: "im3o1",
				text_en: "At a hotel downtown.",
				text_pt: "Em um hotel no centro.",
				isCorrect: true,
			},
		],
	},
];
