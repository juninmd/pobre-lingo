import type { GrammarCategory } from "./grammarRules";

export const grammarFoundationsBuild: GrammarCategory = {
	id: "fundamentos-2",
	name_pt: "Construindo Frases",
	name_en: "Building Sentences",
	description_pt:
		"Ferramentas do dia a dia: pronomes objeto, possessivo, quantidades e como dar ordens e instruções.",
	icon: "Blocks",
	rules: [
		{
			id: "object-pronouns",
			title_pt: "Pronomes Objeto (me, him, her...)",
			title_en: "Object Pronouns",
			explanation_pt:
				"Quando a pessoa <strong>recebe</strong> a ação (não pratica), usamos o pronome objeto: <strong>me</strong> (me/mim), <strong>you</strong> (te/você), <strong>him</strong> (o/lhe), <strong>her</strong> (a/lhe), <strong>it</strong>, <strong>us</strong> (nos), <strong>them</strong> (os/lhes).<br/><br/>Truque: pergunte 'quem faz?' → sujeito (I/he). 'Quem recebe?' → objeto (me/him).",
			structure_format_pt:
				"Sujeito → Objeto: I→<strong>me</strong> | he→<strong>him</strong> | she→<strong>her</strong> | we→<strong>us</strong> | they→<strong>them</strong> | you→you | it→it",
			examples: [
				{ sentence_en: "She loves me.", translation_pt: "Ela me ama." },
				{
					sentence_en: "I called him yesterday.",
					translation_pt: "Eu liguei para ele ontem.",
				},
				{ sentence_en: "Please help us.", translation_pt: "Por favor, nos ajude." },
				{
					sentence_en: "I saw them at the party.",
					translation_pt: "Eu os vi na festa.",
				},
			],
			common_mistakes_pt:
				"❌ She loves I. &nbsp; ✅ She loves <strong>me</strong>.<br/><br/>Depois de preposição (with, for, to) também vai o pronome objeto: with <strong>him</strong>, não with he.",
			tags: ["A1", "pronome"],
		},
		{
			id: "possessive-s",
			title_pt: "Possessivo com apóstrofo + s (de quem é)",
			title_en: "Possessive 's",
			explanation_pt:
				"Para dizer que algo <strong>pertence</strong> a alguém, adicionamos <strong>'s</strong> ao dono: <strong>John's car</strong> (o carro do John), <strong>my mother's name</strong> (o nome da minha mãe).<br/><br/>A ordem é o <strong>oposto</strong> do português: em inglês vem primeiro o <strong>dono</strong>, depois a coisa.",
			structure_format_pt:
				"Pessoa + <strong>'s</strong> + coisa → Maria<strong>'s</strong> house (a casa da Maria)<br/>Plural terminado em -s: só o apóstrofo → my parents<strong>'</strong> house",
			examples: [
				{ sentence_en: "This is Ana's phone.", translation_pt: "Este é o telefone da Ana." },
				{
					sentence_en: "My brother's room is big.",
					translation_pt: "O quarto do meu irmão é grande.",
				},
				{
					sentence_en: "The students' books are new.",
					translation_pt: "Os livros dos alunos são novos (plural).",
				},
				{
					sentence_en: "It's Pedro's birthday.",
					translation_pt: "É o aniversário do Pedro.",
				},
			],
			common_mistakes_pt:
				"Não misture com o verbo <em>is</em>:<br/>❌ Ana her phone. &nbsp; ✅ Ana<strong>'s</strong> phone.<br/><br/>E evite 'of' com pessoas: 'the car of John' soa estranho. Diga <strong>John's car</strong>.",
			tags: ["A1"],
		},
		{
			id: "some-any",
			title_pt: "some / any (algum, nenhum, um pouco)",
			title_en: "Some / Any",
			explanation_pt:
				"Use <strong>some</strong> em frases <strong>afirmativas</strong> e <strong>any</strong> em <strong>negativas</strong> e <strong>perguntas</strong>.<br/><br/>Detalhe importante: em <strong>ofertas e pedidos</strong>, mesmo sendo pergunta, usa-se <strong>some</strong> (Would you like some tea?).",
			structure_format_pt:
				"Afirmativa: I have <strong>some</strong> money.<br/>Negativa: I don't have <strong>any</strong> money.<br/>Pergunta: Do you have <strong>any</strong> money?",
			examples: [
				{
					sentence_en: "There is some water in the glass.",
					translation_pt: "Tem um pouco de água no copo.",
				},
				{
					sentence_en: "I don't have any questions.",
					translation_pt: "Eu não tenho nenhuma pergunta.",
				},
				{
					sentence_en: "Do you need any help?",
					translation_pt: "Você precisa de alguma ajuda?",
				},
				{
					sentence_en: "Would you like some coffee?",
					translation_pt: "Você gostaria de um café? (oferta → some)",
				},
			],
			common_mistakes_pt:
				"Não use <em>some</em> em negativa:<br/>❌ I don't have some time.<br/>✅ I don't have <strong>any</strong> time.",
			tags: ["A1"],
		},
		{
			id: "much-many",
			title_pt: "much / many / a lot of (muito)",
			title_en: "Much / Many / A lot of",
			explanation_pt:
				"Todos significam 'muito', mas combinam com tipos diferentes de substantivo:<br/><strong>many</strong> + coisas contáveis (many books); <strong>much</strong> + incontáveis (much water); <strong>a lot of</strong> serve para os dois e é o mais usado no dia a dia.",
			structure_format_pt:
				"many + plural (books, friends)<br/>much + incontável (water, money, time)<br/>a lot of + os dois (mais natural na afirmativa)",
			examples: [
				{ sentence_en: "I have many friends.", translation_pt: "Eu tenho muitos amigos." },
				{
					sentence_en: "She doesn't have much time.",
					translation_pt: "Ela não tem muito tempo.",
				},
				{
					sentence_en: "There are a lot of people here.",
					translation_pt: "Tem muita gente aqui.",
				},
				{ sentence_en: "How much is it?", translation_pt: "Quanto custa?" },
			],
			common_mistakes_pt:
				"❌ much books &nbsp; ✅ <strong>many</strong> books<br/><br/>Na afirmativa, prefira <strong>a lot of</strong>: 'I have a lot of work' soa mais natural que 'much work'.",
			tags: ["A1"],
		},
		{
			id: "imperative",
			title_pt: "Imperativo (ordens, pedidos e instruções)",
			title_en: "The Imperative",
			explanation_pt:
				"O imperativo serve para dar <strong>ordens, pedidos e instruções</strong>. É o verbo no início, <strong>sem sujeito</strong>.<br/><br/>Afirmativo: só o verbo (<strong>Close</strong> the door!). Negativo: <strong>Don't</strong> + verbo (<strong>Don't</strong> touch!).",
			structure_format_pt:
				"Afirmativo: <strong>Verbo</strong> + complemento → Open the window!<br/>Negativo: <strong>Don't</strong> + verbo → Don't run!",
			examples: [
				{
					sentence_en: "Close the door, please.",
					translation_pt: "Feche a porta, por favor.",
				},
				{
					sentence_en: "Don't forget your keys!",
					translation_pt: "Não esqueça suas chaves!",
				},
				{
					sentence_en: "Turn left at the corner.",
					translation_pt: "Vire à esquerda na esquina.",
				},
				{ sentence_en: "Please, be quiet.", translation_pt: "Por favor, fique quieto." },
			],
			common_mistakes_pt:
				"Não use sujeito no imperativo:<br/>❌ You close the door!<br/>✅ <strong>Close</strong> the door!<br/><br/>Para soar educado, adicione <em>please</em>.",
			tags: ["A1"],
		},
	],
};
