import type { GrammarCategory } from "./grammarRules";

export const grammarStructures: GrammarCategory = {
	id: "estruturas",
	name_pt: "Estruturas Essenciais",
	name_en: "Essential Structures",
	description_pt:
		"Voz passiva, discurso indireto e orações relativas: para entender e produzir textos mais ricos.",
	icon: "Layers",
	rules: [
		{
			id: "passive-voice",
			title_pt: "Voz Passiva (a ação vista de outro ângulo)",
			title_en: "Passive Voice",
			explanation_pt:
				"Na <strong>voz ativa</strong>, quem faz a ação vem primeiro: <em>The chef <strong>cooked</strong> the meal</em> (o chef cozinhou a refeição).<br/><br/>Na <strong>voz passiva</strong>, o foco vai para a <strong>ação/objeto</strong>, e usamos <strong>to be + particípio</strong>: <em>The meal <strong>was cooked</strong> by the chef</em> (a refeição foi cozinhada pelo chef). Use quando quem fez a ação não importa ou é desconhecido.",
			structure_format_pt:
				"Objeto + <strong>to be</strong> + particípio (+ by + agente)<br/>Presente: The house <strong>is built</strong>.<br/>Passado: The house <strong>was built</strong>.<br/>Futuro: The house <strong>will be built</strong>.",
			examples: [
				{
					sentence_en: "English is spoken all over the world.",
					translation_pt: "Inglês é falado no mundo todo.",
				},
				{
					sentence_en: "The letter was sent yesterday.",
					translation_pt: "A carta foi enviada ontem.",
				},
				{
					sentence_en: "This bridge was built in 1990.",
					translation_pt: "Esta ponte foi construída em 1990.",
				},
				{
					sentence_en: "The results will be announced tomorrow.",
					translation_pt: "Os resultados serão anunciados amanhã.",
				},
			],
			common_mistakes_pt:
				"Use o <strong>particípio</strong>, não o passado simples, quando forem diferentes:<br/>❌ The book was wrote by her. &nbsp; ✅ The book was <strong>written</strong> by her.<br/><br/>E não esqueça o <em>to be</em>: ❌ The house built in 1990. ✅ The house <strong>was</strong> built in 1990.",
			tags: ["B1", "estrutura"],
		},
		{
			id: "reported-speech",
			title_pt: "Discurso Indireto (reported speech)",
			title_en: "Reported Speech",
			explanation_pt:
				"Quando você conta o que alguém disse, sem repetir as palavras exatas, usa o <strong>discurso indireto</strong>. O tempo verbal <strong>recua um passo</strong>: presente → passado, passado → past perfect, will → would.<br/><br/>Direto: <em>I am tired</em>. Indireto: <em>She said she <strong>was</strong> tired</em>.",
			structure_format_pt:
				"am/is → was | are → were | do → did<br/>will → would | can → could | have → had<br/>She said (that) + frase recuada",
			examples: [
				{
					sentence_en: "He said he was busy.",
					translation_pt: "Ele disse que estava ocupado. (I am → he was)",
				},
				{
					sentence_en: "She told me she would call.",
					translation_pt: "Ela me disse que ligaria. (will → would)",
				},
				{
					sentence_en: "They said they had finished.",
					translation_pt:
						"Eles disseram que tinham terminado. (finished → had finished)",
				},
				{
					sentence_en: "He asked if I could help.",
					translation_pt: "Ele perguntou se eu podia ajudar. (can → could)",
				},
			],
			common_mistakes_pt:
				"Use <strong>tell</strong> com a pessoa (tell <em>me</em>) e <strong>say</strong> sem ela:<br/>❌ She said me. &nbsp; ✅ She <strong>told me</strong>. / She <strong>said</strong> (that)...<br/><br/>Não esqueça de recuar o tempo: ❌ He said he is tired. ✅ He said he <strong>was</strong> tired.",
			tags: ["B1", "estrutura"],
		},
		{
			id: "relative-clauses",
			title_pt: "Orações Relativas (who, which, that)",
			title_en: "Relative Clauses",
			explanation_pt:
				"As <strong>relative clauses</strong> juntam duas ideias numa só, dando mais informação sobre algo sem repetir o nome.<br/><br/><strong>who</strong> para pessoas, <strong>which</strong> para coisas, <strong>that</strong> para os dois. <em>The woman <strong>who</strong> lives next door is a doctor</em> (a mulher que mora ao lado é médica).",
			structure_format_pt:
				"who → pessoas<br/>which → coisas / animais<br/>that → pessoas e coisas (mais informal)<br/>whose → posse (a pessoa cujo...)<br/><br/>The book <strong>that</strong> I bought is great.",
			examples: [
				{
					sentence_en: "The man who called is my uncle.",
					translation_pt: "O homem que ligou é meu tio.",
				},
				{
					sentence_en: "This is the phone which I lost.",
					translation_pt: "Este é o celular que eu perdi.",
				},
				{
					sentence_en: "I have a friend who speaks five languages.",
					translation_pt: "Eu tenho um amigo que fala cinco línguas.",
				},
				{
					sentence_en: "That's the girl whose father is a pilot.",
					translation_pt: "Aquela é a menina cujo pai é piloto.",
				},
			],
			common_mistakes_pt:
				"Não use <em>that</em> depois de vírgula em informação extra:<br/>❌ My mom, that is a nurse, ... ✅ My mom, <strong>who</strong> is a nurse, ...<br/><br/>E não repita o pronome: ❌ The man who he called... ✅ The man <strong>who</strong> called...",
			tags: ["B1", "estrutura"],
		},
	],
};
