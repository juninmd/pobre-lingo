import type { GuidedLesson } from "./types";

export const intermediate1Lessons: GuidedLesson[] = [
	{
		id: "past",
		level: "A2",
		title: "Conte o que aconteceu",
		goal: "Relatar um evento passado e perguntar sobre ele.",
		explanation:
			"O passado simples fala de eventos terminados. Verbos regulares recebem ed: work → worked. Alguns são irregulares: go → went. Em perguntas e negativas, did/didn't já indica passado; o verbo volta à base. Yesterday é ontem. Was/were são o passado de be e não usam did.",
		examples: [
			{ en: "I visited my friend yesterday.", pt: "Visitei meu amigo ontem." },
			{ en: "She went to school.", pt: "Ela foi à escola." },
			{ en: "Did you work yesterday?", pt: "Você trabalhou ontem?" },
		],
		practice: [
			{
				id: "past-p1",
				prompt: "Complete: Yesterday I ___ to school. (go)",
				answers: ["went"],
				explanation: "Go tem passado irregular: went.",
			},
			{
				id: "past-p2",
				prompt: "Complete: Did she ___ yesterday? (work)",
				answers: ["work"],
				explanation: "Depois de did, o verbo fica na base.",
			},
		],
		check: [
			{
				id: "past-c1",
				prompt: "Complete: Last week we ___ our friends. (visit)",
				answers: ["visited"],
				explanation: "Visit é regular: visited.",
			},
			{
				id: "past-c2",
				prompt: "Complete: I didn't ___ to work. (go)",
				answers: ["go"],
				explanation: "Didn't já indica passado; não use went depois dele.",
			},
			{
				id: "past-c3",
				prompt: "Traduza: Você trabalhou ontem?",
				answers: ["Did you work yesterday"],
				explanation: "Did + sujeito + verbo na base forma a pergunta.",
			},
		],
		mission:
			"Conte seu dia de ontem em cinco frases. Inclua um lugar, uma pessoa e algo que você não fez. Depois transforme uma frase em pergunta.",
		practiceRoute: "/writing",
	},
	{
		id: "plans",
		level: "A2",
		title: "Faça planos e combine algo",
		goal: "Dizer suas intenções e oferecer ajuda.",
		explanation:
			"Be going to + verbo expressa uma intenção: I am going to study. Lembre-se de conjugar be (am/is/are). Will + verbo pode expressar uma decisão tomada agora ou uma oferta: I'll help you. Não ponha to depois de will. Tomorrow significa amanhã.",
		examples: [
			{ en: "I'm going to study tomorrow.", pt: "Vou estudar amanhã." },
			{ en: "We are going to travel.", pt: "Nós vamos viajar." },
			{ en: "I'll help you.", pt: "Eu vou ajudar você." },
		],
		practice: [
			{
				id: "plans-p1",
				prompt: "Complete: She ___ going to travel.",
				answers: ["is"],
				explanation: "She usa is antes de going to.",
			},
			{
				id: "plans-p2",
				prompt: "Complete: I will ___ you. (help)",
				answers: ["help"],
				explanation: "Will recebe o verbo na base, sem to.",
			},
		],
		check: [
			{
				id: "plans-c1",
				prompt: "Complete: We ___ going to study.",
				answers: ["are"],
				explanation: "We usa are.",
			},
			{
				id: "plans-c2",
				prompt: "Traduza: Eu vou ajudar você. (use will)",
				answers: ["I will help you", "I'll help you"],
				explanation: "I will pode ser contraído para I'll.",
			},
			{
				id: "plans-c3",
				prompt: "Complete: I'm going ___ work tomorrow.",
				answers: ["to"],
				explanation: "Going to vem antes do verbo work.",
			},
		],
		mission:
			"Combine um passeio: diga dois planos para amanhã e ofereça uma ajuda com I'll. Ensaie a conversa sem ler suas anotações.",
		practiceRoute: "/tracks",
	},
];
