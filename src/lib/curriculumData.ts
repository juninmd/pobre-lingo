// Sistema de Currículo Progressivo - PobreLingo
// Define a estrutura de aprendizado do básico ao avançado

export type DifficultyLevel = "basico" | "intermediario" | "avancado";
export type ModuleType =
	| "grammar"
	| "vocabulary"
	| "exercise"
	| "reading"
	| "quiz"
	| "culture"
	| "speaking";

export interface Lesson {
	id: string;
	title_pt: string;
	title_en: string;
	description_pt: string;
	type: ModuleType;
	estimatedMinutes: number;
	xpReward: number;
	// Referências para conteúdo existente
	grammarRuleIds?: string[]; // IDs de regras gramaticais
	exerciseType?:
		| "sentence-ordering"
		| "sentence-identification"
		| "find-incorrect-words"
		| "news-comprehension"
		| "matching-pairs"
		| "listening"
		| "conversation";
	gameType?:
		| "flashcards"
		| "hangman"
		| "word-search"
		| "sentence-rush"
		| "memory-match"
		| "word-scramble"
		| "speed-match"
		| "bubble-pop";
	vocabularyTopics?: string[];
	speakingTopics?: string[];
	order: number;
}

export interface Module {
	id: string;
	title_pt: string;
	title_en: string;
	description_pt: string;
	difficulty: DifficultyLevel;
	icon: string; // Lucide icon name
	color: string; // Tailwind color class
	lessons: Lesson[];
	prerequisites?: string[]; // IDs de módulos anteriores necessários
	order: number;
	unitId: string; // Link to the Unit
}

export interface Unit {
	id: string;
	title: string;
	description: string;
	guidebookContent: string; // Markdown content for tips/rules
	order: number;
	difficulty: DifficultyLevel;
	sectionTitle?: string; // Optional: Defines if this unit starts a new section
}

export interface LearningPath {
	id: string;
	name_pt: string;
	name_en: string;
	description_pt: string;
	units: Unit[];
	modules: Module[];
}

