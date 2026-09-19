import { grammarFoundationsBuild } from "./grammarFoundationsBuild";
import { grammarFoundationsCore } from "./grammarFoundationsCore";
import { grammarStructures } from "./grammarStructures";
import { grammarTenses } from "./grammarTenses";

export interface GrammarExample {
	sentence_en: string;
	translation_pt?: string; // Optional translation for clarity
	notes_pt?: string;
}

export interface GrammarRule {
	id: string;
	title_pt: string;
	title_en: string;
	explanation_pt: string;
	structure_format_pt?: string;
	structure_format_en?: string; // Added for English structure
	examples: GrammarExample[];
	tags?: string[]; // For rule tracking/filtering
	common_mistakes_pt?: string;
}

export interface GrammarCategory {
	id: string;
	name_pt: string;
	name_en: string;
	description_pt: string;
	icon?: string; // Lucide icon name
	rules: GrammarRule[];
}

export const grammarCategories: GrammarCategory[] = [
	grammarFoundationsCore,
	grammarFoundationsBuild,
	grammarTenses,
	grammarStructures,
	{
		id: "verbos",
		name_pt: "Verbos e Tempos Verbais",
		name_en: "Verbs and Tenses",
		description_pt:
			"Aprenda sobre os diferentes tempos verbais e como usar os verbos corretamente.",
		icon: "Clock",
		rules: [
			{
				id: "present-simple",
				title_pt: "Present Simple",
				title_en: "Present Simple",
				explanation_pt: `O Present Simple é usado para descrever hábitos, fatos gerais, ações repetidas ou situações, emoções e desejos permanentes. Para formar o Present Simple com a maioria dos verbos, usamos a forma base do verbo. Na terceira pessoa do singular (he, she, it), adicionamos -s ao final do verbo.`,
				structure_format_pt: `<strong>Afirmativa:</strong> Sujeito + <strong>Verbo</strong> (forma base) [+ <code>-s</code>/<code>-es</code> para <em>he/she/it</em>] ✅<br /><strong>Negativa:</strong> Sujeito + <code>do</code>/<code>does</code> + <code>not</code> + <strong>Verbo</strong> (forma base) ❌<br /><strong>Interrogativa:</strong> <code>Do</code>/<code>Does</code> + Sujeito + <strong>Verbo</strong> (forma base)? ❓`,
				structure_format_en: `<strong>Affirmative:</strong> Subject + <strong>Verb</strong> (base form) [+ <code>-s</code>/<code>-es</code> for <em>he/she/it</em>] ✅<br /><strong>Negative:</strong> Subject + <code>do</code>/<code>does</code> + <code>not</code> + <strong>Verb</strong> (base form) ❌<br /><strong>Interrogative:</strong> <code>Do</code>/<code>Does</code> + Subject + <strong>Verb</strong> (base form)? ❓`,
				examples: [
					{
						sentence_en: "I work in London.",
						translation_pt: "Eu trabalho em Londres.",
					},
					{
						sentence_en: "She likes coffee.",
						translation_pt: "Ela gosta de café.",
					},
					{
						sentence_en: "The sun rises in the east.",
						translation_pt: "O sol nasce no leste.",
					},
					{
						sentence_en: "He doesn't like fish.",
						translation_pt: "Ele não gosta de peixe.",
					},
					{
						sentence_en: "Do you speak French?",
						translation_pt: "Você fala francês?",
					},
					{
						sentence_en: "Cats sleep a lot.",
						translation_pt: "Gatos dormem muito.",
					},
				],
				tags: ["básico", "presente"],
				common_mistakes_pt: `Omitir o "<code>-s</code>" na terceira pessoa do singular (<em>he, she, it</em>):<br />*Ex: He play guitar.* (Incorreto) -&gt; *He plays guitar.* (Correto)<br /><br />Usar "<code>am/is/are</code>" com a forma base do verbo para ações habituais:<br />*Ex: I am go to school.* (Incorreto) -&gt; *I go to school.* (Correto)`,
			},
			{
				id: "past-simple",
				title_pt: "Past Simple",
				title_en: "Past Simple",
				explanation_pt: `O Past Simple é usado para falar sobre ações que começaram e terminaram no passado. Para verbos regulares, adicionamos -ed ao final do verbo. Verbos irregulares têm formas próprias no passado.`,
				structure_format_pt: `<strong>Afirmativa:</strong> Sujeito + <strong>Verbo</strong><code>-ed</code> (regulares) <br />OU Sujeito + <strong>Forma irregular</strong> (irregulares) ✅<br /><strong>Negativa:</strong> Sujeito + <code>did</code> + <code>not</code> + <strong>Verbo</strong> (forma base) ❌<br /><strong>Interrogativa:</strong> <code>Did</code> + Sujeito + <strong>Verbo</strong> (forma base)? ❓`,
				structure_format_en: `<strong>Affirmative:</strong> Subject + <strong>Verb</strong><code>-ed</code> (regulars) <br />OR Subject + <strong>Irregular Form</strong> (irregulars) ✅<br /><strong>Negative:</strong> Subject + <code>did</code> + <code>not</code> + <strong>Verb</strong> (base form) ❌<br /><strong>Interrogative:</strong> <code>Did</code> + Subject + <strong>Verb</strong> (base form)? ❓`,
				examples: [
					{
						sentence_en: "I visited Paris last year.",
						translation_pt: "Eu visitei Paris ano passado.",
					},
					{
						sentence_en: "They went to the cinema yesterday.",
						translation_pt: "Eles foram ao cinema ontem.",
					},
					{
						sentence_en: "She studied for the exam.",
						translation_pt: "Ela estudou para a prova.",
					},
					{
						sentence_en: "We ate pizza for dinner.",
						translation_pt: "Nós comemos pizza no jantar.",
					},
					{
						sentence_en: "He didn't go to the party.",
						translation_pt: "Ele não foi à festa.",
					},
					{
						sentence_en: "Did they see the show?",
						translation_pt: "Eles viram o show?",
					},
				],
				tags: ["básico", "passado"],
				common_mistakes_pt: `Usar a forma base do verbo em vez do passado para verbos irregulares:<br />*Ex: I see him yesterday.* (Incorreto) -&gt; *I saw him yesterday.* (Correto)<br /><br />Usar "<code>did</code>" com a forma passada do verbo em perguntas ou negativas:<br />*Ex: Did she went?* (Incorreto) -&gt; *Did she go?* (Correto)<br /><br />Para verbos regulares, esquecer o "<code>-ed</code>":<br />*Ex: She talk to him.* (Incorreto para passado) -&gt; *She talked to him.* (Correto)`,
			},
			{
				id: "present-continuous",
				title_pt: "Present Continuous",
				title_en: "Present Continuous",
				explanation_pt: `O Present Continuous (am/is/are + verbo com -ing) é usado para descrever ações que estão acontecendo no momento da fala, ações temporárias ou planos futuros definidos.`,
				structure_format_pt: `<strong>Afirmativa:</strong> Sujeito + <code>am/is/are</code> + <strong>Verbo</strong><code>-ing</code> ✅<br /><strong>Negativa:</strong> Sujeito + <code>am/is/are</code> + <code>not</code> + <strong>Verbo</strong><code>-ing</code> ❌<br /><strong>Interrogativa:</strong> <code>Am/Is/Are</code> + Sujeito + <strong>Verbo</strong><code>-ing</code>? ❓`,
				structure_format_en: `<strong>Affirmative:</strong> Subject + <code>am/is/are</code> + <strong>Verb</strong><code>-ing</code> ✅<br /><strong>Negative:</strong> Subject + <code>am/is/are</code> + <code>not</code> + <strong>Verb</strong><code>-ing</code> ❌<br /><strong>Interrogative:</strong> <code>Am/Is/Are</code> + Subject + <strong>Verb</strong><code>-ing</code>? ❓`,
				examples: [
					{
						sentence_en: "I am studying English now.",
						translation_pt: "Eu estou estudando inglês agora.",
					},
					{
						sentence_en: "She is working from home this week.",
						translation_pt: "Ela está trabalhando de casa esta semana.",
					},
					{
						sentence_en: "They are meeting at 3 PM.",
						translation_pt: "Eles vão se encontrar às 15h.",
					},
					{
						sentence_en: "The children are playing in the garden.",
						translation_pt: "As crianças estão brincando no jardim.",
					},
					{
						sentence_en: "Why are you crying?",
						translation_pt: "Por que você está chorando?",
					},
					{
						sentence_en: "It is raining outside.",
						translation_pt: "Está chovendo lá fora.",
					},
				],
				tags: ["básico", "presente", "contínuo"],
				common_mistakes_pt: `Esquecer o verbo "<code>to be</code>" (am/is/are):<br />*Ex: He playing football.* (Incorreto) -&gt; *He is playing football.* (Correto)<br /><br />Esquecer o "<code>-ing</code>" no verbo principal:<br />*Ex: They are study for the test.* (Incorreto) -&gt; *They are studying for the test.* (Correto)`,
			},
			{
				id: "past-continuous",
				title_pt: "Past Continuous",
				title_en: "Past Continuous",
				explanation_pt: `O Past Continuous (was/were + verbo com -ing) é usado para descrever ações que estavam em progresso em um momento específico no passado, ou ações mais longas que foram interrompidas por ações mais curtas.`,
				structure_format_pt: `<strong>Afirmativa:</strong> Sujeito + <code>was/were</code> + <strong>Verbo</strong><code>-ing</code> ✅<br /><strong>Negativa:</strong> Sujeito + <code>was/were</code> + <code>not</code> + <strong>Verbo</strong><code>-ing</code> ❌<br /><strong>Interrogativa:</strong> <code>Was/Were</code> + Sujeito + <strong>Verbo</strong><code>-ing</code>? ❓`,
				structure_format_en: `<strong>Affirmative:</strong> Subject + <code>was/were</code> + <strong>Verb</strong><code>-ing</code> ✅<br /><strong>Negative:</strong> Subject + <code>was/were</code> + <code>not</code> + <strong>Verb</strong><code>-ing</code> ❌<br /><strong>Interrogative:</strong> <code>Was/Were</code> + Subject + <strong>Verb</strong><code>-ing</code>? ❓`,
				examples: [
					{
						sentence_en: "I was watching TV when you called.",
						translation_pt: "Eu estava assistindo TV quando você ligou.",
					},
					{
						sentence_en: "They were playing football all afternoon yesterday.",
						translation_pt: "Eles estavam jogando futebol a tarde toda ontem.",
					},
					{
						sentence_en: "What were you doing at 8 PM last night?",
						translation_pt:
							"O que você estava fazendo às 20h na noite passada?",
					},
					{
						sentence_en: "She was reading a book while he was cooking dinner.",
						translation_pt:
							"Ela estava lendo um livro enquanto ele preparava o jantar.",
					},
				],
				tags: ["intermediário", "passado", "contínuo"],
				common_mistakes_pt: `Confundir "<code>was</code>" e "<code>were</code>":<br />*Ex: They was playing.* (Incorreto) -&gt; *They were playing.* (Correto)<br />*Ex: She were sleeping.* (Incorreto) -&gt; *She was sleeping.* (Correto)<br /><br />Usar o Past Simple em vez do Past Continuous para a ação em progresso que foi interrompida:<br />*Ex: I watched TV when she arrived.* (Pode significar que você começou a assistir depois que ela chegou) -&gt; *I was watching TV when she arrived.* (Deixa claro que a ação de assistir TV estava em progresso).`,
			},
			{
				id: "present-perfect-simple",
				title_pt: "Present Perfect Simple",
				title_en: "Present Perfect Simple",
				explanation_pt: `O Present Perfect Simple (have/has + particípio passado) conecta o passado com o presente. É usado para ações que aconteceram em um momento não especificado antes de agora, experiências de vida, ou ações que começaram no passado e continuam até o presente, ou que têm um resultado no presente.`,
				structure_format_pt: `<strong>Afirmativa:</strong> Sujeito + <code>have/has</code> + <strong>Particípio Passado</strong> ✅<br /><strong>Negativa:</strong> Sujeito + <code>have/has</code> + <code>not</code> + <strong>Particípio Passado</strong> ❌<br /><strong>Interrogativa:</strong> <code>Have/Has</code> + Sujeito + <strong>Particípio Passado</strong>? ❓`,
				structure_format_en: `<strong>Affirmative:</strong> Subject + <code>have/has</code> + <strong>Past Participle</strong> ✅<br /><strong>Negative:</strong> Subject + <code>have/has</code> + <code>not</code> + <strong>Past Participle</strong> ❌<br /><strong>Interrogative:</strong> <code>Have/Has</code> + Subject + <strong>Past Participle</strong>? ❓`,
				examples: [
					{
						sentence_en: "I have seen that movie before.",
						translation_pt: "Eu já vi esse filme antes.",
					},
					{
						sentence_en: "She has lived here for five years.",
						translation_pt: "Ela mora aqui há cinco anos.",
					},
					{
						sentence_en: "Have you ever been to Japan?",
						translation_pt: "Você já esteve no Japão?",
					},
					{
						sentence_en: "We have finished our homework.",
						translation_pt:
							"Nós terminamos nossa lição de casa. (O resultado é que está pronta agora)",
					},
					{
						sentence_en: "He has lost his keys.",
						translation_pt: "Ele perdeu as chaves. (Ele não as tem agora)",
					},
				],
				tags: ["intermediário", "passado", "presente", "perfeito"],
				common_mistakes_pt: `Usar o Past Simple em vez do Present Perfect para experiências de vida ou ações com relevância no presente sem tempo definido:<br />*Ex: I saw that movie.* (Correto, mas indica um tempo específico implícito ou explícito) vs *I have seen that movie.* (Indica que a experiência de ter visto é o importante).<br /><br />Usar a forma do Past Simple em vez do Particípio Passado para verbos irregulares:<br />*Ex: I have went there.* (Incorreto) -&gt; *I have gone there.* (Correto)`,
			},
			{
				id: "future-simple-will",
				title_pt: "Future Simple (will)",
				title_en: "Future Simple (will)",
				explanation_pt: `O Future Simple com "will" é usado para previsões, decisões espontâneas, promessas ou ofertas. A forma é "will + verbo na forma base" para todas as pessoas.`,
				structure_format_pt: `<strong>Afirmativa:</strong> Sujeito + <code>will</code> + <strong>Verbo</strong> (forma base) ✅<br /><strong>Negativa:</strong> Sujeito + <code>will</code> + <code>not</code> (<code>won't</code>) + <strong>Verbo</strong> (forma base) ❌<br /><strong>Interrogativa:</strong> <code>Will</code> + Sujeito + <strong>Verbo</strong> (forma base)? ❓`,
				structure_format_en: `<strong>Affirmative:</strong> Subject + <code>will</code> + <strong>Verb</strong> (base form) ✅<br /><strong>Negative:</strong> Subject + <code>will</code> + <code>not</code> (<code>won't</code>) + <strong>Verb</strong> (base form) ❌<br /><strong>Interrogative:</strong> <code>Will</code> + Subject + <strong>Verb</strong> (base form)? ❓`,
				examples: [
					{
						sentence_en: "I think it will rain tomorrow.",
						translation_pt: "Eu acho que vai chover amanhã.",
					},
					{
						sentence_en: "I will help you with your bags.",
						translation_pt: "Eu vou te ajudar com suas malas.",
					},
					{
						sentence_en: "She will probably be late.",
						translation_pt: "Ela provavelmente vai se atrasar.",
					},
					{
						sentence_en: "We will overcome this challenge.",
						translation_pt: "Nós vamos superar este desafio.",
					},
					{
						sentence_en: "Don't worry, I'll call you later.",
						translation_pt: "Não se preocupe, eu te ligo mais tarde.",
					},
				],
				tags: ["básico", "futuro"],
				common_mistakes_pt: `Usar "<code>to</code>" depois de "<code>will</code>":<br />*Ex: I will to go home.* (Incorreto) -&gt; *I will go home.* (Correto)<br /><br />Usar "<code>-s</code>" na terceira pessoa com "<code>will</code>":<br />*Ex: She wills come.* (Incorreto) -&gt; *She will come.* (Correto)`,
			},
			{
				id: "future-simple-going-to",
				title_pt: "Future Simple (going to)",
				title_en: "Future Simple (going to)",
				explanation_pt: `O Future Simple com "be going to" (am/is/are going to + verbo na forma base) é usado para planos e intenções futuras decididos antes do momento da fala, ou para previsões baseadas em evidências presentes.`,
				structure_format_pt: `<strong>Afirmativa:</strong> Sujeito + <code>am/is/are</code> + <code>going to</code> + <strong>Verbo</strong> (forma base) ✅<br /><strong>Negativa:</strong> Sujeito + <code>am/is/are</code> + <code>not</code> + <code>going to</code> + <strong>Verbo</strong> (forma base) ❌<br /><strong>Interrogativa:</strong> <code>Am/Is/Are</code> + Sujeito + <code>going to</code> + <strong>Verbo</strong> (forma base)? ❓`,
				structure_format_en: `<strong>Affirmative:</strong> Subject + <code>am/is/are</code> + <code>going to</code> + <strong>Verb</strong> (base form) ✅<br /><strong>Negative:</strong> Subject + <code>am/is/are</code> + <code>not</code> + <code>going to</code> + <strong>Verb</strong> (base form) ❌<br /><strong>Interrogative:</strong> <code>Am/Is/Are</code> + Subject + <code>going to</code> + <strong>Verb</strong> (base form)? ❓`,
				examples: [
					{
						sentence_en: "I am going to visit my grandparents next weekend.",
						translation_pt:
							"Eu vou visitar meus avós no próximo fim de semana.",
					},
					{
						sentence_en: "Look at those dark clouds! It's going to rain.",
						translation_pt: "Olhe aquelas nuvens escuras! Vai chover.",
					},
					{
						sentence_en: "Are you going to study for the test?",
						translation_pt: "Você vai estudar para a prova?",
					},
					{
						sentence_en: "We are going to have a party on Saturday.",
						translation_pt: "Nós vamos dar uma festa no sábado.",
					},
				],
				tags: ["básico", "futuro", "planos"],
				common_mistakes_pt: `Esquecer o verbo "<code>to be</code>" (am/is/are) antes de "<code>going to</code>":<br />*Ex: I going to travel.* (Incorreto) -&gt; *I am going to travel.* (Correto)<br /><br />Omitir "<code>to</code>" depois de "<code>going</code>":<br />*Ex: She is going visit her friend.* (Incorreto) -&gt; *She is going to visit her friend.* (Correto)`,
			},
			{
				id: "modal-verbs",
				title_pt: "Modal Verbs",
				title_en: "Modal Verbs",
				explanation_pt: `Verbos modais (can, could, may, might, must, should, will, would) são verbos auxiliares que expressam habilidade, possibilidade, permissão, obrigação, conselho, etc. Eles são seguidos por um verbo na forma base e não mudam com a pessoa.`,
				structure_format_pt: `<strong>Afirmativa:</strong> Sujeito + <strong>Verbo Modal</strong> + <strong>Verbo</strong> (forma base) ✅<br /><strong>Negativa:</strong> Sujeito + <strong>Verbo Modal</strong> + <code>not</code> + <strong>Verbo</strong> (forma base) ❌<br /><strong>Interrogativa:</strong> <strong>Verbo Modal</strong> + Sujeito + <strong>Verbo</strong> (forma base)? ❓`,
				structure_format_en: `<strong>Affirmative:</strong> Subject + <strong>Modal Verb</strong> + <strong>Verb</strong> (base form) ✅<br /><strong>Negative:</strong> Subject + <strong>Modal Verb</strong> + <code>not</code> + <strong>Verb</strong> (base form) ❌<br /><strong>Interrogative:</strong> <strong>Modal Verb</strong> + Subject + <strong>Verb</strong> (base form)? ❓`,
				examples: [
					{
						sentence_en: "I can speak English.",
						translation_pt: "Eu sei falar inglês. (habilidade)",
					},
					{
						sentence_en: "Could you pass the salt, please?",
						translation_pt:
							"Você poderia passar o sal, por favor? (pedido educado)",
					},
					{
						sentence_en: "It may rain later.",
						translation_pt: "Pode chover mais tarde. (possibilidade)",
					},
					{
						sentence_en: "He might come if he finishes work early.",
						translation_pt:
							"Ele pode vir se terminar o trabalho cedo. (possibilidade menor)",
					},
					{
						sentence_en: "You must finish your homework.",
						translation_pt:
							"Você deve terminar sua lição de casa. (obrigação forte)",
					},
					{
						sentence_en: "You should see a doctor.",
						translation_pt: "Você deveria ir ao médico. (conselho)",
					},
					{
						sentence_en: "Would you like some tea?",
						translation_pt:
							"Você gostaria de um pouco de chá? (oferta educada)",
					},
				],
				tags: ["intermediário", "modais"],
				common_mistakes_pt: `Usar "<code>to</code>" depois do verbo modal (exceto "<code>ought to</code>"):<br />*Ex: I can to swim.* (Incorreto) -&gt; *I can swim.* (Correto)<br /><br />Adicionar "<code>-s</code>" ao verbo modal na terceira pessoa:<br />*Ex: She cans play piano.* (Incorreto) -&gt; *She can play piano.* (Correto)<br /><br />Usar a forma do particípio passado ou "<code>-ing</code>" após o verbo modal:<br />*Ex: You must finished it.* (Incorreto) -&gt; *You must finish it.* (Correto)<br />*Ex: He should studying.* (Incorreto) -&gt; *He should study.* (Correto)`,
			},
			{
				id: "conditional-sentences",
				title_pt: "Orações Condicionais (If Clauses)",
				title_en: "Conditional Sentences (If Clauses)",
				explanation_pt: `As orações condicionais (If Clauses) são usadas para expressar uma condição e seu resultado. Existem quatro tipos principais: Zero, First, Second e Third Conditional, além das Mixed Conditionals.`,
				structure_format_pt: `<strong>Zero Conditional:</strong> <code>If</code> + Present Simple, Present Simple (fatos gerais)<br /><strong>First Conditional:</strong> <code>If</code> + Present Simple, <code>will</code> + Verbo (situações reais/possíveis)<br /><strong>Second Conditional:</strong> <code>If</code> + Past Simple, <code>would</code> + Verbo (situações hipotéticas/irreais no presente/futuro)<br /><strong>Third Conditional:</strong> <code>If</code> + Past Perfect, <code>would have</code> + Particípio Passado (situações irreais no passado)`,
				structure_format_en: `<strong>Zero Conditional:</strong> <code>If</code> + Present Simple, Present Simple (general truths)<br /><strong>First Conditional:</strong> <code>If</code> + Present Simple, <code>will</code> + Verb (real/possible situations)<br /><strong>Second Conditional:</strong> <code>If</code> + Past Simple, <code>would</code> + Verb (hypothetical/unreal situations in present/future)<br /><strong>Third Conditional:</strong> <code>If</code> + Past Perfect, <code>would have</code> + Past Participle (unreal situations in the past)`,
				examples: [
					{
						sentence_en: "If you heat water to 100 degrees Celsius, it boils.",
						translation_pt:
							"Se você aquece água a 100 graus Celsius, ela ferve. (Zero)",
					},
					{
						sentence_en: "If it rains tomorrow, I will stay home.",
						translation_pt: "Se chover amanhã, eu ficarei em casa. (First)",
					},
					{
						sentence_en: "If I won the lottery, I would buy a big house.",
						translation_pt:
							"Se eu ganhasse na loteria, eu compraria uma casa grande. (Second)",
					},
					{
						sentence_en:
							"If she had studied harder, she would have passed the exam.",
						translation_pt:
							"Se ela tivesse estudado mais, ela teria passado no exame. (Third)",
					},
				],
				tags: ["avançado", "condicionais", "estrutura"],
				common_mistakes_pt: `Confundir os tipos de condicionais e usar os tempos verbais errados.<br />*Ex: If I would have money, I would buy a car.* (Incorreto) -&gt; *If I had money, I would buy a car.* (Correto - Second Conditional)`,
			},
		],
	},
	{
		id: "substantivos",
		name_pt: "Substantivos e Artigos",
		name_en: "Nouns and Articles",
		description_pt:
			"Entenda os tipos de substantivos, seus plurais, e o uso dos artigos (a, an, the).",
		icon: "BookOpen",
		rules: [
			{
				id: "articles",
				title_pt: "Artigos (A, An, The)",
				title_en: "Articles (A, An, The)",
				explanation_pt: `"A" e "An" são artigos indefinidos, usados antes de substantivos contáveis no singular. "A" é usado antes de palavras que começam com som de consoante, e "An" antes de palavras que começam com som de vogal. "The" é o artigo definido, usado para se referir a algo específico ou único.`,
				structure_format_pt: `<strong>Artigo Indefinido:</strong> <code>a</code>/<code>an</code> + Substantivo Singular Contável<br /><strong>Artigo Definido:</strong> <code>the</code> + Substantivo (singular/plural, contável/incontável)`,
				structure_format_en: `<strong>Indefinite Article:</strong> <code>a</code>/<code>an</code> + Singular Countable Noun<br /><strong>Definite Article:</strong> <code>the</code> + Noun (singular/plural, countable/uncountable)`,
				examples: [
					{
						sentence_en: "I saw a dog in the park.",
						translation_pt: "Eu vi um cachorro no parque.",
					},
					{
						sentence_en: "She wants an apple.",
						translation_pt: "Ela quer uma maçã.",
					},
					{
						sentence_en: "The book on the table is mine.",
						translation_pt: "O livro na mesa é meu.",
					},
					{
						sentence_en: "An hour ago, I saw a university student.",
						translation_pt:
							'Uma hora atrás, eu vi um estudante universitário. ("an" antes de "hour" por causa do som de vogal; "a" antes de "university" por causa do som de consoante "y")',
					},
					{
						sentence_en: "The Earth is a planet.",
						translation_pt: 'A Terra é um planeta. ("The" para coisas únicas)',
					},
				],
				tags: ["básico", "substantivos", "artigos"],
				common_mistakes_pt: `Usar "<code>a</code>" antes de palavras com som de vogal ou "<code>an</code>" antes de som de consoante:<br />*Ex: a apple* (Incorreto) -&gt; *an apple* (Correto)<br />*Ex: an university* (Incorreto) -&gt; *a university* (Correto, pois "university" começa com som de "y")<br /><br />Omitir o artigo "<code>the</code>" quando se refere a algo específico ou único:<br />*Ex: Sun is hot.* (Incorreto) -&gt; *The sun is hot.* (Correto)<br /><br />Usar "<code>the</code>" desnecessariamente para generalizações:<br />*Ex: The cats are cute animals.* (Geralmente incorreto, a menos que se refira a um grupo específico de gatos) -&gt; *Cats are cute animals.* (Correto para generalização)`,
			},
			{
				id: "countable-uncountable-nouns",
				title_pt: "Substantivos Contáveis e Incontáveis",
				title_en: "Countable and Uncountable Nouns",
				explanation_pt: `Substantivos contáveis podem ser contados e têm forma plural (e.g., one apple, two apples). Substantivos incontáveis não podem ser contados diretamente e geralmente não têm forma plural (e.g., water, information, rice, music). Usamos "some/any" com ambos; "many/few" com contáveis; e "much/little" com incontáveis. Para tornar incontáveis "contáveis", usamos expressões como "a piece of", "a bottle of", etc.`,
				examples: [
					{
						sentence_en: "I have many books.",
						translation_pt: "Eu tenho muitos livros. (contável)",
					},
					{
						sentence_en: "There is much water in the bottle.",
						translation_pt: "Há muita água na garrafa. (incontável)",
					},
					{
						sentence_en: "Do you have any information?",
						translation_pt: "Você tem alguma informação? (incontável)",
					},
					{
						sentence_en: "She needs some sugar.",
						translation_pt: "Ela precisa de um pouco de açúcar. (incontável)",
					},
					{
						sentence_en: "Can I have a piece of advice?",
						translation_pt: 'Posso ter um conselho? ("advice" é incontável)',
					},
					{
						sentence_en: "She bought three loaves of bread.",
						translation_pt:
							'Ela comprou três pães. ("bread" é incontável, "loaves of" torna contável)',
					},
				],
				tags: ["básico", "substantivos", "quantificadores"],
				common_mistakes_pt: `Usar "<code>many</code>" com substantivos incontáveis ou "<code>much</code>" com substantivos contáveis:<br />*Ex: many water* (Incorreto) -&gt; *much water* ou *a lot of water* (Correto)<br />*Ex: much cars* (Incorreto) -&gt; *many cars* ou *a lot of cars* (Correto)<br /><br />Tentar pluralizar substantivos incontáveis:<br />*Ex: informations* (Incorreto) -&gt; *information* ou *pieces of information* (Correto)<br />*Ex: advices* (Incorreto) -&gt; *advice* ou *pieces of advice* (Correto)`,
			},
			{
				id: "plural-of-nouns",
				title_pt: "Plural de Substantivos",
				title_en: "Plural of Nouns",
				explanation_pt: `A maioria dos substantivos forma o plural adicionando -s. Regras especiais se aplicam a substantivos terminados em -s, -sh, -ch, -x, -z (adiciona-se -es), terminados em consoante + y (muda-se y para -ies). Alguns substantivos têm plurais irregulares.`,
				examples: [
					{
						sentence_en: "One book, two books.",
						translation_pt: "Um livro, dois livros.",
					},
					{
						sentence_en: "A bus, many buses.",
						translation_pt: "Um ônibus, muitos ônibus.",
					},
					{
						sentence_en: "A city, several cities.",
						translation_pt: "Uma cidade, várias cidades.",
					},
					{
						sentence_en: "A child, three children.",
						translation_pt: "Uma criança, três crianças. (irregular)",
					},
					{
						sentence_en: "A mouse, some mice.",
						translation_pt: "Um rato, alguns ratos. (irregular)",
					},
					{
						sentence_en: "A leaf, many leaves.",
						translation_pt: "Uma folha, muitas folhas. (terminado em -f)",
					},
					{
						sentence_en: "A person, two people.",
						translation_pt: "Uma pessoa, duas pessoas. (irregular)",
					},
				],
				tags: ["básico", "substantivos", "plural"],
				common_mistakes_pt: `Pluralizar incorretamente substantivos irregulares:<br />*Ex: childs* (Incorreto) -&gt; *children* (Correto)<br />*Ex: mans* (Incorreto) -&gt; *men* (Correto)<br />*Ex: tooths* (Incorreto) -&gt; *teeth* (Correto)<br /><br />Confundir regras de plural para substantivos terminados em <code>-y</code>:<br />*Ex: boy -&gt; boies* (Incorreto) -&gt; *boys* (Correto, pois é vogal + y)<br />*Ex: party -&gt; partys* (Incorreto) -&gt; *parties* (Correto, pois é consoante + y)`,
			},
		],
	},
	{
		id: "adjetivos-adverbios",
		name_pt: "Adjetivos e Advérbios",
		name_en: "Adjectives and Adverbs",
		description_pt:
			"Aprenda a descrever coisas com adjetivos e modificar ações com advérbios.",
		icon: "Palette",
		rules: [
			{
				id: "adjectives",
				title_pt: "Adjetivos",
				title_en: "Adjectives",
				explanation_pt: `Adjetivos são palavras que descrevem ou modificam substantivos ou pronomes. Geralmente vêm antes do substantivo que modificam ou após verbos de ligação (be, seem, look, feel). A ordem dos adjetivos antes de um substantivo geralmente segue um padrão (opinião, tamanho, idade, forma, cor, origem, material, propósito).`,
				structure_format_pt: `<strong>Adjetivo</strong> + <strong>Substantivo</strong><br />OU Sujeito + <strong>Verbo de Ligação</strong> (<code>be, look, feel</code>) + <strong>Adjetivo</strong>`,
				structure_format_en: `<strong>Adjective</strong> + <strong>Noun</strong><br />OR Subject + <strong>Linking Verb</strong> (<code>be, look, feel</code>) + <strong>Adjective</strong>`,
				examples: [
					{
						sentence_en: "It is a beautiful day.",
						translation_pt: "É um dia lindo.",
					},
					{
						sentence_en: "She looks happy.",
						translation_pt: "Ela parece feliz.",
					},
					{
						sentence_en: "He bought a new red car.",
						translation_pt: "Ele comprou um carro novo vermelho.",
					},
					{
						sentence_en:
							"It's a lovely, small, old, round, brown, wooden coffee table.",
						translation_pt:
							"É uma adorável, pequena, velha, redonda, marrom mesa de café de madeira.",
					},
				],
				tags: ["básico", "descrição"],
				common_mistakes_pt: `Colocar o adjetivo depois do substantivo (exceto em alguns casos especiais):<br />*Ex: The car blue is fast.* (Incorreto) -&gt; *The blue car is fast.* (Correto)<br /><br />Pluralizar adjetivos:<br />*Ex: Beautifuls flowers.* (Incorreto) -&gt; *Beautiful flowers.* (Correto, adjetivos não têm plural em inglês).`,
			},
			{
				id: "comparative-superlative-adjectives",
				title_pt: "Adjetivos Comparativos e Superlativos",
				title_en: "Comparative and Superlative Adjectives",
				explanation_pt: `Adjetivos comparativos comparam duas coisas (e.g., bigger, more expensive than). Adjetivos superlativos comparam três ou mais coisas, indicando o extremo (e.g., the biggest, the most expensive). Para adjetivos curtos (uma sílaba, ou duas terminadas em -y), adicionamos -er/-est (happy -&gt; happier -&gt; happiest). Para adjetivos longos (duas ou mais sílabas), usamos more/most. Existem formas irregulares (good -&gt; better -&gt; best; bad -&gt; worse -&gt; worst).`,
				structure_format_pt: `<strong>Comparativo (curto):</strong> Adjetivo<code>-er</code> + <code>than</code><br /><strong>Comparativo (longo):</strong> <code>more</code> + Adjetivo + <code>than</code><br /><strong>Superlativo (curto):</strong> <code>the</code> + Adjetivo<code>-est</code><br /><strong>Superlativo (longo):</strong> <code>the</code> + <code>most</code> + Adjetivo`,
				structure_format_en: `<strong>Comparative (short):</strong> Adjective<code>-er</code> + <code>than</code><br /><strong>Comparative (long):</strong> <code>more</code> + Adjective + <code>than</code><br /><strong>Superlative (short):</strong> <code>the</code> + Adjective<code>-est</code><br /><strong>Superlative (long):</strong> <code>the</code> + <code>most</code> + Adjective`,
				examples: [
					{
						sentence_en: "This car is faster than that car.",
						translation_pt: "Este carro é mais rápido que aquele carro.",
					},
					{
						sentence_en: "She is the tallest person in her family.",
						translation_pt: "Ela é a pessoa mais alta da família dela.",
					},
					{
						sentence_en: "This book is more interesting than the last one.",
						translation_pt: "Este livro é mais interessante que o último.",
					},
					{
						sentence_en: "It was the most exciting movie I have ever seen.",
						translation_pt: "Foi o filme mais emocionante que eu já vi.",
					},
					{
						sentence_en: "Health is better than wealth.",
						translation_pt: "Saúde é melhor que riqueza. (irregular)",
					},
					{
						sentence_en: "This is the worst day of my life.",
						translation_pt: "Este é o pior dia da minha vida. (irregular)",
					},
					{
						sentence_en: "This problem is less difficult than I thought.",
						translation_pt: "Este problema é menos difícil do que eu pensava.",
					},
				],
				tags: ["intermediário", "comparação", "descrição"],
				common_mistakes_pt: `Usar "<code>more</code>" com adjetivos curtos que deveriam usar "<code>-er</code>":<br />*Ex: more tall* (Incorreto) -&gt; *taller* (Correto)<br /><br />Esquecer "<code>than</code>" em comparativos ou "<code>the</code>" em superlativos:<br />*Ex: She is taller her brother.* (Incorreto) -&gt; *She is taller than her brother.* (Correto)<br />*Ex: He is fastest runner.* (Incorreto) -&gt; *He is the fastest runner.* (Correto)<br /><br />Usar formas duplas de comparativo/superlativo:<br />*Ex: more taller* (Incorreto) -&gt; *taller* (Correto)<br />*Ex: the most biggest* (Incorreto) -&gt; *the biggest* (Correto)`,
			},
			{
				id: "adverbs-of-manner",
				title_pt: "Advérbios de Modo",
				title_en: "Adverbs of Manner",
				explanation_pt: `Advérbios de modo descrevem como uma ação é realizada. Muitos são formados adicionando -ly a um adjetivo (e.g., quick -&gt; quickly). Eles geralmente vêm após o verbo principal ou após o objeto.`,
				structure_format_pt: `Sujeito + <strong>Verbo</strong> (+ Objeto) + <strong>Advérbio de Modo</strong><br />(Formação comum: Adjetivo + <code>-ly</code>)`,
				structure_format_en: `Subject + <strong>Verb</strong> (+ Object) + <strong>Adverb of Manner</strong><br />(Common formation: Adjective + <code>-ly</code>)`,
				examples: [
					{
						sentence_en: "She sings beautifully.",
						translation_pt: "Ela canta lindamente.",
					},
					{
						sentence_en: "He drives carefully.",
						translation_pt: "Ele dirige cuidadosamente.",
					},
					{
						sentence_en: "They speak English fluently.",
						translation_pt: "Eles falam inglês fluentemente.",
					},
					{
						sentence_en: "The team played well.",
						translation_pt: "O time jogou bem. (irregular: good -&gt; well)",
					},
					{
						sentence_en: "He works hard.",
						translation_pt: "Ele trabalha duro. (irregular: hard -&gt; hard)",
					},
				],
				tags: ["intermediário", "advérbios", "descrição"],
				common_mistakes_pt: `Usar um adjetivo em vez de um advérbio para modificar um verbo:<br />*Ex: He drives careful.* (Incorreto) -&gt; *He drives carefully.* (Correto)<br /><br />Posicionar o advérbio de modo incorretamente, especialmente entre o verbo e o objeto direto:<br />*Ex: She speaks fluently English.* (Incorreto) -&gt; *She speaks English fluently.* (Correto)`,
			},
			{
				id: "adverbs-of-frequency",
				title_pt: "Advérbios de Frequência",
				title_en: "Adverbs of Frequency",
				explanation_pt: `Advérbios de frequência indicam quão frequentemente uma ação ocorre (e.g., always, usually, often, sometimes, occasionally, rarely, seldom, never). Eles geralmente vêm antes do verbo principal, mas depois do verbo "to be" ou verbos auxiliares/modais.`,
				structure_format_pt: `Sujeito + <strong>Adv. Frequência</strong> + <strong>Verbo Principal</strong><br />OU Sujeito + <strong>Verbo</strong> (<code>be</code>/<code>auxiliar</code>/<code>modal</code>) + <strong>Adv. Frequência</strong> + ...`,
				structure_format_en: `Subject + <strong>Adverb of Frequency</strong> + <strong>Main Verb</strong><br />OR Subject + <strong>Verb</strong> (<code>be</code>/<code>auxiliary</code>/<code>modal</code>) + <strong>Adverb of Frequency</strong> + ...`,
				examples: [
					{
						sentence_en: "I always brush my teeth before bed.",
						translation_pt: "Eu sempre escovo meus dentes antes de dormir.",
					},
					{
						sentence_en: "She sometimes visits her parents.",
						translation_pt: "Ela às vezes visita os pais dela.",
					},
					{
						sentence_en: "They are rarely late.",
						translation_pt:
							'Eles raramente estão atrasados. (depois do verbo "to be")',
					},
					{
						sentence_en: "He usually walks to work.",
						translation_pt: "Ele geralmente vai para o trabalho caminhando.",
					},
					{
						sentence_en: "We have never seen such a thing.",
						translation_pt:
							'Nós nunca vimos tal coisa. (depois do auxiliar "have")',
					},
				],
				tags: ["intermediário", "advérbios", "frequência"],
				common_mistakes_pt: `Posicionar o advérbio de frequência incorretamente:<br />*Ex: Always I get up early.* (Incorreto) -&gt; *I always get up early.* (Correto)<br />*Ex: She is sometimes late.* (Correto) vs *She sometimes is late.* (Menos comum/Incorreto em alguns contextos)<br /><br />Usar "<code>never</code>" com uma negativa dupla:<br />*Ex: I don't never go there.* (Incorreto) -&gt; *I never go there.* ou *I don't ever go there.* (Correto)`,
			},
		],
	},
	{
		id: "preposicoes",
		name_pt: "Preposições",
		name_en: "Prepositions",
		description_pt:
			"Domine o uso de preposições para indicar lugar, tempo, direção e outras relações.",
		icon: "MapPin",
		rules: [
			{
				id: "prepositions-of-place",
				title_pt: "Preposições de Lugar (in, on, at)",
				title_en: "Prepositions of Place (in, on, at)",
				explanation_pt: `"In" é usado para espaços fechados, áreas maiores ou localizações geográficas (in the box, in London, in Brazil). "On" é usado para superfícies ou meios de transporte (on the table, on the wall, on the bus). "At" é usado para pontos específicos, endereços ou eventos (at the bus stop, at the door, at 7 Mary Street, at a party).`,
				examples: [
					{
						sentence_en: "The cat is in the house.",
						translation_pt: "O gato está na casa.",
					},
					{
						sentence_en: "The keys are on the desk.",
						translation_pt: "As chaves estão na escrivaninha.",
					},
					{
						sentence_en: "I will meet you at the station.",
						translation_pt: "Vou te encontrar na estação.",
					},
					{
						sentence_en: "He lives in Brazil.",
						translation_pt: "Ele mora no Brasil.",
					},
					{
						sentence_en: "The picture is on the wall.",
						translation_pt: "A foto está na parede.",
					},
					{
						sentence_en: "Meet me at the corner of the street.",
						translation_pt: "Encontre-me na esquina da rua.",
					},
				],
				tags: ["básico", "lugar"],
				common_mistakes_pt: `Confundir "<code>in</code>", "<code>on</code>" e "<code>at</code>" para lugares:<br />*Ex: I am on the car.* (Incorreto) -&gt; *I am in the car.* (Correto)<br />*Ex: The book is in the table.* (Incorreto) -&gt; *The book is on the table.* (Correto)<br />*Ex: She lives on London.* (Incorreto) -&gt; *She lives in London.* (Correto)`,
			},
			{
				id: "prepositions-of-time",
				title_pt: "Preposições de Tempo (in, on, at)",
				title_en: "Prepositions of Time (in, on, at)",
				explanation_pt: `"In" é usado para partes do dia (in the morning - exceto "at night"), meses, anos, estações, séculos e longos períodos (in August, in 2023, in summer). "On" é usado para dias da semana e datas específicas (on Monday, on July 4th). "At" é usado para horas específicas, feriados e certas expressões de tempo (at 3 o'clock, at Christmas, at night, at the weekend [UK]).`,
				examples: [
					{
						sentence_en: "My birthday is in January.",
						translation_pt: "Meu aniversário é em janeiro.",
					},
					{
						sentence_en: "The meeting is on Friday.",
						translation_pt: "A reunião é na sexta-feira.",
					},
					{
						sentence_en: "The movie starts at 7 PM.",
						translation_pt: "O filme começa às 19h.",
					},
					{
						sentence_en: "I will see you in the morning.",
						translation_pt: "Eu te vejo de manhã.",
					},
					{
						sentence_en: "The shop is open on weekdays.",
						translation_pt: "A loja está aberta nos dias de semana.",
					},
					{
						sentence_en: "He arrived at noon.",
						translation_pt: "Ele chegou ao meio-dia.",
					},
				],
				tags: ["básico", "tempo"],
				common_mistakes_pt: `Confundir "<code>in</code>", "<code>on</code>" e "<code>at</code>" para tempo:<br />*Ex: The party is in Saturday.* (Incorreto) -&gt; *The party is on Saturday.* (Correto)<br />*Ex: I wake up on 7 AM.* (Incorreto) -&gt; *I wake up at 7 AM.* (Correto)<br />*Ex: We go on vacation at summer.* (Incorreto) -&gt; *We go on vacation in summer.* (Correto)`,
			},
			{
				id: "prepositions-of-movement",
				title_pt: "Preposições de Movimento",
				title_en: "Prepositions of Movement",
				explanation_pt: `Preposições de movimento descrevem a direção de um movimento de um lugar para outro (e.g., to, from, into, out of, towards, along, across, through, over, under, up, down).`,
				examples: [
					{
						sentence_en: "He walked to the store.",
						translation_pt: "Ele caminhou para a loja.",
					},
					{
						sentence_en: "The cat jumped onto the roof.",
						translation_pt: "O gato pulou para cima do telhado.",
					},
					{
						sentence_en: "They drove through the tunnel.",
						translation_pt: "Eles dirigiram através do túnel.",
					},
					{
						sentence_en: "She ran across the field.",
						translation_pt: "Ela correu através do campo.",
					},
					{
						sentence_en: "The bird flew over the house.",
						translation_pt: "O pássaro voou por cima da casa.",
					},
					{
						sentence_en: "He got out of the car.",
						translation_pt: "Ele saiu do carro.",
					},
				],
				tags: ["intermediário", "movimento", "direção"],
				common_mistakes_pt: `Usar "<code>to</code>" onde "<code>into</code>" é necessário (movimento para dentro):<br />*Ex: He jumped to the water.* (Implica direção, mas não necessariamente entrada) -&gt; *He jumped into the water.* (Correto para entrar na água)<br /><br />Confundir "<code>on</code>" e "<code>onto</code>":<br />*Ex: The cat jumped on the table.* (Pode significar que já estava na mesa e pulou) -&gt; *The cat jumped onto the table.* (Deixa claro o movimento de fora para cima da mesa).`,
			},
		],
	},
	{
		id: "pronomes",
		name_pt: "Pronomes",
		name_en: "Pronouns",
		description_pt:
			"Aprenda a usar os diferentes tipos de pronomes para substituir substantivos e evitar repetições.",
		icon: "Users",
		rules: [
			{
				id: "personal-possessive-pronouns",
				title_pt: "Pronomes Pessoais e Possessivos",
				title_en: "Personal and Possessive Pronouns",
				explanation_pt: `Pronomes pessoais substituem nomes de pessoas ou coisas. Podem ser pronomes sujeito (I, you, he, she, it, we, they) ou pronomes objeto (me, you, him, her, it, us, them). Adjetivos possessivos (my, your, his, her, its, our, their) mostram posse e vêm antes de um substantivo. Pronomes possessivos (mine, yours, his, hers, its, ours, theirs) também mostram posse, mas substituem o substantivo + adjetivo possessivo.`,
				examples: [
					{
						sentence_en: "She likes him.",
						translation_pt: "Ela gosta dele. (She - sujeito, him - objeto)",
					},
					{
						sentence_en: "This is my book. This book is mine.",
						translation_pt:
							"Este é meu livro. Este livro é meu. (my - adjetivo possessivo, mine - pronome possessivo)",
					},
					{
						sentence_en:
							"They gave us their address. Theirs is on the next street.",
						translation_pt:
							"Eles nos deram o endereço deles. O deles é na próxima rua.",
					},
					{
						sentence_en: "Can you help us, please?",
						translation_pt: "Você pode nos ajudar, por favor?",
					},
					{
						sentence_en:
							"It is their responsibility. The responsibility is theirs.",
						translation_pt:
							"É responsabilidade deles. A responsabilidade é deles.",
					},
				],
				tags: ["básico", "pronomes", "posse"],
				common_mistakes_pt: `Confundir pronomes sujeito e objeto:<br />*Ex: Him went to the store.* (Incorreto) -&gt; *He went to the store.* (Correto)<br />*Ex: She gave the book to I.* (Incorreto) -&gt; *She gave the book to me.* (Correto)<br /><br />Confundir adjetivos possessivos com pronomes possessivos:<br />*Ex: This is mine book.* (Incorreto) -&gt; *This is my book.* ou *This book is mine.* (Correto)<br /><br />Usar apóstrofo em pronomes possessivos (exceto "<code>it's</code>" que é contração de "<code>it is</code>"):<br />*Ex: Her's car is red.* (Incorreto) -&gt; *Her car is red.* ou *The red car is hers.* (Correto)`,
			},
			{
				id: "reflexive-pronouns",
				title_pt: "Pronomes Reflexivos",
				title_en: "Reflexive Pronouns",
				explanation_pt: `Pronomes reflexivos (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) são usados quando o sujeito e o objeto de um verbo são a mesma pessoa ou coisa. Também podem ser usados para dar ênfase (significando "sozinho" ou "sem ajuda").`,
				examples: [
					{
						sentence_en: "I hurt myself playing football.",
						translation_pt: "Eu me machuquei jogando futebol.",
					},
					{
						sentence_en: "She taught herself to play the guitar.",
						translation_pt: "Ela aprendeu a tocar violão sozinha.",
					},
					{
						sentence_en: "He did it himself.",
						translation_pt: "Ele mesmo fez isso. (ênfase)",
					},
					{
						sentence_en: "We should be proud of ourselves.",
						translation_pt: "Nós deveríamos ter orgulho de nós mesmos.",
					},
					{
						sentence_en: "The cat cleans itself.",
						translation_pt: "O gato se limpa.",
					},
				],
				tags: ["intermediário", "pronomes", "reflexivos"],
				common_mistakes_pt: `Usar pronomes objeto em vez de reflexivos:<br />*Ex: I saw me in the mirror.* (Incorreto) -&gt; *I saw myself in the mirror.* (Correto)<br /><br />Usar formas incorretas como "<code>hisself</code>" ou "<code>theirselves</code>":<br />*Ex: He did it hisself.* (Incorreto) -&gt; *He did it himself.* (Correto)<br />*Ex: They bought it theirselves.* (Incorreto) -&gt; *They bought it themselves.* (Correto)`,
			},
			{
				id: "demonstrative-pronouns",
				title_pt: "Pronomes Demonstrativos",
				title_en: "Demonstrative Pronouns",
				explanation_pt: `Pronomes demonstrativos (this, that, these, those) apontam para pessoas ou coisas específicas. "This" (singular) e "these" (plural) referem-se a coisas próximas. "That" (singular) e "those" (plural) referem-se a coisas distantes.`,
				examples: [
					{
						sentence_en: "This is my car.",
						translation_pt: "Este é meu carro. (próximo)",
					},
					{
						sentence_en: "Are those your keys over there?",
						translation_pt: "Aquelas são suas chaves lá? (distante)",
					},
					{
						sentence_en: "I prefer these apples to those ones.",
						translation_pt:
							"Prefiro estas maçãs àquelas. (próximas vs distantes)",
					},
					{
						sentence_en: "That was a great movie!",
						translation_pt:
							"Aquele foi um ótimo filme! (algo que já passou ou está distante)",
					},
				],
				tags: ["básico", "pronomes", "demonstrativos"],
				common_mistakes_pt: `Confundir singular e plural:<br />*Ex: These is my book.* (Incorreto) -&gt; *This is my book.* ou *These are my books.* (Correto)<br />*Ex: That are my friends.* (Incorreto) -&gt; *Those are my friends.* ou *That is my friend.* (Correto)<br /><br />Usar "<code>this/that/these/those</code>" sem um referente claro pode causar confusão.`,
			},
		],
	},
	{
		id: "conjuncoes",
		name_pt: "Conjunções",
		name_en: "Conjunctions",
		description_pt:
			"Aprenda a conectar palavras, frases e orações usando conjunções.",
		icon: "Link",
		rules: [
			{
				id: "coordinating-conjunctions",
				title_pt: "Conjunções Coordenativas (FANBOYS)",
				title_en: "Coordinating Conjunctions (FANBOYS)",
				explanation_pt: `Conjunções coordenativas conectam palavras, frases ou orações independentes de igual importância. As principais são: For (pois), And (e), Nor (nem), But (mas, porém), Or (ou), Yet (contudo, no entanto), So (então, por isso).`,
				structure_format_pt: `[<strong>Oração Independente 1</strong>], + <strong>Conjunção</strong> (<code>and, but, or, so, etc.</code>) + [<strong>Oração Independente 2</strong>]`,
				structure_format_en: `[<strong>Independent Clause 1</strong>], + <strong>Conjunction</strong> (<code>and, but, or, so, etc.</code>) + [<strong>Independent Clause 2</strong>]`,
				examples: [
					{
						sentence_en: "I like tea, and he likes coffee.",
						translation_pt: "Eu gosto de chá, e ele gosta de café.",
					},
					{
						sentence_en: "She studied hard, but she didn't pass the exam.",
						translation_pt: "Ela estudou muito, mas não passou no exame.",
					},
					{
						sentence_en: "Do you want pizza or pasta?",
						translation_pt: "Você quer pizza ou macarrão?",
					},
					{
						sentence_en: "He was tired, so he went to bed early.",
						translation_pt: "Ele estava cansado, então foi para a cama cedo.",
					},
					{
						sentence_en: "She doesn't like apples, nor does she like pears.",
						translation_pt: "Ela não gosta de maçãs, nem de peras.",
					},
				],
				tags: ["básico", "conjunções", "estrutura"],
				common_mistakes_pt: `Usar vírgula incorretamente com conjunções coordenativas. Geralmente, uma vírgula é usada antes da conjunção quando ela conecta duas orações independentes:<br />*Ex: I like tea and he likes coffee.* (Aceitável, mas melhor com vírgula) -&gt; *I like tea, and he likes coffee.* (Preferível)<br /><br />Começar frases com conjunções coordenativas: Embora comum na fala e escrita informal, é tradicionalmente desencorajado na escrita formal, mas é cada vez mais aceito.`,
			},
			{
				id: "subordinating-conjunctions",
				title_pt: "Conjunções Subordinativas",
				title_en: "Subordinating Conjunctions",
				explanation_pt: `Conjunções subordinativas introduzem orações dependentes (subordinadas) e as conectam a uma oração independente (principal). Exemplos comuns incluem: although, because, since, if, when, while, unless, until, after, before, as, so that, whether.`,
				structure_format_pt: `<strong>Conj. Subordinada</strong> + [Oração Dependente], + [Oração Independente]<br />OU [Oração Independente] + <strong>Conj. Subordinada</strong> + [Oração Dependente]`,
				structure_format_en: `<strong>Subordinating Conj.</strong> + [Dependent Clause], + [Independent Clause]<br />OR [Independent Clause] + <strong>Subordinating Conj.</strong> + [Dependent Clause]`,
				examples: [
					{
						sentence_en: "I will go to the beach if the weather is good.",
						translation_pt: "Eu irei à praia se o tempo estiver bom.",
					},
					{
						sentence_en: "She was sad because her team lost.",
						translation_pt: "Ela estava triste porque seu time perdeu.",
					},
					{
						sentence_en: "Although it was raining, they went for a walk.",
						translation_pt: "Embora estivesse chovendo, eles foram caminhar.",
					},
					{
						sentence_en: "Wait here until I come back.",
						translation_pt: "Espere aqui até eu voltar.",
					},
					{
						sentence_en: "He studies hard so that he can get good grades.",
						translation_pt: "Ele estuda muito para que possa tirar boas notas.",
					},
				],
				tags: ["intermediário", "conjunções", "estrutura", "orações"],
				common_mistakes_pt: `Usar uma oração subordinada como se fosse uma frase completa (fragmento de frase):<br />*Ex: Because I was tired.* (Incorreto como frase completa) -&gt; *I went to bed early because I was tired.* (Correto)<br /><br />Uso incorreto de vírgulas com orações subordinadas: Se a oração subordinada vier antes da oração principal, use uma vírgula. Se vier depois, geralmente não é necessária vírgula.<br />*Ex: If it rains we will stay home.* (Incorreto) -&gt; *If it rains, we will stay home.* (Correto)<br />*Ex: We will stay home, if it rains.* (Vírgula geralmente desnecessária) -&gt; *We will stay home if it rains.* (Correto)`,
			},
		],
	},
	{
		id: "estrutura-frase",
		name_pt: "Estrutura da Frase",
		name_en: "Sentence Structure",
		description_pt:
			"Compreenda a organização básica de frases afirmativas, negativas e interrogativas em inglês.",
		icon: "AlignLeft",
		rules: [
			{
				id: "basic-sentence-structure",
				title_pt: "Estrutura Básica da Frase (SVO)",
				title_en: "Basic Sentence Structure (Subject-Verb-Object)",
				explanation_pt: `A ordem fundamental dos elementos na maioria das frases simples em inglês é Sujeito (S) - Verbo (V) - Objeto (O). Outros elementos, como advérbios e frases preposicionais, podem ser adicionados.`,
				structure_format_pt: `<strong>Sujeito</strong> + <strong>Verbo</strong> + <strong>Objeto</strong> (+ Advérbio/Lugar/Tempo) 🧱`,
				structure_format_en: `<strong>Subject</strong> + <strong>Verb</strong> + <strong>Object</strong> (+ Adverb/Place/Time) 🧱`,
				examples: [
					{
						sentence_en: "The dog (S) barks (V).",
						translation_pt: "O cachorro (S) late (V).",
					},
					{
						sentence_en: "Maria (S) reads (V) books (O).",
						translation_pt: "Maria (S) lê (V) livros (O).",
					},
					{
						sentence_en: "We (S) are learning (V) English (O) quickly (Adv).",
						translation_pt:
							"Nós (S) estamos aprendendo (V) inglês (O) rapidamente (Adv).",
					},
					{
						sentence_en:
							"She (S) put (V) the keys (O) on the table (Prepositional Phrase).",
						translation_pt:
							"Ela (S) colocou (V) as chaves (O) sobre a mesa (Locução Prepositiva).",
					},
				],
				tags: ["básico", "estrutura", "frases"],
				common_mistakes_pt: `Inverter a ordem sujeito-verbo em frases afirmativas (a menos que seja para ênfase ou estruturas específicas como inversões após advérbios negativos):<br />*Ex: Reads Maria books.* (Incorreto) -&gt; *Maria reads books.* (Correto)<br /><br />Omitir o sujeito, especialmente "<code>it</code>" para tempo, clima, etc.:<br />*Ex: Is raining.* (Incorreto) -&gt; *It is raining.* (Correto)`,
			},
			{
				id: "word-order-sentences",
				title_pt: "Ordem das Palavras na Frase",
				title_en: "Word Order in Sentences",
				explanation_pt: `A ordem padrão das palavras em frases afirmativas é Sujeito-Verbo-Objeto (SVO). Adjetivos geralmente vêm ANTES dos substantivos que modificam. Advérbios de modo frequentemente vêm após o verbo ou objeto. Advérbios de frequência (always, never, often) geralmente vêm ANTES do verbo principal (exceto o verbo "to be").`,
				structure_format_pt: `<strong>Sujeito</strong> + (Adv. Frequência) + <strong>Verbo</strong> + (Objeto) + (Adv. Modo/Lugar/Tempo)<br /><strong>Adjetivo</strong> + <strong>Substantivo</strong> 🎨`,
				structure_format_en: `<strong>Subject</strong> + (Adverb of Frequency) + <strong>Verb</strong> + (Object) + (Adverb of Manner/Place/Time)<br /><strong>Adjective</strong> + <strong>Noun</strong> 🎨`,
				examples: [
					{
						sentence_en:
							"She (S) quickly (Adv) ate (V) the delicious (Adj) cake (O).",
						translation_pt:
							"Ela (S) rapidamente (Adv) comeu (V) o delicioso (Adj) bolo (O).",
					},
					{
						sentence_en:
							"Beautiful (Adj) flowers (S) grow (V) in the garden (Prep. Phrase).",
						translation_pt:
							"Flores (S) bonitas (Adj) crescem (V) no jardim (Loc. Prep.).",
					},
					{
						sentence_en:
							"He (S) speaks (V) English (O) very well (Adv Phrase).",
						translation_pt:
							"Ele (S) fala (V) inglês (O) muito bem (Loc. Adverbial).",
					},
					{
						sentence_en:
							"I (S) always (Adv Freq) drink (V) coffee (O) in the morning.",
						translation_pt:
							"Eu (S) sempre (Adv Freq) bebo (V) café (O) de manhã.",
					},
					{
						sentence_en: "She (S) is (V) often (Adv Freq) late (Adj).",
						translation_pt:
							"Ela (S) está (V) frequentemente (Adv Freq) atrasada (Adj).",
					},
				],
				tags: ["básico", "estrutura", "ordem"],
				common_mistakes_pt: `Colocar adjetivos depois do substantivo:<br />*Ex: The car blue.* (Incorreto) -&gt; *The blue car.* (Correto)<br /><br />Posição incorreta de advérbios de frequência:<br />*Ex: Always I go to the park.* (Incorreto) -&gt; *I always go to the park.* (Correto)<br />*Ex: He is happy always.* (Incorreto) -&gt; *He is always happy.* (Correto)<br /><br />Posicionar advérbios de modo entre o verbo e o objeto direto:<br />*Ex: She ate quickly the food.* (Incorreto) -&gt; *She ate the food quickly.* ou *She quickly ate the food.* (Correto)`,
			},
			{
				id: "questions-interrogative",
				title_pt: "Perguntas (Frases Interrogativas)",
				title_en: "Questions (Interrogative Sentences)",
				explanation_pt: `Perguntas de Sim/Não (Yes/No questions) geralmente começam com um verbo auxiliar (do, does, did, am, is, are, was, were, have, has, had, can, will, etc.) seguido pelo sujeito e o verbo principal na forma base (para do/does/did). Perguntas Wh- (Wh-questions) começam com uma palavra interrogativa (what, where, when, why, who, whom, whose, which, how) seguida pela estrutura de pergunta (auxiliar + sujeito + verbo), exceto quando a palavra Wh- é o sujeito da frase.`,
				structure_format_pt: `<strong>Yes/No:</strong> Verbo Auxiliar + Sujeito + Verbo Principal (+ ...)? 🤔<br /><strong>Wh-Question:</strong> Palavra Wh- + Verbo Auxiliar + Sujeito + Verbo Principal (+ ...)? 🧐<br />(Exceção: Se Wh- é o sujeito: Palavra Wh- + Verbo Principal + ...?)`,
				structure_format_en: `<strong>Yes/No:</strong> Auxiliary Verb + Subject + Main Verb (+ ...)? 🤔<br /><strong>Wh-Question:</strong> Wh- Word + Auxiliary Verb + Subject + Main Verb (+ ...)? 🧐<br />(Exception: If Wh- is the subject: Wh- Word + Main Verb + ...?)`,
				examples: [
					{
						sentence_en: "Do you like ice cream?",
						translation_pt: "Você gosta de sorvete? (Yes/No)",
					},
					{
						sentence_en: "Is she coming to the party?",
						translation_pt: "Ela vem para a festa? (Yes/No)",
					},
					{
						sentence_en: "What is your name?",
						translation_pt: "Qual é o seu nome? (Wh-)",
					},
					{
						sentence_en: "Where do they live?",
						translation_pt: "Onde eles moram? (Wh-)",
					},
					{
						sentence_en: "Who called you?",
						translation_pt:
							"Quem te ligou? (Wh- como sujeito, sem inversão auxiliar)",
					},
					{
						sentence_en: "When did he arrive?",
						translation_pt: "Quando ele chegou?",
					},
				],
				tags: ["básico", "estrutura", "perguntas"],
				common_mistakes_pt: `Esquecer a inversão sujeito-auxiliar em perguntas Wh- (exceto quando Wh- é sujeito):<br />*Ex: Where she is going?* (Incorreto) -&gt; *Where is she going?* (Correto)<br /><br />Usar a forma flexionada do verbo principal com <code>do/does/did</code> em perguntas:<br />*Ex: Did he went home?* (Incorreto) -&gt; *Did he go home?* (Correto)<br />*Ex: Does she likes pizza?* (Incorreto) -&gt; *Does she like pizza?* (Correto)`,
			},
			{
				id: "negative-sentences",
				title_pt: "Frases Negativas",
				title_en: "Negative Sentences",
				explanation_pt: `Frases negativas são geralmente formadas adicionando "not" após o primeiro verbo auxiliar (e.g., is not, have not, cannot). Para verbos no Present Simple e Past Simple que não têm um auxiliar, usamos "do not" (don't), "does not" (doesn't) ou "did not" (didn't) antes da forma base do verbo.`,
				structure_format_pt: `Sujeito + <strong>Verbo Auxiliar</strong> + <code>not</code> + Verbo Principal... ⛔<br />OU Sujeito + <code>do/does/did</code> + <code>not</code> + <strong>Verbo Principal</strong> (forma base)... ⛔`,
				structure_format_en: `Subject + <strong>Auxiliary Verb</strong> + <code>not</code> + Main Verb... ⛔<br />OR Subject + <code>do/does/did</code> + <code>not</code> + <strong>Main Verb</strong> (base form)... ⛔`,
				examples: [
					{
						sentence_en: "I do not like coffee. (I don't like coffee)",
						translation_pt: "Eu não gosto de café.",
					},
					{
						sentence_en: "She is not tired. (She isn't tired)",
						translation_pt: "Ela não está cansada.",
					},
					{
						sentence_en: "They haven't finished yet.",
						translation_pt: "Eles ainda não terminaram.",
					},
					{
						sentence_en: "He cannot swim. (He can't swim)",
						translation_pt: "Ele não sabe nadar.",
					},
					{
						sentence_en: "We didn't go to the concert.",
						translation_pt: "Nós não fomos ao show.",
					},
				],
				tags: ["básico", "estrutura", "negativas"],
				common_mistakes_pt: `Usar a forma flexionada do verbo principal com <code>do/does/did</code> em negativas:<br />*Ex: He didn't knew the answer.* (Incorreto) -&gt; *He didn't know the answer.* (Correto)<br />*Ex: She doesn't wants to go.* (Incorreto) -&gt; *She doesn't want to go.* (Correto)<br /><br />Colocar "<code>not</code>" antes do verbo auxiliar (exceto em respostas curtas enfáticas):<br />*Ex: I not am ready.* (Incorreto) -&gt; *I am not ready.* (Correto)`,
			},
			{
				id: "types-of-clauses",
				title_pt: "Tipos de Orações (Cláusulas)",
				title_en: "Types of Clauses",
				explanation_pt: `Uma oração é um grupo de palavras contendo um sujeito e um verbo. Orações independentes (ou principais) expressam um pensamento completo e podem ficar sozinhas como uma frase. Orações dependentes (ou subordinadas) não expressam um pensamento completo e devem ser ligadas a uma oração independente para formar uma frase completa. Elas geralmente começam com uma conjunção subordinativa (e.g., because, if, when, although) ou um pronome relativo (e.g., who, which, that).`,
				examples: [
					{
						sentence_en: "The dog barked. (Independent clause)",
						translation_pt: "O cachorro latiu. (Oração independente)",
					},
					{
						sentence_en:
							"Because it was hungry... (Dependent clause - needs more context)",
						translation_pt:
							"Porque estava com fome... (Oração dependente - precisa de mais contexto)",
					},
					{
						sentence_en:
							"The dog barked because it was hungry. (Independent + Dependent)",
						translation_pt: "O cachorro latiu porque estava com fome.",
					},
					{
						sentence_en:
							"When she arrived, we started the meeting. (Dependent + Independent)",
						translation_pt: "Quando ela chegou, nós começamos a reunião.",
					},
					{
						sentence_en:
							'The book that I am reading is interesting. (Dependent adjective clause "that I am reading" modifying "book")',
						translation_pt:
							'O livro que estou lendo é interessante. (Oração adjetiva dependente "que estou lendo" modificando "livro")',
					},
				],
				tags: ["intermediário", "estrutura", "orações", "cláusulas"],
				common_mistakes_pt: `Usar uma oração dependente como se fosse uma frase completa (fragmento de frase):<br />*Ex: When I finish my work.* (Incorreto como frase completa) -&gt; *I will call you when I finish my work.* (Correto)<br /><br />"Run-on sentences" (frases corridas) - juntar duas ou mais orações independentes sem a pontuação ou conjunção correta:<br />*Ex: I like coffee she likes tea.* (Incorreto) -&gt; *I like coffee, and she likes tea.* OU *I like coffee. She likes tea.* (Correto)`,
			},
		],
	},
	{
		id: "numeros-tempo",
		name_pt: "Números e Tempo",
		name_en: "Numbers and Time",
		description_pt: "Aprenda a contar, dizer os números e as horas em inglês.",
		icon: "Sigma",
		rules: [
			{
				id: "counting-in-english",
				title_pt: "Contando em Inglês",
				title_en: "Counting in English",
				explanation_pt: `Aprender a contar em inglês é fundamental para a comunicação diária. Vamos explorar como expressar diferentes tipos de números:<br /><br />
        <strong>1. Números Cardinais (Quantidade)</strong> 🔢<br />Indicam quantidade (um, dois, três...).<br />
        <ul>
          <li><strong>1-10:</strong> one, two, three, four, five, six, seven, eight, nine, ten.</li>
          <li><strong>11-20:</strong> eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.</li>
          <li><strong>Dezenas:</strong> twenty (20), thirty (30), forty (40), fifty (50), sixty (60), seventy (70), eighty (80), ninety (90).
            <ul><li>Para números entre as dezenas (e.g., 21, 35), use um hífen: twenty-one, thirty-five.</li></ul>
          </li>
          <li><strong>Centenas e Maiores:</strong>
            <ul>
              <li>100: one hundred</li>
              <li>1,000: one thousand</li>
              <li>1,000,000: one million</li>
              <li>Para números como 150, dizemos "one hundred and fifty" (UK) ou "one hundred fifty" (US). Para 2,345: "two thousand, three hundred and forty-five".</li>
            </ul>
          </li>
        </ul><br />
        <strong>2. Números Ordinais (Ordem/Posição)</strong> 🥇🥈🥉<br />Indicam ordem ou posição (primeiro, segundo, terceiro...).<br />
        <ul>
          <li>Geralmente, adiciona-se "<code>-th</code>" ao número cardinal: four -&gt; fourth, six -&gt; sixth.</li>
          <li><strong>Exceções Importantes:</strong>
            <ul>
              <li>1 -&gt; first (1st)</li>
              <li>2 -&gt; second (2nd)</li>
              <li>3 -&gt; third (3rd)</li>
              <li>5 -&gt; fifth (5th) (<code>ve</code> muda para <code>f</code>)</li>
              <li>8 -&gt; eighth (8th) (<code>t</code> não é duplicado)</li>
              <li>9 -&gt; ninth (9th) (<code>e</code> é omitido)</li>
              <li>12 -&gt; twelfth (12th) (<code>ve</code> muda para <code>f</code>)</li>
            </ul>
          </li>
          <li>Para números terminados em "<code>-y</code>" (twenty, thirty), muda-se "<code>-y</code>" para "<code>-ie</code>" e adiciona-se "<code>-th</code>": twenty -&gt; twentieth, thirty -&gt; thirtieth.</li>
        </ul><br />
        <strong>3. Números Decimais</strong> 小数点<br />Lemos o ponto decimal como "<code>point</code>". Cada dígito após o ponto é lido individualmente.<br />
        <ul>
          <li>Exemplo: 3.14 -&gt; "three <code>point</code> one four"</li>
          <li>Exemplo: 0.5 -&gt; "zero <code>point</code> five" ou "nought <code>point</code> five" (UK)</li>
        </ul><br />
        <strong>4. Porcentagens</strong> %<br />Lemos o símbolo "%" como "<code>percent</code>".<br />
        <ul>
          <li>Exemplo: 25% -&gt; "twenty-five <code>percent</code>"</li>
          <li>Exemplo: 0.5% -&gt; "zero point five <code>percent</code>"</li>
        </ul><br />
        <strong>5. Anos</strong> 📅<br />
        <ul>
          <li>Até 1999: Geralmente divididos em duas partes. Ex: 1984 -&gt; "nineteen eighty-four".</li>
          <li>Anos terminados em 00-09 (e.g. 1905): "nineteen <code>oh</code>-five".</li>
          <li>A partir de 2000:
            <ul>
              <li>2000: "two thousand"</li>
              <li>2001-2009: "two thousand <code>and</code> one" (UK) / "two thousand one" (US), ... "two thousand <code>and</code> nine" / "two thousand nine".</li>
              <li>A partir de 2010: "twenty ten", "twenty twenty-three" ou "two thousand <code>and</code> twenty-three" / "two thousand twenty-three".</li>
            </ul>
          </li>
        </ul><br />
        <strong>6. Frações</strong> ¾<br />
        <ul>
          <li>1/2: "one half"</li>
          <li>1/3: "one third"</li>
          <li>1/4: "one quarter" (ou "one fourth")</li>
          <li>2/3: "two thirds"</li>
          <li>3/4: "three quarters" (ou "three fourths")</li>
          <li>Para numeradores maiores que 1, o denominador ordinal fica no plural (e.g., two fifths, three sixths).</li>
        </ul><br />
        <strong>7. Números Romanos</strong> 🏛️<br />
        Embora menos comuns no dia a dia, aparecem em relógios, nomes de monarcas, capítulos de livros, etc.<br />
        <ul>
          <li><strong>Símbolos Principais:</strong> I (1), V (5), X (10), L (50), C (100), D (500), M (1000).</li>
          <li><strong>Regras de Leitura:</strong>
            <ul>
              <li>Se um símbolo de menor valor vem antes de um de maior valor, subtrai-se (IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900).</li>
              <li>Caso contrário, somam-se os valores (VI = 6, XI = 11, CX = 110).</li>
              <li>Um símbolo não pode ser repetido mais de três vezes seguidas (III = 3, mas IIII não é usado para 4).</li>
            </ul>
          </li>
        </ul>`,
				structure_format_pt: `(Veja a explicação detalhada para estruturas específicas de cada tipo de número)`,
				structure_format_en: `(See detailed explanation for specific structures of each number type)`,
				examples: [
					{
						sentence_en: "I have three cats.",
						translation_pt: "Eu tenho três gatos.",
					},
					{
						sentence_en: "She is twenty-five years old.",
						translation_pt: "Ela tem vinte e cinco anos.",
					},
					{
						sentence_en: "This is the first time I visit this city.",
						translation_pt: "Esta é a primeira vez que visito esta cidade.",
					},
					{
						sentence_en: "My birthday is on the tenth of May.",
						translation_pt: "Meu aniversário é no dia dez de maio.",
					},
					{
						sentence_en: "He finished in second place.",
						translation_pt: "Ele terminou em segundo lugar.",
					},
					{
						sentence_en: "There are one hundred and fifty students.",
						translation_pt: "Há cento e cinquenta estudantes.",
					},
					{
						sentence_en: "The 5th (fifth) book in the series.",
						translation_pt: "O quinto livro da série.",
					},
					{
						sentence_en: "August 22nd (twenty-second).",
						translation_pt: "Dia 22 de agosto.",
					},
					{
						sentence_en: "The result is 3.14 (three point one four).",
						translation_pt: "O resultado é 3,14.",
					},
					{
						sentence_en: "Only 25% (twenty-five percent) of the students came.",
						translation_pt: "Apenas 25% dos alunos vieram.",
					},
					{
						sentence_en: "She was born in 1992 (nineteen ninety-two).",
						translation_pt: "Ela nasceu em 1992.",
					},
					{
						sentence_en:
							"We are in the year 2025 (twenty twenty-five or two thousand twenty-five).",
						translation_pt: "Estamos no ano de 2025.",
					},
					{
						sentence_en: "He ate 1/2 (one half) of the pizza.",
						translation_pt: "Ele comeu 1/2 (metade) da pizza.",
					},
					{
						sentence_en: "We need 3/4 (three quarters) of a cup of flour.",
						translation_pt:
							"Precisamos de 3/4 (três quartos) de xícara de farinha.",
					},
					{
						sentence_en: "King Charles III (the third).",
						translation_pt: "Rei Charles III (terceiro).",
					},
					{
						sentence_en: "Chapter IV (four) is interesting.",
						translation_pt: "O capítulo IV (quatro) é interessante.",
					},
					{
						sentence_en:
							"The movie was released in MCMXCIX (nineteen ninety-nine).",
						translation_pt:
							"O filme foi lançado em MCMXCIX (mil novecentos e noventa e nove).",
					},
				],
				tags: [
					"básico",
					"números",
					"contagem",
					"decimais",
					"porcentagens",
					"anos",
					"frações",
					"romanos",
				],
				common_mistakes_pt: `Confundir a pronúncia e escrita de "<code>thirteen</code>" (13) com "<code>thirty</code>" (30), "<code>fourteen</code>" (14) com "<code>forty</code>" (40), etc.<br />Escrever "<code>fourty</code>" em vez de "<code>forty</code>".<br />Formação incorreta de números ordinais: *Ex: "twoend" em vez de "second", "threeird" em vez de "third", "fiveth" em vez de "fifth", "nineth" em vez de "ninth".*<br />Ler números decimais usando "<code>comma</code>" (vírgula) em vez de "<code>point</code>" (ponto): *Ex: Para 3.14, dizer "three comma one four" (Incorreto) -&gt; "three point one four" (Correto).*<br />Ao ler anos como 1905, dizer "nineteen five" (Incorreto) -&gt; "nineteen <code>oh</code>-five" (Correto).<br />Para porcentagens, esquecer de dizer "<code>percent</code>": *Ex: "It's twenty-five." (Incompleto se o contexto for porcentagem) -&gt; "It's twenty-five percent." (Correto).*<br />Para frações, usar o singular no denominador quando o numerador é maior que um: *Ex: "two third" (Incorreto) -&gt; "two thirds" (Correto).*<br /><strong>Números Romanos:</strong> Confundir a regra subtrativa. *Ex: Ler "IX" como onze (Incorreto) em vez de nove (Correto).* Repetir símbolos subtrativos ou V, L, D. *Ex: "VV" para 10 (Incorreto, use X).*`,
			},
			{
				id: "telling-time",
				title_pt: "Dizendo as Horas em Inglês",
				title_en: "Telling Time in English",
				explanation_pt: `Existem várias maneiras de dizer as horas em inglês:<br /><br />1.  <strong>"O'clock"</strong> ⏰: Usado para horas exatas.<br />2.  <strong>"Past" e "To"</strong> ⏳: "<code>Past</code>" (passado de) é usado para minutos de 1 a 30. "<code>To</code>" (para) é usado para minutos de 31 a 59, referindo-se à próxima hora.<br />    <ul><li>"<code>Quarter past</code>" = 15 minutos depois da hora.</li><li>"<code>Half past</code>" = 30 minutos depois da hora.</li><li>"<code>Quarter to</code>" = 15 minutos antes da próxima hora.</li></ul>3.  <strong>Formato Digital</strong>: Simplesmente diga a hora e depois os minutos.<br /><br />Para perguntar as horas: "What time is it?" ou "What's the time?". Mais formal: "Could you tell me the time, please?".`,
				structure_format_pt: `<strong>Hora exata:</strong> It's [Hora] <code>o'clock</code>.<br /><strong>Minutos 1-30:</strong> It's [Minutos] <code>past</code> [Hora].<br /><strong>Minutos 31-59:</strong> It's [Minutos para próxima hora] <code>to</code> [Próxima Hora].<br /><strong>Formato Digital:</strong> It's [Hora] [Minutos].`,
				structure_format_en: `<strong>Exact hour:</strong> It's [Hour] <code>o'clock</code>.<br /><strong>Minutes 1-30:</strong> It's [Minutes] <code>past</code> [Hour].<br /><strong>Minutes 31-59:</strong> It's [Minutes to next hour] <code>to</code> [Next Hour].<br /><strong>Digital Format:</strong> It's [Hour] [Minutes].`,
				examples: [
					{
						sentence_en: "It's nine o'clock.",
						translation_pt: "São nove horas em ponto.",
					},
					{
						sentence_en: "It's five past ten. (10:05)",
						translation_pt: "São dez e cinco.",
					},
					{
						sentence_en: "It's a quarter past three. (3:15)",
						translation_pt: "São três e quinze.",
					},
					{
						sentence_en: "It's half past six. (6:30)",
						translation_pt: "São seis e meia.",
					},
					{
						sentence_en: "It's twenty to eleven. (10:40)",
						translation_pt:
							"São vinte para as onze. / Faltam vinte para as onze.",
					},
					{
						sentence_en: "It's a quarter to one. (12:45)",
						translation_pt:
							"São quinze para a uma. / Falta um quarto para a uma.",
					},
					{
						sentence_en: "The time is two thirty-five. (2:35 - digital)",
						translation_pt: "São duas e trinta e cinco.",
					},
					{
						sentence_en:
							"What time is the meeting? It's at four fifteen. (4:15 - digital)",
						translation_pt: "Que horas é a reunião? É às quatro e quinze.",
					},
					{ sentence_en: "It's noon.", translation_pt: "É meio-dia." },
					{ sentence_en: "It's midnight.", translation_pt: "É meia-noite." },
				],
				tags: ["básico", "horas", "tempo"],
				common_mistakes_pt: `Confundir "<code>past</code>" e "<code>to</code>". *Ex: Para 7:10, dizer "It's ten to seven" (Incorreto) em vez de "It's ten past seven" (Correto).*<br />Uso incorreto de artigos: *Ex: "It's a half past two" (Incorreto) -&gt; "It's half past two" (Correto).*<br />Para minutos como :05, não omitir o "<code>oh</code>" no formato digital se preferir (e.g., "seven oh five" para 7:05 é comum, mas "seven five" também é aceitável).`,
			},
		],
	},
	{
		id: "phrasal-verbs",
		name_pt: "Phrasal Verbs",
		name_en: "Phrasal Verbs",
		description_pt:
			"Aprenda os verbos frasais mais comuns e seus significados.",
		icon: "Link",
		rules: [
			{
				id: "common-phrasal-verbs",
				title_pt: "Phrasal Verbs Comuns",
				title_en: "Common Phrasal Verbs",
				explanation_pt: `Phrasal verbs são combinações de um verbo com uma preposição ou advérbio (ou ambos), que juntos criam um novo significado, muitas vezes diferente do significado original do verbo. Eles são muito comuns no inglês falado e escrito.`,
				examples: [
					{
						sentence_en: "I need to look up this word in the dictionary.",
						translation_pt:
							"Preciso procurar esta palavra no dicionário. (look up = pesquisar)",
					},
					{
						sentence_en: "She broke down when she heard the news.",
						translation_pt:
							"Ela desabou quando ouviu a notícia. (break down = desabar emocionalmente)",
					},
					{
						sentence_en: "He gave up smoking last year.",
						translation_pt:
							"Ele parou de fumar ano passado. (give up = desistir)",
					},
					{
						sentence_en: "Can you turn off the lights?",
						translation_pt: "Você pode apagar as luzes? (turn off = desligar)",
					},
					{
						sentence_en: "They called off the meeting.",
						translation_pt: "Eles cancelaram a reunião. (call off = cancelar)",
					},
				],
				tags: ["intermediário", "phrasal verbs"],
				common_mistakes_pt: `Confundir o significado de phrasal verbs com o significado literal das palavras.<br />*Ex: "Look up" não significa "olhar para cima" neste contexto, mas "pesquisar".*<br /><br />Posicionamento incorreto do objeto em phrasal verbs separáveis:<br />*Ex: Turn the lights off.* (Correto) vs *Turn off the lights.* (Correto)<br />*Ex: Turn off them.* (Incorreto) -&gt; *Turn them off.* (Correto - pronomes sempre entre o verbo e a partícula)`,
			},
		],
	},
	{
		id: "linguagem-informal",
		name_pt: "Linguagem Informal e Gírias",
		name_en: "Informal Language and Slang",
		description_pt:
			"Entenda como os nativos falam no dia a dia, incluindo gírias e contrações.",
		icon: "MessageCircle",
		rules: [
			{
				id: "informal-contractions",
				title_pt: "Contrações Informais (Gonna, Wanna, Gotta)",
				title_en: "Informal Contractions (Gonna, Wanna, Gotta)",
				explanation_pt: `Na fala rápida e informal, muitas palavras se juntam. Estas formas NÃO devem ser usadas em escrita formal (emails de trabalho, provas), mas são essenciais para entender filmes, músicas e nativos.`,
				structure_format_pt: `<strong>Going to</strong> -> <code>Gonna</code><br /><strong>Want to</strong> -> <code>Wanna</code><br /><strong>Got to</strong> -> <code>Gotta</code><br /><strong>Let me</strong> -> <code>Lemme</code><br /><strong>Give me</strong> -> <code>Gimme</code>`,
				structure_format_en: `<strong>Going to</strong> -> <code>Gonna</code><br /><strong>Want to</strong> -> <code>Wanna</code><br /><strong>Got to</strong> -> <code>Gotta</code><br /><strong>Let me</strong> -> <code>Lemme</code><br /><strong>Give me</strong> -> <code>Gimme</code>`,
				examples: [
					{
						sentence_en: "I'm gonna study later.",
						translation_pt: "Eu vou estudar mais tarde. (I am going to study)",
					},
					{
						sentence_en: "I wanna go home.",
						translation_pt: "Eu quero ir para casa. (I want to go)",
					},
					{
						sentence_en: "I gotta go.",
						translation_pt: "Eu tenho que ir. (I have got to go)",
					},
					{
						sentence_en: "Gimme five minutes.",
						translation_pt: "Me dá cinco minutos. (Give me)",
					},
					{
						sentence_en: "Lemme help you.",
						translation_pt: "Deixa eu te ajudar. (Let me)",
					},
				],
				tags: ["avançado", "informal", "fala"],
				common_mistakes_pt: `Usar essas formas em escrita formal.<br /><br />Usar "<code>wanna</code>" com terceira pessoa (she/he/it):<br />*Ex: She wanna go.* (Incorreto) -> *She wants to go.* (Correto - "wanna" não carrega o "s")`,
			},
			{
				id: "slang-internet",
				title_pt: "Gírias de Internet (Internet Slang)",
				title_en: "Internet Slang",
				explanation_pt: `A internet tem sua própria linguagem, cheia de abreviações e acrônimos.`,
				examples: [
					{
						sentence_en: "LOL (Laughing Out Loud)",
						translation_pt: "Rindo muito alto (usado para algo engraçado)",
					},
					{ sentence_en: "BRB (Be Right Back)", translation_pt: "Volto já" },
					{ sentence_en: "IDK (I Don't Know)", translation_pt: "Eu não sei" },
					{
						sentence_en: "TBH (To Be Honest)",
						translation_pt: "Para ser honesto",
					},
					{
						sentence_en: "IMO (In My Opinion)",
						translation_pt: "Na minha opinião",
					},
				],
				tags: ["avançado", "internet", "vocabulario"],
				common_mistakes_pt: `Usar essas siglas na fala (embora "LOL" e "OMG" sejam às vezes falados, a maioria é apenas escrita).`,
			},
		],
	},
	{
		id: "gramatica-avancada-2",
		name_pt: "Gramática Avançada II",
		name_en: "Advanced Grammar II",
		description_pt: "Estruturas sofisticadas para atingir a fluência.",
		icon: "Brain",
		rules: [
			{
				id: "inversion-emphasis",
				title_pt: "Inversão para Ênfase",
				title_en: "Inversion for Emphasis",
				explanation_pt: `Em inglês formal e literário, podemos inverter a ordem do sujeito e do verbo auxiliar após certos advérbios negativos ou restritivos (never, rarely, seldom, hardly, no sooner, etc.) para dar ênfase dramática ou retórica.`,
				structure_format_pt: `<strong>Advérbio Negativo</strong> + <strong>Auxiliar</strong> + <strong>Sujeito</strong> + <strong>Verbo Principal</strong>...`,
				structure_format_en: `<strong>Negative Adverb</strong> + <strong>Auxiliary</strong> + <strong>Subject</strong> + <strong>Main Verb</strong>...`,
				examples: [
					{
						sentence_en: "Never have I seen such a beautiful sunset.",
						translation_pt: "Nunca vi um pôr do sol tão bonito.",
					},
					{
						sentence_en: "Rarely does he visit us anymore.",
						translation_pt: "Raramente ele nos visita agora.",
					},
					{
						sentence_en: "Not only is she smart, but she is also kind.",
						translation_pt:
							"Ela não apenas é inteligente, mas também é gentil.",
					},
					{
						sentence_en: "Under no circumstances should you open this door.",
						translation_pt: "Em hipótese alguma você deve abrir esta porta.",
					},
				],
				tags: ["avançado", "inversão", "ênfase"],
				common_mistakes_pt: `Esquecer de inverter o sujeito e auxiliar.<br />*Ex: Never I have seen...* (Incorreto na inversão) -> *Never have I seen...* (Correto)<br />Usar em conversas informais casuais (pode soar muito dramático ou arcaico).`,
			},
			{
				id: "subjunctive-mood",
				title_pt: "Modo Subjuntivo",
				title_en: "Subjunctive Mood",
				explanation_pt: `O modo subjuntivo é usado para explorar condições hipotéticas ou expressar desejos, comandos, ou sugestões. É comum após verbos como suggest, recommend, insist, demand. A forma do verbo é a "base form" (infinitivo sem to), mesmo para he/she/it.`,
				structure_format_pt: `Sujeito + (suggest/insist/recommend) + that + Sujeito + <strong>Verbo (Forma Base)</strong>`,
				structure_format_en: `Subject + (suggest/insist/recommend) + that + Subject + <strong>Verb (Base Form)</strong>`,
				examples: [
					{
						sentence_en: "I suggest that he study more.",
						translation_pt:
							'Eu sugiro que ele estude mais. (Note: "study", não "studies")',
					},
					{
						sentence_en: "It is important that she be on time.",
						translation_pt:
							'É importante que ela esteja na hora. (Note: "be", não "is")',
					},
					{
						sentence_en: "The doctor recommended that he stop smoking.",
						translation_pt: "O médico recomendou que ele parasse de fumar.",
					},
					{
						sentence_en: "I insist that you come with us.",
						translation_pt: "Eu insisto que você venha conosco.",
					},
				],
				tags: ["avançado", "subjuntivo", "formal"],
				common_mistakes_pt: `Conjugar o verbo na terceira pessoa do singular.<br />*Ex: I suggest that he goes.* (Comum na fala informal, mas tecnicamente incorreto no subjuntivo formal) -> *I suggest that he go.* (Correto formalmente)`,
			},
		],
	},
	{
		id: "fluency-grammar",
		name_pt: "Gramática da Fluência",
		name_en: "Fluency Grammar",
		description_pt:
			"Estruturas de elite para atingir o nível C2 de proficiência.",
		icon: "Sparkles",
		rules: [
			{
				id: "mixed-conditionals",
				title_pt: "Mixed Conditionals",
				title_en: "Mixed Conditionals",
				explanation_pt: `As Mixed Conditionals misturam tempos verbais de diferentes tipos de condicionais (geralmente a 2ª e a 3ª) para expressar situações onde o tempo da condição é diferente do tempo do resultado.`,
				structure_format_pt: `<strong>Passado Irreal (3rd) + Presente Irreal (2nd):</strong> Se algo tivesse acontecido no passado, o presente seria diferente.<br /><strong>Presente Irreal (2nd) + Passado Irreal (3rd):</strong> Se algo fosse verdade agora (estado permanente), o passado teria sido diferente.`,
				structure_format_en: `<strong>Past Unreal (3rd) + Present Unreal (2nd):</strong> If something had happened in the past, the present would be different.<br /><strong>Present Unreal (2nd) + Past Unreal (3rd):</strong> If something were true now (state), the past would have been different.`,
				examples: [
					{
						sentence_en:
							"If I had studied harder (past), I would have a better job now (present).",
						translation_pt:
							"Se eu tivesse estudado mais, eu teria um emprego melhor agora.",
					},
					{
						sentence_en:
							"If I were fluent in English (present state), I would have got the job (past result).",
						translation_pt:
							"Se eu fosse fluente em inglês, eu teria conseguido o emprego.",
					},
				],
				tags: ["avançado", "condicionais", "mixed"],
				common_mistakes_pt: `Não misturar os tempos corretamente e usar apenas a 3ª ou 2ª condicional pura quando a situação exige tempos diferentes.`,
			},
			{
				id: "cleft-sentences",
				title_pt: "Cleft Sentences (Frases Clivadas)",
				title_en: "Cleft Sentences",
				explanation_pt: `Cleft sentences são usadas para conectar o que já é entendido com o que é novo, dando foco a uma parte específica da frase. Elas "dividem" (cleft) a frase em duas partes.`,
				structure_format_pt: `<strong>It Cleft:</strong> It + be + [FOCO] + that/who...<br /><strong>Wh- Cleft:</strong> What + [sujeito + verbo] + be + [FOCO]`,
				structure_format_en: `<strong>It Cleft:</strong> It + be + [FOCUS] + that/who...<br /><strong>Wh- Cleft:</strong> What + [subject + verb] + be + [FOCUS]`,
				examples: [
					{
						sentence_en: "It was John who broke the window.",
						translation_pt: "Foi o John que quebrou a janela. (Foco em John)",
					},
					{
						sentence_en: "What I need is a coffee.",
						translation_pt: "O que eu preciso é de um café. (Foco em café)",
					},
					{
						sentence_en: "It is in London that they live.",
						translation_pt: "É em Londres que eles moram.",
					},
				],
				tags: ["avançado", "ênfase", "estrutura"],
				common_mistakes_pt: `Esquecer o verbo "to be" ou usar o pronome relativo errado.`,
			},
			{
				id: "participle-clauses",
				title_pt: "Participle Clauses",
				title_en: "Participle Clauses",
				explanation_pt: `Orações participiais usam particípios presentes (-ing) ou passados (-ed/3ª coluna) para encurtar orações e torná-las mais fluidas. São muito comuns na escrita formal e literária.`,
				structure_format_pt: `<strong>Present Participle (-ing):</strong> Para ações simultâneas ou ativas.<br /><strong>Past Participle (-ed):</strong> Para ações passivas or resultados.`,
				structure_format_en: `<strong>Present Participle (-ing):</strong> For simultaneous or active actions.<br /><strong>Past Participle (-ed):</strong> For passive actions or results.`,
				examples: [
					{
						sentence_en: "Walking down the street, I met an old friend.",
						translation_pt:
							"Caminhando pela rua, encontrei um velho amigo. (Enquanto caminhava...)",
					},
					{
						sentence_en: "Shocked by the news, she couldn't speak.",
						translation_pt:
							"Chocada com a notícia, ela não conseguia falar. (Porque estava chocada...)",
					},
					{
						sentence_en: "Having finished his work, he went home.",
						translation_pt:
							"Tendo terminado seu trabalho, ele foi para casa. (Depois que terminou...)",
					},
				],
				tags: ["avançado", "estrutura", "escrita"],
				common_mistakes_pt: `Dangling Participle: Quando o sujeito da oração participial não é o mesmo da oração principal.<br />*Ex: Walking down the street, the trees were beautiful.* (Incorreto - As árvores estavam caminhando?) -> *Walking down the street, I saw beautiful trees.*`,
			},
			{
				id: "future-perfect-continuous",
				title_pt: "Future Perfect Continuous",
				title_en: "Future Perfect Continuous",
				explanation_pt: `Usado para enfatizar a duração de uma ação que continuará até um ponto específico no futuro.`,
				structure_format_pt: `Sujeito + <code>will have been</code> + <strong>Verbo-ing</strong>`,
				structure_format_en: `Subject + <code>will have been</code> + <strong>Verb-ing</strong>`,
				examples: [
					{
						sentence_en:
							"By next year, I will have been working here for 10 years.",
						translation_pt:
							"No ano que vem, eu estarei trabalhando aqui há 10 anos.",
					},
					{
						sentence_en:
							"She will have been driving for 6 hours by the time she arrives.",
						translation_pt: "Ela estará dirigindo há 6 horas quando chegar.",
					},
				],
				tags: ["avançado", "futuro", "tempos"],
				common_mistakes_pt: `Usar verbos de estado (stative verbs) que não aceitam forma contínua (ex: know, like, believe).`,
			},
		],
	},
];

const rulesMap: Record<string, GrammarRule> = {};
for (const category of grammarCategories) {
	for (const rule of category.rules) {
		rulesMap[rule.id] = rule;
	}
}

export const getRuleById = (ruleId: string): GrammarRule | undefined => {
	return rulesMap[ruleId];
};

export const getCategoryById = (
	categoryId: string,
): GrammarCategory | undefined => {
	return grammarCategories.find((c) => c.id === categoryId);
};

export const findRuleCategory = (ruleId: string): string | null => {
	for (const category of grammarCategories) {
		if (category.rules.some((r) => r.id === ruleId)) {
			return category.id;
		}
	}
	return null;
};
