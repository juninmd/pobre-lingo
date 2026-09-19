import type { CEFRLevel } from "../curriculumData";
import type { WritingPrompt } from "../dictationData";

/** Prompts de escrita extra: 9 gêneros por nível (mensagem, carta, história, descrição, review, opinião, reclamação, relatório, carta de apresentação/resumo/dissertação). */
export const writingPromptsExtra: WritingPrompt[] = [
	// A1
	{
		id: "wx-a1-1",
		level: "A1",
		prompt:
			"Write a short message to a friend inviting them to your birthday party.",
		promptPt:
			"Escreva uma mensagem curta para um amigo convidando para sua festa de aniversário.",
		minWords: 20,
		keywords: ["party", "come", "on"],
	},
	{
		id: "wx-a1-2",
		level: "A1",
		prompt: "Write a letter to a pen pal introducing yourself.",
		promptPt:
			"Escreva uma carta para um amigo por correspondência se apresentando.",
		minWords: 22,
		keywords: ["my name", "I live", "I like"],
	},
	{
		id: "wx-a1-3",
		level: "A1",
		prompt: "Write a short story about a cat and a dog.",
		promptPt: "Escreva uma pequena história sobre um gato e um cachorro.",
		minWords: 25,
		keywords: ["cat", "dog", "and"],
	},
	{
		id: "wx-a1-4",
		level: "A1",
		prompt: "Describe your bedroom.",
		promptPt: "Descreva o seu quarto.",
		minWords: 20,
		keywords: ["there is", "there are"],
	},
	{
		id: "wx-a1-5",
		level: "A1",
		prompt: "Write a review of your favorite food.",
		promptPt: "Escreva uma avaliação da sua comida favorita.",
		minWords: 20,
		keywords: ["is", "because"],
	},
	{
		id: "wx-a1-6",
		level: "A1",
		prompt: "Write your opinion about your school or job.",
		promptPt: "Escreva sua opinião sobre sua escola ou trabalho.",
		minWords: 22,
		keywords: ["I think", "because"],
	},
	{
		id: "wx-a1-7",
		level: "A1",
		prompt: "Write a message complaining that your coffee is cold.",
		promptPt: "Escreva uma mensagem reclamando que seu café está frio.",
		minWords: 20,
		keywords: ["cold", "please"],
	},
	{
		id: "wx-a1-8",
		level: "A1",
		prompt: "Write a small report about the weather today.",
		promptPt: "Escreva um pequeno relatório sobre o tempo hoje.",
		minWords: 20,
		keywords: ["today", "is"],
	},
	{
		id: "wx-a1-9",
		level: "A1",
		prompt: "Write a summary of your daily routine.",
		promptPt: "Escreva um resumo da sua rotina diária.",
		minWords: 25,
		keywords: ["I wake up", "then", "at"],
	},

	// A2
	{
		id: "wx-a2-1",
		level: "A2",
		prompt: "Write an email to a friend telling them about your last vacation.",
		promptPt:
			"Escreva um e-mail para um amigo contando sobre suas últimas férias.",
		minWords: 50,
		keywords: ["went", "was", "because"],
	},
	{
		id: "wx-a2-2",
		level: "A2",
		prompt: "Write an informal letter to a cousin describing your new job.",
		promptPt:
			"Escreva uma carta informal para um primo descrevendo seu novo emprego.",
		minWords: 55,
		keywords: ["work", "and", "but"],
	},
	{
		id: "wx-a2-3",
		level: "A2",
		prompt: "Write a short story about getting lost in a new city.",
		promptPt: "Escreva uma história curta sobre se perder em uma cidade nova.",
		minWords: 60,
		keywords: ["went", "suddenly", "then"],
	},
	{
		id: "wx-a2-4",
		level: "A2",
		prompt: "Describe your favorite restaurant and the food they serve.",
		promptPt: "Descreva seu restaurante favorito e a comida que servem.",
		minWords: 55,
		keywords: ["there is", "delicious"],
	},
	{
		id: "wx-a2-5",
		level: "A2",
		prompt: "Write a review of a movie you watched recently.",
		promptPt:
			"Escreva uma avaliação de um filme que você assistiu recentemente.",
		minWords: 55,
		keywords: ["I think", "because", "recommend"],
	},
	{
		id: "wx-a2-6",
		level: "A2",
		prompt: "Give your opinion about learning English online.",
		promptPt: "Dê sua opinião sobre aprender inglês online.",
		minWords: 60,
		keywords: ["I think", "but", "however"],
	},
	{
		id: "wx-a2-7",
		level: "A2",
		prompt: "Write a complaint email about a delayed delivery.",
		promptPt: "Escreva um e-mail de reclamação sobre uma entrega atrasada.",
		minWords: 55,
		keywords: ["ordered", "still", "please"],
	},
	{
		id: "wx-a2-8",
		level: "A2",
		prompt: "Write a short report about a class trip you took.",
		promptPt: "Escreva um pequeno relatório sobre uma excursão da escola.",
		minWords: 60,
		keywords: ["went", "visited", "learned"],
	},
	{
		id: "wx-a2-9",
		level: "A2",
		prompt: "Write a summary of a book or article you read.",
		promptPt: "Escreva um resumo de um livro ou artigo que você leu.",
		minWords: 55,
		keywords: ["about", "the main", "because"],
	},

	// B1
	{
		id: "wx-b1-1",
		level: "B1",
		prompt:
			"Write an email to a colleague explaining why a project is delayed.",
		promptPt:
			"Escreva um e-mail para um colega explicando por que um projeto está atrasado.",
		minWords: 100,
		keywords: ["because", "however", "will"],
	},
	{
		id: "wx-b1-2",
		level: "B1",
		prompt:
			"Write a letter to a friend describing a difficult decision you made.",
		promptPt:
			"Escreva uma carta para um amigo descrevendo uma decisão difícil que você tomou.",
		minWords: 110,
		keywords: ["decided", "although", "because"],
	},
	{
		id: "wx-b1-3",
		level: "B1",
		prompt: "Write a short story about a misunderstanding between two friends.",
		promptPt:
			"Escreva uma história curta sobre um mal-entendido entre dois amigos.",
		minWords: 120,
		keywords: ["thought", "actually", "finally"],
	},
	{
		id: "wx-b1-4",
		level: "B1",
		prompt: "Describe a place that changed the way you see the world.",
		promptPt: "Descreva um lugar que mudou a forma como você vê o mundo.",
		minWords: 110,
		keywords: ["because", "realized"],
	},
	{
		id: "wx-b1-5",
		level: "B1",
		prompt: "Write a review of an app or gadget you use every day.",
		promptPt:
			"Escreva uma avaliação de um aplicativo ou aparelho que você usa todo dia.",
		minWords: 110,
		keywords: ["although", "recommend", "because"],
	},
	{
		id: "wx-b1-6",
		level: "B1",
		prompt:
			"Give your opinion on whether social media does more harm than good.",
		promptPt:
			"Dê sua opinião sobre se as redes sociais fazem mais mal do que bem.",
		minWords: 120,
		keywords: ["however", "on the other hand", "therefore"],
	},
	{
		id: "wx-b1-7",
		level: "B1",
		prompt: "Write a formal complaint letter about poor customer service.",
		promptPt:
			"Escreva uma carta formal de reclamação sobre um atendimento ruim.",
		minWords: 110,
		keywords: ["I am writing to", "unfortunately", "therefore"],
	},
	{
		id: "wx-b1-8",
		level: "B1",
		prompt:
			"Write a report about the results of a small survey among your coworkers.",
		promptPt:
			"Escreva um relatório sobre os resultados de uma pequena pesquisa entre seus colegas.",
		minWords: 120,
		keywords: ["found that", "most", "because"],
	},
	{
		id: "wx-b1-9",
		level: "B1",
		prompt: "Write a cover letter for a job you would like to apply for.",
		promptPt:
			"Escreva uma carta de apresentação para uma vaga que você gostaria de se candidatar.",
		minWords: 110,
		keywords: ["I am writing to apply", "experience", "because"],
	},

	// B2
	{
		id: "wx-b2-1",
		level: "B2",
		prompt:
			"Write an email to your manager proposing a change to the team's workflow.",
		promptPt:
			"Escreva um e-mail para seu gestor propondo uma mudança no fluxo de trabalho da equipe.",
		minWords: 160,
		keywords: ["however", "would", "therefore"],
	},
	{
		id: "wx-b2-2",
		level: "B2",
		prompt: "Write a letter to your future self about your career goals.",
		promptPt:
			"Escreva uma carta para o seu eu do futuro sobre seus objetivos de carreira.",
		minWords: 170,
		keywords: ["by then", "would have", "hope"],
	},
	{
		id: "wx-b2-3",
		level: "B2",
		prompt: "Write a short story that begins with an unexpected phone call.",
		promptPt:
			"Escreva uma história curta que começa com uma ligação inesperada.",
		minWords: 180,
		keywords: ["suddenly", "had never", "eventually"],
	},
	{
		id: "wx-b2-4",
		level: "B2",
		prompt:
			"Describe a cultural tradition from your country and its significance.",
		promptPt: "Descreva uma tradição cultural do seu país e seu significado.",
		minWords: 170,
		keywords: ["represents", "although", "moreover"],
	},
	{
		id: "wx-b2-5",
		level: "B2",
		prompt: "Write a review of a course or training program you completed.",
		promptPt:
			"Escreva uma avaliação de um curso ou treinamento que você concluiu.",
		minWords: 170,
		keywords: ["overall", "however", "would recommend"],
	},
	{
		id: "wx-b2-6",
		level: "B2",
		prompt:
			"Write an opinion essay on whether remote work should become permanent.",
		promptPt:
			"Escreva uma redação de opinião sobre se o trabalho remoto deveria se tornar permanente.",
		minWords: 190,
		keywords: ["however", "therefore", "on the other hand"],
	},
	{
		id: "wx-b2-7",
		level: "B2",
		prompt:
			"Write a formal complaint about a faulty product and demand a refund.",
		promptPt:
			"Escreva uma reclamação formal sobre um produto com defeito exigindo reembolso.",
		minWords: 170,
		keywords: ["I am writing to complain", "furthermore", "expect"],
	},
	{
		id: "wx-b2-8",
		level: "B2",
		prompt:
			"Write a report analyzing the strengths and weaknesses of a recent project.",
		promptPt:
			"Escreva um relatório analisando pontos fortes e fracos de um projeto recente.",
		minWords: 190,
		keywords: ["in terms of", "however", "recommend"],
	},
	{
		id: "wx-b2-9",
		level: "B2",
		prompt:
			"Write a cover letter highlighting a career change into a new field.",
		promptPt:
			"Escreva uma carta de apresentação destacando uma mudança de carreira para uma nova área.",
		minWords: 180,
		keywords: ["transitioning", "furthermore", "confident"],
	},

	// C1
	{
		id: "wx-c1-1",
		level: "C1",
		prompt:
			"Write an email persuading senior management to invest in employee training.",
		promptPt:
			"Escreva um e-mail persuadindo a alta gestão a investir em treinamento de funcionários.",
		minWords: 220,
		keywords: ["not only", "furthermore", "would"],
	},
	{
		id: "wx-c1-2",
		level: "C1",
		prompt:
			"Write a letter of recommendation for a colleague applying for a promotion.",
		promptPt:
			"Escreva uma carta de recomendação para um colega que está se candidatando a uma promoção.",
		minWords: 230,
		keywords: ["consistently", "moreover", "highly recommend"],
	},
	{
		id: "wx-c1-3",
		level: "C1",
		prompt:
			"Write a short story exploring the consequences of a broken promise.",
		promptPt:
			"Escreva uma história curta explorando as consequências de uma promessa quebrada.",
		minWords: 240,
		keywords: ["had promised", "consequently", "nevertheless"],
	},
	{
		id: "wx-c1-4",
		level: "C1",
		prompt: "Describe how technology has reshaped a profession of your choice.",
		promptPt:
			"Descreva como a tecnologia remodelou uma profissão de sua escolha.",
		minWords: 240,
		keywords: ["consequently", "whereas", "significantly"],
	},
	{
		id: "wx-c1-5",
		level: "C1",
		prompt:
			"Write a critical review of a book that challenged your assumptions.",
		promptPt:
			"Escreva uma resenha crítica de um livro que desafiou suas convicções.",
		minWords: 230,
		keywords: ["compelling", "nonetheless", "arguably"],
	},
	{
		id: "wx-c1-6",
		level: "C1",
		prompt:
			"Write an argumentative essay on whether artificial intelligence threatens jobs.",
		promptPt:
			"Escreva uma dissertação argumentativa sobre se a inteligência artificial ameaça empregos.",
		minWords: 260,
		keywords: ["although", "consequently", "on the contrary"],
	},
	{
		id: "wx-c1-7",
		level: "C1",
		prompt:
			"Write a formal complaint escalating an unresolved dispute with a supplier.",
		promptPt:
			"Escreva uma reclamação formal escalando uma disputa não resolvida com um fornecedor.",
		minWords: 230,
		keywords: ["despite", "furthermore", "demand"],
	},
	{
		id: "wx-c1-8",
		level: "C1",
		prompt:
			"Write a report evaluating the risks and benefits of expanding into a new market.",
		promptPt:
			"Escreva um relatório avaliando riscos e benefícios de expandir para um novo mercado.",
		minWords: 250,
		keywords: ["notwithstanding", "in light of", "recommend"],
	},
	{
		id: "wx-c1-9",
		level: "C1",
		prompt:
			"Write a cover letter for a leadership role, emphasizing measurable achievements.",
		promptPt:
			"Escreva uma carta de apresentação para um cargo de liderança, destacando conquistas mensuráveis.",
		minWords: 230,
		keywords: ["spearheaded", "consequently", "confident"],
	},

	// C2
	{
		id: "wx-c2-1",
		level: "C2",
		prompt:
			"Write an email negotiating a complex contract clause with a difficult counterpart.",
		promptPt:
			"Escreva um e-mail negociando uma cláusula contratual complexa com uma contraparte difícil.",
		minWords: 260,
		keywords: ["notwithstanding", "insofar as", "would"],
	},
	{
		id: "wx-c2-2",
		level: "C2",
		prompt:
			"Write a letter reflecting on a professional failure and what it taught you.",
		promptPt:
			"Escreva uma carta refletindo sobre um fracasso profissional e o que ele te ensinou.",
		minWords: 280,
		keywords: ["in hindsight", "nonetheless", "invaluable"],
	},
	{
		id: "wx-c2-3",
		level: "C2",
		prompt:
			"Write a short story with an unreliable narrator recounting a workplace scandal.",
		promptPt:
			"Escreva uma história curta com um narrador não confiável relatando um escândalo no trabalho.",
		minWords: 300,
		keywords: ["allegedly", "as it turned out", "nonetheless"],
	},
	{
		id: "wx-c2-4",
		level: "C2",
		prompt:
			"Describe the ethical tensions inherent in a technology you find fascinating.",
		promptPt:
			"Descreva as tensões éticas inerentes a uma tecnologia que você acha fascinante.",
		minWords: 290,
		keywords: ["inherent", "whereas", "arguably"],
	},
	{
		id: "wx-c2-5",
		level: "C2",
		prompt:
			"Write a scholarly review critiquing the methodology of a research paper.",
		promptPt:
			"Escreva uma resenha acadêmica criticando a metodologia de um artigo de pesquisa.",
		minWords: 280,
		keywords: ["methodologically", "notwithstanding", "warrants"],
	},
	{
		id: "wx-c2-6",
		level: "C2",
		prompt:
			"Write an argumentative essay on whether unlimited economic growth is sustainable.",
		promptPt:
			"Escreva uma dissertação argumentativa sobre se o crescimento econômico ilimitado é sustentável.",
		minWords: 320,
		keywords: ["not only", "notwithstanding", "consequently"],
	},
	{
		id: "wx-c2-7",
		level: "C2",
		prompt:
			"Write a formal complaint to a regulator alleging systemic negligence.",
		promptPt:
			"Escreva uma reclamação formal a um órgão regulador alegando negligência sistêmica.",
		minWords: 280,
		keywords: ["hereby", "in light of", "demand"],
	},
	{
		id: "wx-c2-8",
		level: "C2",
		prompt:
			"Write a report assessing the long-term geopolitical implications of a policy shift.",
		promptPt:
			"Escreva um relatório avaliando as implicações geopolíticas de longo prazo de uma mudança de política.",
		minWords: 300,
		keywords: ["ramifications", "notwithstanding", "warrant"],
	},
	{
		id: "wx-c2-9",
		level: "C2",
		prompt:
			"Write a cover letter for an executive position, framing your vision for the organization.",
		promptPt:
			"Escreva uma carta de apresentação para um cargo executivo, apresentando sua visão para a organização.",
		minWords: 280,
		keywords: ["envision", "notwithstanding", "unequivocally"],
	},
];
