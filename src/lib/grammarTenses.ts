import type { GrammarCategory } from "./grammarRules";

export const grammarTenses: GrammarCategory = {
	id: "tempos-verbais",
	name_pt: "Tempos Verbais Essenciais",
	name_en: "Essential Verb Tenses",
	description_pt:
		"Presente, passado e futuro explicados do jeito mais simples possível, com a linha do tempo.",
	icon: "Clock",
	rules: [
		{
			id: "verb-tenses-overview",
			title_pt: "A linha do tempo dos verbos",
			title_en: "Verb Tenses Overview",
			explanation_pt:
				"O verbo é a palavra que mostra a <strong>ação</strong> (to work, to eat) ou o <strong>estado</strong> (to be). Em inglês, a forma do verbo muda para dizer <strong>quando</strong> a ação acontece. Pense numa linha do tempo:<br/><br/><strong>Presente</strong> → acontece agora ou sempre (I work).<br/><strong>Passado</strong> → já aconteceu (I worked).<br/><strong>Futuro</strong> → ainda vai acontecer (I will work).<br/><br/>Siga a trilha na ordem: primeiro o presente, depois o passado, por último o futuro.",
			structure_format_pt:
				"Presente: I <strong>work</strong> / She <strong>works</strong><br/>Passado: I <strong>worked</strong> / She <strong>worked</strong><br/>Futuro: I <strong>will work</strong> / She <strong>will work</strong>",
			examples: [
				{ sentence_en: "I study English every day.", translation_pt: "Eu estudo inglês todos os dias. (presente)" },
				{ sentence_en: "I studied English yesterday.", translation_pt: "Eu estudei inglês ontem. (passado)" },
				{ sentence_en: "I will study English tomorrow.", translation_pt: "Eu vou estudar inglês amanhã. (futuro)" },
				{ sentence_en: "She works here.", translation_pt: "Ela trabalha aqui. (presente, 3ª pessoa leva -s)" },
			],
			common_mistakes_pt:
				"Não pense palavra por palavra em português. O mesmo 'I work' pode ser 'eu trabalho' ou 'eu estou trabalhando', dependendo do contexto.<br/><br/>E lembre: na 3ª pessoa (he/she/it) o presente leva <strong>-s</strong>: <em>she work<strong>s</strong></em>, não <em>she work</em>.",
			tags: ["A1", "verbo"],
		},
		{
			id: "present-tenses",
			title_pt: "Presente: hábitos e agora",
			title_en: "Present Tenses",
			explanation_pt:
				"Use o <strong>Present Simple</strong> para <strong>rotinas e fatos</strong> (every day, always, usually): <em>I drink coffee</em>.<br/><br/>Use o <strong>Present Continuous</strong> (am/is/are + <strong>-ing</strong>) para o que está <strong>acontecendo agora</strong> ou é temporário: <em>I am drinking coffee right now</em>.",
			structure_format_pt:
				"Simple: Sujeito + verbo [+s] → I <strong>work</strong> / She <strong>works</strong><br/>Continuous: Sujeito + am/is/are + verbo<strong>-ing</strong> → I <strong>am working</strong><br/>Negativa simple: don't / doesn't + verbo<br/>Pergunta simple: Do / Does + sujeito + verbo?",
			examples: [
				{ sentence_en: "I usually walk to work.", translation_pt: "Eu normalmente vou a pé para o trabalho. (rotina)" },
				{ sentence_en: "I am walking to work now.", translation_pt: "Eu estou indo a pé para o trabalho agora. (agora)" },
				{ sentence_en: "She doesn't eat meat.", translation_pt: "Ela não come carne." },
				{ sentence_en: "Are you listening?", translation_pt: "Você está ouvindo?" },
			],
			common_mistakes_pt:
				"Não use o continuous com verbos de estado (like, love, know, want): <br/>❌ I am knowing the answer. &nbsp; ✅ I <strong>know</strong> the answer.<br/><br/>E não esqueça o verbo to be no continuous: ❌ He working. ✅ He <strong>is</strong> working.",
			tags: ["A1", "presente"],
		},
		{
			id: "past-tenses",
			title_pt: "Passado: o que já aconteceu",
			title_en: "Past Tenses",
			explanation_pt:
				"No <strong>Past Simple</strong>, verbos <strong>regulares</strong> ganham <strong>-ed</strong> (work → worked) e os <strong>irregulares</strong> têm forma própria (go → went, eat → ate, see → saw).<br/><br/>O <strong>Past Continuous</strong> (was/were + <strong>-ing</strong>) descreve algo que <strong>estava acontecendo</strong> quando outra coisa interrompeu: <em>I was sleeping when you called</em>.",
			structure_format_pt:
				"Simple afirmativa: Sujeito + verbo-ed / irregular → I <strong>worked</strong> / I <strong>went</strong><br/>Simple negativa: <strong>didn't</strong> + verbo base → I <strong>didn't go</strong><br/>Pergunta: <strong>Did</strong> + sujeito + verbo base?<br/>Continuous: was/were + verbo<strong>-ing</strong>",
			examples: [
				{ sentence_en: "I visited my grandma last weekend.", translation_pt: "Eu visitei minha avó no fim de semana passado." },
				{ sentence_en: "We went to the beach yesterday.", translation_pt: "Nós fomos à praia ontem. (go → went)" },
				{ sentence_en: "I didn't watch the movie.", translation_pt: "Eu não assisti ao filme." },
				{ sentence_en: "They were talking when I arrived.", translation_pt: "Eles estavam conversando quando eu cheguei." },
			],
			common_mistakes_pt:
				"Depois de <em>did/didn't</em>, o verbo volta para a forma base:<br/>❌ I didn't went. &nbsp; ✅ I didn't <strong>go</strong>.<br/>❌ Did she saw it? &nbsp; ✅ Did she <strong>see</strong> it?<br/><br/>Memorize os irregulares mais comuns: go→went, eat→ate, see→saw, have→had, make→made.",
			tags: ["A1", "passado"],
		},
		{
			id: "future-tenses",
			title_pt: "Futuro: will e going to",
			title_en: "Future Tenses",
			explanation_pt:
				"Há duas formas principais de falar do futuro.<br/><br/><strong>will</strong> + verbo: para <strong>decisões na hora</strong>, promessas e previsões: <em>I will help you</em>.<br/><strong>going to</strong> + verbo: para <strong>planos já decididos</strong> e previsões com evidência: <em>I'm going to travel in July</em>.",
			structure_format_pt:
				"will: Sujeito + <strong>will</strong> + verbo base → I <strong>will work</strong><br/>going to: Sujeito + am/is/are + <strong>going to</strong> + verbo base → I <strong>am going to work</strong><br/>Negativa: won't / am not going to<br/>Pergunta: Will you...? / Are you going to...?",
			examples: [
				{ sentence_en: "I will call you later.", translation_pt: "Eu te ligo mais tarde. (decisão agora)" },
				{ sentence_en: "We are going to move next year.", translation_pt: "Nós vamos nos mudar no ano que vem. (plano)" },
				{ sentence_en: "It will rain tomorrow.", translation_pt: "Vai chover amanhã. (previsão)" },
				{ sentence_en: "She isn't going to come.", translation_pt: "Ela não vai vir." },
			],
			common_mistakes_pt:
				"Nunca use <em>will</em> com <em>to</em>:<br/>❌ I will to go. &nbsp; ✅ I will <strong>go</strong>.<br/><br/>E o verbo depois de <em>will</em> fica na forma base: ❌ She will goes. ✅ She will <strong>go</strong>.",
			tags: ["A1", "futuro"],
		},
		{
			id: "past-perfect",
			title_pt: "Past Perfect (o passado do passado)",
			title_en: "Past Perfect",
			explanation_pt:
				"Use o <strong>Past Perfect</strong> (had + particípio) para a ação que aconteceu <strong>antes</strong> de outra ação no passado. É o 'passado do passado'.<br/><br/>Exemplo: quando eu cheguei (passado), o trem já tinha saído (mais antigo). O mais antigo vai no Past Perfect.",
			structure_format_pt:
				"had + particípio → I <strong>had eaten</strong> (comido)<br/>Negativa: hadn't + particípio<br/>Pergunta: Had + sujeito + particípio?",
			examples: [
				{ sentence_en: "The train had left before I arrived.", translation_pt: "O trem tinha saído antes de eu chegar." },
				{ sentence_en: "She had never seen the sea.", translation_pt: "Ela nunca tinha visto o mar." },
				{ sentence_en: "I hadn't finished when he called.", translation_pt: "Eu não tinha terminado quando ele ligou." },
				{ sentence_en: "Had you met him before?", translation_pt: "Você o tinha conhecido antes?" },
			],
			common_mistakes_pt:
				"Não confunda com o Present Perfect: <em>I <strong>have</strong> eaten</em> (ligado ao presente) x <em>I <strong>had</strong> eaten</em> (antes de outro passado).<br/><br/>O auxiliar é sempre <strong>had</strong> para todas as pessoas — não existe 'hads'.",
			tags: ["B1", "passado"],
		},
	],
};
