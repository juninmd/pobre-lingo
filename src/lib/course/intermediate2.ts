import type { GuidedLesson } from "./types";

export const intermediate2Lessons: GuidedLesson[] = [
	{
		id: "experience",
		level: "B1",
		title: "Experiências e datas",
		goal: "Distinguir uma experiência de um evento com data terminada.",
		explanation:
			"Present perfect usa have/has + particípio para conectar passado e presente: I have visited London (experiência, sem data passada específica). Com yesterday ou last year, use passado simples: I visited London last year. Ever pergunta se algo aconteceu alguma vez; never diz nunca. Been é o particípio de be.",
		examples: [
			{ en: "I have been to London.", pt: "Já estive em Londres." },
			{ en: "Have you ever tried sushi?", pt: "Você já experimentou sushi?" },
			{
				en: "I visited London last year.",
				pt: "Visitei Londres no ano passado.",
			},
		],
		practice: [
			{
				id: "experience-p1",
				prompt: "Complete: She ___ visited London.",
				answers: ["has"],
				explanation: "He/she/it usa has no present perfect.",
			},
			{
				id: "experience-p2",
				prompt: "Complete: I ___ London yesterday. (visit)",
				answers: ["visited"],
				explanation: "Yesterday exige passado simples neste contexto.",
			},
		],
		check: [
			{
				id: "experience-c1",
				prompt: "Complete: Have you ___ tried sushi? (alguma vez)",
				answers: ["ever"],
				explanation: "Ever pergunta sobre experiências.",
			},
			{
				id: "experience-c2",
				prompt: "Complete: We have ___ to London. (be)",
				answers: ["been"],
				explanation: "Have + been forma o present perfect de be.",
			},
			{
				id: "experience-c3",
				prompt: "Traduza: Ela visitou Londres no ano passado.",
				answers: ["She visited London last year"],
				explanation:
					"Last year é um período terminado; visited é passado simples.",
			},
		],
		mission:
			"Converse sobre três experiências. Para uma delas, acrescente quando aconteceu, mudando do present perfect para o passado simples.",
		practiceRoute: "/exercises/conversation",
	},
	{
		id: "advice",
		level: "B1",
		title: "Conselhos e possibilidades",
		goal: "Dar um conselho e explicar uma consequência possível.",
		explanation:
			"Should + verbo dá conselho, sem to: You should rest. Uma condição real para o futuro usa if + presente, will + verbo: If it rains, I will stay home. Não use will na oração com if neste padrão. Because apresenta o motivo; so apresenta a consequência.",
		examples: [
			{ en: "You should rest.", pt: "Você deveria descansar." },
			{
				en: "If it rains, I will stay home.",
				pt: "Se chover, ficarei em casa.",
			},
			{
				en: "I'm tired, so I'll rest.",
				pt: "Estou cansado, então vou descansar.",
			},
		],
		practice: [
			{
				id: "advice-p1",
				prompt: "Complete: You should ___ more. (sleep)",
				answers: ["sleep"],
				explanation: "Should é seguido pelo verbo na base.",
			},
			{
				id: "advice-p2",
				prompt: "Complete: If it ___, I will stay home. (rain)",
				answers: ["rains"],
				explanation: "Na oração com if, usamos presente: it rains.",
			},
		],
		check: [
			{
				id: "advice-c1",
				prompt: "Complete: If she studies, she ___ pass. (will/would)",
				answers: ["will"],
				explanation:
					"Condição real no presente + consequência futura com will.",
			},
			{
				id: "advice-c2",
				prompt: "Traduza: Você deveria descansar.",
				answers: ["You should rest"],
				explanation: "Should + rest dá conselho.",
			},
			{
				id: "advice-c3",
				prompt: "Complete: I stayed home ___ I was tired. (porque)",
				answers: ["because"],
				explanation: "Because introduz o motivo, não o resultado.",
			},
		],
		mission:
			"Um amigo está cansado antes de uma prova. Dê dois conselhos, explique seus motivos e uma consequência possível se ele seguir cada conselho.",
		practiceRoute: "/fluency",
	},
];
