import { ADVANCED_PUZZLES } from "./puzzlesAdvanced";

/** Um nível da Roda de Palavras: as letras da roda e as palavras a achar (inglês -> português). */
export interface WordWheelPuzzle {
	id: string;
	letters: string;
	cefr: "A1" | "A2" | "B1";
	theme: string;
	words: Record<string, string>;
}

/** Curadoria manual; `puzzles.test.ts` garante que toda palavra cabe nas letras da roda. */
const STARTER_PUZZLES: WordWheelPuzzle[] = [
	{
		id: "water",
		letters: "WATER",
		cefr: "A1",
		theme: "Natureza",
		words: {
			water: "água",
			wear: "vestir",
			tear: "lágrima",
			rate: "taxa",
			war: "guerra",
			eat: "comer",
			tea: "chá",
			art: "arte",
		},
	},
	{
		id: "house",
		letters: "HOUSE",
		cefr: "A1",
		theme: "Casa",
		words: {
			house: "casa",
			shoe: "sapato",
			hose: "mangueira",
			use: "usar",
			she: "ela",
		},
	},
	{
		id: "heart",
		letters: "HEART",
		cefr: "A1",
		theme: "Corpo e sentimentos",
		words: {
			heart: "coração",
			earth: "terra",
			hate: "odiar",
			heat: "calor",
			hat: "chapéu",
			ear: "orelha",
			rat: "rato",
			tea: "chá",
		},
	},
	{
		id: "story",
		letters: "STORY",
		cefr: "A1",
		theme: "Leitura",
		words: {
			story: "história",
			sort: "ordenar",
			toys: "brinquedos",
			toy: "brinquedo",
			try: "tentar",
		},
	},
	{
		id: "friend",
		letters: "FRIEND",
		cefr: "A2",
		theme: "Pessoas",
		words: {
			friend: "amigo",
			find: "encontrar",
			fine: "bem",
			fire: "fogo",
			ride: "passeio",
			red: "vermelho",
			end: "fim",
		},
	},
	{
		id: "spring",
		letters: "SPRING",
		cefr: "A2",
		theme: "Estações",
		words: {
			spring: "primavera",
			ring: "anel",
			sing: "cantar",
			spin: "girar",
			grip: "agarrar",
			pig: "porco",
			pin: "alfinete",
			sip: "gole",
		},
	},
];

export const WORD_WHEEL_PUZZLES: WordWheelPuzzle[] = [
	...STARTER_PUZZLES,
	...ADVANCED_PUZZLES,
];
