import type { PlacementItem } from "./types";

export const placementC1: PlacementItem[] = [
	{
		id: "c1-g1",
		level: "C1",
		skill: "grammar",
		prompt:
			'Complete: "___ she a native speaker, she would understand the idiom immediately."',
		options: ["Was", "Were", "Is", "Be"],
		answer: 1,
	},
	{
		id: "c1-g2",
		level: "C1",
		skill: "grammar",
		prompt:
			'Choose the correct inversion: "Not until the results arrived ___ how serious the problem was."',
		options: ["we realized", "did we realize", "we did realize", "realized we"],
		answer: 1,
	},
	{
		id: "c1-g3",
		level: "C1",
		skill: "grammar",
		prompt:
			'Complete: "The proposal, ___ merits are debatable, was approved anyway."',
		options: ["which", "whose", "that", "who"],
		answer: 1,
	},
	{
		id: "c1-g4",
		level: "C1",
		skill: "grammar",
		prompt: 'Complete: "It is essential that he ___ present at the hearing."',
		options: ["is", "be", "was", "being"],
		answer: 1,
	},
	{
		id: "c1-v1",
		level: "C1",
		skill: "vocabulary",
		prompt: 'What does "to mitigate" mean?',
		options: ["Piorar", "Atenuar/reduzir", "Ignorar", "Provocar"],
		answer: 1,
	},
	{
		id: "c1-v2",
		level: "C1",
		skill: "vocabulary",
		prompt: 'Choose the closest synonym for "meticulous".',
		options: ["Careless", "Thorough", "Lazy", "Vague"],
		answer: 1,
	},
	{
		id: "c1-v3",
		level: "C1",
		skill: "vocabulary",
		prompt: 'What does "a caveat" mean in "There is one caveat to this plan"?',
		options: [
			"Um benefício",
			"Uma ressalva ou advertência",
			"Um resumo",
			"Uma confirmação",
		],
		answer: 1,
	},
	{
		id: "c1-r1",
		level: "C1",
		skill: "reading",
		prompt:
			'Read: "The policy, though well-intentioned, inadvertently penalized the very group it aimed to help." What is the irony?',
		options: [
			"The policy helped everyone equally",
			"It hurt the group it meant to help",
			"It was intentionally harmful",
			"No one was affected",
		],
		answer: 1,
	},
	{
		id: "c1-r2",
		level: "C1",
		skill: "reading",
		prompt:
			'Read: "Critics contend that the reform, far from solving the issue, merely postpones an inevitable reckoning." What do critics believe?',
		options: [
			"The reform fully solves the issue",
			"The reform delays a bigger problem",
			"The reform is irrelevant",
			"The reform was never implemented",
		],
		answer: 1,
	},
	{
		id: "c1-l1",
		level: "C1",
		skill: "listening",
		prompt: "Ouça e escolha a inferência correta.",
		audioText:
			"It's not that the idea lacks merit; it's the execution that leaves much to be desired.",
		options: [
			"A ideia é ruim e a execução também",
			"A ideia é boa, mas a execução é fraca",
			"Tudo está perfeito",
			"A execução é excelente",
		],
		answer: 1,
	},
	{
		id: "c1-l2",
		level: "C1",
		skill: "listening",
		prompt: "Ouça e escolha o registro da fala.",
		audioText:
			"We regret to inform you that your application has been unsuccessful on this occasion.",
		options: [
			"Registro informal entre amigos",
			"Registro formal, tipo carta de recusa",
			"Discurso publicitário",
			"Conversa de bar",
		],
		answer: 1,
	},
	{
		id: "c1-l3",
		level: "C1",
		skill: "listening",
		prompt: "Ouça e escolha o sentido da expressão.",
		audioText:
			"He's beating around the bush instead of giving a straight answer.",
		options: [
			"Ele está sendo direto",
			"Ele está evitando responder diretamente",
			"Ele está gritando",
			"Ele concordou rapidamente",
		],
		answer: 1,
	},
];
