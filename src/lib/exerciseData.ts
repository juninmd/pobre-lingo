
export interface SentenceOrderingExercise {
  id: string;
  words: string[]; // Words to be ordered
  correctSentence: string;
  translation_pt?: string; // Optional translation
  topic: string; // e.g., "Present Simple"
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CorrectSentenceIdentificationChoice {
  id: string;
  sentence: string;
  isCorrect: boolean;
  translation_pt?: string; // Optional translation for correct choices
}
export interface CorrectSentenceIdentificationExercise {
  id:string;
  prompt: string; // e.g., "Qual frase está correta?"
  choices: CorrectSentenceIdentificationChoice[];
  explanation: string; // Explanation for the correct answer(s)
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface WordToken {
  id: string;
  text: string; // The word/punctuation as it appears in the text
  isError?: boolean; // True if this token is an error
  correctText?: string; // The correct version of the text, if it's an error
  explanation?: string; // Explanation if it's an error
}

export interface FindIncorrectWordsExercise {
  id: string;
  title_pt: string;
  instructions_pt: string;
  tokens: WordToken[];
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// --- News Comprehension Exercise ---
export interface NewsArticle {
  id: string;
  title: string;
  source?: string; // e.g., "PobreLingo News"
  date?: string; // e.g., "October 26, 2023"
  content: string; // The article text, can include simple HTML like <p>
}

export interface ArticleQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string; // Must be one of the options
  explanation: string;
}

export interface NewsComprehensionExercise {
  id: string;
  article: NewsArticle;
  questions: ArticleQuestion[];
  topic: string; // e.g., "Current Events", "Technology"
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MatchingPair {
  id: string;
  word: string;
  translation: string;
}

export interface MatchingPairsExercise {
  id: string;
  pairs: MatchingPair[];
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
// --- End News Comprehension Exercise ---


export const sentenceOrderingExercises: SentenceOrderingExercise[] = [
  {
    id: 'so1',
    words: ['cat', 'the', 'is', 'mat', 'on', 'the'],
    correctSentence: 'The cat is on the mat.',
    translation_pt: 'O gato está no tapete.',
    topic: 'Prepositions of Place',
    difficulty: 'easy',
  },
  {
    id: 'so2',
    words: ['likes', 'she', 'coffee', 'morning', 'in', 'the'],
    correctSentence: 'She likes coffee in the morning.',
    translation_pt: 'Ela gosta de café de manhã.',
    topic: 'Present Simple',
    difficulty: 'easy',
  },
  {
    id: 'so3',
    words: ['yesterday', 'to', 'park', 'the', 'went', 'they'],
    correctSentence: 'They went to the park yesterday.',
    translation_pt: 'Eles foram ao parque ontem.',
    topic: 'Past Simple',
    difficulty: 'medium',
  },
  {
    id: 'so4',
    words: ['is', 'reading', 'a', 'book', 'he', 'now'],
    correctSentence: 'He is reading a book now.',
    translation_pt: 'Ele está lendo um livro agora.',
    topic: 'Present Continuous',
    difficulty: 'easy',
  },
  {
    id: 'so5',
    words: ['will', 'travel', 'they', 'to', 'Europe', 'next', 'year'],
    correctSentence: 'They will travel to Europe next year.',
    translation_pt: 'Eles viajarão para a Europa no próximo ano.',
    topic: 'Future Simple (will)',
    difficulty: 'medium',
  },
  {
    id: 'so6',
    words: ['beautiful', 'day', 'a', 'what', 'it', 'is'],
    correctSentence: 'What a beautiful day it is!',
    translation_pt: 'Que dia lindo!',
    topic: 'Exclamatory Sentences',
    difficulty: 'medium',
  },
  {
    id: 'so7',
    words: ['have', 'never', 'I', 'sushi', 'eaten', 'before'],
    correctSentence: 'I have never eaten sushi before.',
    translation_pt: 'Eu nunca comi sushi antes.',
    topic: 'Present Perfect',
    difficulty: 'hard',
  },
  {
    id: 'so8',
    words: ['were', 'playing', 'children', 'the', 'park', 'in', 'the'],
    correctSentence: 'The children were playing in the park.',
    translation_pt: 'As crianças estavam brincando no parque.',
    topic: 'Past Continuous',
    difficulty: 'medium',
  },
  {
    id: 'so9',
    words: ['can', 'speak', 'you', 'French', 'fluently'],
    correctSentence: 'You can speak French fluently.',
    translation_pt: 'Você consegue falar francês fluentemente.',
    topic: 'Modal Verbs (can)',
    difficulty: 'easy',
  },
  {
    id: 'so10',
    words: ['is', 'going', 'to', 'rain', 'it', 'soon'],
    correctSentence: 'It is going to rain soon.',
    translation_pt: 'Vai chover em breve.',
    topic: 'Future (going to)',
    difficulty: 'easy',
  },
  {
    id: 'so11',
    words: ['my', 'keys', 'I', 'lost', 'have'],
    correctSentence: 'I have lost my keys.',
    translation_pt: 'Eu perdi minhas chaves.',
    topic: 'Present Perfect',
    difficulty: 'medium',
  },
  {
    id: 'so12',
    words: ['dinner', 'cooking', 'she', 'is', 'now', '?'],
    correctSentence: 'Is she cooking dinner now?',
    translation_pt: 'Ela está cozinhando o jantar agora?',
    topic: 'Present Continuous - Interrogative',
    difficulty: 'easy',
  },
  {
    id: 'so13',
    words: ['book', 'interesting', 'an', 'this', 'is'],
    correctSentence: 'This is an interesting book.',
    translation_pt: 'Este é um livro interessante.',
    topic: 'Adjectives & Articles',
    difficulty: 'easy',
  },
  {
    id: 'so14',
    words: ['should', 'study', 'you', 'more', 'for', 'exam', 'the'],
    correctSentence: 'You should study more for the exam.',
    translation_pt: 'Você deveria estudar mais para o exame.',
    topic: 'Modal Verbs (should)',
    difficulty: 'medium',
  },
  {
    id: 'so15',
    words: ['not', 'they', 'were', 'listening', 'music', 'to'],
    correctSentence: 'They were not listening to music.',
    translation_pt: 'Eles não estavam ouvindo música.',
    topic: 'Past Continuous - Negative',
    difficulty: 'medium',
  },
  {
    id: 'so16',
    words: ['apple', 'an', 'day', 'a', 'keeps', 'doctor', 'the', 'away'],
    correctSentence: 'An apple a day keeps the doctor away.',
    translation_pt: 'Uma maçã por dia mantém o médico longe.',
    topic: 'Proverbs',
    difficulty: 'medium',
  },
  {
    id: 'so17',
    words: ['if', 'I', 'were', 'you', 'I', 'would', 'apologize'],
    correctSentence: 'If I were you I would apologize.',
    translation_pt: 'Se eu fosse você, eu pediria desculpas.',
    topic: 'Conditional Type 2',
    difficulty: 'hard',
  },
  {
    id: 'so18',
    words: ['many', 'people', 'there', 'were', 'at', 'party', 'the', '?'],
    correctSentence: 'Were there many people at the party?',
    translation_pt: 'Havia muitas pessoas na festa?',
    topic: 'Past Simple - Interrogative (to be)',
    difficulty: 'medium',
  },
  {
    id: 'so19',
    words: ['how', 'long', 'have', 'you', 'been', 'learning', 'English', '?'],
    correctSentence: 'How long have you been learning English?',
    translation_pt: 'Há quanto tempo você está aprendendo inglês?',
    topic: 'Present Perfect Continuous',
    difficulty: 'hard',
  },
  {
    id: 'so20',
    words: ['the', 'movie', 'enjoy', 'did', 'you', '?'],
    correctSentence: 'Did you enjoy the movie?',
    translation_pt: 'Você gostou do filme?',
    topic: 'Past Simple - Interrogative (do/did)',
    difficulty: 'easy',
  }
];

export const correctSentenceIdentificationExercises: CorrectSentenceIdentificationExercise[] = [
  {
    id: 'csi1',
    prompt: 'Qual frase está gramaticalmente correta?',
    choices: [
      { id: 'csi1a', sentence: 'He play guitar very well.', isCorrect: false },
      { id: 'csi1b', sentence: 'He plays guitar very well.', isCorrect: true, translation_pt: "Ele toca guitarra muito bem." },
      { id: 'csi1c', sentence: 'He playes guitar very well.', isCorrect: false },
    ],
    explanation: "Na terceira pessoa do singular (he, she, it) no Present Simple, adicionamos 's' ao verbo. 'Plays' é a forma correta.",
    topic: 'Present Simple - 3rd Person',
    difficulty: 'easy',
  },
  {
    id: 'csi2',
    prompt: 'Escolha a(s) frase(s) correta(s) sobre o uso de artigos:',
    choices: [
      { id: 'csi2a', sentence: 'I saw an dog in the park.', isCorrect: false },
      { id: 'csi2b', sentence: 'I saw a dog in the park.', isCorrect: true, translation_pt: "Eu vi um cachorro no parque." },
      { id: 'csi2c', sentence: 'I saw the dog in the park.', isCorrect: true, translation_pt: "Eu vi o cachorro no parque." },
    ],
    explanation: "'A' é usado antes de palavras com som de consoante como 'dog'. 'The' pode ser usado se for um cachorro específico já mencionado ou conhecido pelo ouvinte/leitor.",
    topic: 'Articles',
    difficulty: 'medium',
  },
  {
    id: 'csi3',
    prompt: 'Identifique a sentença correta:',
    choices: [
      { id: 'csi3a', sentence: 'They goed to the beach last weekend.', isCorrect: false },
      { id: 'csi3b', sentence: 'They went to the beach last weekend.', isCorrect: true, translation_pt: "Eles foram à praia no fim de semana passado." },
      { id: 'csi3c', sentence: 'They was going to the beach last weekend.', isCorrect: false },
    ],
    explanation: "'Went' é a forma irregular do passado do verbo 'to go'. 'Was going' seria Past Continuous, mas o contexto 'last weekend' geralmente pede Past Simple para uma ação concluída.",
    topic: 'Past Simple - Irregular Verbs',
    difficulty: 'medium',
  },
  {
    id: 'csi4',
    prompt: "Qual frase descreve melhor uma ação em andamento interrompida por outra?",
    choices: [
      { id: 'csi4a', sentence: "She read a book when he arrived.", isCorrect: false },
      { id: 'csi4b', sentence: "She was reading a book when he arrived.", isCorrect: true, translation_pt: "Ela estava lendo um livro quando ele chegou." },
      { id: 'csi4c', sentence: "She has read a book when he arrived.", isCorrect: false },
    ],
    explanation: "Past Continuous (was/were + -ing) é usado para a ação mais longa que estava em progresso. Past Simple é usado para a ação curta que a interrompeu.",
    topic: "Past Continuous vs Past Simple",
    difficulty: 'medium',
  },
  {
    id: 'csi5',
    prompt: "Selecione a frase com o uso correto de artigos para um sentido geral:",
    choices: [
      { id: 'csi5a', sentence: "I like listening to the music.", isCorrect: false },
      { id: 'csi5b', sentence: "I like listening to music.", isCorrect: true, translation_pt: "Eu gosto de ouvir música." },
      { id: 'csi5c', sentence: "A music is good for soul.", isCorrect: false },
    ],
    explanation: "Para substantivos incontáveis (como 'music') ou plurais usados em sentido geral, geralmente não usamos 'the'.",
    topic: "Articles - General Sense",
    difficulty: 'easy',
  },
  {
    id: 'csi6',
    prompt: "Qual comparação está correta?",
    choices: [
      { id: 'csi6a', sentence: "This car is more faster than that one.", isCorrect: false },
      { id: 'csi6b', sentence: "This car is faster then that one.", isCorrect: false },
      { id: 'csi6c', sentence: "This car is faster than that one.", isCorrect: true, translation_pt: "Este carro é mais rápido que aquele." },
    ],
    explanation: "Para adjetivos curtos como 'fast', adicionamos '-er' para formar o comparativo e usamos 'than' para comparar. 'Then' indica sequência.",
    topic: "Comparative Adjectives",
    difficulty: 'medium',
  },
  {
    id: 'csi7',
    prompt: "Escolha a frase com a preposição de tempo correta:",
    choices: [
      { id: 'csi7a', sentence: "My birthday is at January.", isCorrect: false },
      { id: 'csi7b', sentence: "My birthday is on January.", isCorrect: false },
      { id: 'csi7c', sentence: "My birthday is in January.", isCorrect: true, translation_pt: "Meu aniversário é em janeiro." },
    ],
    explanation: "Usamos 'in' para meses, anos e estações do ano.",
    topic: "Prepositions of Time (in/on/at)",
    difficulty: 'easy',
  },
  {
    id: 'csi8',
    prompt: "Qual frase expressa corretamente uma experiência de vida?",
    choices: [
      { id: 'csi8a', sentence: "I have been to London last year.", isCorrect: false },
      { id: 'csi8b', sentence: "I was to London some day.", isCorrect: false },
      { id: 'csi8c', sentence: "I have been to London.", isCorrect: true, translation_pt: "Eu estive em Londres." },
    ],
    explanation: "Present Perfect (have/has + particípio passado) é usado para experiências de vida quando o tempo específico não é mencionado ou não é o foco. Usar um tempo específico como 'last year' com Present Perfect geralmente é incorreto para essa finalidade.",
    topic: "Present Perfect - Experience",
    difficulty: 'medium',
  },
  {
    id: 'csi9',
    prompt: "Qual frase usa 'should' corretamente para dar um conselho?",
    choices: [
      { id: 'csi9a', sentence: "You should to see a doctor.", isCorrect: false },
      { id: 'csi9b', sentence: "You should seeing a doctor.", isCorrect: false },
      { id: 'csi9c', sentence: "You should see a doctor.", isCorrect: true, translation_pt: "Você deveria consultar um médico." },
    ],
    explanation: "Verbos modais como 'should' são seguidos pelo verbo na forma base (infinitivo sem 'to').",
    topic: "Modal Verbs (should)",
    difficulty: 'easy',
  },
  {
    id: 'csi10',
    prompt: "Qual das seguintes frases está no Past Perfect corretamente?",
    choices: [
      { id: 'csi10a', sentence: "She had already leave when I arrived.", isCorrect: false },
      { id: 'csi10b', sentence: "She had already left when I arrived.", isCorrect: true, translation_pt: "Ela já tinha saído quando eu cheguei." },
      { id: 'csi10c', sentence: "She has already left when I arrived.", isCorrect: false },
    ],
    explanation: "O Past Perfect (had + particípio passado) é usado para indicar uma ação que ocorreu antes de outra ação no passado. 'Left' é o particípio passado de 'leave'.",
    topic: "Past Perfect",
    difficulty: 'hard',
  },
  {
    id: 'csi11',
    prompt: "Qual frase usa o gerúndio como sujeito corretamente?",
    choices: [
      { id: 'csi11a', sentence: "To swim is good exercise.", isCorrect: true, translation_pt: "Nadar é um bom exercício." },
      { id: 'csi11b', sentence: "Swimming is good exercise.", isCorrect: true, translation_pt: "Nadar é um bom exercício." },
      { id: 'csi11c', sentence: "Swim is good exercise.", isCorrect: false },
    ],
    explanation: "Tanto o infinitivo com 'to' (To swim) quanto o gerúndio (Swimming) podem funcionar como sujeito de uma frase. A forma base do verbo (Swim) sozinha não pode.",
    topic: "Gerunds and Infinitives as Subjects",
    difficulty: 'medium',
  },
  {
    id: 'csi12',
    prompt: "Selecione a frase que usa 'too' e 'enough' corretamente.",
    choices: [
      { id: 'csi12a', sentence: "The coffee is too much hot to drink.", isCorrect: false },
      { id: 'csi12b', sentence: "The coffee is hot enough to drink.", isCorrect: true, translation_pt: "O café está quente o suficiente para beber." },
      { id: 'csi12c', sentence: "The coffee is very hot to drink.", isCorrect: false },
      { id: 'csi12d', sentence: "This bag is too heavy for carry.", isCorrect: false },
      { id: 'csi12e', sentence: "This bag is not light enough to carry.", isCorrect: true, translation_pt: "Esta bolsa não é leve o suficiente para carregar." }
    ],
    explanation: "'Too' (demais) vem antes de adjetivos/advérbios. 'Enough' (suficiente) vem depois de adjetivos/advérbios, mas antes de substantivos. 'Too' indica excesso, 'enough' indica suficiência. 'Very hot to drink' não é idiomático; 'too hot to drink' seria.",
    topic: "Too and Enough",
    difficulty: 'hard',
  }
];

export const findIncorrectWordsExercises: FindIncorrectWordsExercise[] = [
  {
    id: 'fiw1',
    title_pt: "Revisando um E-mail",
    instructions_pt: "Clique nas palavras que você acha que estão incorretas neste e-mail. Depois, clique em 'Verificar Respostas'.",
    tokens: [
      { id: 'fiw1_t1', text: "Dear" },
      { id: 'fiw1_t2', text: "Mr." },
      { id: 'fiw1_t3', text: "Smith," },
      { id: 'fiw1_t4', text: "I" },
      { id: 'fiw1_t5', text: "am" },
      { id: 'fiw1_t6', text: "writing" },
      { id: 'fiw1_t7', text: "to" },
      { id: 'fiw1_t8', text: "enquire" },
      { id: 'fiw1_t9', text: "about" },
      { id: 'fiw1_t10', text: "the" },
      { id: 'fiw1_t11', text: "job" },
      { id: 'fiw1_t12', text: "advertisment" , isError: true, correctText: "advertisement", explanation: "Erro de ortografia. A grafia correta é 'advertisement'."},
      { id: 'fiw1_t13', text: "I" },
      { id: 'fiw1_t14', text: "saw" },
      { id: 'fiw1_t15', text: "on" },
      { id: 'fiw1_t16', text: "your" },
      { id: 'fiw1_t17', text: "website." },
      { id: 'fiw1_t18', text: "My" },
      { id: 'fiw1_t19', text: "CV" },
      { id: 'fiw1_t20', text: "is" },
      { id: 'fiw1_t21', text: "attatched" , isError: true, correctText: "attached", explanation: "Erro de ortografia. A grafia correta é 'attached', com um 'h'."},
      { id: 'fiw1_t22', text: "for" },
      { id: 'fiw1_t23', text: "your" },
      { id: 'fiw1_t24', text: "perusal." },
      { id: 'fiw1_t25', text: "I" },
      { id: 'fiw1_t26', text: "look" },
      { id: 'fiw1_t27', text: "forward" },
      { id: 'fiw1_t28', text: "to" },
      { id: 'fiw1_t29', text: "hearing" },
      { id: 'fiw1_t30', text: "from" },
      { id: 'fiw1_t31', text: "you" },
      { id: 'fiw1_t32', text: "shortly." },
      { id: 'fiw1_t33', text: "Sincerly," , isError: true, correctText: "Sincerely,", explanation: "Erro de ortografia. A grafia correta é 'Sincerely,'."},
      { id: 'fiw1_t34', text: "Jane" },
      { id: 'fiw1_t35', text: "Doe." },
    ],
    topic: "Email Writing, Spelling",
    difficulty: 'medium',
  },
  {
    id: 'fiw2',
    title_pt: "Planejando uma Viagem",
    instructions_pt: "Encontre os erros neste parágrafo sobre planejamento de viagem.",
    tokens: [
      { id: 'fiw2_t1', text: "We" },
      { id: 'fiw2_t2', text: "are" },
      { id: 'fiw2_t3', text: "planning" },
      { id: 'fiw2_t4', text: "a" },
      { id: 'fiw2_t5', text: "trip" },
      { id: 'fiw2_t6', text: "to" },
      { id: 'fiw2_t7', text: "Europe" },
      { id: 'fiw2_t8', text: "next" },
      { id: 'fiw2_t9', text: "sumer." , isError: true, correctText: "summer.", explanation: "Erro de ortografia. A grafia correta é 'summer'."},
      { id: 'fiw2_t10', text: "Our" },
      { id: 'fiw2_t11', text: "first" },
      { id: 'fiw2_t12', text: "stop" },
      { id: 'fiw2_t13', text: "will" },
      { id: 'fiw2_t14', text: "be" },
      { id: 'fiw2_t15', text: "Paris," },
      { id: 'fiw2_t16', text: "where" },
      { id: 'fiw2_t17', text: "we" },
      { id: 'fiw2_t18', text: "want" },
      { id: 'fiw2_t19', text: "to" },
      { id: 'fiw2_t20', text: "see" },
      { id: 'fiw2_t21', text: "the" },
      { id: 'fiw2_t22', text: "Eiffel" },
      { id: 'fiw2_t23', text: "Tower" },
      { id: 'fiw2_t24', text: "and" },
      { id: 'fiw2_t25', text: "the" },
      { id: 'fiw2_t26', text: "Luvre." , isError: true, correctText: "Louvre.", explanation: "Erro de ortografia/nome próprio. O nome correto do museu é 'Louvre'."},
      { id: 'fiw2_t27', text: "Then," },
      { id: 'fiw2_t28', text: "we" },
      { id: 'fiw2_t29', text: "will" },
      { id: 'fiw2_t30', text: "take" },
      { id: 'fiw2_t31', text: "a" },
      { id: 'fiw2_t32', text: "train" },
      { id: 'fiw2_t33', text: "to" },
      { id: 'fiw2_t34', text: "Rome" },
      { id: 'fiw2_t35', text: "to" },
      { id: 'fiw2_t36', text: "ate" , isError: true, correctText: "eat", explanation: "Tempo verbal incorreto / palavra errada. O correto é 'eat' (comer) no infinitivo."},
      { id: 'fiw2_t37', text: "some" },
      { id: 'fiw2_t38', text: "delicious" },
      { id: 'fiw2_t39', text: "pasta." },
      { id: 'fiw2_t40', text: "It" },
      { id: 'fiw2_t41', text: "should" },
      { id: 'fiw2_t42', text: "be" },
      { id: 'fiw2_t43', text: "a" },
      { id: 'fiw2_t44', text: "very" },
      { id: 'fiw2_t45', text: "exiting" , isError: true, correctText: "exciting", explanation: "Palavra errada. 'Exiting' significa 'saindo'. A palavra correta é 'exciting' (empolgante)."},
      { id: 'fiw2_t46', text: "vacation!" },
    ],
    topic: "Travel, Spelling, Common Mistakes",
    difficulty: 'medium',
  },
];

const placeholderQuestion = {
  id: 'q1',
  questionText: "What is the main idea of the article?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: "Option A",
  explanation: "This is the correct answer because of reasons X, Y, and Z mentioned in the text."
};

export const matchingPairsExercises: MatchingPairsExercise[] = [
  {
    id: 'mpe1',
    topic: 'Basic Vocabulary',
    difficulty: 'easy',
    pairs: [
      { id: 'p1', word: 'Hello', translation: 'Olá' },
      { id: 'p2', word: 'Goodbye', translation: 'Adeus' },
      { id: 'p3', word: 'Thank you', translation: 'Obrigado' },
      { id: 'p4', word: 'Please', translation: 'Por favor' },
      { id: 'p5', word: 'Yes', translation: 'Sim' },
      { id: 'p6', word: 'No', translation: 'Não' }
    ]
  },
  {
    id: 'mpe2',
    topic: 'Food',
    difficulty: 'easy',
    pairs: [
      { id: 'p1', word: 'Water', translation: 'Água' },
      { id: 'p2', word: 'Bread', translation: 'Pão' },
      { id: 'p3', word: 'Milk', translation: 'Leite' },
      { id: 'p4', word: 'Cheese', translation: 'Queijo' },
      { id: 'p5', word: 'Coffee', translation: 'Café' },
      { id: 'p6', word: 'Tea', translation: 'Chá' }
    ]
  }
];

export const newsComprehensionExercises: NewsComprehensionExercise[] = [
  {
    id: 'nce1',
    article: {
      id: 'news1',
      title: "City Announces New Green Initiative",
      source: "PobreLingo Local News",
      date: "October 26, 2024",
      content: "<p>The city council today announced a major new green initiative aimed at reducing urban pollution and increasing green spaces. The plan, called 'Green City, Clean Air,' will involve planting 10,000 new trees across various neighborhoods over the next two years. Additionally, the initiative will fund the development of three new public parks and promote the use of bicycles through the creation of new dedicated bike lanes.</p><p>Mayor Johnson stated, 'This is a significant step towards a healthier and more sustainable future for our residents. We believe these changes will not only improve air quality but also enhance the overall well-being of our community.' The project is set to begin in early spring next year and is expected to create several temporary jobs in landscaping and park maintenance. Funding for the 'Green City, Clean Air' initiative will come from a combination of city budget allocations and private sponsorships.</p>"
    },
    questions: [
      {
        id: 'nce1_q1',
        questionText: "What is the main goal of the 'Green City, Clean Air' initiative?",
        options: [
          "To build new skyscrapers",
          "To reduce urban pollution and increase green spaces",
          "To decrease the number of public parks",
          "To promote car usage"
        ],
        correctAnswer: "To reduce urban pollution and increase green spaces",
        explanation: "The article explicitly states the initiative is 'aimed at reducing urban pollution and increasing green spaces.'"
      },
      {
        id: 'nce1_q2',
        questionText: "How many new trees are planned to be planted?",
        options: ["1,000", "5,000", "10,000", "20,000"],
        correctAnswer: "10,000",
        explanation: "The text mentions 'planting 10,000 new trees across various neighborhoods.'"
      },
      {
        id: 'nce1_q3',
        questionText: "When is the project expected to start?",
        options: ["Immediately", "Next summer", "Early spring next year", "In two years"],
        correctAnswer: "Early spring next year",
        explanation: "The article says, 'The project is set to begin in early spring next year.'"
      },
      {
        id: 'nce1_q4',
        questionText: "According to Mayor Johnson, what are the expected benefits of the initiative?",
        options: [
          "Increased traffic and more parking spaces",
          "Improved air quality and enhanced community well-being",
          "Lower city budget and fewer jobs",
          "More private sponsorships for roads"
        ],
        correctAnswer: "Improved air quality and enhanced community well-being",
        explanation: "Mayor Johnson is quoted saying, 'these changes will not only improve air quality but also enhance the overall well-being of our community.'"
      }
    ],
    topic: "Local News, Environment",
    difficulty: 'medium',
  },
  // Adding 9 more placeholder exercises
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `nce${i + 2}`,
    article: {
      id: `news${i + 2}`,
      title: `Tech Advances in 202${i + 5}`,
      source: "Tech Today",
      date: `November 1${i}, 2024`,
      content: `<p>A new breakthrough in AI was announced today, promising to revolutionize how we interact with technology. This new AI, named 'Innovator X', can learn from small datasets. Experts believe this will accelerate research in many fields.</p><p>The lead scientist, Dr. Ada Byron, mentioned, 'Innovator X could solve problems we haven't even imagined yet.' The development took five years and involved a global team of researchers. Further applications are being explored in medicine and environmental science.</p>`
    },
    questions: [
      { ...placeholderQuestion, id: `nce${i + 2}_q1`, questionText: `What is 'Innovator X'?`, options: ["A new car", "A new AI", "A new planet", "A new movie"], correctAnswer: "A new AI", explanation: "The article clearly states 'Innovator X' is a new AI." },
      { ...placeholderQuestion, id: `nce${i + 2}_q2`, questionText: `What is a key feature of 'Innovator X'?`, options: ["It's very large", "It learns from small datasets", "It only works in English", "It was built by one person"], correctAnswer: "It learns from small datasets", explanation: "The text says 'Innovator X' can learn from small datasets." },
      { ...placeholderQuestion, id: `nce${i + 2}_q3`, questionText: `Who is the lead scientist mentioned?`, options: ["Dr. Alan Turing", "Dr. Marie Curie", "Dr. Ada Byron", "Dr. Albert Einstein"], correctAnswer: "Dr. Ada Byron", explanation: "Dr. Ada Byron is mentioned as the lead scientist." }
    ],
    topic: "Technology, AI",
    difficulty: (i % 2 === 0 ? 'medium' : 'hard') as 'easy' | 'medium' | 'hard',
  }))
];
