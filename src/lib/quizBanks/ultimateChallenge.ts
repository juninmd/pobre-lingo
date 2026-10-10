import type { QuizQuestion } from "./types";

// Ultimate challenge (unit 9): slang, reductions, idioms and B2 grammar.
export const ultimateChallengeBank: QuizQuestion[] = [
	{
		question: 'In casual speech, "going to" is often reduced to:',
		options: ["gotta", "gonna", "wanna", "dunno"],
		correctAnswer: 1,
		explanation:
			'"Going to" vira "gonna" na fala informal: "I\'m gonna call you later."',
	},
	{
		question: 'What does "BRB" mean in a chat message?',
		options: [
			"Be ready by Friday",
			"Better read before",
			"Be right back",
			"Break really bad",
		],
		correctAnswer: 2,
		explanation: '"BRB" é a sigla de "Be Right Back", ou seja, "já volto".',
	},
	{
		question:
			'Complete: "If she ___ earlier, she would have caught the train."',
		options: ["left", "has left", "would leave", "had left"],
		correctAnswer: 3,
		explanation:
			"Terceiro condicional: if + past perfect, would have + particípio. Fala de uma situação hipotética no passado.",
	},
	{
		question:
			'Reported speech: She said, "I am tired." She said she ___ tired.',
		options: ["will be", "would be", "was", "be"],
		correctAnswer: 2,
		explanation:
			'Na reported speech, o present simple "am" recua para o past simple "was".',
	},
	{
		question: 'Complete: "The report ___ by the team last week."',
		options: ["was written", "wrote", "has written", "is writing"],
		correctAnswer: 0,
		explanation:
			'O sujeito "the report" recebe a ação, então usamos a voz passiva: was + particípio passado.',
	},
	{
		question: 'Complete: "He isn\'t answering his phone. He ___ asleep."',
		options: ["should been", "must be", "must have been", "can have"],
		correctAnswer: 1,
		explanation:
			'"Must be" faz uma dedução com certeza sobre o presente. "Must have been" refere-se ao passado.',
	},
	{
		question: 'What does "to hit the sack" mean?',
		options: [
			"To hit someone",
			"To pay a fine",
			"To work late",
			"To go to bed",
		],
		correctAnswer: 3,
		explanation: '"To hit the sack" é gíria para "ir dormir".',
	},
	{
		question: 'In "The party was lit", what does "lit" mean?',
		options: [
			"Very exciting and fun",
			"Very dark",
			"Badly organized",
			"Cold and boring",
		],
		correctAnswer: 0,
		explanation: 'Na gíria, "lit" descreve algo animado e muito divertido.',
	},
	{
		question: 'What does "dunno" mean?',
		options: ["Do not now", "Done by now", "Doing nothing", "Don't know"],
		correctAnswer: 3,
		explanation: '"Dunno" é a forma reduzida e informal de "don\'t know".',
	},
	{
		question: 'Complete: "I can\'t ___ the noise any longer."',
		options: ["put off", "put up with", "put on", "put out"],
		correctAnswer: 1,
		explanation: '"Put up with" significa tolerar algo ou alguém que incomoda.',
	},
];
