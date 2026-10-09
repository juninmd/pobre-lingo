import type { GuidedLesson } from "./types";

export const beginner2Lessons: GuidedLesson[] = [
	{
		id: "be",
		level: "A1",
		title: "Quem sou e como estou",
		goal: "Usar am, is e are para apresentar pessoas e estados.",
		explanation:
			"O verbo be pode significar ser ou estar. Use I am (eu sou/estou), he/she/it is (ele/ela é/está) e you/we/they are (você/nós/eles são/estão). Escolha pelo sujeito, a pessoa de quem você fala. I'm é I am; she's é she is. Não diga I is.",
		examples: [
			{ en: "I am Brazilian.", pt: "Eu sou brasileiro(a)." },
			{ en: "She is happy.", pt: "Ela está feliz." },
			{ en: "We are students.", pt: "Nós somos estudantes." },
		],
		practice: [
			{
				id: "be-p1",
				prompt: "Complete: I ___ happy.",
				answers: ["am"],
				explanation: "I pede am.",
			},
			{
				id: "be-p2",
				prompt: "Complete: They ___ students.",
				answers: ["are"],
				explanation: "They pede are.",
			},
		],
		check: [
			{
				id: "be-c1",
				prompt: "Complete: She ___ Brazilian.",
				answers: ["is"],
				explanation: "She pede is.",
			},
			{
				id: "be-c2",
				prompt: "Traduza: Eu estou feliz. (happy)",
				answers: ["I am happy", "I'm happy"],
				explanation: "I am happy usa be como estar.",
			},
			{
				id: "be-c3",
				prompt: "Complete: You ___ a student.",
				answers: ["are"],
				explanation: "You usa are mesmo quando se refere a uma só pessoa.",
			},
		],
		mission:
			"Apresente você e outra pessoa em três frases: nome, nacionalidade e como estão hoje. Troque os sujeitos para praticar am/is/are.",
		practiceRoute: "/reading",
	},
	{
		id: "routine",
		level: "A1",
		title: "Conte sua rotina",
		goal: "Descrever hábitos e fazer uma pergunta simples.",
		explanation:
			"O presente simples descreve hábitos. I work: eu trabalho. Com he/she/it, normalmente acrescente s: she works. Na negativa e na pergunta use do/does; com does, o verbo principal volta à base: Does she work? Não diga Does she works. Every day significa todos os dias.",
		examples: [
			{ en: "I study every day.", pt: "Eu estudo todos os dias." },
			{ en: "She works at home.", pt: "Ela trabalha em casa." },
			{ en: "Do you like coffee?", pt: "Você gosta de café?" },
		],
		practice: [
			{
				id: "routine-p1",
				prompt: "Complete: He ___ at home. (work)",
				answers: ["works"],
				explanation: "He pede works no presente afirmativo.",
			},
			{
				id: "routine-p2",
				prompt: "Complete: ___ you study English?",
				answers: ["do"],
				explanation: "A pergunta com you começa com Do.",
			},
		],
		check: [
			{
				id: "routine-c1",
				prompt: "Complete: She ___ English every day. (study)",
				answers: ["studies"],
				explanation: "Consoante + y vira ies: study → studies.",
			},
			{
				id: "routine-c2",
				prompt: "Complete: Does he ___ coffee? (like)",
				answers: ["like"],
				explanation: "Does já marca a terceira pessoa. Use like sem s.",
			},
			{
				id: "routine-c3",
				prompt: "Traduza: Eu trabalho em casa. (at home)",
				answers: ["I work at home", "I work from home"],
				explanation: "I work at home descreve sua rotina.",
			},
		],
		mission:
			"Diga quatro hábitos seus e pergunte a alguém Do you study English? Depois escreva uma frase sobre a rotina dessa pessoa com he ou she.",
		practiceRoute: "/writing",
	},
];
