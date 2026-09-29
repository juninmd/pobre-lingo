import type { GradedReader } from "./gradedReadersTypes";

export const readersA1B1: GradedReader[] = [
	{
		id: "a1-my-morning",
		level: "A1",
		title: "My Morning",
		titlePt: "Minha manhã",
		topic: "rotina",
		minutes: 3,
		lines: [
			{ en: "I wake up at seven o'clock.", pt: "Eu acordo às sete horas." },
			{ en: "I drink a cup of coffee.", pt: "Eu bebo uma xícara de café." },
			{ en: "I eat bread with butter.", pt: "Eu como pão com manteiga." },
			{
				en: "I take a shower and get dressed.",
				pt: "Eu tomo banho e me visto.",
			},
			{ en: "I go to work by bus.", pt: "Eu vou ao trabalho de ônibus." },
			{ en: "The bus is always full.", pt: "O ônibus está sempre cheio." },
		],
	},
	{
		id: "a1-at-the-market",
		level: "A1",
		title: "At the Market",
		titlePt: "No mercado",
		topic: "compras",
		minutes: 3,
		lines: [
			{
				en: "I go to the market on Saturday.",
				pt: "Eu vou ao mercado no sábado.",
			},
			{
				en: "I need apples, rice and milk.",
				pt: "Eu preciso de maçãs, arroz e leite.",
			},
			{
				en: "The apples are two dollars.",
				pt: "As maçãs custam dois dólares.",
			},
			{ en: "I pay with my card.", pt: "Eu pago com meu cartão." },
			{ en: "The man says: thank you!", pt: "O homem diz: obrigado!" },
			{
				en: "I go home with my bags.",
				pt: "Eu vou para casa com minhas sacolas.",
			},
		],
	},
	{
		id: "a2-weekend-trip",
		level: "A2",
		title: "A Weekend Trip",
		titlePt: "Uma viagem de fim de semana",
		topic: "viagem",
		minutes: 4,
		lines: [
			{
				en: "Last weekend I traveled to the mountains.",
				pt: "No fim de semana passado eu viajei para as montanhas.",
			},
			{
				en: "The trip took three hours by car.",
				pt: "A viagem levou três horas de carro.",
			},
			{
				en: "We stayed in a small hotel near the river.",
				pt: "Nós ficamos em um hotel pequeno perto do rio.",
			},
			{
				en: "On Saturday we walked for a long time.",
				pt: "No sábado nós caminhamos por muito tempo.",
			},
			{
				en: "The weather was cold, but the view was beautiful.",
				pt: "O tempo estava frio, mas a vista era linda.",
			},
			{
				en: "We ate soup and drank hot tea.",
				pt: "Nós comemos sopa e bebemos chá quente.",
			},
			{
				en: "I want to go back next year.",
				pt: "Eu quero voltar no ano que vem.",
			},
		],
	},
	{
		id: "b1-the-new-job",
		level: "B1",
		title: "The New Job",
		titlePt: "O novo emprego",
		topic: "trabalho",
		minutes: 5,
		lines: [
			{
				en: "Two months ago, Marina started a new job.",
				pt: "Dois meses atrás, Marina começou um novo emprego.",
			},
			{
				en: "At first, she was nervous about the meetings.",
				pt: "No começo, ela estava nervosa com as reuniões.",
			},
			{
				en: "Her manager told her to ask questions.",
				pt: "O gerente dela disse para ela fazer perguntas.",
			},
			{
				en: "Now she leads a small team of five people.",
				pt: "Agora ela lidera uma equipe pequena de cinco pessoas.",
			},
			{
				en: "She says the hardest part is speaking in public.",
				pt: "Ela diz que a parte mais difícil é falar em público.",
			},
			{
				en: "But she practices every day and is improving fast.",
				pt: "Mas ela pratica todos os dias e está melhorando rápido.",
			},
		],
	},
	{
		id: "b1-a-rainy-day",
		level: "B1",
		title: "A Rainy Day in London",
		titlePt: "Um dia chuvoso em Londres",
		topic: "viagem",
		minutes: 5,
		lines: [
			{
				en: "It was raining when we arrived in London.",
				pt: "Estava chovendo quando chegamos em Londres.",
			},
			{
				en: "We had planned to walk around the city.",
				pt: "Nós havíamos planejado caminhar pela cidade.",
			},
			{
				en: "Instead, we visited a museum near the station.",
				pt: "Em vez disso, visitamos um museu perto da estação.",
			},
			{
				en: "The museum was free, and it was warm inside.",
				pt: "O museu era gratuito, e estava quente lá dentro.",
			},
			{
				en: "By the evening, the rain had stopped.",
				pt: "À noite, a chuva havia parado.",
			},
			{
				en: "We found a small pub and tried the local food.",
				pt: "Encontramos um pub pequeno e provamos a comida local.",
			},
		],
	},
];
