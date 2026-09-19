import type { MinimalPair } from "./types";

export const minimalPairs: MinimalPair[] = [
	// th
	{
		id: "th-1",
		focus: "th",
		a: "think",
		b: "sink",
		tipPt:
			'TH sopra entre os dentes; "sink" usa /s/ com a língua atrás dos dentes.',
	},
	{
		id: "th-2",
		focus: "th",
		a: "thin",
		b: "fin",
		tipPt:
			"TH não é /f/: a língua fica entre os dentes, não os lábios tocando os dentes.",
	},
	{
		id: "th-3",
		focus: "th",
		a: "this",
		b: "dis",
		tipPt: "THIS usa TH sonoro (vibrando); não vire /d/.",
	},
	{
		id: "th-4",
		focus: "th",
		a: "three",
		b: "tree",
		tipPt:
			"THREE começa com a língua entre os dentes, não tocando o céu da boca como em TREE.",
	},
	{
		id: "th-5",
		focus: "th",
		a: "bath",
		b: "bat",
		tipPt: "O TH final de bath é soprado; não corte o som como em bat.",
	},
	{
		id: "th-6",
		focus: "th",
		a: "mouth",
		b: "mouse",
		tipPt: "MOUTH termina em TH soprado; MOUSE termina em /s/.",
	},
	{
		id: "th-7",
		focus: "th",
		a: "thank",
		b: "tank",
		tipPt:
			"THANK começa com língua entre os dentes; TANK usa /t/ tocando o céu da boca.",
	},
	{
		id: "th-8",
		focus: "th",
		a: "though",
		b: "dough",
		tipPt: "THOUGH usa TH sonoro; DOUGH usa /d/.",
	},
	{
		id: "th-9",
		focus: "th",
		a: "worth",
		b: "were",
		tipPt: "WORTH termina com TH soprado, sem soar como WERE.",
	},

	// short-long-i
	{
		id: "sli-1",
		focus: "short-long-i",
		a: "ship",
		b: "sheep",
		tipPt: "SHIP tem I curto e relaxado; SHEEP tem I longo e tenso.",
	},
	{
		id: "sli-2",
		focus: "short-long-i",
		a: "sit",
		b: "seat",
		tipPt: "SIT é curto e rápido; SEAT estica o som do I.",
	},
	{
		id: "sli-3",
		focus: "short-long-i",
		a: "live",
		b: "leave",
		tipPt: "LIVE usa I curto; LEAVE usa I longo e mais fechado.",
	},
	{
		id: "sli-4",
		focus: "short-long-i",
		a: "fill",
		b: "feel",
		tipPt: "FILL é rápido; FEEL estica a vogal.",
	},
	{
		id: "sli-5",
		focus: "short-long-i",
		a: "chip",
		b: "cheap",
		tipPt: "CHIP tem I curto; CHEAP tem I longo.",
	},
	{
		id: "sli-6",
		focus: "short-long-i",
		a: "hit",
		b: "heat",
		tipPt: "HIT é curto; HEAT é alongado.",
	},
	{
		id: "sli-7",
		focus: "short-long-i",
		a: "bin",
		b: "bean",
		tipPt: "BIN é curto; BEAN é alongado e tenso.",
	},
	{
		id: "sli-8",
		focus: "short-long-i",
		a: "slip",
		b: "sleep",
		tipPt: "SLIP é rápido; SLEEP estica o som.",
	},
	{
		id: "sli-9",
		focus: "short-long-i",
		a: "grip",
		b: "greep",
		tipPt:
			"Compare GRIP (I curto) com a vogal alongada de palavras como GREEN.",
	},

	// schwa
	{
		id: "sc-1",
		focus: "schwa",
		a: "photograph",
		b: "photography",
		tipPt: "Em PHOTOGRAPH o acento muda e sílabas viram schwa em PHOTOGRAPHY.",
	},
	{
		id: "sc-2",
		focus: "schwa",
		a: "about",
		b: "a-bowt",
		tipPt:
			'O "a" inicial de ABOUT é um schwa rápido, não um "a" cheio como no português.',
	},
	{
		id: "sc-3",
		focus: "schwa",
		a: "banana",
		b: "ba-na-na",
		tipPt:
			"As duas primeiras sílabas de BANANA usam schwa; só a do meio é forte.",
	},
	{
		id: "sc-4",
		focus: "schwa",
		a: "sofa",
		b: "so-fah",
		tipPt: 'O final de SOFA é um schwa curto, não um "a" aberto.',
	},
	{
		id: "sc-5",
		focus: "schwa",
		a: "teacher",
		b: "tea-cher",
		tipPt: 'O "-er" final soa como schwa, nunca como "er" forte do português.',
	},
	{
		id: "sc-6",
		focus: "schwa",
		a: "computer",
		b: "com-pu-ter",
		tipPt: 'As sílabas átonas de COMPUTER reduzem para schwa; só "pu" é forte.',
	},
	{
		id: "sc-7",
		focus: "schwa",
		a: "problem",
		b: "prob-lem",
		tipPt: 'O "-lem" final de PROBLEM usa schwa, não um "e" completo.',
	},
	{
		id: "sc-8",
		focus: "schwa",
		a: "camera",
		b: "cam-ra",
		tipPt: "CAMERA tem uma sílaba central quase engolida (schwa).",
	},
	{
		id: "sc-9",
		focus: "schwa",
		a: "family",
		b: "fam-ly",
		tipPt: "FAMILY reduz o meio a um schwa rápido, quase virando duas sílabas.",
	},

	// ed-ending
	{
		id: "ed-1",
		focus: "ed-ending",
		a: "walked",
		b: "wanted",
		tipPt:
			"WALKED termina em /t/ (som seco); WANTED soma uma sílaba extra /ɪd/.",
	},
	{
		id: "ed-2",
		focus: "ed-ending",
		a: "played",
		b: "painted",
		tipPt: "PLAYED termina em /d/ sonoro; PAINTED ganha a sílaba extra /ɪd/.",
	},
	{
		id: "ed-3",
		focus: "ed-ending",
		a: "watched",
		b: "needed",
		tipPt:
			"WATCHED termina em /t/; NEEDED ganha sílaba extra por terminar em /d/ na raiz.",
	},
	{
		id: "ed-4",
		focus: "ed-ending",
		a: "stopped",
		b: "started",
		tipPt: "STOPPED usa /t/; STARTED ganha /ɪd/ por terminar em /t/ na raiz.",
	},
	{
		id: "ed-5",
		focus: "ed-ending",
		a: "loved",
		b: "landed",
		tipPt: "LOVED termina em /d/ sonoro; LANDED ganha sílaba extra /ɪd/.",
	},
	{
		id: "ed-6",
		focus: "ed-ending",
		a: "washed",
		b: "decided",
		tipPt: "WASHED termina em /t/; DECIDED ganha sílaba extra /ɪd/.",
	},
	{
		id: "ed-7",
		focus: "ed-ending",
		a: "cleaned",
		b: "waited",
		tipPt: "CLEANED termina em /d/; WAITED ganha sílaba extra /ɪd/.",
	},
	{
		id: "ed-8",
		focus: "ed-ending",
		a: "kissed",
		b: "visited",
		tipPt: "KISSED termina em /t/ seco; VISITED ganha sílaba extra /ɪd/.",
	},
	{
		id: "ed-9",
		focus: "ed-ending",
		a: "helped",
		b: "ended",
		tipPt:
			"HELPED termina em /t/; ENDED ganha sílaba extra por terminar em /d/.",
	},

	// final-consonant
	{
		id: "fc-1",
		focus: "final-consonant",
		a: "cap",
		b: "cape",
		tipPt:
			"CAP termina fechando o /p/ sem soltar vogal; CAPE tem vogal longa antes do /p/.",
	},
	{
		id: "fc-2",
		focus: "final-consonant",
		a: "stop",
		b: "stopi",
		tipPt: 'STOP termina travando o /p/; não solte um "i" no final.',
	},
	{
		id: "fc-3",
		focus: "final-consonant",
		a: "big",
		b: "bigui",
		tipPt: "BIG termina fechando o /g/; evite adicionar vogal depois.",
	},
	{
		id: "fc-4",
		focus: "final-consonant",
		a: "job",
		b: "jobi",
		tipPt: "JOB termina no /b/ fechado, sem soltar som extra.",
	},
	{
		id: "fc-5",
		focus: "final-consonant",
		a: "book",
		b: "booki",
		tipPt: "BOOK termina travando o /k/, sem vogal final.",
	},
	{
		id: "fc-6",
		focus: "final-consonant",
		a: "good",
		b: "goodi",
		tipPt: "GOOD termina no /d/ fechado, sem soltar vogal.",
	},
	{
		id: "fc-7",
		focus: "final-consonant",
		a: "club",
		b: "clubi",
		tipPt: 'CLUB termina fechando o /b/, sem adicionar "i".',
	},
	{
		id: "fc-8",
		focus: "final-consonant",
		a: "cat",
		b: "cati",
		tipPt: "CAT termina travando o /t/, sem soltar vogal extra.",
	},
	{
		id: "fc-9",
		focus: "final-consonant",
		a: "dog",
		b: "dogui",
		tipPt: "DOG termina fechando o /g/, sem adicionar som depois.",
	},

	// h-vs-r
	{
		id: "hr-1",
		focus: "h-vs-r",
		a: "hot",
		b: "rot",
		tipPt:
			"HOT é só um sopro de ar (H); ROT usa a língua curvada para trás (R).",
	},
	{
		id: "hr-2",
		focus: "h-vs-r",
		a: "hope",
		b: "rope",
		tipPt:
			"HOPE começa com sopro solto; ROPE usa a língua curvada, sem tocar o céu da boca.",
	},
	{
		id: "hr-3",
		focus: "h-vs-r",
		a: "hat",
		b: "rat",
		tipPt:
			"HAT é só ar; RAT precisa da língua em posição de R, sem vibrar como o R do português.",
	},
	{
		id: "hr-4",
		focus: "h-vs-r",
		a: "hate",
		b: "rate",
		tipPt: "HATE começa com H aspirado; RATE usa o R aproximante do inglês.",
	},
	{
		id: "hr-5",
		focus: "h-vs-r",
		a: "hide",
		b: "ride",
		tipPt: "HIDE é um sopro; RIDE usa a língua curvada para trás.",
	},
	{
		id: "hr-6",
		focus: "h-vs-r",
		a: "hair",
		b: "rare",
		tipPt:
			"HAIR começa só com ar; RARE usa o R inglês, diferente do R brasileiro.",
	},
	{
		id: "hr-7",
		focus: "h-vs-r",
		a: "heat",
		b: "read",
		tipPt: "HEAT é sopro puro; READ usa R aproximante sem fricção na garganta.",
	},
	{
		id: "hr-8",
		focus: "h-vs-r",
		a: "hit",
		b: "writ",
		tipPt: "HIT é ar solto; a raiz de WRIT usa R sem tocar em nada na boca.",
	},
	{
		id: "hr-9",
		focus: "h-vs-r",
		a: "how",
		b: "row",
		tipPt:
			"HOW começa com sopro; ROW usa o R curvado, nunca vibrado como no português.",
	},

	// ae-vs-e
	{
		id: "ae-1",
		focus: "ae-vs-e",
		a: "man",
		b: "men",
		tipPt: "MAN abre bem a boca (/æ/); MEN é mais fechado e neutro (/e/).",
	},
	{
		id: "ae-2",
		focus: "ae-vs-e",
		a: "bad",
		b: "bed",
		tipPt:
			"BAD estica os lábios como um sorriso forçado; BED é mais curto e neutro.",
	},
	{
		id: "ae-3",
		focus: "ae-vs-e",
		a: "cat",
		b: "cet",
		tipPt:
			"CAT abre bem a boca; compare com o som mais fechado de palavras com /e/.",
	},
	{
		id: "ae-4",
		focus: "ae-vs-e",
		a: "sad",
		b: "said",
		tipPt: "SAD usa /æ/ aberto; SAID usa /e/, mais fechado.",
	},
	{
		id: "ae-5",
		focus: "ae-vs-e",
		a: "pan",
		b: "pen",
		tipPt: "PAN abre bem a boca; PEN é mais neutro e curto.",
	},
	{
		id: "ae-6",
		focus: "ae-vs-e",
		a: "land",
		b: "lend",
		tipPt: "LAND usa /æ/ aberto; LEND usa /e/ mais fechado.",
	},
	{
		id: "ae-7",
		focus: "ae-vs-e",
		a: "bat",
		b: "bet",
		tipPt: "BAT abre a boca; BET é mais curto e neutro.",
	},
	{
		id: "ae-8",
		focus: "ae-vs-e",
		a: "ran",
		b: "wren",
		tipPt: "RAN usa /æ/ bem aberto; a vogal de WREN é mais fechada.",
	},
	{
		id: "ae-9",
		focus: "ae-vs-e",
		a: "gas",
		b: "guess",
		tipPt: "GAS abre bem a boca; GUESS é mais neutro e curto.",
	},
];
