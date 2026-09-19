import type { ConversationStep } from "./types";

export const businessNegotiation: ConversationStep[] = [
	{
		id: "biz1",
		mascotMessage:
			"We are interested in your product, but the price is too high.",
		options: [
			{
				id: "bopt1",
				text_en: "We can offer a 10% discount for bulk orders.",
				text_pt: "Podemos oferecer 10% de desconto para pedidos grandes.",
				isCorrect: true,
			},
			{
				id: "bopt2",
				text_en: "It is not high, you are poor.",
				text_pt: "Não é alto, você é pobre.",
				isCorrect: false,
				feedback: "That is extremely rude!",
				feedbackPt: "Isso é extremamente rude!",
			},
			{
				id: "bopt3",
				text_en: "Take it or leave it.",
				text_pt: "É pegar ou largar.",
				isCorrect: false,
				feedback: "Try to be more diplomatic.",
				feedbackPt: "Tente ser mais diplomático.",
			},
		],
	},
	{
		id: "biz2",
		mascotMessage: "That sounds reasonable. What about the delivery time?",
		options: [
			{
				id: "bopt21",
				text_en: "We can deliver within 3 business days.",
				text_pt: "Podemos entregar em 3 dias úteis.",
				isCorrect: true,
			},
			{
				id: "bopt22",
				text_en: "Maybe next year.",
				text_pt: "Talvez ano que vem.",
				isCorrect: false,
				feedback: "Too slow.",
				feedbackPt: "Devagar demais.",
			},
		],
	},
	{
		id: "biz3",
		mascotMessage: "Excellent. I think we have a deal.",
		options: [
			{
				id: "bopt31",
				text_en: "Great! I'll send the contract.",
				text_pt: "Ótimo! Enviarei o contrato.",
				isCorrect: true,
			},
		],
	},
];

export const firstMeetingWork: ConversationStep[] = [
	{
		id: "fm1",
		mascotMessage: "Hi, I don't think we've met. I'm the new project manager.",
		options: [
			{
				id: "fm1o1",
				text_en: "Nice to meet you, I'm on the design team.",
				text_pt: "Prazer em conhecê-lo, eu sou do time de design.",
				isCorrect: true,
			},
			{
				id: "fm1o2",
				text_en: "I don't talk to strangers.",
				text_pt: "Eu não falo com estranhos.",
				isCorrect: false,
				feedback: "That's a bit unfriendly for a coworker!",
				feedbackPt: "Isso é meio grosseiro para um colega de trabalho!",
			},
		],
	},
	{
		id: "fm2",
		mascotMessage: "What team are you currently working with?",
		options: [
			{
				id: "fm2o1",
				text_en: "I'm working with the marketing team.",
				text_pt: "Estou trabalhando com o time de marketing.",
				isCorrect: true,
			},
			{
				id: "fm2o2",
				text_en: "I work with dogs.",
				text_pt: "Eu trabalho com cachorros.",
				isCorrect: false,
				feedback: "That doesn't sound like this office!",
				feedbackPt: "Isso não parece ser deste escritório!",
			},
		],
	},
	{
		id: "fm3",
		mascotMessage: "Nice! Let's grab lunch sometime and talk more.",
		options: [
			{
				id: "fm3o1",
				text_en: "I'd like that, sounds great.",
				text_pt: "Eu adoraria, parece ótimo.",
				isCorrect: true,
			},
		],
	},
];