const units: Unit[] = [
	{
		id: "unit-1",
		title: "Unidade 1: Primeiros Passos",
		description: "Comece sua jornada com o básico do inglês.",
		order: 1,
		difficulty: "basico",
		sectionTitle: "Seção 1: O Início da Jornada",
		guidebookContent: `
# Bem-vindo ao Inglês! 🚀

Parabéns por começar sua jornada! Nesta primeira unidade, vamos construir a base do seu conhecimento.

### 1. O Alfabeto e Pronúncia
O inglês tem sons únicos.
* **TH**: Coloque a ponta da língua entre os dentes e sopre (como em *think* e *the*).
* **R**: O "R" do inglês é enrolado, como o "R" caipira de "porta" (ex: *car*, *red*).
* **H**: No início das palavras, o "H" tem som de "R" fraco (ex: *house* soa como "rause").

### 2. O Poderoso Verbo "To Be"
Ele é o verbo mais importante e significa **ser** ou **estar**.
* **I am** (Eu sou / Eu estou)
* **You are** (Você é / Você está)
* **He/She/It is** (Ele/Ela/Isso é ou está)

### 3. Cognatos (Amigos Falsos e Verdadeiros)
Muitas palavras são parecidas com o português!
* **Verdadeiros**: *Banana*, *Music*, *Future*, *Different*.
* **Falsos**: *Push* (empurrar, não puxar!), *Lunch* (almoço, não lanche!).

### Dica de Ouro 💡
Não tenha medo de errar! O erro faz parte do aprendizado. Tente imitar os sons que você ouve nos exercícios de áudio.
    `,
	},
	{
		id: "unit-2",
		title: "Unidade 2: Conversas do Dia a Dia",
		description: "Aprenda a cumprimentar e ser educado.",
		order: 2,
		difficulty: "basico",
		guidebookContent: `
# Cultura e Educação 🤝

Nos países de língua inglesa, a polidez é essencial. Ser direto demais pode soar rude.

### Palavras Mágicas
Use estas palavras o tempo todo:
* **Please**: Por favor.
* **Thank you**: Obrigado(a).
* **Sorry**: Desculpe (para pedir perdão).
* **Excuse me**: Com licença (para chamar atenção ou passar).

### Small Talk (Conversa Fiada)
É comum conversar sobre o clima ou assuntos leves com estranhos.
* "Nice weather today, isn't it?" (Tempo bom hoje, não é?)

### Regra de Ouro: O Sujeito Obrigatório 👑
Em português, dizemos "Fui ao mercado" (sujeito oculto). Em inglês, **sempre** precisamos dizer quem fez a ação.
* Errado: Went to the market.
* Certo: **I** went to the market.

**Atenção:** "Está chovendo" vira "**It** is raining". O **It** é o sujeito neutro para coisas, animais e clima.
    `,
	},
	{
		id: "unit-3",
		title: "Unidade 3: Falando do Passado",
		description: "Conte histórias e descreva ações.",
		order: 3,
		difficulty: "basico",
		guidebookContent: `
# Passado e Presente ⏳

Para contar histórias, você precisa dominar o passado.

### Simple Past (Passado Simples)
Usado para ações que **já acabaram** e têm um tempo definido.
* I **watched** TV yesterday. (Eu assisti TV ontem).
* She **went** to the park. (Ela foi ao parque).

### Verbos Regulares (-ed)
A maioria dos verbos ganha **-ed** no final.
* Work -> Work**ed**
* Play -> Play**ed**

### Verbos Irregulares 🚨
Estes não seguem regras! Você precisa memorizá-los.
* Go -> **Went**
* Eat -> **Ate**
* Have -> **Had**

### Present Continuous (Gerúndio)
Para o que está acontecendo **agora**.
* Verb To Be + Verbo com **-ing**.
* I **am eating**. (Estou comendo).
    `,
	},
	{
		id: "unit-4",
		title: "Unidade 4: Viagem e Aventura",
		description: "Prepare-se para explorar o mundo.",
		order: 4,
		difficulty: "basico",
		sectionTitle: "Seção 2: Expandindo Horizontes",
		guidebookContent: `
# Inglês para Viagem ✈️

Viajar fica muito mais fácil quando você sabe o básico.

### Vocabulário Essencial
* **Passport**: Passaporte
* **Boarding Pass**: Cartão de embarque
* **Baggage Claim**: Restituição de bagagem (onde pega as malas)
* **Customs**: Alfândega

### No Restaurante 🍽️
* "I would like..." (Eu gostaria de...) - Muito mais educado que "I want".
* "Check, please." (A conta, por favor).

### Dica de Pronúncia
Em inglês, o "H" de "Hotel" é pronunciado (como "R"), mas o "H" de "Hour" é mudo!
    `,
	},
	{
		id: "unit-5",
		title: "Unidade 5: Conexões Temporais",
		description: "Domine os tempos perfeitos.",
		order: 5,
		difficulty: "intermediario",
		guidebookContent: `
# O Temido Present Perfect 😱

Calma! Ele não é um bicho de sete cabeças. O segredo é entender a **conexão** com o presente.

### Quando usar?
1. **Experiências de Vida:** Coisas que você fez, não importa quando.
   * "I **have been** to Disney." (Eu já fui pra Disney).
2. **Mudanças ao Longo do Tempo:**
   * "Your English **has improved**." (Seu inglês melhorou).
3. **Ações Recentes (com 'Just'):**
   * "I **have just** eaten." (Acabei de comer).

### Estrutura
* Sujeito + **Have/Has** + Verbo no **Particípio**.
* I **have finished**.
* She **has arrived**.
    `,
	},
	{
		id: "unit-6",
		title: "Unidade 6: Possibilidades",
		description: "O que aconteceria se...?",
		order: 6,
		difficulty: "intermediario",
		guidebookContent: `
# Condicionais (Os "Se...") 🤔

Usamos condicionais para falar de causas e consequências.

### Zero Conditional: Fatos
* "If you heat ice, it melts." (Se esquentar gelo, derrete).
* Estrutura: Presente + Presente.

### First Conditional: Planos Reais
* "If it rains, I will stay home." (Se chover, ficarei em casa).
* Estrutura: Presente + Futuro (Will).

### Second Conditional: Sonhos e Hipóteses
* "If I were rich, I would buy an island." (Se eu fosse rico, compraria uma ilha).
* Estrutura: Passado + Would.

**Nota Curiosa:** No Second Conditional, usamos "If I **were**" mesmo para I/He/She/It. É mais formal e correto!
    `,
	},
	{
		id: "unit-7",
		title: "Unidade 7: Estilo Formal",
		description: "Aprenda a Voz Passiva e Inglês de Negócios.",
		order: 7,
		difficulty: "intermediario",
		sectionTitle: "Seção 3: Rumo à Proficiência",
		guidebookContent: `
# Voz Passiva 🎭

Na voz passiva, o foco é na **ação** ou no **objeto**, não em quem fez.

* Ativa: "Somebody cleaned the room." (Alguém limpou o quarto).
* Passiva: "The room **was cleaned**." (O quarto foi limpo).

Usamos muito em notícias, relatórios e crimes ("The bank was robbed!").

# Inglês Corporativo (Business English) 💼
* **ASAP**: As Soon As Possible (O mais rápido possível).
* **FYI**: For Your Information (Para sua informação).
* **Meeting**: Reunião.
* **Deadline**: Prazo final.

Em emails, evite gírias. Use "Dear Mr./Ms." e termine com "Sincerely" ou "Best regards".
    `,
	},
	{
		id: "unit-8",
		title: "Unidade 8: Rumo à Fluência",
		description: "Gramática avançada e expressões nativas.",
		order: 8,
		difficulty: "avancado",
		guidebookContent: `
# Phrasal Verbs & Idioms 🤯

Para soar nativo, você precisa dessas expressões que não se traduzem ao pé da letra.

### Phrasal Verbs Comuns
* **Give up**: Desistir.
* **Look forward to**: Esperar ansiosamente por algo.
* **Run out of**: Ficar sem (algo). "We ran out of coffee!"

### Idioms (Expressões)
* **Piece of cake**: Algo muito fácil (Moleza).
* **Break a leg**: Boa sorte (usado em teatro/apresentações).
* **Cost an arm and a leg**: Custar muito caro (Os olhos da cara).
* **Under the weather**: Sentindo-se mal/doente.

**Conselho:** Não tente decorar listas gigantes. Aprenda em contexto!
    `,
	},
	{
		id: "unit-9",
		title: "Unidade 9: Domínio e Gírias",
		description: "Fale como um nativo: gírias, contrações e internet.",
		order: 9,
		difficulty: "avancado",
		guidebookContent: `
# Inglês Real e Informal 😎

Na rua e na internet, o inglês é diferente do livro.

### Reduções (Connected Speech)
* **Gonna** (Going to)
* **Wanna** (Want to)
* **Gotta** (Got to / Have to)
* **Dunno** (Don't know)

Exemplo: "I dunno what I'm gonna do." (Não sei o que vou fazer).

### Gírias de Internet
* **LOL**: Laughing Out Loud (Rindo muito).
* **BRB**: Be Right Back (Já volto).
* **IMO**: In My Opinion (Na minha opinião).
* **DM**: Direct Message (Mensagem direta).

Use isso com amigos, nunca com o chefe!
    `,
	},
	{
		id: "unit-10",
		title: "Unidade 10: Fluência Profissional",
		description: "Domine a arte da retórica e formalidade.",
		order: 10,
		difficulty: "avancado",
		sectionTitle: "Seção 4: Maestria",
		guidebookContent: `
# Nível Mestre: Sofisticação 🎩

Para debates, ensaios acadêmicos ou discursos, você precisa de ferramentas avançadas.

### Inversão Enfática
Em vez de dizer "I have never seen such a thing", diga:
* "**Never have I seen** such a thing."
Isso soa poético e dramático.

### O Subjuntivo
Em inglês, o subjuntivo é sutil, mas importante em situações formais.
* "I suggest that he **be** present." (Sugiro que ele esteja presente).
Note que usamos "be", não "is".

### Conectivos de Elite
* **Nevertheless**: No entanto/Mesmo assim.
* **Furthermore**: Além disso (formal).
* **Conversely**: Por outro lado.

Parabéns! Você tem as ferramentas para se expressar em qualquer nível. Continue praticando! 🏆
    `,
	},
	{
		id: "unit-11",
		title: "Unidade 11: Maestria da Nuance",
		description: "Use adjetivos precisos e descreva com detalhes.",
		order: 11,
		difficulty: "avancado",
		sectionTitle: "Seção 5: Fluência Total",
		guidebookContent: `
# O Poder da Precisão 🎯

Em níveis avançados, a diferença está nos detalhes.

### Adjetivos Precisos
Em vez de usar "very", use palavras mais fortes:
* Very happy -> **Elated / Thrilled**
* Very sad -> **Devastated**
* Very big -> **Massive / Colossal**
* Very small -> **Tiny / Miniscule**

### Nuances de Significado
* **Economic** (econômico, barato) vs **Economical** (econômico, que economiza).
* **Sensible** (sensato) vs **Sensitive** (sensível).

Dominar essas diferenças mostra que você tem controle total sobre o idioma.
    `,
	},
	{
		id: "unit-12",
		title: "Unidade 12: Retórica Profissional",
		description: "Argumentação, debate e persuasão.",
		order: 12,
		difficulty: "avancado",
		guidebookContent: `
# A Arte de Convencer 🗣️

Para persuadir, você precisa de estrutura e vocabulário específico.

### Estruturando Argumentos
* **To begin with...** (Para começar...)
* **Furthermore...** (Além disso...)
* **On the other hand...** (Por outro lado...)
* **In conclusion...** (Em conclusão...)

### Discordando Educadamente
* "I see your point, however..." (Entendo seu ponto, contudo...)
* "I beg to differ." (Ouso discordar - formal).
* "That's not entirely true." (Isso não é totalmente verdade).

Use essas estruturas para manter o debate civilizado e produtivo.
    `,
	},
	{
		id: "unit-13",
		title: "Unidade 13: Imersão Cultural",
		description: "Humor, sarcasmo e expressões complexas.",
		order: 13,
		difficulty: "avancado",
		guidebookContent: `
# Além das Palavras 🎭

Entender humor e sarcasmo é o teste final de fluência.

### Sarcasmo em Inglês
Muitas vezes, o tom de voz diz o oposto da frase.
* "Oh, great." (Pode significar "Que terrível" dependendo do tom).
* "Thanks a lot." (Muitas vezes usado ironicamente).

### Idiomas Culturais
* **To play devil's advocate**: Discutir o lado oposto só para testar o argumento.
* **To sit on the fence**: Não tomar partido, ficar indeciso.
* **The elephant in the room**: Um problema óbvio que ninguém quer discutir.

Preste atenção ao contexto!
    `,
	},
	{
		id: "unit-14",
		title: "Unidade 14: O Desafio Final",
		description: "O teste definitivo de proficiência C2.",
		order: 14,
		difficulty: "avancado",
		sectionTitle: "Seção 6: O Mestre PobreLingo",
		guidebookContent: `
# O Topo da Montanha 🏔️

Você chegou ao final. Aqui testamos tudo.

### Conselhos Finais
1. **Consistência**: A fluência se perde se não for usada.
2. **Imersão**: Leia livros, assista filmes sem legenda.
3. **Curiosidade**: Nunca pare de aprender novas palavras.

Você agora é parte da elite do PobreLingo. Vá e conquiste o mundo!
    `,
	},
	{
		id: "unit-15",
		title: "Unidade 15: Business Mastery",
		description: "Domine o inglês corporativo global.",
		order: 15,
		difficulty: "avancado",
		guidebookContent: `
# Business Mastery 💼

Bem-vindo ao nível executivo.

### Negociações
* **To reach a consensus**: Chegar a um consenso.
* **Win-win situation**: Situação onde todos ganham.
* **To drive a hard bargain**: Negociar com firmeza.

### Liderança
* **To spearhead**: Liderar (um projeto).
* **To delegate**: Delegar tarefas.
* **To empower**: Empoderar a equipe.
    `,
	},
];

