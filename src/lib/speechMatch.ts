/**
 * Pontuação de fala: compara o que o reconhecimento de voz ouviu com a frase
 * alvo, palavra a palavra e na ordem (maior subsequência comum). Assim, falar
 * só uma palavra ou embaralhar a frase não conta como acerto.
 */

export const PASS_THRESHOLD = 70;

export type WordMatch = { word: string; heard: boolean };

export type SpeechScore = {
	score: number;
	passed: boolean;
	words: WordMatch[];
};

const CONTRACTIONS: Record<string, string> = {
	"don't": "do not",
	"doesn't": "does not",
	"didn't": "did not",
	"can't": "can not",
	cannot: "can not",
	"won't": "will not",
	"isn't": "is not",
	"aren't": "are not",
	"i'm": "i am",
	"it's": "it is",
	"you're": "you are",
	"we're": "we are",
	"they're": "they are",
	"i've": "i have",
	"i'll": "i will",
	"i'd": "i would",
	"that's": "that is",
	"what's": "what is",
	"let's": "let us",
};

export function tokenize(text: string): string[] {
	return text
		.toLowerCase()
		.replace(/[’‘]/g, "'")
		.replace(/[^a-z0-9' ]+/g, " ")
		.split(/\s+/)
		.filter(Boolean)
		.flatMap((token) => (CONTRACTIONS[token] ?? token).split(" "))
		.map((token) => token.replace(/'/g, ""));
}

/** Marca, para cada palavra alvo, se ela aparece na fala na ordem certa. */
function alignWords(target: string[], spoken: string[]): boolean[] {
	const rows = target.length + 1;
	const cols = spoken.length + 1;
	const lcs: number[][] = Array.from({ length: rows }, () =>
		new Array<number>(cols).fill(0),
	);
	for (let i = 1; i < rows; i++) {
		for (let j = 1; j < cols; j++) {
			lcs[i][j] =
				target[i - 1] === spoken[j - 1]
					? lcs[i - 1][j - 1] + 1
					: Math.max(lcs[i - 1][j], lcs[i][j - 1]);
		}
	}
	const heard = new Array<boolean>(target.length).fill(false);
	let i = target.length;
	let j = spoken.length;
	while (i > 0 && j > 0) {
		if (target[i - 1] === spoken[j - 1]) {
			heard[i - 1] = true;
			i--;
			j--;
		} else if (lcs[i - 1][j] >= lcs[i][j - 1]) {
			i--;
		} else {
			j--;
		}
	}
	return heard;
}

export function scoreSpeech(target: string, transcript: string): SpeechScore {
	const targetWords = tokenize(target);
	const spokenWords = tokenize(transcript);
	if (targetWords.length === 0 || spokenWords.length === 0) {
		return {
			score: 0,
			passed: false,
			words: targetWords.map((word) => ({ word, heard: false })),
		};
	}
	const heard = alignWords(targetWords, spokenWords);
	const matched = heard.filter(Boolean).length;
	// Palavras extras também pesam, para "falar tudo e mais um pouco" não passar.
	const score = Math.round(
		(matched / Math.max(targetWords.length, spokenWords.length)) * 100,
	);
	return {
		score,
		passed: score >= PASS_THRESHOLD,
		words: targetWords.map((word, index) => ({ word, heard: heard[index] })),
	};
}
