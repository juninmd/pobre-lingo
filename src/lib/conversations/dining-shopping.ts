import type { ConversationStep } from "./types";

export const orderingFood: ConversationStep[] = [
	{
		id: "f1",
		mascotMessage: "Hi! Are you ready to order?",
		options: [
			{
				id: "fo1",
				text_en: "I think so. I'll have the steak.",
				text_pt: "Acho que sim. Vou querer o filé.",
				isCorrect: true,
			},
			{
				id: "fo2",
				text_en: "The menu is paper.",
				text_pt: "O menu é de papel.",
				isCorrect: false,
				feedback: "Order food, please.",
				feedbackPt: "Peça a comida, por favor.",
			},
		],
	},
	{
		id: "f2",
		mascotMessage: "How would you like your steak cooked?",
		options: [
			{
				id: "fo21",
				text_en: "Medium rare, please.",
				text_pt: "Ao ponto para mal passado, por favor.",
				isCorrect: true,
			},
			{
				id: "fo22",
				text_en: "With a fork.",
				text_pt: "Com um garfo.",
				isCorrect: false,
				feedback: "I mean the cooking temperature.",
				feedbackPt: "Quero dizer o ponto da carne.",
			},
		],
	},
	{
		id: "f3",
		mascotMessage: "Excellent choice. Anything to drink?",
		options: [
			{
				id: "fo31",
				text_en: "Just water, please.",
				text_pt: "Apenas água, por favor.",
				isCorrect: true,
			},
		],
	},
];

export const shoppingClothes: ConversationStep[] = [
	{
		id: "shop1",
		mascotMessage: "Hi! Can I help you find anything?",
		options: [
			{
				id: "sopt1",
				text_en: "I am looking for a pair of jeans.",
				text_pt: "Estou procurando um par de jeans.",
				isCorrect: true,
			},
			{
				id: "sopt2",
				text_en: "I want a hamburger.",
				text_pt: "Quero um hambúrguer.",
				isCorrect: false,
				feedback: "This is a clothing store.",
				feedbackPt: "Esta é uma loja de roupas.",
			},
		],
	},
	{
		id: "shop2",
		mascotMessage: "Sure. What size do you wear?",
		options: [
			{
				id: "sopt21",
				text_en: "I'm a medium.",
				text_pt: "Sou tamanho médio.",
				isCorrect: true,
			},
			{
				id: "sopt22",
				text_en: "I am very tall.",
				text_pt: "Sou muito alto.",
				isCorrect: false,
				feedback: "I need a specific size like Small, Medium, or Large.",
				feedbackPt: "Preciso de um tamanho específico, como P, M ou G.",
			},
		],
	},
	{
		id: "shop3",
		mascotMessage: "Here you go. The fitting room is over there.",
		options: [
			{
				id: "sopt31",
				text_en: "Thanks, I'll try them on.",
				text_pt: "Obrigado, vou provar.",
				isCorrect: true,
			},
		],
	},
];
