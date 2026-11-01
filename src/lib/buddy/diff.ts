export type DiffPart = { text: string; kind: "same" | "removed" | "added" };

const tokens = (text: string) => text.split(/\s+/).filter(Boolean);
const bare = (word: string) =>
	word.toLowerCase().replace(/[^\p{L}\p{N}']/gu, "");

/** Diferença por palavra (LCS): o que o aluno digitou vs. a versão corrigida. */
export function diffWords(original: string, corrected: string): DiffPart[] {
	const a = tokens(original);
	const b = tokens(corrected);
	const table = Array.from({ length: a.length + 1 }, () =>
		new Array<number>(b.length + 1).fill(0),
	);
	for (let i = a.length - 1; i >= 0; i--) {
		for (let j = b.length - 1; j >= 0; j--) {
			table[i][j] =
				a[i] === b[j]
					? table[i + 1][j + 1] + 1
					: Math.max(table[i + 1][j], table[i][j + 1]);
		}
	}
	const parts: DiffPart[] = [];
	let i = 0;
	let j = 0;
	while (i < a.length || j < b.length) {
		if (i < a.length && j < b.length && a[i] === b[j]) {
			parts.push({ text: a[i++], kind: "same" });
			j++;
		} else if (
			j < b.length &&
			(i === a.length || table[i][j + 1] >= table[i + 1][j])
		) {
			parts.push({ text: b[j++], kind: "added" });
		} else {
			parts.push({ text: a[i++], kind: "removed" });
		}
	}
	return parts;
}

/** Só diferença de pontuação/maiúscula não vale um aviso. */
export const isMeaningfulChange = (original: string, corrected: string) =>
	tokens(original).map(bare).join(" ") !==
	tokens(corrected).map(bare).join(" ");
