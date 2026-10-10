import type { QuizQuestion } from "./types";

// Cultural quiz (unit 13): idioms, sarcasm and cultural references.
export const culturalQuizBank: QuizQuestion[] = [
	{
		question: 'What does "to play devil\'s advocate" mean?',
		options: [
			"To pretend to be evil",
			"To refuse to speak in a meeting",
			"To argue the opposite view to test an idea",
			"To ask for money politely",
		],
		correctAnswer: 2,
		explanation:
			'"Play devil\'s advocate" é defender uma posição contrária só para testar a força de uma ideia.',
	},
	{
		question: 'What does "to sit on the fence" mean?',
		options: [
			"To climb a wall",
			"To avoid taking a side",
			"To be very happy",
			"To wait outside a house",
		],
		correctAnswer: 1,
		explanation:
			'"Sit on the fence" significa ficar em cima do muro, sem tomar partido.',
	},
	{
		question: 'What does "the elephant in the room" refer to?',
		options: [
			"A big animal at a party",
			"A secret surprise gift",
			"A joke that everyone laughs at",
			"An obvious problem that nobody wants to discuss",
		],
		correctAnswer: 3,
		explanation:
			"É um problema óbvio que todos evitam mencionar, o assunto que ninguém quer tocar.",
	},
	{
		question:
			'A friend spills coffee on the table and says, "Oh, great." With a sarcastic tone, what does this most likely mean?',
		options: [
			"They are delighted by the spill",
			"They want a second coffee",
			"They are annoyed; the situation is bad",
			"They are asking for help",
		],
		correctAnswer: 2,
		explanation:
			'Com tom sarcástico, "Oh, great" expressa irritação, o oposto do sentido literal. O tom de voz muda o significado.',
	},
	{
		question: "Which day is Thanksgiving celebrated in the United States?",
		options: [
			"The first Monday of September",
			"The fourth Thursday of November",
			"The last Friday of December",
			"The second Sunday of May",
		],
		correctAnswer: 1,
		explanation:
			"Nos EUA, o Thanksgiving é celebrado na quarta quinta-feira de novembro.",
	},
	{
		question: 'In British English, what is a "flat"?',
		options: [
			"An apartment",
			"A type of hat",
			"A kind of train",
			"A small farm",
		],
		correctAnswer: 0,
		explanation:
			'No inglês britânico, "flat" é um apartamento. Nos EUA, diz-se "apartment".',
	},
	{
		question:
			"What does Guy Fawkes Night, celebrated on 5 November in the UK, commemorate?",
		options: [
			"The end of the Second World War",
			"The founding of the National Health Service",
			"The birthday of a famous explorer",
			"The failed 1605 plot to blow up Parliament",
		],
		correctAnswer: 3,
		explanation:
			"A data lembra a falha da Conspiração da Pólvora (1605), tentativa de explodir o Parlamento britânico.",
	},
	{
		question: "What is the usual tipping practice in American restaurants?",
		options: [
			"No tip is ever expected",
			"A fixed fee of fifty cents",
			"About 15 to 20 percent of the bill",
			"A tip only for the cook",
		],
		correctAnswer: 2,
		explanation:
			"Nos EUA, a gorjeta habitual para garçons fica em torno de 15% a 20% da conta.",
	},
	{
		question: 'What is a "potluck"?',
		options: [
			"A card game played with coins",
			"A party where each guest brings a dish to share",
			"A formal dinner paid by the host",
			"A sport played in teams",
		],
		correctAnswer: 1,
		explanation:
			'Um "potluck" é um encontro em que cada convidado leva um prato para compartilhar.',
	},
	{
		question: 'In British English, what does "You\'re having a laugh!" mean?',
		options: [
			"You must be joking; that is unreasonable",
			"You are very happy and laughing",
			"You have just won a prize",
			"You are telling a secret",
		],
		correctAnswer: 0,
		explanation:
			'É uma expressão informal que mostra incredulidade ou irritação, algo como "Você só pode estar brincando!".',
	},
];
