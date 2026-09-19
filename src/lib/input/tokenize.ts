/** Quebra texto livre em palavras clicáveis e trechos de pontuação/espaço. */

export type WordToken = { kind: "word"; text: string; key: string };
export type Token = WordToken | { kind: "other"; text: string };

const WORD = /[A-Za-z]+(?:['’][A-Za-z]+)*/g;

export function normalizeWord(word: string): string {
	return word.toLowerCase().replace(/’/g, "'");
}

export function tokenizeText(text: string): Token[] {
	const tokens: Token[] = [];
	let last = 0;
	for (const match of text.matchAll(WORD)) {
		const start = match.index ?? 0;
		if (start > last)
			tokens.push({ kind: "other", text: text.slice(last, start) });
		tokens.push({ kind: "word", text: match[0], key: normalizeWord(match[0]) });
		last = start + match[0].length;
	}
	if (last < text.length)
		tokens.push({ kind: "other", text: text.slice(last) });
	return tokens;
}

export function countWords(text: string): number {
	return text.match(WORD)?.length ?? 0;
}

const CONTRACTION_SUFFIXES = ["n't", "'re", "'ve", "'ll", "'d", "'m"];

const IRREGULAR: Record<string, string> = {
	went: "go",
	gone: "go",
	was: "be",
	were: "be",
	been: "be",
	is: "be",
	are: "be",
	am: "be",
	had: "have",
	has: "have",
	did: "do",
	does: "do",
	done: "do",
	made: "make",
	said: "say",
	got: "get",
	took: "take",
	taken: "take",
	came: "come",
	saw: "see",
	seen: "see",
	knew: "know",
	known: "know",
	thought: "think",
	found: "find",
	gave: "give",
	given: "give",
	told: "tell",
	felt: "feel",
	left: "leave",
	brought: "bring",
	bought: "buy",
	kept: "keep",
	began: "begin",
	begun: "begin",
	wrote: "write",
	written: "write",
	ate: "eat",
	eaten: "eat",
	children: "child",
	people: "person",
	men: "man",
	women: "woman",
	better: "good",
	best: "good",
	worse: "bad",
	worst: "bad",
};

/** Formas candidatas ao lema (ordem: exata primeiro). Heurística, sem dicionário morfológico. */
export function lemmaCandidates(key: string): string[] {
	let word = key.replace(/'s$/, "");
	for (const suffix of CONTRACTION_SUFFIXES) {
		if (word.endsWith(suffix) && word.length > suffix.length + 1) {
			word = word.slice(0, -suffix.length);
			if (word === "wo") word = "will";
			if (word === "ca") word = "can";
			break;
		}
	}
	const out = [word];
	const push = (candidate: string) => {
		if (candidate.length > 1 && !out.includes(candidate)) out.push(candidate);
	};
	if (IRREGULAR[word]) push(IRREGULAR[word]);
	if (word.endsWith("ies")) push(`${word.slice(0, -3)}y`);
	if (word.endsWith("ied")) push(`${word.slice(0, -3)}y`);
	if (word.endsWith("es")) push(word.slice(0, -2));
	if (word.endsWith("s") && !word.endsWith("ss")) push(word.slice(0, -1));
	for (const suffix of ["ing", "ed", "er", "est", "ly"]) {
		if (!word.endsWith(suffix) || word.length < suffix.length + 3) continue;
		const stem = word.slice(0, -suffix.length);
		push(stem);
		push(`${stem}e`);
		if (stem.at(-1) === stem.at(-2)) push(stem.slice(0, -1));
		if (suffix === "ly" && stem.endsWith("i")) push(`${stem.slice(0, -1)}y`);
	}
	return out;
}
