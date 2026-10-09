import type { GuidedLesson } from "./types";

export const advanced1Lessons: GuidedLesson[] = [
	{
		id: "nuance",
		level: "C1",
		title: "Ajuste a força da afirmação",
		goal: "Expressar cautela e distinguir evidência de certeza.",
		explanation:
			"Em uma discussão acadêmica ou profissional, ajuste sua afirmação à evidência. May/might indicam possibilidade, tend to indica tendência e suggests sinaliza indício. Proves é forte: exige prova adequada. Essa cautela se chama hedging. Evite transformar uma observação limitada em uma conclusão universal.",
		examples: [
			{
				en: "The results suggest a link.",
				pt: "Os resultados sugerem uma relação.",
			},
			{ en: "This may improve access.", pt: "Isso pode melhorar o acesso." },
			{
				en: "People tend to prefer shorter tasks.",
				pt: "As pessoas tendem a preferir tarefas mais curtas.",
			},
		],
		practice: [
			{
				id: "nuance-p1",
				prompt:
					"Complete com possibilidade: This ___ improve access. (may/must)",
				answers: ["may"],
				explanation:
					"May deixa explícita a possibilidade, sem garantir o resultado.",
			},
			{
				id: "nuance-p2",
				prompt: "Complete: The evidence ___ a link. (suggest)",
				answers: ["suggests"],
				explanation: "Evidence é incontável e usa verbo singular: suggests.",
			},
		],
		check: [
			{
				id: "nuance-c1",
				prompt: "Complete: People tend ___ prefer shorter tasks.",
				answers: ["to"],
				explanation: "Tend to + verbo descreve tendência.",
			},
			{
				id: "nuance-c2",
				prompt:
					"A amostra é pequena. Qual é mais cauteloso: suggests ou proves?",
				answers: ["suggests"],
				explanation:
					"Suggests indica evidência parcial; proves afirma prova conclusiva.",
			},
			{
				id: "nuance-c3",
				prompt: "Atenue This will improve access usando might.",
				answers: ["This might improve access"],
				explanation:
					"Might substitui will e deixa o resultado como possibilidade.",
			},
		],
		mission:
			"Escolha uma notícia, resuma a afirmação principal e seus limites em 150 palavras. Identifique o que foi observado e o que é apenas inferência.",
		practiceRoute: "/library",
	},
	{
		id: "register",
		level: "C1",
		title: "Adapte o tom ao contexto",
		goal: "Reformular pedidos para situações profissionais.",
		explanation:
			"Registro é a escolha de linguagem para a situação. Send me the report é direto; Could you send me the report? é mais cortês. I would appreciate it if you could... é formal. Can you e Could you aceitam verbo na base. Não acrescente to após could. Um bom texto profissional continua claro, mesmo quando é formal.",
		examples: [
			{
				en: "Could you send me the report?",
				pt: "Você poderia me enviar o relatório?",
			},
			{
				en: "I would appreciate your feedback.",
				pt: "Eu agradeceria seu feedback.",
			},
			{
				en: "Please let me know by Friday.",
				pt: "Por favor, me informe até sexta-feira.",
			},
		],
		practice: [
			{
				id: "register-p1",
				prompt: "Complete: Could you ___ me the report? (send)",
				answers: ["send"],
				explanation: "Could recebe verbo na base, sem to.",
			},
			{
				id: "register-p2",
				prompt: "Complete: I would ___ your feedback. (agradecer)",
				answers: ["appreciate"],
				explanation:
					"I would appreciate é uma expressão formal de agradecimento antecipado.",
			},
		],
		check: [
			{
				id: "register-c1",
				prompt: "Reformule Send me the report como pergunta usando Could you.",
				answers: ["Could you send me the report"],
				explanation: "Could you + verbo transforma a ordem em pedido cortês.",
			},
			{
				id: "register-c2",
				prompt: "Complete: Please let me know ___ Friday. (até, como prazo)",
				answers: ["by"],
				explanation:
					"By Friday significa até sexta como prazo; until indica duração.",
			},
			{
				id: "register-c3",
				prompt:
					"Complete: I would appreciate it if you ___ send your feedback. (could/can)",
				answers: ["could"],
				explanation:
					"Would appreciate ... if you could mantém a formulação hipotética e cortês.",
			},
		],
		mission:
			"Escreva o mesmo pedido para um amigo e para um cliente. Compare cortesia, precisão do prazo e clareza. Leia ambos em voz alta.",
		practiceRoute: "/tracks",
	},
];
