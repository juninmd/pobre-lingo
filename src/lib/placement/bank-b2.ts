import type { PlacementItem } from "./types";

export const placementB2: PlacementItem[] = [
	{
		id: "b2-g1",
		level: "B2",
		skill: "grammar",
		prompt: 'Complete: "___ he studied harder, he would have passed the exam."',
		options: ["If", "Had", "Unless", "Because"],
		answer: 1,
	},
	{
		id: "b2-g2",
		level: "B2",
		skill: "grammar",
		prompt:
			'Choose the correct reported speech: She said, "I am tired." -> She said ___.',
		options: [
			"she is tired",
			"she was tired",
			"she has been tired",
			"she be tired",
		],
		answer: 1,
	},
	{
		id: "b2-g3",
		level: "B2",
		skill: "grammar",
		prompt: 'Complete: "The bridge, ___ was built in 1990, is now closed."',
		options: ["that", "which", "who", "whose"],
		answer: 1,
	},
	{
		id: "b2-g4",
		level: "B2",
		skill: "grammar",
		prompt: 'Complete: "I wish I ___ him the truth earlier."',
		options: ["told", "had told", "have told", "tell"],
		answer: 1,
	},
	{
		id: "b2-v1",
		level: "B2",
		skill: "vocabulary",
		prompt: 'What does "to compromise" mean in a negotiation?',
		options: [
			"Recusar tudo",
			"Ceder em parte para chegar a um acordo",
			"Vencer completamente",
			"Ignorar o outro lado",
		],
		answer: 1,
	},
	{
		id: "b2-v2",
		level: "B2",
		skill: "vocabulary",
		prompt: 'Choose the word closest in meaning to "ambiguous".',
		options: ["Clear", "Unclear", "Certain", "Simple"],
		answer: 1,
	},
	{
		id: "b2-v3",
		level: "B2",
		skill: "vocabulary",
		prompt:
			'What does "to overlook" mean in "He overlooked an important detail"?',
		options: ["Enfatizar", "Deixar passar despercebido", "Repetir", "Elogiar"],
		answer: 1,
	},
	{
		id: "b2-r1",
		level: "B2",
		skill: "reading",
		prompt:
			'Read: "Despite the criticism, the company refused to change its policy, arguing it was still the most cost-effective option." Why did the company keep the policy?',
		options: [
			"They agreed with the critics",
			"They believed it saved money",
			"They had no other option",
			"They were forced to",
		],
		answer: 1,
	},
	{
		id: "b2-r2",
		level: "B2",
		skill: "reading",
		prompt:
			'Read: "The study, while limited in scope, suggests a correlation between sleep and productivity." What is a limitation mentioned?',
		options: [
			"It proves causation",
			"Its scope is limited",
			"It is about diet",
			"It has no data",
		],
		answer: 1,
	},
	{
		id: "b2-l1",
		level: "B2",
		skill: "listening",
		prompt: "Ouça e escolha a atitude do falante.",
		audioText: "Frankly, I doubt this plan will work, but let's give it a try.",
		options: [
			"Ele tem certeza que vai dar certo",
			"Ele duvida, mas topa tentar",
			"Ele recusa participar",
			"Ele está furioso",
		],
		answer: 1,
	},
	{
		id: "b2-l2",
		level: "B2",
		skill: "listening",
		prompt: "Ouça e escolha a implicação correta.",
		audioText: "Had I known about the traffic, I would have left earlier.",
		options: [
			"Ele saiu mais cedo",
			"Ele não sabia do trânsito e por isso se atrasou",
			"Ele evitou o trânsito",
			"Ele nunca sai cedo",
		],
		answer: 1,
	},
	{
		id: "b2-l3",
		level: "B2",
		skill: "listening",
		prompt: "Ouça e escolha o tom da fala.",
		audioText:
			"I'm not saying you're wrong, but have you considered the other side?",
		options: [
			"Tom agressivo",
			"Tom conciliador, sugerindo reflexão",
			"Tom indiferente",
			"Tom irônico e hostil",
		],
		answer: 1,
	},
];
