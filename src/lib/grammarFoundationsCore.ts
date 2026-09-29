import type { GrammarCategory } from "./grammarRules";

export const grammarFoundationsCore: GrammarCategory = {
	id: "fundamentos-1",
	name_pt: "Fundamentos da Língua",
	name_en: "Language Foundations",
	description_pt:
		"Do absoluto zero: o que é cada tipo de palavra, o verbo TO BE, os pronomes e como dizer que algo existe.",
	icon: "Sprout",
	rules: [
		{
			id: "parts-of-speech",
			title_pt: "O que é cada palavra? (Classes de Palavras)",
			title_en: "Parts of Speech",
			explanation_pt:
				"Antes de montar frases, você precisa saber nomear as peças. Pense numa frase como um lego: cada peça tem uma função.<br/><br/><strong>Substantivo</strong> = nome de pessoa, lugar, coisa ou ideia (dog, Maria, love).<br/><strong>Verbo</strong> = ação ou estado (run, eat, be, have).<br/><strong>Adjetivo</strong> = qualidade do substantivo (big, happy).<br/><strong>Advérbio</strong> = como ou quando a ação acontece (fast, always, very).<br/><strong>Pronome</strong> = substitui o substantivo para não repetir (I, he, it).<br/><strong>Artigo</strong> = a, an, the (como o/a, um/uma).<br/><strong>Preposição</strong> = liga palavras indicando lugar ou tempo (in, on, at).",
			structure_format_pt:
				"Artigo + <strong>Adjetivo</strong> + <strong>Substantivo</strong> + <strong>Verbo</strong> + <strong>Advérbio</strong><br/><br/>The&nbsp; small&nbsp; <strong>dog</strong>&nbsp; runs&nbsp; fast.",
			examples: [
				{
					sentence_en: "The dog runs.",
					translation_pt:
						"O cachorro corre. (the = artigo, dog = substantivo, runs = verbo)",
				},
				{
					sentence_en: "She is happy.",
					translation_pt:
						"Ela está feliz. (she = pronome, is = verbo, happy = adjetivo)",
				},
				{
					sentence_en: "He speaks very fast.",
					translation_pt: "Ele fala muito rápido. (very e fast = advérbios)",
				},
				{
					sentence_en: "I love pizza.",
					translation_pt:
						"Eu amo pizza. (I = pronome, love = verbo, pizza = substantivo)",
				},
			],
			common_mistakes_pt:
				"Não confunda <strong>adjetivo</strong> (qualidade: happy) com <strong>advérbio</strong> (como: happily).<br/>Outro detalhe: em inglês o adjetivo vem <strong>antes</strong> do substantivo — a <em>red</em> car —, diferente do português (um carro vermelho).",
			tags: ["A1", "teoria"],
		},
		{
			id: "verb-to-be",
			title_pt: "Verbo TO BE (ser / estar)",
			title_en: "The Verb To Be",
			explanation_pt:
				"O <strong>to be</strong> é o verbo mais importante do inglês. Significa <strong>ser</strong> ou <strong>estar</strong> e muda conforme o sujeito. Você usa o tempo todo: para se apresentar, dizer idade, sentimento, profissão e localização.<br/><br/>No português a gente costuma omitir (eu cansado), mas em inglês o verbo <strong>nunca</strong> pode faltar.",
			structure_format_pt:
				"I <strong>am</strong> &nbsp;|&nbsp; He / She / It <strong>is</strong> &nbsp;|&nbsp; You / We / They <strong>are</strong><br/>Negativa: am <strong>not</strong> / is <strong>not</strong> (isn't) / are <strong>not</strong> (aren't)<br/>Pergunta: <strong>Am</strong> I...? / <strong>Is</strong> he...? / <strong>Are</strong> you...?",
			examples: [
				{
					sentence_en: "I am a student.",
					translation_pt: "Eu sou um estudante.",
				},
				{ sentence_en: "She is tired.", translation_pt: "Ela está cansada." },
				{
					sentence_en: "We are at home.",
					translation_pt: "Nós estamos em casa.",
				},
				{
					sentence_en: "They aren't late.",
					translation_pt: "Eles não estão atrasados.",
				},
			],
			common_mistakes_pt:
				"O erro número 1 de quem fala português é esquecer o verbo:<br/>❌ I tired. &nbsp; ✅ I <strong>am</strong> tired.<br/><br/>E não use 'have' para idade:<br/>❌ I have 20 years. &nbsp; ✅ I <strong>am</strong> 20 years old.",
			tags: ["A1", "verbo"],
		},
		{
			id: "subject-pronouns",
			title_pt: "Pronomes Pessoais (quem faz a ação)",
			title_en: "Subject Pronouns",
			explanation_pt:
				"Os pronomes pessoais <strong>substituem o nome</strong> de quem faz a ação, para você não repetir. São 7: <strong>I</strong> (eu), <strong>you</strong> (você/vocês), <strong>he</strong> (ele), <strong>she</strong> (ela), <strong>it</strong> (coisas e animais), <strong>we</strong> (nós), <strong>they</strong> (eles/elas).<br/><br/>Em inglês, <strong>I</strong> é sempre maiúsculo, mesmo no meio da frase. E <strong>it</strong> é usado para objetos, ideias e animais — não existe gênero como no português (mesa = <em>it</em>, não 'ela').",
			structure_format_pt:
				"I → <strong>am</strong> &nbsp;|&nbsp; he / she / it → <strong>is</strong> &nbsp;|&nbsp; you / we / they → <strong>are</strong>",
			examples: [
				{
					sentence_en: "He is my brother.",
					translation_pt: "Ele é meu irmão.",
				},
				{ sentence_en: "It is cold today.", translation_pt: "Está frio hoje." },
				{ sentence_en: "We are friends.", translation_pt: "Nós somos amigos." },
				{
					sentence_en: "They are teachers.",
					translation_pt: "Eles são professores.",
				},
			],
			common_mistakes_pt:
				"Não use <em>he/she</em> para objetos:<br/>❌ My phone? She is new.<br/>✅ My phone? <strong>It</strong> is new.",
			tags: ["A1", "pronome"],
		},
		{
			id: "there-is-there-are",
			title_pt: "There is / There are (tem, existe)",
			title_en: "There is / There are",
			explanation_pt:
				"Use <strong>there is</strong> para dizer que <strong>uma</strong> coisa existe, e <strong>there are</strong> para <strong>várias</strong>. É o nosso 'tem' ou 'há'.<br/><br/>A regra é simples: olhe para o que vem <strong>depois</strong>. Singular → <strong>there is</strong>. Plural → <strong>there are</strong>.",
			structure_format_pt:
				"There <strong>is</strong> + singular (a book)<br/>There <strong>are</strong> + plural (two books)<br/>Negativa: There <strong>isn't</strong> / There <strong>aren't</strong><br/>Pergunta: <strong>Is</strong> there...? / <strong>Are</strong> there...?",
			examples: [
				{
					sentence_en: "There is a book on the table.",
					translation_pt: "Tem um livro na mesa.",
				},
				{
					sentence_en: "There are three cats here.",
					translation_pt: "Tem três gatos aqui.",
				},
				{
					sentence_en: "There isn't any milk.",
					translation_pt: "Não tem leite.",
				},
				{
					sentence_en: "Is there a bank near here?",
					translation_pt: "Tem um banco perto daqui?",
				},
			],
			common_mistakes_pt:
				"Não diga 'have a book' para 'tem um livro'. Use <strong>there is/are</strong>.<br/>E cuide da concordância:<br/>❌ There is many people. &nbsp; ✅ There <strong>are</strong> many people.",
			tags: ["A1"],
		},
	],
};
