import { quizBanks } from "@/lib/quizBanks";
import type { QuizQuestion } from "@/lib/quizBanks/types";

export type { QuizQuestion };

// Question bank, per quiz (keyed by curriculum lesson id)
export const quizData: Record<string, QuizQuestion[]> = {
	...quizBanks,
	"foundations-quiz": [
		{
			question: 'Qual é a forma correta do Present Simple para "he/she/it"?',
			options: ["Add -s or -es", "Add -ed", "Use base form", "Add -ing"],
			correctAnswer: 0,
			explanation:
				"Na terceira pessoa do singular (he/she/it), adicionamos -s ou -es ao verbo.",
		},
		{
			question: "Como formamos a negativa no Present Simple?",
			options: [
				"subject + not + verb",
				"subject + do/does + not + verb",
				"subject + verb + not",
				"not + subject + verb",
			],
			correctAnswer: 1,
			explanation: "Usamos do/does + not + verbo na forma base para negativas.",
		},
		{
			question: "Qual frase está correta?",
			options: [
				"She go to school",
				"She goes to school",
				"She going to school",
				"She is go to school",
			],
			correctAnswer: 1,
			explanation: 'Para he/she/it, adicionamos -es ao verbo "go" → "goes".',
		},
		{
			question: 'O que significa "Good morning"?',
			options: ["Boa noite", "Boa tarde", "Bom dia", "Olá"],
			correctAnswer: 2,
			explanation: '"Good morning" é usado para cumprimentar alguém de manhã.',
		},
		{
			question: 'Qual é a tradução de "Thank you"?',
			options: ["Por favor", "Desculpe", "Obrigado(a)", "De nada"],
			correctAnswer: 2,
			explanation: '"Thank you" significa "Obrigado(a)" em português.',
		},
	],
	"conversations-quiz": [
		{
			question: "Como você pergunta o nome de alguém em inglês?",
			options: [
				"What your name?",
				"What is your name?",
				"What are your name?",
				"How is your name?",
			],
			correctAnswer: 1,
			explanation:
				'A forma correta é "What is your name?" (pode ser contraído para "What\'s your name?").',
		},
		{
			question: 'Qual é a resposta adequada para "How are you?"?',
			options: [
				"I am John",
				"I have 25 years",
				"I am fine, thank you",
				"Yes, I am",
			],
			correctAnswer: 2,
			explanation: '"I am fine, thank you" é uma resposta comum e educada.',
		},
		{
			question: 'O que significa "Nice to meet you"?',
			options: ["Até logo", "Prazer em conhecê-lo", "Como vai?", "Boa sorte"],
			correctAnswer: 1,
			explanation:
				'"Nice to meet you" é usado quando você conhece alguém pela primeira vez.',
		},
		{
			question: 'Como você diz "De onde você é?" em inglês?',
			options: [
				"Where you from?",
				"Where are you from?",
				"From where you are?",
				"You are from where?",
			],
			correctAnswer: 1,
			explanation: 'A forma correta é "Where are you from?"',
		},
	],
	"tenses-quiz": [
		{
			question: 'Qual é a forma correta do Past Simple de "go"?',
			options: ["goed", "went", "gone", "going"],
			correctAnswer: 1,
			explanation: '"Go" é irregular. O Past Simple é "went".',
		},
		{
			question: "Como formamos o Present Continuous?",
			options: [
				"am/is/are + verb-ing",
				"do/does + verb",
				"verb-ed",
				"will + verb",
			],
			correctAnswer: 0,
			explanation: "Present Continuous usa am/is/are + verbo com -ing.",
		},
		{
			question: "Qual frase está no Past Simple?",
			options: ["I am playing", "I play", "I played", "I will play"],
			correctAnswer: 2,
			explanation: '"I played" está no Past Simple (verbo regular com -ed).',
		},
		{
			question: "Quando usamos Present Continuous?",
			options: [
				"Para hábitos",
				"Para ações acontecendo agora",
				"Para fatos gerais",
				"Para o passado",
			],
			correctAnswer: 1,
			explanation:
				"Present Continuous é usado para ações em andamento no momento.",
		},
		{
			question: 'Qual é o Past Simple de "study"?',
			options: ["studyed", "studied", "studiing", "studies"],
			correctAnswer: 1,
			explanation:
				"Verbos terminados em -y precedido de consoante mudam para -ied.",
		},
	],
	"perfect-reading-quiz": [
		{
			question: "Quando usamos Present Perfect?",
			options: [
				"Para ações no passado distante",
				"Para conectar passado e presente",
				"Apenas para o futuro",
				"Para ações habituais",
			],
			correctAnswer: 1,
			explanation: "Present Perfect conecta ações passadas com o presente.",
		},
		{
			question: "Qual a estrutura do Present Perfect?",
			options: [
				"have/has + past participle",
				"did + verb",
				"am/is/are + verb-ing",
				"will + verb",
			],
			correctAnswer: 0,
			explanation: "Present Perfect usa have/has + particípio passado.",
		},
		{
			question: 'Qual é o particípio de "eat"?',
			options: ["eated", "ate", "eaten", "eating"],
			correctAnswer: 2,
			explanation: '"Eat" é irregular: eat-ate-eaten.',
		},
	],
	"conditionals-practice-quiz": [
		{
			question: "Qual é a estrutura do First Conditional?",
			options: [
				"if + present, will + verb",
				"if + past, would + verb",
				"if + present, present",
				"if + past perfect, would have + verb",
			],
			correctAnswer: 0,
			explanation: "First Conditional: if + present simple, will + verbo.",
		},
		{
			question: "Quando usamos Second Conditional?",
			options: [
				"Situações reais",
				"Situações hipotéticas no presente",
				"Verdades gerais",
				"Passado",
			],
			correctAnswer: 1,
			explanation:
				"Second Conditional expressa situações hipotéticas ou improváveis no presente.",
		},
	],
	"passive-reading-quiz": [
		{
			question: "Qual é a estrutura da voz passiva?",
			options: [
				"subject + verb + object",
				"object + be + past participle",
				"subject + be + verb-ing",
				"subject + have + past participle",
			],
			correctAnswer: 1,
			explanation: "Voz passiva: objeto + verbo to be + particípio passado.",
		},
		{
			question: 'Transforme para passiva: "They built this house"',
			options: [
				"This house built by them",
				"This house was built by them",
				"This house is built by them",
				"This house has built by them",
			],
			correctAnswer: 1,
			explanation: "Passado simples na passiva: was/were + particípio passado.",
		},
	],
	"advanced-grammar-practice-quiz": [
		{
			question: "Como formamos Reported Speech no passado?",
			options: [
				"Mantém o tempo verbal",
				"Volta um tempo verbal",
				"Usa will",
				"Usa presente",
			],
			correctAnswer: 1,
			explanation: "Em Reported Speech, voltamos um tempo verbal (backshift).",
		},
		{
			question: "Qual modal expressa dedução no passado?",
			options: ["can", "must have", "should", "will"],
			correctAnswer: 1,
			explanation:
				'"Must have + past participle" expressa dedução sobre o passado.',
		},
	],
	"idioms-practice-quiz": [
		{
			question: 'O que significa "break a leg"?',
			options: ["Quebrar a perna", "Boa sorte", "Ter azar", "Cair"],
			correctAnswer: 1,
			explanation: '"Break a leg" é uma expressão que significa "boa sorte".',
		},
		{
			question: 'O que significa "piece of cake"?',
			options: [
				"Um pedaço de bolo",
				"Muito difícil",
				"Muito fácil",
				"Delicioso",
			],
			correctAnswer: 2,
			explanation: '"Piece of cake" significa algo muito fácil de fazer.',
		},
	],
	"mastery-quiz": [
		{
			question: "Qual tempo verbal expressa ações antes de outras no passado?",
			options: [
				"Past Simple",
				"Past Perfect",
				"Present Perfect",
				"Past Continuous",
			],
			correctAnswer: 1,
			explanation:
				"Past Perfect expressa ações anteriores a outras no passado.",
		},
		{
			question: 'Qual é o superlativo de "good"?',
			options: ["gooder", "goodest", "better", "best"],
			correctAnswer: 3,
			explanation: '"Good" é irregular: good - better - best.',
		},
		{
			question: 'Complete: "If I ___ rich, I would travel the world"',
			options: ["am", "was", "were", "will be"],
			correctAnswer: 2,
			explanation: 'Second Conditional usa "were" para todas as pessoas.',
		},
		{
			question: "Qual modal expressa obrigação?",
			options: ["can", "may", "must", "would"],
			correctAnswer: 2,
			explanation: '"Must" expressa obrigação ou necessidade.',
		},
		{
			question: 'O que é uma "phrasal verb"?',
			options: [
				"Verbo irregular",
				"Verbo + preposição/advérbio",
				"Verbo no passado",
				"Verbo auxiliar",
			],
			correctAnswer: 1,
			explanation:
				"Phrasal verbs são verbos combinados com preposições ou advérbios.",
		},
		{
			question: 'Qual é a voz passiva de "They are building a house"?',
			options: [
				"A house is built",
				"A house is being built",
				"A house was built",
				"A house has been built",
			],
			correctAnswer: 1,
			explanation:
				"Present Continuous passivo: is/are being + particípio passado.",
		},
		{
			question: 'Complete: "I wish I ___ speak French"',
			options: ["can", "could", "will", "would"],
			correctAnswer: 1,
			explanation:
				'"I wish" + past simple/could para expressar desejos impossíveis no presente.',
		},
		{
			question: 'O que significa "get the hang of it"?',
			options: ["Desistir", "Entender/pegar o jeito", "Pendurar", "Decorar"],
			correctAnswer: 1,
			explanation: '"Get the hang of it" significa entender como fazer algo.',
		},
		{
			question: 'Qual é a diferença entre "used to" e "would"?',
			options: [
				"Não há diferença",
				"Used to é para estados, would para ações",
				"Would é para estados",
				"Ambos são iguais",
			],
			correctAnswer: 1,
			explanation:
				'"Used to" descreve estados e hábitos passados, "would" apenas hábitos.',
		},
		{
			question: 'Complete: "The book ___ by millions last year"',
			options: ["read", "was read", "is read", "has read"],
			correctAnswer: 1,
			explanation:
				'Com "last year" (passado), usamos was/were + particípio passado. "Is read" é presente e não combina com essa expressão de tempo.',
		},
	],
};
