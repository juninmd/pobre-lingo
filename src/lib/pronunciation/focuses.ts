import type { FocusInfo } from "./types";

export const pronunciationFocuses: FocusInfo[] = [
	{
		id: "th",
		title: "O som de TH (think / this)",
		whyPt:
			'O português não tem esse som, então brasileiros trocam TH por /f/, /v/ ou /t/, /d/ ("sink" em vez de "think").',
		howPt:
			'Coloque a ponta da língua entre os dentes e sopre o ar sem vibrar (think) ou vibrando (this). Não encoste a língua nos dentes de baixo como no "f".',
	},
	{
		id: "short-long-i",
		title: "I curto vs. I longo (ship / sheep)",
		whyPt:
			'Em português só existe um som de "i", então "ship" e "sheep" soam iguais para brasileiros, causando confusões (ex: "beach" vs a palavra que não deve ser dita).',
		howPt:
			'O I curto (/ɪ/) é relaxado e mais central, quase um "i" curto e fraco. O I longo (/iː/) é tenso e esticado, mantido por mais tempo.',
	},
	{
		id: "schwa",
		title: "O schwa /ə/ (sílaba fraca)",
		whyPt:
			'Em português pronunciamos quase toda vogal com clareza; em inglês, sílabas átonas viram um som neutro e curto, o schwa, e ignorar isso deixa a fala "silabada".',
		howPt:
			'Relaxe a boca, sem tensionar lábios ou língua, e diga um "a" bem curto e neutro nas sílabas não acentuadas (about, banana, teacher).',
	},
	{
		id: "ed-ending",
		title: "Terminação -ED (walked / wanted / played)",
		whyPt:
			'Brasileiros tendem a pronunciar todo -ED como "ide", mas em inglês o som muda: /t/, /d/ ou /ɪd/ dependendo da consoante final do verbo.',
		howPt:
			"Depois de som surdo (k, p, s) use /t/ (walked); depois de som sonoro (l, n, v) use /d/ (played); depois de /t/ ou /d/ use /ɪd/ (wanted, needed).",
	},
	{
		id: "final-consonant",
		title: "Consoante final (não adicionar vogal)",
		whyPt:
			'Em português quase toda palavra termina em vogal, então brasileiros costumam adicionar um "i" ou "e" no final de palavras inglesas ("clubi", "stopi").',
		howPt:
			"Feche o som da consoante final sem soltar uma vogal depois; pare o ar na própria consoante (stop, club, big).",
	},
	{
		id: "h-vs-r",
		title: "H aspirado vs. R (hat / rat)",
		whyPt:
			'O R brasileiro (caipira ou carioca) soa parecido com o H aspirado do inglês, levando a trocas como pronunciar "hot" como "rot".',
		howPt:
			"O H inglês é apenas um sopro de ar vindo da garganta, sem tocar a língua em lugar nenhum; o R inglês (/r/) curva a língua para trás sem tocar o céu da boca.",
	},
	{
		id: "word-stress",
		title: "Acento tônico (word stress)",
		whyPt:
			"Palavras em inglês têm uma sílaba claramente mais forte; brasileiros tendem a pronunciar todas as sílabas com o mesmo peso, deixando a fala difícil de entender.",
		howPt:
			"Identifique a sílaba tônica e alongue/enfatize só ela, reduzindo as outras a sons curtos (muitas vezes schwa).",
	},
	{
		id: "ae-vs-e",
		title: "AE vs. E (cat / bed, man / men)",
		whyPt:
			'Brasileiros costumam pronunciar o /æ/ (cat) igual ao /e/ (bed), confundindo pares como "man" e "men".',
		howPt:
			"Para /æ/, abra bem a boca e estique os lábios como um sorriso forçado; para /e/, a boca fica menos aberta e mais neutra.",
	},
];
