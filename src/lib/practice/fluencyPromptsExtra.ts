import type { CEFRLevel } from "../curriculumData";
import type { FluencyPrompt } from "../fluencyData";

/** Prompts extra de fala cronometrada 4/3/2: 10 por nível, do cotidiano ao abstrato. */
export const fluencyPromptsExtra: FluencyPrompt[] = [
	// A1
	{
		id: "fx-a1-1",
		level: "A1",
		prompt: "Talk about your family members.",
		promptPt: "Fale sobre os membros da sua família.",
		tips: ["Use o verbo TO BE", "Use 'have/has'"],
	},
	{
		id: "fx-a1-2",
		level: "A1",
		prompt: "Describe your favorite food and why you like it.",
		promptPt: "Descreva sua comida favorita e por que você gosta dela.",
		tips: ["Use 'I like'", "Termine com 'because'"],
	},
	{
		id: "fx-a1-3",
		level: "A1",
		prompt: "Talk about the weather in your city today.",
		promptPt: "Fale sobre o tempo na sua cidade hoje.",
		tips: ["Use 'it is'", "Fale devagar"],
	},
	{
		id: "fx-a1-4",
		level: "A1",
		prompt: "Describe your house or apartment.",
		promptPt: "Descreva sua casa ou apartamento.",
		tips: ["Use 'there is/are'", "Cite os cômodos"],
	},
	{
		id: "fx-a1-5",
		level: "A1",
		prompt: "Talk about your best friend.",
		promptPt: "Fale sobre seu melhor amigo.",
		tips: ["Use o verbo TO BE", "Descreva a aparência"],
	},
	{
		id: "fx-a1-6",
		level: "A1",
		prompt: "Describe what you eat for breakfast.",
		promptPt: "Descreva o que você come no café da manhã.",
		tips: ["Use o Present Simple", "Comece com 'Every day...'"],
	},
	{
		id: "fx-a1-7",
		level: "A1",
		prompt: "Talk about the colors and objects in this room.",
		promptPt: "Fale sobre as cores e objetos deste cômodo.",
		tips: ["Use 'there is/are'", "Nomeie objetos"],
	},
	{
		id: "fx-a1-8",
		level: "A1",
		prompt: "Talk about your favorite animal.",
		promptPt: "Fale sobre seu animal favorito.",
		tips: ["Use o verbo TO BE", "Diga por que gosta"],
	},
	{
		id: "fx-a1-9",
		level: "A1",
		prompt: "Describe what you usually wear to work or school.",
		promptPt: "Descreva o que você costuma vestir para o trabalho ou escola.",
		tips: ["Use 'usually'", "Present Simple"],
	},
	{
		id: "fx-a1-10",
		level: "A1",
		prompt: "Talk about the numbers you use every day (age, phone, address).",
		promptPt:
			"Fale sobre números que você usa todo dia (idade, telefone, endereço).",
		tips: ["Fale os números claramente", "Use frases simples"],
	},

	// A2
	{
		id: "fx-a2-1",
		level: "A2",
		prompt: "Talk about your favorite holiday and what you did.",
		promptPt: "Fale sobre suas férias favoritas e o que você fez.",
		tips: ["Use o Past Simple", "Cite lugares visitados"],
	},
	{
		id: "fx-a2-2",
		level: "A2",
		prompt: "Describe a typical Saturday for you.",
		promptPt: "Descreva um sábado típico para você.",
		tips: ["Use o Present Simple", "Ordene com 'first, then, after'"],
	},
	{
		id: "fx-a2-3",
		level: "A2",
		prompt: "Talk about a movie or show you watched recently.",
		promptPt: "Fale sobre um filme ou série que você assistiu recentemente.",
		tips: ["Use o Past Simple", "Dê sua opinião com 'I think'"],
	},
	{
		id: "fx-a2-4",
		level: "A2",
		prompt: "Describe your job or studies and your daily tasks.",
		promptPt: "Descreva seu trabalho ou estudos e suas tarefas diárias.",
		tips: ["Use o Present Simple", "Use 'every day'"],
	},
	{
		id: "fx-a2-5",
		level: "A2",
		prompt: "Talk about a time you traveled somewhere new.",
		promptPt: "Fale sobre uma vez que você viajou para um lugar novo.",
		tips: ["Use o Past Simple", "Verbos irregulares (went, saw)"],
	},
	{
		id: "fx-a2-6",
		level: "A2",
		prompt: "Describe your neighborhood and what is near your house.",
		promptPt: "Descreva seu bairro e o que fica perto da sua casa.",
		tips: ["Use 'there is/are'", "Preposições de lugar"],
	},
	{
		id: "fx-a2-7",
		level: "A2",
		prompt: "Talk about your plans for next weekend.",
		promptPt: "Fale sobre seus planos para o próximo fim de semana.",
		tips: ["Use 'going to'", "Conecte ideias com 'and'"],
	},
	{
		id: "fx-a2-8",
		level: "A2",
		prompt: "Describe a person you admire and why.",
		promptPt: "Descreva uma pessoa que você admira e por quê.",
		tips: ["Use adjetivos", "Termine com 'because'"],
	},
	{
		id: "fx-a2-9",
		level: "A2",
		prompt: "Talk about your favorite way to relax after work.",
		promptPt: "Fale sobre sua forma favorita de relaxar depois do trabalho.",
		tips: ["Use 'I like to'", "Present Simple"],
	},
	{
		id: "fx-a2-10",
		level: "A2",
		prompt: "Describe a problem you had and how you solved it.",
		promptPt: "Descreva um problema que você teve e como o resolveu.",
		tips: ["Use o Past Simple", "Use 'so' para consequência"],
	},

	// B1
	{
		id: "fx-b1-1",
		level: "B1",
		prompt: "Talk about a skill you would like to learn and why.",
		promptPt:
			"Fale sobre uma habilidade que você gostaria de aprender e por quê.",
		tips: ["Use 'would like to'", "Justifique com 'because'"],
	},
	{
		id: "fx-b1-2",
		level: "B1",
		prompt: "Explain how technology has changed your daily routine.",
		promptPt: "Explique como a tecnologia mudou sua rotina diária.",
		tips: ["Use Present Perfect", "Compare passado e presente"],
	},
	{
		id: "fx-b1-3",
		level: "B1",
		prompt: "Talk about a mistake you made at work and what you learned.",
		promptPt:
			"Fale sobre um erro que você cometeu no trabalho e o que aprendeu.",
		tips: ["Use o Past Simple", "Use 'I learned that'"],
	},
	{
		id: "fx-b1-4",
		level: "B1",
		prompt: "Describe your ideal job and what makes it appealing.",
		promptPt: "Descreva seu emprego ideal e o que o torna atraente.",
		tips: ["Use 'would'", "Liste vantagens"],
	},
	{
		id: "fx-b1-5",
		level: "B1",
		prompt: "Explain the advantages and disadvantages of living in a big city.",
		promptPt:
			"Explique as vantagens e desvantagens de morar em uma cidade grande.",
		tips: ["Use 'on one hand / on the other hand'", "Dê exemplos"],
	},
	{
		id: "fx-b1-6",
		level: "B1",
		prompt: "Talk about a tradition from your family or culture.",
		promptPt: "Fale sobre uma tradição da sua família ou cultura.",
		tips: ["Use Present Simple para hábitos", "Explique o significado"],
	},
	{
		id: "fx-b1-7",
		level: "B1",
		prompt: "Describe a challenge you overcame in the last few years.",
		promptPt: "Descreva um desafio que você superou nos últimos anos.",
		tips: ["Use Present Perfect e Past Simple", "Use 'eventually'"],
	},
	{
		id: "fx-b1-8",
		level: "B1",
		prompt: "Talk about how you usually deal with stress.",
		promptPt: "Fale sobre como você costuma lidar com o estresse.",
		tips: ["Use 'usually' e 'when'", "Dê exemplos concretos"],
	},
	{
		id: "fx-b1-9",
		level: "B1",
		prompt: "Explain what you would do if you won a small amount of money.",
		promptPt:
			"Explique o que você faria se ganhasse uma quantia pequena de dinheiro.",
		tips: ["Use o segundo condicional", "Use 'I would'"],
	},
	{
		id: "fx-b1-10",
		level: "B1",
		prompt:
			"Talk about a book, podcast or channel that taught you something useful.",
		promptPt: "Fale sobre um livro, podcast ou canal que te ensinou algo útil.",
		tips: ["Use Present Perfect", "Explique o que aprendeu"],
	},

	// B2
	{
		id: "fx-b2-1",
		level: "B2",
		prompt:
			"Discuss whether social media has a positive or negative impact on society.",
		promptPt:
			"Discuta se as redes sociais têm impacto positivo ou negativo na sociedade.",
		tips: ["Use 'however' e 'therefore'", "Apresente os dois lados"],
	},
	{
		id: "fx-b2-2",
		level: "B2",
		prompt: "Explain how you would handle a disagreement with a coworker.",
		promptPt:
			"Explique como você lidaria com um desacordo com um colega de trabalho.",
		tips: ["Use o condicional", "Use linguagem diplomática"],
	},
	{
		id: "fx-b2-3",
		level: "B2",
		prompt:
			"Talk about a decision you regret and what you would do differently.",
		promptPt:
			"Fale sobre uma decisão da qual se arrepende e o que faria diferente.",
		tips: ["Use 'I wish' ou o terceiro condicional", "Explique a razão"],
	},
	{
		id: "fx-b2-4",
		level: "B2",
		prompt: "Discuss the pros and cons of working from home.",
		promptPt: "Discuta os prós e contras de trabalhar de casa.",
		tips: ["Use conectores de contraste", "Conclua com sua opinião"],
	},
	{
		id: "fx-b2-5",
		level: "B2",
		prompt: "Explain what makes a good leader in your opinion.",
		promptPt: "Explique o que faz um bom líder, na sua opinião.",
		tips: ["Use 'in my opinion'", "Dê exemplos"],
	},
	{
		id: "fx-b2-6",
		level: "B2",
		prompt: "Talk about how globalization has affected your country.",
		promptPt: "Fale sobre como a globalização afetou seu país.",
		tips: ["Use Present Perfect", "Dê exemplos concretos"],
	},
	{
		id: "fx-b2-7",
		level: "B2",
		prompt:
			"Discuss whether university education is still necessary for success.",
		promptPt:
			"Discuta se a educação universitária ainda é necessária para o sucesso.",
		tips: ["Use 'nevertheless'", "Reconheça o outro lado"],
	},
	{
		id: "fx-b2-8",
		level: "B2",
		prompt: "Explain a time you had to persuade someone to change their mind.",
		promptPt:
			"Explique uma vez que você precisou convencer alguém a mudar de ideia.",
		tips: ["Use Past Perfect quando necessário", "Explique a estratégia usada"],
	},
	{
		id: "fx-b2-9",
		level: "B2",
		prompt: "Talk about the environmental impact of fast fashion.",
		promptPt: "Fale sobre o impacto ambiental da moda rápida.",
		tips: ["Use voz passiva", "Cite consequências"],
	},
	{
		id: "fx-b2-10",
		level: "B2",
		prompt: "Discuss whether artificial intelligence will replace human jobs.",
		promptPt:
			"Discuta se a inteligência artificial vai substituir empregos humanos.",
		tips: ["Use 'will' e 'might'", "Apresente evidências"],
	},

	// C1
	{
		id: "fx-c1-1",
		level: "C1",
		prompt:
			"Discuss the ethical implications of genetic engineering in humans.",
		promptPt:
			"Discuta as implicações éticas da engenharia genética em humanos.",
		tips: [
			"Use hedging: 'arguably', 'it could be said'",
			"Considere múltiplas perspectivas",
		],
	},
	{
		id: "fx-c1-2",
		level: "C1",
		prompt: "Argue for or against universal basic income.",
		promptPt: "Argumente a favor ou contra a renda básica universal.",
		tips: [
			"Use conectores formais: 'moreover', 'consequently'",
			"Antecipe contra-argumentos",
		],
	},
	{
		id: "fx-c1-3",
		level: "C1",
		prompt:
			"Explain how power dynamics shape decision-making in organizations.",
		promptPt:
			"Explique como dinâmicas de poder moldam a tomada de decisão em organizações.",
		tips: ["Use linguagem abstrata", "Dê exemplos institucionais"],
	},
	{
		id: "fx-c1-4",
		level: "C1",
		prompt:
			"Discuss whether economic growth should be prioritized over environmental protection.",
		promptPt:
			"Discuta se o crescimento econômico deveria ser priorizado sobre a proteção ambiental.",
		tips: ["Use 'notwithstanding'", "Pondere trade-offs"],
	},
	{
		id: "fx-c1-5",
		level: "C1",
		prompt: "Explain the long-term consequences of an aging population.",
		promptPt:
			"Explique as consequências de longo prazo de uma população envelhecida.",
		tips: ["Use futuro e condicional", "Cite impactos econômicos e sociais"],
	},
	{
		id: "fx-c1-6",
		level: "C1",
		prompt:
			"Discuss whether remote work erodes or strengthens company culture.",
		promptPt:
			"Discuta se o trabalho remoto enfraquece ou fortalece a cultura da empresa.",
		tips: ["Reconheça nuances", "Use 'on balance'"],
	},
	{
		id: "fx-c1-7",
		level: "C1",
		prompt: "Argue whether censorship of misinformation online is justified.",
		promptPt: "Argumente se a censura de desinformação online é justificada.",
		tips: ["Use hedging e concessão", "Cite riscos e benefícios"],
	},
	{
		id: "fx-c1-8",
		level: "C1",
		prompt: "Explain how cultural values influence business negotiations.",
		promptPt:
			"Explique como valores culturais influenciam negociações de negócios.",
		tips: ["Compare culturas", "Use exemplos concretos"],
	},
	{
		id: "fx-c1-9",
		level: "C1",
		prompt:
			"Discuss the trade-offs between privacy and security in the digital age.",
		promptPt:
			"Discuta os trade-offs entre privacidade e segurança na era digital.",
		tips: ["Use vocabulário abstrato", "Apresente ambos os lados"],
	},
	{
		id: "fx-c1-10",
		level: "C1",
		prompt:
			"Explain why some companies fail to innovate despite having resources.",
		promptPt:
			"Explique por que algumas empresas não conseguem inovar apesar de terem recursos.",
		tips: ["Use causa e efeito", "Cite fatores organizacionais"],
	},

	// C2
	{
		id: "fx-c2-1",
		level: "C2",
		prompt:
			"Debate whether meritocracy is an achievable or inherently flawed ideal.",
		promptPt:
			"Debata se a meritocracia é um ideal alcançável ou inerentemente falho.",
		tips: ["Use linguagem acadêmica precisa", "Sustente uma tese com nuance"],
	},
	{
		id: "fx-c2-2",
		level: "C2",
		prompt: "Discuss the paradox of choice in modern consumer societies.",
		promptPt:
			"Discuta o paradoxo da escolha nas sociedades consumistas modernas.",
		tips: [
			"Use conceitos abstratos com precisão",
			"Cite implicações psicológicas",
		],
	},
	{
		id: "fx-c2-3",
		level: "C2",
		prompt:
			"Argue whether globalization has homogenized or diversified cultures.",
		promptPt:
			"Argumente se a globalização homogeneizou ou diversificou culturas.",
		tips: ["Reconheça complexidade", "Use 'arguably', 'notwithstanding'"],
	},
	{
		id: "fx-c2-4",
		level: "C2",
		prompt:
			"Discuss the tension between individual liberty and collective responsibility.",
		promptPt:
			"Discuta a tensão entre liberdade individual e responsabilidade coletiva.",
		tips: ["Use registro formal", "Explore contradições"],
	},
	{
		id: "fx-c2-5",
		level: "C2",
		prompt: "Explain how historical narratives are shaped by those in power.",
		promptPt:
			"Explique como narrativas históricas são moldadas por quem está no poder.",
		tips: ["Cite exemplos históricos", "Use linguagem crítica"],
	},
	{
		id: "fx-c2-6",
		level: "C2",
		prompt:
			"Discuss whether unchecked technological progress poses an existential risk.",
		promptPt:
			"Discuta se o progresso tecnológico sem controle representa um risco existencial.",
		tips: ["Pondere probabilidade e severidade", "Use hedging sofisticado"],
	},
	{
		id: "fx-c2-7",
		level: "C2",
		prompt:
			"Argue whether late-stage capitalism can be reformed or must be replaced.",
		promptPt:
			"Argumente se o capitalismo tardio pode ser reformado ou precisa ser substituído.",
		tips: ["Sustente uma posição clara", "Antecipe objeções fortes"],
	},
	{
		id: "fx-c2-8",
		level: "C2",
		prompt: "Discuss the role of language in shaping thought and identity.",
		promptPt:
			"Discuta o papel da linguagem na formação do pensamento e da identidade.",
		tips: ["Cite teorias ou exemplos", "Use vocabulário preciso"],
	},
	{
		id: "fx-c2-9",
		level: "C2",
		prompt:
			"Explain why democratic institutions are vulnerable to erosion over time.",
		promptPt:
			"Explique por que instituições democráticas são vulneráveis à erosão ao longo do tempo.",
		tips: ["Use causa e efeito complexo", "Cite mecanismos institucionais"],
	},
	{
		id: "fx-c2-10",
		level: "C2",
		prompt:
			"Discuss whether objectivity in journalism is a realistic standard.",
		promptPt: "Discuta se a objetividade no jornalismo é um padrão realista.",
		tips: [
			"Considere vieses estruturais",
			"Conclua com uma posição fundamentada",
		],
	},
];
