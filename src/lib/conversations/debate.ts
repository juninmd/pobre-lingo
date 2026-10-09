import type { ConversationStep } from "./types";

export const debateTech: ConversationStep[] = [
	{
		id: "tech1",
		mascotMessage:
			"Do you believe Artificial Intelligence is dangerous for humanity?",
		options: [
			{
				id: "topt1",
				text_en: "It depends on how we regulate it.",
				text_pt: "Depende de como a regulamentamos.",
				isCorrect: true,
			},
			{
				id: "topt2",
				text_en: "Yes, robots will eat us.",
				text_pt: "Sim, robôs vão nos comer.",
				isCorrect: false,
				feedback: "A bit too dramatic, don't you think?",
				feedbackPt: "Um pouco dramático demais, não acha?",
			},
			{
				id: "topt3",
				text_en: "Computers are stupid.",
				text_pt: "Computadores são estúpidos.",
				isCorrect: false,
				feedback: "That's a weak argument.",
				feedbackPt: "Esse é um argumento fraco.",
			},
		],
	},
	{
		id: "tech2",
		mascotMessage: "But what if it becomes smarter than us?",
		options: [
			{
				id: "topt21",
				text_en: "We must ensure it aligns with human values.",
				text_pt: "Devemos garantir que se alinhe aos valores humanos.",
				isCorrect: true,
			},
			{
				id: "topt22",
				text_en: "I will unplug it.",
				text_pt: "Eu vou tirar da tomada.",
				isCorrect: false,
				feedback: "It might be too late by then.",
				feedbackPt: "Pode ser tarde demais até lá.",
			},
		],
	},
];
