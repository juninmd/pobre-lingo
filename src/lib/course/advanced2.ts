import type { GuidedLesson } from "./types";

export const advanced2Lessons: GuidedLesson[] = [
	{
		id: "mediation",
		level: "C2",
		title: "Sintetize sem distorcer",
		goal: "Preservar posição, ressalvas e atribuição ao resumir fontes.",
		explanation:
			"Mediar não é só traduzir: é tornar uma informação compreensível para outra pessoa, preservando seu sentido. Ao sintetizar, distinga a voz da fonte da sua. According to atribui uma afirmação; whereas compara posições; provided that mantém uma condição necessária. Omitir uma ressalva pode mudar a conclusão.",
		examples: [
			{
				en: "According to the author, costs may fall.",
				pt: "Segundo o autor, os custos podem cair.",
			},
			{
				en: "One study supports it, whereas another questions it.",
				pt: "Um estudo apoia a ideia, enquanto outro a questiona.",
			},
			{
				en: "It could work, provided that funding continues.",
				pt: "Poderia funcionar, desde que o financiamento continue.",
			},
		],
		practice: [
			{
				id: "mediation-p1",
				prompt: "Complete: According ___ the author, costs may fall.",
				answers: ["to"],
				explanation: "According to atribui a informação a uma fonte.",
			},
			{
				id: "mediation-p2",
				prompt:
					"Complete com contraste: One study supports it, ___ another questions it.",
				answers: ["whereas", "while", "but"],
				explanation: "Whereas/while/but contrastam as posições dos estudos.",
			},
		],
		check: [
			{
				id: "mediation-c1",
				prompt: "Complete: It could work, provided ___ funding continues.",
				answers: ["that"],
				explanation: "Provided that introduz uma condição necessária.",
			},
			{
				id: "mediation-c2",
				prompt:
					"A fonte diz costs may fall. O resumo deve manter may ou substituir por will?",
				answers: ["may"],
				explanation:
					"Trocar may por will transforma uma possibilidade em previsão certa.",
			},
			{
				id: "mediation-c3",
				prompt: "Atribua Costs may fall ao autor. Comece: According...",
				answers: ["According to the author costs may fall"],
				explanation:
					"A atribuição separa a afirmação da fonte da sua própria conclusão.",
			},
		],
		mission:
			"Compare dois artigos sobre o mesmo tema. Escreva uma síntese de 200 palavras para alguém leigo, preservando divergências, fontes e limitações.",
		practiceRoute: "/library",
	},
	{
		id: "precision",
		level: "C2",
		title: "Precisão e reformulação",
		goal: "Esclarecer uma ideia e corrigir uma interpretação ambígua.",
		explanation:
			"Comunicação avançada exige reformular quando o interlocutor não entende. What I mean is... esclarece intenção; more precisely refina uma afirmação. Not necessarily evita uma inferência absoluta. On the contrary corrige uma afirmação anterior; on the other hand apresenta outro aspecto. São relações diferentes.",
		examples: [
			{
				en: "What I mean is that we need more evidence.",
				pt: "O que quero dizer é que precisamos de mais evidências.",
			},
			{
				en: "It is not necessarily a failure.",
				pt: "Não é necessariamente um fracasso.",
			},
			{
				en: "It isn't slower. On the contrary, it is faster.",
				pt: "Não é mais lento. Pelo contrário, é mais rápido.",
			},
		],
		practice: [
			{
				id: "precision-p1",
				prompt: "Complete: What I ___ is that we need more evidence.",
				answers: ["mean"],
				explanation: "What I mean is esclarece o sentido pretendido.",
			},
			{
				id: "precision-p2",
				prompt: "Complete: It is not ___ a failure. (necessariamente)",
				answers: ["necessarily"],
				explanation: "Not necessarily evita uma conclusão automática.",
			},
		],
		check: [
			{
				id: "precision-c1",
				prompt: "Complete: It isn't slower. On the ___, it is faster.",
				answers: ["contrary"],
				explanation: "On the contrary corrige a ideia de que seria mais lento.",
			},
			{
				id: "precision-c2",
				prompt: "Complete: It is cheap. On the other ___, it is fragile.",
				answers: ["hand"],
				explanation:
					"On the other hand acrescenta um aspecto contrastante, sem negar o primeiro.",
			},
			{
				id: "precision-c3",
				prompt: "Traduza: Não é necessariamente um fracasso.",
				answers: [
					"It is not necessarily a failure",
					"It isn't necessarily a failure",
				],
				explanation:
					"Necessarily modifica a relação entre o evento e a conclusão.",
			},
		],
		mission:
			"Apresente um argumento em três minutos. Imagine duas interpretações erradas e reformule para esclarecê-las. Avalie precisão, coesão e adequação ao interlocutor.",
		practiceRoute: "/fluency",
	},
];
