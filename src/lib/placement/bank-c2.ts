import type { PlacementItem } from "./types";

export const placementC2: PlacementItem[] = [
	{
		id: "c2-g1",
		level: "C2",
		skill: "grammar",
		prompt:
			'Complete: "___ for his quick thinking, the accident would have been far worse."',
		options: ["Were it not", "If it not", "Not being", "It was not"],
		answer: 0,
	},
	{
		id: "c2-g2",
		level: "C2",
		skill: "grammar",
		prompt:
			'Choose the correct cleft sentence: "It was ___ mentioned the merger."',
		options: [
			"her who first",
			"she who first",
			"her whom first",
			"she whom firstly",
		],
		answer: 1,
	},
	{
		id: "c2-g3",
		level: "C2",
		skill: "grammar",
		prompt: 'Complete: "Rarely ___ such a compelling argument been presented."',
		options: ["has", "have", "had", "did"],
		answer: 0,
	},
	{
		id: "c2-g4",
		level: "C2",
		skill: "grammar",
		prompt:
			'Complete: "So convincing ___ her argument that no one dared object."',
		options: ["was", "is", "were", "did"],
		answer: 0,
	},
	{
		id: "c2-v1",
		level: "C2",
		skill: "vocabulary",
		prompt: 'What does "ubiquitous" mean?',
		options: ["Raro", "Onipresente", "Escondido", "Antigo"],
		answer: 1,
	},
	{
		id: "c2-v2",
		level: "C2",
		skill: "vocabulary",
		prompt: 'Choose the closest synonym for "esoteric".',
		options: ["Common", "Obscure/specialized", "Simple", "Popular"],
		answer: 1,
	},
	{
		id: "c2-v3",
		level: "C2",
		skill: "vocabulary",
		prompt:
			'What does "to vindicate" mean in "The evidence vindicated her claims"?',
		options: ["Contradizer", "Comprovar/justificar", "Anular", "Confundir"],
		answer: 1,
	},
	{
		id: "c2-r1",
		level: "C2",
		skill: "reading",
		prompt:
			"Read: \"The author's prose, ostensibly objective, betrays an unmistakable partisan undertone.\" What does the author's writing actually show?",
		options: [
			"Complete neutrality",
			"A hidden bias despite claiming objectivity",
			"Total transparency",
			"No opinion at all",
		],
		answer: 1,
	},
	{
		id: "c2-r2",
		level: "C2",
		skill: "reading",
		prompt:
			'Read: "Far from being a panacea, the treaty merely papers over deep-seated grievances." What is implied about the treaty?',
		options: [
			"It solves everything",
			"It hides but does not resolve underlying issues",
			"It creates new grievances",
			"It was rejected",
		],
		answer: 1,
	},
	{
		id: "c2-l1",
		level: "C2",
		skill: "listening",
		prompt: "Ouça e escolha a interpretação correta do tom irônico.",
		audioText: "Oh, brilliant, another meeting that could have been an email.",
		options: [
			"Ela adorou a reunião",
			"Ela está sendo sarcástica sobre a reunião ser desnecessária",
			"Ela pediu mais reuniões",
			"Ela está elogiando o organizador",
		],
		answer: 1,
	},
	{
		id: "c2-l2",
		level: "C2",
		skill: "listening",
		prompt: "Ouça e escolha o subtexto da fala.",
		audioText:
			"With all due respect, I think the committee has overlooked a crucial flaw.",
		options: [
			"Concordância total e elogio",
			"Discordância educada apontando uma falha",
			"Pedido de desculpas",
			"Elogio sincero ao comitê",
		],
		answer: 1,
	},
	{
		id: "c2-l3",
		level: "C2",
		skill: "listening",
		prompt: "Ouça e escolha o registro/nuance correta.",
		audioText: "It would be remiss of me not to mention the risks involved.",
		options: [
			"Registro casual e descuidado",
			"Registro formal, cumprindo um dever de mencionar riscos",
			"Uma piada",
			"Um convite informal",
		],
		answer: 1,
	},
];
