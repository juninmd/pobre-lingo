import type { GuidedLesson } from "./types";

export const upperLessons: GuidedLesson[] = [
	{
		id: "hypotheses",
		level: "B2",
		title: "Hipóteses e escolhas",
		goal: "Explorar situações imaginárias e escolhas diferentes no passado.",
		explanation:
			"Para imaginar algo improvável agora, use if + passado, would + verbo: If I had time, I would travel. Esse passado não indica ontem: marca distância da realidade. Para imaginar um passado diferente, use if + had + particípio, would have + particípio. Com o verbo be, were é comum em hipóteses formais: If I were you.",
		examples: [
			{
				en: "If I had time, I would travel.",
				pt: "Se eu tivesse tempo, viajaria.",
			},
			{
				en: "If I were you, I would ask.",
				pt: "Se eu fosse você, perguntaria.",
			},
			{
				en: "If I had studied, I would have passed.",
				pt: "Se eu tivesse estudado, teria passado.",
			},
		],
		practice: [
			{
				id: "hypotheses-p1",
				prompt: "Complete: If I had time, I ___ travel.",
				answers: ["would"],
				explanation: "Would expressa o resultado imaginário.",
			},
			{
				id: "hypotheses-p2",
				prompt: "Complete: If I ___ studied, I would have passed.",
				answers: ["had"],
				explanation:
					"Had studied é past perfect e imagina um passado diferente.",
			},
		],
		check: [
			{
				id: "hypotheses-c1",
				prompt: "Complete a hipótese formal: If I ___ you, I would ask.",
				answers: ["were"],
				explanation: "If I were you é uma expressão de conselho hipotético.",
			},
			{
				id: "hypotheses-c2",
				prompt: "Complete: If she had called, I would have ___. (answer)",
				answers: ["answered"],
				explanation: "Would have recebe particípio: answered.",
			},
			{
				id: "hypotheses-c3",
				prompt: "Traduza: Se eu tivesse tempo, viajaria.",
				answers: [
					"If I had time I would travel",
					"I would travel if I had time",
					"If I had time I'd travel",
				],
				explanation:
					"If + passado e would + verbo constroem a hipótese presente.",
			},
		],
		mission:
			"Compare uma escolha real e uma alternativa imaginária. Explique um benefício e uma desvantagem. Fale por dois minutos sem traduzir cada frase.",
		practiceRoute: "/fluency",
	},
	{
		id: "arguments",
		level: "B2",
		title: "Defenda uma opinião",
		goal: "Organizar opinião, justificativa e contraponto.",
		explanation:
			"Uma opinião clara precisa de motivo e exemplo. Although + oração introduz uma concessão (embora): Although it is expensive, it is useful. However conecta frases contrastantes. Despite recebe nome ou forma ing: despite the cost. Não use despite it is expensive. Conectores ajudam a lógica; não substituem evidências.",
		examples: [
			{
				en: "Although it is expensive, it is useful.",
				pt: "Embora seja caro, é útil.",
			},
			{
				en: "It is expensive. However, it saves time.",
				pt: "É caro. Porém, economiza tempo.",
			},
			{
				en: "Despite the cost, I recommend it.",
				pt: "Apesar do custo, eu recomendo.",
			},
		],
		practice: [
			{
				id: "arguments-p1",
				prompt: "Complete: ___ it is expensive, it is useful. (embora)",
				answers: ["although", "though", "even though"],
				explanation: "Although/though/even though recebem uma oração completa.",
			},
			{
				id: "arguments-p2",
				prompt: "Complete: ___ the cost, I recommend it. (apesar de)",
				answers: ["despite", "in spite of"],
				explanation: "Apesar de + nome pode ser despite ou in spite of.",
			},
		],
		check: [
			{
				id: "arguments-c1",
				prompt: "Complete: It is useful. ___, it is expensive. (porém)",
				answers: ["however", "nevertheless", "nonetheless"],
				explanation:
					"Esses conectores podem introduzir uma frase com contraste.",
			},
			{
				id: "arguments-c2",
				prompt: "Complete: Despite ___ expensive, it is useful. (be)",
				answers: ["being"],
				explanation: "Depois de despite, use being, não it is.",
			},
			{
				id: "arguments-c3",
				prompt:
					"Reescreva usando although: Despite the cost, it is useful. Comece: Although...",
				answers: [
					"Although it is expensive it is useful",
					"Although it costs a lot it is useful",
				],
				explanation: "Although precisa de uma oração com sujeito e verbo.",
			},
		],
		mission:
			"Escreva 120 palavras defendendo estudar online. Inclua uma razão, um exemplo e um contraponto. Revise se cada conector expressa a relação pretendida.",
		practiceRoute: "/writing",
	},
];
