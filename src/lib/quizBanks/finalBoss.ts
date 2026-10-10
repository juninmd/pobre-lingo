import type { QuizQuestion } from "./types";

// Final boss (unit 14): C2 grammar, inversion, subjunctive and advanced lexis.
export const finalBossBank: QuizQuestion[] = [
	{
		question: '"Never ___ such a stunning performance."',
		options: ["I have seen", "have I seen", "I saw", "I have been seeing"],
		correctAnswer: 1,
		explanation:
			'Após advérbios negativos no início da frase usamos inversão: "Never have I seen...".',
	},
	{
		question:
			'"It is essential that every candidate ___ the application form by Friday."',
		options: ["submits", "will submit", "submit", "to submit"],
		correctAnswer: 2,
		explanation:
			'Após "essential that" usamos o subjuntivo: verbo na forma base, sem -s ("submit").',
	},
	{
		question: '"___ I need right now is a long holiday."',
		options: ["That", "Which", "What", "Where"],
		correctAnswer: 2,
		explanation:
			'Frase clivada (cleft sentence) com "What" enfatiza o que se precisa: "What I need is...".',
	},
	{
		question: '"Had it not been for her support, the project ___ failed."',
		options: ["had", "will have", "would", "would have"],
		correctAnswer: 3,
		explanation:
			'"Had it not been for..." equivale a "If it had not been for...", então a oração principal pede "would have" + particípio.',
	},
	{
		question: '"The proposal was ___ with cautious optimism by the board."',
		options: ["received", "reserved", "reversed", "revered"],
		correctAnswer: 0,
		explanation:
			'"Received with cautious optimism" (recebido com otimismo cauteloso) é a colocação natural.',
	},
	{
		question: '"Her argument was so ___ that nobody could refute it."',
		options: ["cognate", "cognitive", "cognizant", "cogent"],
		correctAnswer: 3,
		explanation:
			'"Cogent" significa convincente e bem fundamentado. Os outros termos significam "aparentado", "relativo ao pensamento" e "ciente".',
	},
	{
		question: 'A: "Will the team finish on time?" B: "I hope ___."',
		options: ["that", "it", "so", "to"],
		correctAnswer: 2,
		explanation:
			'Na resposta curta usamos "so" para substituir a oração: "I hope so" (espero que sim).',
	},
	{
		question:
			'"___ by the scale of the crisis, the government announced emergency measures."',
		options: [
			"Overwhelmed",
			"Overwhelming",
			"Having overwhelmed",
			"To overwhelm",
		],
		correctAnswer: 0,
		explanation:
			'Oração reduzida de particípio passado: o governo é quem foi sobrecarregado pela crise, por isso usamos "Overwhelmed".',
	},
	{
		question: '"The ___ of the new policy surprised many economists."',
		options: ["implement", "implemented", "implementer", "implementation"],
		correctAnswer: 3,
		explanation:
			'"Implementation" (implementação) funciona como substantivo e sujeito da frase. "Implement" é verbo.',
	},
	{
		question: '"She accepted the offer, ___ reluctantly."',
		options: ["lest", "whereas", "nevertheless", "albeit"],
		correctAnswer: 3,
		explanation:
			'"Albeit" introduz uma concessão curta: "accepted the offer, albeit reluctantly" (aceitou, embora relutantemente).',
	},
];