export const curriculumData: LearningPath = {
	id: "english-mastery",
	name_pt: "Jornada de Domínio do Inglês",
	name_en: "English Mastery Journey",
	description_pt:
		"Um caminho estruturado do básico ao avançado para dominar o inglês",
	units: units,
	modules: [
		// ========== NÍVEL BÁSICO ==========
		// Unit 1
		{
			id: "foundations",
			unitId: "unit-1",
			title_pt: "Fundamentos do Inglês",
			title_en: "English Foundations",
			description_pt:
				"Comece sua jornada com os conceitos fundamentais da língua inglesa",
			difficulty: "basico",
			icon: "Rocket",
			color: "bg-blue-500",
			order: 1,
			lessons: [
				{
					id: "alphabet-pronunciation",
					title_pt: "Alfabeto e Pronúncia",
					title_en: "Alphabet and Pronunciation",
					description_pt: "Aprenda o alfabeto inglês e sons básicos",
					type: "vocabulary",
					estimatedMinutes: 15,
					xpReward: 50,
					vocabularyTopics: ["alphabet", "basic-sounds"],
					order: 1,
				},
				{
					id: "present-simple-intro",
					title_pt: "Introdução ao Present Simple",
					title_en: "Introduction to Present Simple",
					description_pt: "Aprenda o tempo verbal mais básico do inglês",
					type: "grammar",
					estimatedMinutes: 20,
					xpReward: 100,
					grammarRuleIds: ["present-simple"],
					order: 2,
				},
				{
					id: "basic-vocabulary",
					title_pt: "Vocabulário Essencial",
					title_en: "Essential Vocabulary",
					description_pt: "Palavras do dia a dia que você precisa conhecer",
					type: "vocabulary",
					estimatedMinutes: 25,
					xpReward: 75,
					vocabularyTopics: ["greetings", "numbers", "colors", "family"],
					order: 3,
				},
				{
					id: "pronunciation-intro",
					title_pt: "Pronúncia: Básico",
					title_en: "Pronunciation: Basics",
					description_pt: "Treine sua fala com frases simples",
					type: "speaking",
					estimatedMinutes: 15,
					xpReward: 100,
					speakingTopics: ["pronunciation-basics"],
					order: 4,
				},
				{
					id: "basic-pairs",
					title_pt: "Jogar: Pares de Palavras",
					title_en: "Play: Word Pairs",
					description_pt: "Combine palavras e significados (Jogo)",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 100,
					exerciseType: "matching-pairs",
					order: 4,
				},
				{
					id: "simple-sentences-practice",
					title_pt: "Prática: Frases Simples",
					title_en: "Practice: Simple Sentences",
					description_pt: "Monte suas primeiras frases em inglês",
					type: "exercise",
					estimatedMinutes: 15,
					xpReward: 100,
					exerciseType: "sentence-ordering",
					order: 6,
				},
				{
					id: "foundations-listening",
					title_pt: "Prática: Escuta",
					title_en: "Practice: Listening",
					description_pt: "Treine seu ouvido com frases simples",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 100,
					exerciseType: "listening",
					order: 7,
				},
				{
					id: "foundations-quiz",
					title_pt: "Quiz: Fundamentos",
					title_en: "Quiz: Foundations",
					description_pt: "Teste seus conhecimentos básicos",
					type: "quiz",
					estimatedMinutes: 10,
					xpReward: 150,
					order: 8,
				},
			],
		},
		{
			id: "ordering-food-module",
			unitId: "unit-2",
			title_pt: "Simulação: Restaurante",
			title_en: "Simulation: Restaurant",
			description_pt: "Peça sua comida",
			difficulty: "basico",
			icon: "MessageCircle",
			color: "bg-green-600",
			order: 3,
			lessons: [
				{
					id: "ordering-food-sim",
					title_pt: "Pedindo Comida",
					title_en: "Ordering Food",
					description_pt: "Não passe fome!",
					type: "exercise",
					estimatedMinutes: 15,
					xpReward: 150,
					exerciseType: "conversation",
					order: 1,
				},
			],
		},
		// NEW: Shopping Simulation in Unit 2
		{
			id: "shopping-module",
			unitId: "unit-2",
			title_pt: "Simulação: Compras",
			title_en: "Simulation: Shopping",
			description_pt: "Compre roupas e negocie preços.",
			difficulty: "basico",
			icon: "ShoppingBag",
			color: "bg-emerald-500",
			order: 4,
			lessons: [
				{
					id: "shopping-clothes",
					title_pt: "Comprando Roupas",
					title_en: "Buying Clothes",
					description_pt: "Escolha o tamanho certo.",
					type: "exercise",
					estimatedMinutes: 15,
					xpReward: 150,
					exerciseType: "conversation",
					order: 1,
				},
			],
		},
		// NEW GAME: Speed Match in Unit 4 (Review)
		{
			id: "unit4-game-speedmatch",
			unitId: "unit-4",
			title_pt: "Desafio: Speed Match",
			title_en: "Challenge: Speed Match",
			description_pt: "Combine rápido!",
			difficulty: "basico",
			icon: "Zap",
			color: "bg-yellow-600",
			order: 6,
			lessons: [
				{
					id: "unit4-speedmatch-lesson",
					title_pt: "Speed Match",
					title_en: "Speed Match",
					description_pt: "Teste seus reflexos.",
					type: "exercise",
					estimatedMinutes: 5,
					xpReward: 200,
					gameType: "speed-match",
					order: 1,
				},
			],
		},
		{
			id: "unit3-game-memory",
			unitId: "unit-3",
			title_pt: "Desafio: Memória",
			title_en: "Challenge: Memory Match",
			description_pt: "Encontre os pares!",
			difficulty: "basico",
			icon: "Gamepad2",
			color: "bg-purple-700",
			order: 5,
			lessons: [
				{
					id: "unit3-memory-lesson",
					title_pt: "Jogo da Memória",
					title_en: "Memory Match",
					description_pt: "Exercite sua mente.",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 100,
					gameType: "memory-match",
					order: 1,
				},
			],
		},
		// NEW: First Date (Social) in Unit 3
		{
			id: "dating-sim-module",
			unitId: "unit-3",
			title_pt: "Simulação: Encontro",
			title_en: "Simulation: First Date",
			description_pt: "Converse e cause uma boa impressão.",
			difficulty: "basico",
			icon: "Heart",
			color: "bg-pink-600",
			order: 6,
			lessons: [
				{
					id: "first-date",
					title_pt: "Primeiro Encontro",
					title_en: "First Date",
					description_pt: "Não seja estranho!",
					type: "exercise",
					estimatedMinutes: 15,
					xpReward: 150,
					exerciseType: "conversation",
					order: 1,
				},
			],
		},
		// NEW GAME: Speed Match in Unit 8 (Advanced Review)
		{
			id: "unit8-game-speedmatch",
			unitId: "unit-8",
			title_pt: "Desafio: Speed Match",
			title_en: "Challenge: Speed Match",
			description_pt: "Vocabulário Avançado",
			difficulty: "avancado",
			icon: "Zap",
			color: "bg-red-700",
			order: 6, // Placed after Idioms
			lessons: [
				{
					id: "unit8-speedmatch-lesson",
					title_pt: "Speed Match: Advanced",
					title_en: "Speed Match: Advanced",
					description_pt: "Teste seus reflexos com palavras difíceis.",
					type: "exercise",
					estimatedMinutes: 5,
					xpReward: 250,
					gameType: "speed-match",
					order: 1,
				},
			],
		},
		{
			id: "unit2-game-hangman",
			unitId: "unit-2",
			title_pt: "Desafio: Forca",
			title_en: "Challenge: Hangman",
			description_pt: "Salve o Pobrelingo!",
			difficulty: "basico",
			icon: "Gamepad2",
			color: "bg-green-600",
			order: 4,
			lessons: [
				{
					id: "unit2-hangman-lesson",
					title_pt: "Jogo da Forca",
					title_en: "Hangman",
					description_pt: "Adivinhe as palavras.",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 100,
					gameType: "hangman",
					order: 1,
				},
			],
		},
		// NEW GAME: Speed Match in Unit 12 (Mastery Review)
		{
			id: "unit12-game-speedmatch",
			unitId: "unit-12",
			title_pt: "Desafio: Mestre da Velocidade",
			title_en: "Challenge: Speed Master",
			description_pt: "Nível C2!",
			difficulty: "avancado",
			icon: "Zap",
			color: "bg-violet-800",
			order: 5,
			lessons: [
				{
					id: "unit12-speedmatch-lesson",
					title_pt: "Speed Match: Elite",
					title_en: "Speed Match: Elite",
					description_pt: "Apenas para os mestres.",
					type: "exercise",
					estimatedMinutes: 5,
					xpReward: 500,
					gameType: "speed-match",
					order: 1,
				},
			],
		},
		{
			id: "unit5-game-scramble",
			unitId: "unit-5",
			title_pt: "Desafio: Embaralhado",
			title_en: "Challenge: Word Scramble",
			description_pt: "Organize as letras!",
			difficulty: "intermediario",
			icon: "Gamepad2",
			color: "bg-orange-700",
			order: 6,
			lessons: [
				{
					id: "unit5-scramble-lesson",
					title_pt: "Word Scramble",
					title_en: "Word Scramble",
					description_pt: "Desembaralhe as palavras.",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 150,
					gameType: "word-scramble",
					order: 1,
				},
			],
		},
		{
			id: "unit4-game-sentencerush",
			unitId: "unit-4",
			title_pt: "Desafio: Frases Rápidas",
			title_en: "Challenge: Sentence Rush",
			description_pt: "Monte frases contra o tempo!",
			difficulty: "basico",
			icon: "Gamepad2",
			color: "bg-cyan-600",
			order: 5,
			lessons: [
				{
					id: "unit4-sentencerush-lesson",
					title_pt: "Corrida de Frases",
					title_en: "Sentence Rush",
					description_pt: "Seja rápido!",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 150,
					gameType: "sentence-rush",
					order: 1,
				},
			],
		},
		{
			id: "foundations-game-module",
			unitId: "unit-1",
			title_pt: "Desafio: Flashcards",
			title_en: "Challenge: Flashcards",
			description_pt: "Teste sua memória!",
			difficulty: "basico",
			icon: "Gamepad2",
			color: "bg-yellow-500",
			order: 2,
			lessons: [
				{
					id: "foundations-flashcards-lesson",
					title_pt: "Flashcards",
					title_en: "Flashcards",
					description_pt: "Memorize as palavras.",
					type: "exercise",
					estimatedMinutes: 5,
					xpReward: 50,
					gameType: "flashcards",
					order: 1,
				},
			],
		},
		{
			id: "foundations-game-bubble",
			unitId: "unit-1",
			title_pt: "Desafio: Bolhas",
			title_en: "Challenge: Bubbles",
			description_pt: "Estoure as bolhas!",
			difficulty: "basico",
			icon: "Gamepad2",
			color: "bg-sky-500",
			order: 3,
			lessons: [
				{
					id: "foundations-bubble-lesson",
					title_pt: "Bubble Pop",
					title_en: "Bubble Pop",
					description_pt: "Combine cores e números.",
					type: "exercise",
					estimatedMinutes: 5,
					xpReward: 100,
					gameType: "bubble-pop",
					order: 1,
				},
			],
		},
		// Unit 2
		{
			id: "culture-tips-basic",
			unitId: "unit-2",
			title_pt: "Dicas Culturais & Normas",
			title_en: "Culture Tips & Norms",
			description_pt: "Entenda como os nativos realmente pensam e agem",
			difficulty: "basico",
			icon: "Globe",
			color: "bg-teal-500",
			order: 2,
			lessons: [
				{
					id: "tipping-culture",
					title_pt: "Cultura de Gorjetas",
					title_en: "Tipping Culture",
					description_pt: "Como funcionam as gorjetas nos EUA e UK",
					type: "culture",
					estimatedMinutes: 10,
					xpReward: 50,
					order: 1,
				},
				{
					id: "politeness-levels",
					title_pt: "Níveis de Polidez",
					title_en: "Levels of Politeness",
					description_pt:
						"Como ser educado em inglês (Please, Thank you, Sorry)",
					type: "vocabulary",
					estimatedMinutes: 15,
					xpReward: 75,
					vocabularyTopics: ["politeness"],
					order: 2,
				},
			],
		},
		{
			id: "daily-conversations",
			unitId: "unit-2",
			title_pt: "Conversações do Dia a Dia",
			title_en: "Daily Conversations",
			description_pt: "Aprenda a se comunicar em situações cotidianas",
			difficulty: "basico",
			icon: "MessageCircle",
			color: "bg-green-500",
			order: 3,
			prerequisites: ["foundations"],
			lessons: [
				{
					id: "greetings-introductions",
					title_pt: "Saudações e Apresentações",
					title_en: "Greetings and Introductions",
					description_pt: "Como cumprimentar e se apresentar",
					type: "vocabulary",
					estimatedMinutes: 20,
					xpReward: 75,
					vocabularyTopics: ["greetings", "introductions"],
					order: 1,
				},
				{
					id: "questions-basics",
					title_pt: "Perguntas Básicas",
					title_en: "Basic Questions",
					description_pt: "Aprenda a fazer e responder perguntas simples",
					type: "grammar",
					estimatedMinutes: 25,
					xpReward: 100,
					grammarRuleIds: ["question-words", "yes-no-questions"],
					order: 2,
				},
				{
					id: "conversation-practice",
					title_pt: "Prática: Diálogos",
					title_en: "Practice: Dialogues",
					description_pt: "Pratique uma conversa real com o PobreLingo",
					type: "exercise",
					estimatedMinutes: 20,
					xpReward: 125,
					exerciseType: "conversation",
					order: 3,
				},
				{
					id: "conversations-quiz",
					title_pt: "Quiz: Conversações",
					title_en: "Quiz: Conversations",
					description_pt: "Avalie seu progresso em conversações",
					type: "quiz",
					estimatedMinutes: 15,
					xpReward: 150,
					order: 4,
				},
			],
		},
		{
			id: "unit5-game-flashcards",
			unitId: "unit-5",
			title_pt: "Desafio: Flashcards",
			title_en: "Challenge: Flashcards",
			description_pt: "Vocabulário Avançado",
			difficulty: "intermediario",
			icon: "Gamepad2",
			color: "bg-orange-600",
			order: 5,
			lessons: [
				{
					id: "unit5-flashcards-lesson",
					title_pt: "Flashcards",
					title_en: "Flashcards",
					description_pt: "Memorize verbos.",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 100,
					gameType: "flashcards",
					order: 1,
				},
			],
		},
		{
			id: "unit3-game-wordsearch",
			unitId: "unit-3",
			title_pt: "Desafio: Caça-Palavras",
			title_en: "Challenge: Word Search",
			description_pt: "Encontre os verbos!",
			difficulty: "basico",
			icon: "Gamepad2",
			color: "bg-purple-600",
			order: 4,
			lessons: [
				{
					id: "unit3-wordsearch-lesson",
					title_pt: "Caça-Palavras",
					title_en: "Word Search",
					description_pt: "Encontre as palavras escondidas.",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 100,
					gameType: "word-search",
					order: 1,
				},
			],
		},
		// Unit 3
		{
			id: "past-present",
			unitId: "unit-3",
			title_pt: "Passado e Presente",
			title_en: "Past and Present",
			description_pt: "Domine os tempos verbais essenciais",
			difficulty: "basico",
			icon: "Clock",
			color: "bg-purple-500",
			order: 3,
			prerequisites: ["daily-conversations"],
			lessons: [
				{
					id: "past-simple-intro",
					title_pt: "Past Simple",
					title_en: "Past Simple",
					description_pt: "Fale sobre o passado com confiança",
					type: "grammar",
					estimatedMinutes: 30,
					xpReward: 100,
					grammarRuleIds: ["past-simple"],
					order: 1,
				},
				{
					id: "present-continuous-intro",
					title_pt: "Present Continuous",
					title_en: "Present Continuous",
					description_pt: "Descreva ações em andamento",
					type: "grammar",
					estimatedMinutes: 25,
					xpReward: 100,
					grammarRuleIds: ["present-continuous"],
					order: 2,
				},
				{
					id: "tense-comparison",
					title_pt: "Comparando Tempos Verbais",
					title_en: "Comparing Tenses",
					description_pt: "Entenda quando usar cada tempo verbal",
					type: "grammar",
					estimatedMinutes: 20,
					xpReward: 75,
					grammarRuleIds: [
						"present-simple",
						"past-simple",
						"present-continuous",
					],
					order: 3,
				},
				{
					id: "tenses-practice",
					title_pt: "Prática: Tempos Verbais",
					title_en: "Practice: Verb Tenses",
					description_pt: "Encontre erros em frases com diferentes tempos",
					type: "exercise",
					estimatedMinutes: 25,
					xpReward: 150,
					exerciseType: "find-incorrect-words",
					order: 4,
				},
				{
					id: "tenses-quiz",
					title_pt: "Quiz: Tempos Verbais",
					title_en: "Quiz: Verb Tenses",
					description_pt: "Teste seu domínio dos tempos verbais",
					type: "quiz",
					estimatedMinutes: 15,
					xpReward: 175,
					order: 5,
				},
			],
		},

		// ========== TRAVEL & BASICS ==========
		// Unit 4
		{
			id: "travel-basics",
			unitId: "unit-4",
			title_pt: "Inglês para Viagem",
			title_en: "Travel English",
			description_pt: "Vocabulário e frases essenciais para viajar",
			difficulty: "basico",
			icon: "Plane",
			color: "bg-cyan-500",
			order: 4,
			prerequisites: ["past-present"],
			lessons: [
				{
					id: "airport-vocabulary",
					title_pt: "No Aeroporto",
					title_en: "At the Airport",
					description_pt: "Check-in, segurança e embarque",
					type: "vocabulary",
					estimatedMinutes: 20,
					xpReward: 80,
					vocabularyTopics: ["airport", "travel-documents"],
					order: 1,
				},
				{
					id: "hotel-checkin",
					title_pt: "No Hotel",
					title_en: "At the Hotel",
					description_pt: "Fazendo check-in e pedindo serviços",
					type: "vocabulary",
					estimatedMinutes: 20,
					xpReward: 80,
					vocabularyTopics: ["hotel"],
					order: 2,
				},
				{
					id: "directions",
					title_pt: "Pedindo Informações",
					title_en: "Asking for Directions",
					description_pt: "Como chegar onde você quer",
					type: "exercise",
					estimatedMinutes: 15,
					xpReward: 100,
					exerciseType: "listening",
					order: 3,
				},
				{
					id: "travel-etiquette",
					title_pt: "Etiqueta de Viagem",
					title_en: "Travel Etiquette",
					description_pt: "Regras sociais e gorjetas no exterior",
					type: "culture",
					estimatedMinutes: 15,
					xpReward: 100,
					order: 4,
				},
			],
		},
		{
			id: "travel-conversation-module",
			unitId: "unit-4",
			title_pt: "Simulação: Aeroporto",
			title_en: "Simulation: Airport",
			description_pt: "Pratique o check-in",
			difficulty: "basico",
			icon: "MessageCircle",
			color: "bg-cyan-600",
			order: 4,
			lessons: [
				{
					id: "airport-checkin-sim",
					title_pt: "Check-in no Aeroporto",
					title_en: "Airport Check-in",
					description_pt: "Fale com o agente",
					type: "exercise",
					estimatedMinutes: 15,
					xpReward: 150,
					exerciseType: "conversation",
					order: 1,
				},
			],
		},
		// NEW: Doctor Appointment in Unit 4
		{
			id: "doctor-module",
			unitId: "unit-4",
			title_pt: "Simulação: Médico",
			title_en: "Simulation: Doctor",
			description_pt: "Emergência médica no exterior.",
			difficulty: "basico",
			icon: "Activity",
			color: "bg-red-500",
			order: 5,
			lessons: [
				{
					id: "doctor-appointment",
					title_pt: "Consulta Médica",
					title_en: "Doctor Appointment",
					description_pt: "Descreva seus sintomas.",
					type: "exercise",
					estimatedMinutes: 15,
					xpReward: 150,
					exerciseType: "conversation",
					order: 1,
				},
			],
		},
		// ========== NÍVEL INTERMEDIÁRIO ==========
		// Unit 5
		{
			id: "perfect-tenses",
			unitId: "unit-5",
			title_pt: "Tempos Perfeitos",
			title_en: "Perfect Tenses",
			description_pt: "Avance com os tempos verbais perfeitos",
			difficulty: "intermediario",
			icon: "Award",
			color: "bg-orange-500",
			order: 4,
			prerequisites: ["past-present"],
			lessons: [
				{
					id: "present-perfect-intro",
					title_pt: "Present Perfect",
					title_en: "Present Perfect",
					description_pt: "Conecte o passado com o presente",
					type: "grammar",
					estimatedMinutes: 30,
					xpReward: 125,
					grammarRuleIds: ["present-perfect"],
					order: 1,
				},
				{
					id: "past-perfect-intro",
					title_pt: "Past Perfect",
					title_en: "Past Perfect",
					description_pt: "Fale sobre ações antes de outras no passado",
					type: "grammar",
					estimatedMinutes: 30,
					xpReward: 125,
					grammarRuleIds: ["past-perfect"],
					order: 2,
				},
				{
					id: "perfect-vs-simple",
					title_pt: "Perfect vs Simple",
					title_en: "Perfect vs Simple",
					description_pt: "Entenda as diferenças sutis",
					type: "grammar",
					estimatedMinutes: 25,
					xpReward: 100,
					order: 3,
				},
				{
					id: "perfect-tenses-practice",
					title_pt: "Prática: Tempos Perfeitos",
					title_en: "Practice: Perfect Tenses",
					description_pt: "Aplique seu conhecimento em exercícios",
					type: "exercise",
					estimatedMinutes: 30,
					xpReward: 175,
					exerciseType: "sentence-identification",
					order: 4,
				},
				{
					id: "perfect-reading",
					title_pt: "Leitura: Experiências de Vida",
					title_en: "Reading: Life Experiences",
					description_pt: "Leia textos que usam tempos perfeitos",
					type: "reading",
					estimatedMinutes: 25,
					xpReward: 150,
					exerciseType: "news-comprehension",
					order: 5,
				},
			],
		},
		// Unit 6
		{
			id: "conditionals",
			unitId: "unit-6",
			title_pt: "Condicionais",
			title_en: "Conditionals",
			description_pt: "Expresse possibilidades e hipóteses",
			difficulty: "intermediario",
			icon: "GitBranch",
			color: "bg-cyan-500",
			order: 5,
			prerequisites: ["perfect-tenses"],
			lessons: [
				{
					id: "zero-first-conditional",
					title_pt: "Zero e First Conditional",
					title_en: "Zero and First Conditional",
					description_pt: "Situações reais e prováveis",
					type: "grammar",
					estimatedMinutes: 30,
					xpReward: 125,
					grammarRuleIds: ["zero-conditional", "first-conditional"],
					order: 1,
				},
				{
					id: "second-conditional",
					title_pt: "Second Conditional",
					title_en: "Second Conditional",
					description_pt: "Situações hipotéticas no presente",
					type: "grammar",
					estimatedMinutes: 30,
					xpReward: 125,
					grammarRuleIds: ["second-conditional"],
					order: 2,
				},
				{
					id: "third-conditional",
					title_pt: "Third Conditional",
					title_en: "Third Conditional",
					description_pt: "Situações hipotéticas no passado",
					type: "grammar",
					estimatedMinutes: 30,
					xpReward: 125,
					grammarRuleIds: ["third-conditional"],
					order: 3,
				},
				{
					id: "conditionals-practice",
					title_pt: "Prática: Condicionais",
					title_en: "Practice: Conditionals",
					description_pt: "Domine as estruturas condicionais",
					type: "exercise",
					estimatedMinutes: 35,
					xpReward: 200,
					exerciseType: "find-incorrect-words",
					order: 4,
				},
			],
		},
		{
			id: "unit6-game-wordsearch",
			unitId: "unit-6",
			title_pt: "Desafio: Caça-Palavras",
			title_en: "Challenge: Word Search",
			description_pt: "Encontre as palavras condicionais",
			difficulty: "intermediario",
			icon: "Gamepad2",
			color: "bg-cyan-600",
			order: 3,
			lessons: [
				{
					id: "unit6-wordsearch-lesson",
					title_pt: "Caça-Palavras",
					title_en: "Word Search",
					description_pt: "Divirta-se!",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 150,
					gameType: "word-search",
					order: 1,
				},
			],
		},
		// Unit 7
		{
			id: "passive-voice",
			unitId: "unit-7",
			title_pt: "Voz Passiva",
			title_en: "Passive Voice",
			description_pt: "Aprenda a usar a voz passiva em diferentes contextos",
			difficulty: "intermediario",
			icon: "Repeat",
			color: "bg-pink-500",
			order: 6,
			prerequisites: ["conditionals"],
			lessons: [
				{
					id: "passive-basics",
					title_pt: "Introdução à Voz Passiva",
					title_en: "Introduction to Passive Voice",
					description_pt: "Entenda a estrutura básica",
					type: "grammar",
					estimatedMinutes: 30,
					xpReward: 125,
					grammarRuleIds: ["passive-voice"],
					order: 1,
				},
				{
					id: "passive-tenses",
					title_pt: "Voz Passiva em Diferentes Tempos",
					title_en: "Passive Voice in Different Tenses",
					description_pt: "Use a passiva em vários tempos verbais",
					type: "grammar",
					estimatedMinutes: 35,
					xpReward: 150,
					order: 2,
				},
				{
					id: "active-passive-conversion",
					title_pt: "Convertendo Voz Ativa e Passiva",
					title_en: "Converting Active and Passive Voice",
					description_pt: "Pratique conversões entre vozes",
					type: "exercise",
					estimatedMinutes: 30,
					xpReward: 175,
					exerciseType: "sentence-ordering",
					order: 3,
				},

				{
					id: "passive-reading",
					title_pt: "Leitura: Textos Formais",
					title_en: "Reading: Formal Texts",
					description_pt: "Leia textos que usam voz passiva",
					type: "reading",
					estimatedMinutes: 25,
					xpReward: 150,
					exerciseType: "news-comprehension",
					order: 4,
				},
			],
		},
		{
			id: "unit7-game-wordsearch",
			unitId: "unit-7",
			title_pt: "Desafio: Caça-Palavras",
			title_en: "Challenge: Word Search",
			description_pt: "Vocabulário de Negócios",
			difficulty: "intermediario",
			icon: "Gamepad2",
			color: "bg-slate-600",
			order: 3,
			lessons: [
				{
					id: "unit7-wordsearch-lesson",
					title_pt: "Caça-Palavras",
					title_en: "Word Search",
					description_pt: "Encontre as palavras.",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 100,
					gameType: "word-search",
					order: 1,
				},
			],
		},
		{
			id: "business-english",
			unitId: "unit-7",
			title_pt: "Inglês para Negócios",
			title_en: "Business English",
			description_pt: "Vocabulário e situações do mundo corporativo",
			difficulty: "intermediario",
			icon: "Briefcase",
			color: "bg-slate-500",
			order: 7,
			prerequisites: ["passive-voice"],
			lessons: [
				{
					id: "emails",
					title_pt: "Emails Profissionais",
					title_en: "Professional Emails",
					description_pt: "Como escrever emails formais",
					type: "vocabulary",
					estimatedMinutes: 25,
					xpReward: 100,
					vocabularyTopics: ["business-writing"],
					order: 1,
				},
				{
					id: "meetings",
					title_pt: "Reuniões",
					title_en: "Meetings",
					description_pt: "Vocabulário para participar de reuniões",
					type: "exercise",
					estimatedMinutes: 20,
					xpReward: 100,
					exerciseType: "listening",
					order: 2,
				},
				{
					id: "presentations",
					title_pt: "Apresentações",
					title_en: "Presentations",
					description_pt: "Dicas para apresentar em inglês",
					type: "reading",
					estimatedMinutes: 30,
					xpReward: 120,
					exerciseType: "news-comprehension",
					order: 3,
				},
				{
					id: "presentation-speaking",
					title_pt: "Discurso: Apresentações",
					title_en: "Speaking: Presentations",
					description_pt: "Treine frases para apresentações profissionais",
					type: "speaking",
					estimatedMinutes: 20,
					xpReward: 150,
					speakingTopics: ["presentation-phrases"],
					order: 4,
				},
			],
		},
		{
			id: "job-interview-module",
			unitId: "unit-7",
			title_pt: "Simulação: Entrevista",
			title_en: "Simulation: Job Interview",
			description_pt: "Pratique para sua entrevista",
			difficulty: "intermediario",
			icon: "Briefcase",
			color: "bg-slate-700",
			order: 8,
			lessons: [
				{
					id: "job-interview-sim-mid",
					title_pt: "Entrevista de Emprego",
					title_en: "Job Interview",
					description_pt: "Responda com confiança",
					type: "exercise",
					estimatedMinutes: 20,
					xpReward: 200,
					exerciseType: "conversation",
					order: 1,
				},
			],
		},

		// ========== NÍVEL AVANÇADO ==========
		// Unit 8
		{
			id: "advanced-grammar",
			unitId: "unit-8",
			title_pt: "Gramática Avançada",
			title_en: "Advanced Grammar",
			description_pt: "Estruturas gramaticais complexas e sofisticadas",
			difficulty: "avancado",
			icon: "Brain",
			color: "bg-red-500",
			order: 7,
			prerequisites: ["passive-voice"],
			lessons: [
				{
					id: "reported-speech",
					title_pt: "Discurso Indireto",
					title_en: "Reported Speech",
					description_pt: "Relate o que outros disseram",
					type: "grammar",
					estimatedMinutes: 35,
					xpReward: 150,
					grammarRuleIds: ["reported-speech"],
					order: 1,
				},
				{
					id: "modal-verbs-advanced",
					title_pt: "Verbos Modais Avançados",
					title_en: "Advanced Modal Verbs",
					description_pt: "Nuances dos verbos modais",
					type: "grammar",
					estimatedMinutes: 35,
					xpReward: 150,
					grammarRuleIds: ["modals"],
					order: 2,
				},
				{
					id: "relative-clauses",
					title_pt: "Orações Relativas",
					title_en: "Relative Clauses",
					description_pt: "Conecte ideias com cláusulas relativas",
					type: "grammar",
					estimatedMinutes: 35,
					xpReward: 150,
					grammarRuleIds: ["relative-clauses"],
					order: 3,
				},

				{
					id: "advanced-grammar-practice",
					title_pt: "Prática: Gramática Avançada",
					title_en: "Practice: Advanced Grammar",
					description_pt: "Exercícios complexos de gramática",
					type: "exercise",
					estimatedMinutes: 40,
					xpReward: 225,
					exerciseType: "find-incorrect-words",
					order: 4,
				},
			],
		},
		{
			id: "unit8-game-sentencerush",
			unitId: "unit-8",
			title_pt: "Desafio: Frases Rápidas",
			title_en: "Challenge: Sentence Rush",
			description_pt: "Gramática Avançada",
			difficulty: "avancado",
			icon: "Gamepad2",
			color: "bg-red-600",
			order: 3,
			lessons: [
				{
					id: "unit8-sentencerush-lesson",
					title_pt: "Corrida de Frases",
					title_en: "Sentence Rush",
					description_pt: "Seja rápido!",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 200,
					gameType: "sentence-rush",
					order: 1,
				},
			],
		},
		{
			id: "idiomatic-expressions",
			unitId: "unit-8",
			title_pt: "Expressões Idiomáticas",
			title_en: "Idiomatic Expressions",
			description_pt: "Fale como um nativo com expressões idiomáticas",
			difficulty: "avancado",
			icon: "Sparkles",
			color: "bg-yellow-500",
			order: 8,
			prerequisites: ["advanced-grammar"],
			lessons: [
				{
					id: "common-idioms",
					title_pt: "Idiomas Comuns",
					title_en: "Common Idioms",
					description_pt: "Expressões do dia a dia",
					type: "vocabulary",
					estimatedMinutes: 30,
					xpReward: 150,
					vocabularyTopics: ["idioms-common"],
					order: 1,
				},
				{
					id: "phrasal-verbs-advanced",
					title_pt: "Phrasal Verbs Avançados",
					title_en: "Advanced Phrasal Verbs",
					description_pt: "Domine phrasal verbs complexos",
					type: "vocabulary",
					estimatedMinutes: 35,
					xpReward: 150,
					vocabularyTopics: ["phrasal-verbs-advanced"],
					order: 2,
				},
				{
					id: "colloquialisms",
					title_pt: "Coloquialismos",
					title_en: "Colloquialisms",
					description_pt: "Linguagem informal e gírias",
					type: "vocabulary",
					estimatedMinutes: 30,
					xpReward: 150,
					vocabularyTopics: ["slang", "colloquialisms"],
					order: 3,
				},
				{
					id: "idioms-practice",
					title_pt: "Prática: Expressões Idiomáticas",
					title_en: "Practice: Idiomatic Expressions",
					description_pt: "Use expressões em contexto",
					type: "exercise",
					estimatedMinutes: 30,
					xpReward: 200,
					exerciseType: "sentence-identification",
					order: 4,
				},
			],
		},
		{
			id: "advanced-reading",
			unitId: "unit-8",
			title_pt: "Leitura Avançada",
			title_en: "Advanced Reading",
			description_pt: "Compreenda textos complexos e literários",
			difficulty: "avancado",
			icon: "BookOpen",
			color: "bg-indigo-500",
			order: 9,
			prerequisites: ["idiomatic-expressions"],
			lessons: [
				{
					id: "literary-texts",
					title_pt: "Textos Literários",
					title_en: "Literary Texts",
					description_pt: "Analise literatura em inglês",
					type: "reading",
					estimatedMinutes: 40,
					xpReward: 200,
					exerciseType: "news-comprehension",
					order: 1,
				},
				{
					id: "academic-writing",
					title_pt: "Escrita Acadêmica",
					title_en: "Academic Writing",
					description_pt: "Entenda textos acadêmicos",
					type: "reading",
					estimatedMinutes: 40,
					xpReward: 200,
					exerciseType: "news-comprehension",
					order: 2,
				},
				{
					id: "critical-analysis",
					title_pt: "Análise Crítica",
					title_en: "Critical Analysis",
					description_pt: "Desenvolva pensamento crítico em inglês",
					type: "reading",
					estimatedMinutes: 45,
					xpReward: 225,
					exerciseType: "news-comprehension",
					order: 3,
				},
				{
					id: "mastery-quiz",
					title_pt: "Quiz Final: Domínio do Inglês",
					title_en: "Final Quiz: English Mastery",
					description_pt: "Teste completo de todos os níveis",
					type: "quiz",
					estimatedMinutes: 45,
					xpReward: 500,
					order: 4,
				},
			],
		},
		// ========== Unit 9 ==========
		{
			id: "native-speech",
			unitId: "unit-9",
			title_pt: "Fala Nativa",
			title_en: "Native Speech",
			description_pt: "Entenda como os nativos realmente falam (Gonna, Wanna)",
			difficulty: "avancado",
			icon: "Mic",
			color: "bg-rose-500",
			order: 10,
			prerequisites: ["advanced-reading"],
			lessons: [
				{
					id: "informal-contractions-lesson",
					title_pt: "Contrações Informais",
					title_en: "Informal Contractions",
					description_pt: "Aprenda Gonna, Wanna, Gotta e mais",
					type: "grammar",
					estimatedMinutes: 20,
					xpReward: 150,
					grammarRuleIds: ["informal-contractions"],
					order: 1,
				},
				{
					id: "listening-native-speed",
					title_pt: "Listening: Velocidade Real",
					title_en: "Listening: Real Speed",
					description_pt: "Tente entender frases faladas rapidamente",
					type: "exercise",
					estimatedMinutes: 25,
					xpReward: 200,
					exerciseType: "listening",
					order: 2,
				},
			],
		},
		{
			id: "unit9-game-sentencerush",
			unitId: "unit-9",
			title_pt: "Desafio: Frases Rápidas",
			title_en: "Challenge: Sentence Rush",
			description_pt: "Velocidade Nativa!",
			difficulty: "avancado",
			icon: "Gamepad2",
			color: "bg-rose-600",
			order: 3,
			lessons: [
				{
					id: "unit9-sentencerush-lesson",
					title_pt: "Corrida de Frases",
					title_en: "Sentence Rush",
					description_pt: "Seja rápido como um nativo!",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 200,
					gameType: "sentence-rush",
					order: 1,
				},
			],
		},
		{
			id: "internet-culture",
			unitId: "unit-9",
			title_pt: "Cultura da Internet",
			title_en: "Internet Culture",
			description_pt: "Gírias e abreviações do mundo digital",
			difficulty: "avancado",
			icon: "Smartphone",
			color: "bg-indigo-600",
			order: 11,
			prerequisites: ["native-speech"],
			lessons: [
				{
					id: "internet-slang-lesson",
					title_pt: "Gírias de Internet",
					title_en: "Internet Slang",
					description_pt: "LOL, BRB, IDK e outras siglas",
					type: "grammar",
					estimatedMinutes: 15,
					xpReward: 100,
					grammarRuleIds: ["slang-internet"],
					order: 1,
				},
				{
					id: "social-media-reading",
					title_pt: "Lendo Redes Sociais",
					title_en: "Reading Social Media",
					description_pt: "Interprete posts e comentários reais",
					type: "reading",
					estimatedMinutes: 20,
					xpReward: 150,
					exerciseType: "news-comprehension",
					order: 2,
				},
				{
					id: "internet-bubble-challenge",
					title_pt: "Desafio Viral: Bolhas",
					title_en: "Viral Challenge: Bubbles",
					description_pt: "Teste seu vocabulário de internet!",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 200,
					gameType: "bubble-pop",
					vocabularyTopics: ["internet-slang"],
					order: 3,
				},
				{
					id: "ultimate-challenge",
					title_pt: "Desafio Supremo",
					title_en: "Ultimate Challenge",
					description_pt: "O teste final para se tornar um mestre PobreLingo",
					type: "quiz",
					estimatedMinutes: 60,
					xpReward: 1000,
					order: 3,
				},
			],
		},
		// ========== Unit 10 ==========
		{
			id: "professional-fluency",
			unitId: "unit-10",
			title_pt: "Fluência Profissional",
			title_en: "Professional Fluency",
			description_pt:
				"Domine estruturas formais e nuance para o ambiente de trabalho e acadêmico.",
			difficulty: "avancado",
			icon: "Briefcase",
			color: "bg-emerald-600",
			order: 12,
			prerequisites: ["internet-culture"],
			lessons: [
				{
					id: "subjunctive-lesson",
					title_pt: "Modo Subjuntivo",
					title_en: "Subjunctive Mood",
					description_pt: "Aprenda a fazer sugestões e demandas formais",
					type: "grammar",
					estimatedMinutes: 25,
					xpReward: 150,
					grammarRuleIds: ["subjunctive-mood"],
					order: 1,
				},
				{
					id: "inversion-lesson",
					title_pt: "Inversão para Ênfase",
					title_en: "Inversion for Emphasis",
					description_pt: "Estruturas sofisticadas para discursos e escrita",
					type: "grammar",
					estimatedMinutes: 25,
					xpReward: 150,
					grammarRuleIds: ["inversion-emphasis"],
					order: 2,
				},
				{
					id: "debate-vocabulary",
					title_pt: "Vocabulário de Debate",
					title_en: "Debate Vocabulary",
					description_pt: "Palavras para argumentar e persuadir",
					type: "vocabulary",
					estimatedMinutes: 30,
					xpReward: 150,
					vocabularyTopics: ["debate", "persuasion"],
					order: 3,
				},
				{
					id: "fluency-challenge",
					title_pt: "Desafio de Fluência",
					title_en: "Fluency Challenge",
					description_pt: "Prove que você é fluente",
					type: "quiz",
					estimatedMinutes: 45,
					xpReward: 1000,
					order: 4,
				},
			],
		},
		// NEW: Unit 10 Boss - Word Scramble
		{
			id: "unit10-game-scramble",
			unitId: "unit-10",
			title_pt: "Desafio: Embaralhado",
			title_en: "Challenge: Word Scramble",
			description_pt: "Ordene as palavras.",
			difficulty: "avancado",
			icon: "Gamepad2",
			color: "bg-emerald-700",
			order: 5,
			lessons: [
				{
					id: "unit10-scramble-lesson",
					title_pt: "Word Scramble",
					title_en: "Word Scramble",
					description_pt: "Desembaralhe as palavras.",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 200,
					gameType: "word-scramble",
					order: 1,
				},
			],
		},
		// ========== Unit 11 ==========
		{
			id: "nuance-mastery",
			unitId: "unit-11",
			title_pt: "Maestria da Nuance",
			title_en: "Nuance Mastery",
			description_pt: "Vocabulário preciso e descrições detalhadas",
			difficulty: "avancado",
			icon: "Feather",
			color: "bg-fuchsia-600",
			order: 13,
			prerequisites: ["professional-fluency"],
			lessons: [
				{
					id: "advanced-adjectives",
					title_pt: "Adjetivos Sofisticados",
					title_en: "Sophisticated Adjectives",
					description_pt: "Pragmático, efêmero, meticuloso...",
					type: "vocabulary",
					estimatedMinutes: 30,
					xpReward: 200,
					vocabularyTopics: ["advanced-adjectives"],
					order: 1,
				},
				{
					id: "descriptive-writing",
					title_pt: "Escrita Descritiva",
					title_en: "Descriptive Writing",
					description_pt: "Melhore seus textos com detalhes",
					type: "reading",
					estimatedMinutes: 35,
					xpReward: 200,
					exerciseType: "news-comprehension",
					order: 2,
				},
				{
					id: "nuance-quiz",
					title_pt: "Quiz de Nuance",
					title_en: "Nuance Quiz",
					description_pt: "Teste sua precisão",
					type: "quiz",
					estimatedMinutes: 25,
					xpReward: 250,
					order: 3,
				},
			],
		},
		// NEW: Unit 11 Boss - Speed Match
		{
			id: "unit11-game-speedmatch",
			unitId: "unit-11",
			title_pt: "Desafio: Speed Match",
			title_en: "Challenge: Speed Match",
			description_pt: "Combine adjetivos complexos.",
			difficulty: "avancado",
			icon: "Zap",
			color: "bg-fuchsia-700",
			order: 4,
			lessons: [
				{
					id: "unit11-speedmatch-lesson",
					title_pt: "Speed Match",
					title_en: "Speed Match",
					description_pt: "Teste seus reflexos.",
					type: "exercise",
					estimatedMinutes: 5,
					xpReward: 250,
					gameType: "speed-match",
					order: 1,
				},
			],
		},
		// ========== Unit 12 ==========
		{
			id: "rhetoric-debate",
			unitId: "unit-12",
			title_pt: "Retórica e Debate",
			title_en: "Rhetoric and Debate",
			description_pt: "Argumentação lógica e persuasão",
			difficulty: "avancado",
			icon: "Mic2",
			color: "bg-violet-700",
			order: 14,
			prerequisites: ["nuance-mastery"],
			lessons: [
				{
					id: "persuasive-language",
					title_pt: "Linguagem Persuasiva",
					title_en: "Persuasive Language",
					description_pt: "Palavras que convencem",
					type: "vocabulary",
					estimatedMinutes: 30,
					xpReward: 200,
					order: 1,
				},
				{
					id: "debate-structure",
					title_pt: "Estrutura de Debate",
					title_en: "Debate Structure",
					description_pt: "Como organizar seus argumentos",
					type: "grammar",
					estimatedMinutes: 30,
					xpReward: 200,
					grammarRuleIds: ["inversion-emphasis"],
					order: 2,
				},
				{
					id: "logical-connectors",
					title_pt: "Conectivos Lógicos",
					title_en: "Logical Connectors",
					description_pt: "Portanto, contudo, todavia...",
					type: "exercise",
					estimatedMinutes: 25,
					xpReward: 200,
					exerciseType: "sentence-ordering",
					order: 3,
				},
				{
					id: "debate-speaking",
					title_pt: "Discurso: Debate",
					title_en: "Speaking: Debate",
					description_pt: "Pratique argumentação oral",
					type: "speaking",
					estimatedMinutes: 25,
					xpReward: 175,
					speakingTopics: ["debate-openers"],
					order: 4,
				},
			],
		},
		// NEW: Debate Tech in Unit 12
		{
			id: "debate-tech-module",
			unitId: "unit-12",
			title_pt: "Debate: Tecnologia",
			title_en: "Debate: Technology",
			description_pt: "Discuta sobre IA e o futuro.",
			difficulty: "avancado",
			icon: "Cpu",
			color: "bg-violet-600",
			order: 5,
			lessons: [
				{
					id: "debate-tech",
					title_pt: "Debate sobre IA",
					title_en: "AI Debate",
					description_pt: "A tecnologia é perigosa?",
					type: "exercise",
					estimatedMinutes: 20,
					xpReward: 250,
					exerciseType: "conversation",
					order: 1,
				},
			],
		},
		// ========== Unit 13 ==========
		{
			id: "cultural-immersion",
			unitId: "unit-13",
			title_pt: "Imersão Cultural",
			title_en: "Cultural Immersion",
			description_pt: "Humor, ironia e referências culturais",
			difficulty: "avancado",
			icon: "Mask",
			color: "bg-pink-700",
			order: 15,
			prerequisites: ["rhetoric-debate"],
			lessons: [
				{
					id: "sarcasm-irony",
					title_pt: "Sarcasmo e Ironia",
					title_en: "Sarcasm and Irony",
					description_pt: "Detectando o tom invisível",
					type: "reading",
					estimatedMinutes: 30,
					xpReward: 200,
					exerciseType: "news-comprehension",
					order: 1,
				},
				{
					id: "complex-idioms",
					title_pt: "Idiomas Complexos",
					title_en: "Complex Idioms",
					description_pt: "Expressões que confundem até nativos",
					type: "vocabulary",
					estimatedMinutes: 35,
					xpReward: 200,
					vocabularyTopics: ["idioms-common"],
					order: 2,
				},
				{
					id: "cultural-quiz",
					title_pt: "Quiz Cultural",
					title_en: "Cultural Quiz",
					description_pt: "Você entende a cultura?",
					type: "quiz",
					estimatedMinutes: 30,
					xpReward: 300,
					order: 3,
				},
			],
		},
		// NEW: Unit 13 Boss - Hangman
		{
			id: "unit13-game-hangman",
			unitId: "unit-13",
			title_pt: "Desafio: Forca",
			title_en: "Challenge: Hangman",
			description_pt: "Expressões culturais.",
			difficulty: "avancado",
			icon: "Gamepad2",
			color: "bg-pink-800",
			order: 4,
			lessons: [
				{
					id: "unit13-hangman-lesson",
					title_pt: "Jogo da Forca",
					title_en: "Hangman",
					description_pt: "Salve o Pobrelingo!",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 200,
					gameType: "hangman",
					order: 1,
				},
			],
		},
		// ========== Unit 14 ==========
		{
			id: "final-mastery",
			unitId: "unit-14",
			title_pt: "O Mestre PobreLingo",
			title_en: "The PobreLingo Master",
			description_pt: "O teste final. Apenas para os fortes.",
			difficulty: "avancado",
			icon: "Crown",
			color: "bg-amber-500",
			order: 16,
			prerequisites: ["cultural-immersion"],
			lessons: [
				{
					id: "c2-vocabulary",
					title_pt: "Vocabulário C2",
					title_en: "C2 Vocabulary",
					description_pt: "Palavras raras e acadêmicas",
					type: "vocabulary",
					estimatedMinutes: 40,
					xpReward: 300,
					vocabularyTopics: ["c2-vocabulary"],
					order: 1,
				},
				{
					id: "master-reading",
					title_pt: "Leitura de Mestre",
					title_en: "Master Reading",
					description_pt: "Compreensão de textos densos",
					type: "reading",
					estimatedMinutes: 45,
					xpReward: 300,
					exerciseType: "news-comprehension",
					order: 2,
				},
				{
					id: "the-final-boss",
					title_pt: "O CHEFÃO FINAL",
					title_en: "THE FINAL BOSS",
					description_pt: "Zere o curso e ganhe sua coroa",
					type: "quiz",
					estimatedMinutes: 90,
					xpReward: 5000,
					order: 3,
				},
				{
					id: "shadowing-challenge",
					title_pt: "Desafio de Shadowing",
					title_en: "Shadowing Challenge",
					description_pt: "Repita frases complexas como um nativo",
					type: "speaking",
					estimatedMinutes: 30,
					xpReward: 250,
					speakingTopics: ["complex-shadowing"],
					order: 4,
				},
			],
		},
		// NEW: Unit 14 Boss - Bubble Pop (Relax before final unit)
		{
			id: "unit14-game-bubble",
			unitId: "unit-14",
			title_pt: "Desafio: Bolhas",
			title_en: "Challenge: Bubbles",
			description_pt: "Relaxe antes do fim.",
			difficulty: "avancado",
			icon: "Gamepad2",
			color: "bg-amber-600",
			order: 5,
			lessons: [
				{
					id: "unit14-bubble-lesson",
					title_pt: "Bubble Pop",
					title_en: "Bubble Pop",
					description_pt: "Vocabulário C2.",
					type: "exercise",
					estimatedMinutes: 10,
					xpReward: 200,
					gameType: "bubble-pop",
					order: 1,
				},
			],
		},
		// ========== Unit 15 ==========
		{
			id: "business-mastery-module",
			unitId: "unit-15",
			title_pt: "Mestrado em Negócios",
			title_en: "Business Mastery",
			description_pt: "Lidere reuniões e negociações",
			difficulty: "avancado",
			icon: "Briefcase",
			color: "bg-emerald-700",
			order: 17,
			prerequisites: ["final-mastery"],
			lessons: [
				{
					id: "negotiations",
					title_pt: "Negociações Avançadas",
					title_en: "Advanced Negotiations",
					description_pt: "Como ganhar um debate de negócios",
					type: "vocabulary",
					estimatedMinutes: 30,
					xpReward: 250,
					vocabularyTopics: ["business-negotiation"],
					order: 1,
				},
				{
					id: "leadership-vocab",
					title_pt: "Vocabulário de Liderança",
					title_en: "Leadership Vocabulary",
					description_pt: "Palavras de um CEO",
					type: "vocabulary",
					estimatedMinutes: 30,
					xpReward: 250,
					vocabularyTopics: ["leadership"],
					order: 2,
				},
				{
					id: "job-interview-sim",
					title_pt: "Simulação: Entrevista Final",
					title_en: "Simulation: Final Interview",
					description_pt: "Consiga o emprego dos sonhos",
					type: "exercise",
					estimatedMinutes: 20,
					xpReward: 300,
					exerciseType: "conversation",
					order: 3,
				},
			],
		},
		// NEW: Business Negotiation Simulation in Unit 15
		{
			id: "business-negotiation-module",
			unitId: "unit-15",
			title_pt: "Simulação: Negociação",
			title_en: "Simulation: Negotiation",
			description_pt: "Feche o contrato.",
			difficulty: "avancado",
			icon: "Handshake",
			color: "bg-emerald-800",
			order: 4,
			lessons: [
				{
					id: "business-negotiation",
					title_pt: "Negociação de Contrato",
					title_en: "Contract Negotiation",
					description_pt: "Obtenha o melhor preço.",
					type: "exercise",
					estimatedMinutes: 20,
					xpReward: 500,
					exerciseType: "conversation",
					order: 1,
				},
			],
		},
	],
};

// Função auxiliar para obter estatísticas do currículo
export function getCurriculumStats(data: LearningPath = curriculumData) {
	const modules = data.modules;
	const totalModules = modules.length;

	let totalLessons = 0;
	let totalXP = 0;
	let totalMinutes = 0;
	let basicModules = 0;
	let intermediateModules = 0;
	let advancedModules = 0;

	for (const module of modules) {
		if (module.difficulty === "basico") basicModules++;
		else if (module.difficulty === "intermediario") intermediateModules++;
		else if (module.difficulty === "avancado") advancedModules++;

		const lessons = module.lessons;
		const lessonCount = lessons.length;
		totalLessons += lessonCount;

		for (let i = 0; i < lessonCount; i++) {
			const lesson = lessons[i];
			totalXP += lesson.xpReward;
			totalMinutes += lesson.estimatedMinutes;
		}
	}

	return {
		totalModules,
		totalLessons,
		totalXP,
		totalMinutes,
		totalHours: Math.round(totalMinutes / 60),
		basicModules,
		intermediateModules,
		advancedModules,
	};
}
