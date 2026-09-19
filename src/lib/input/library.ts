/** Biblioteca local de textos importados (colados, arquivos, Wikipedia, legendas). */

export type LibrarySource = "paste" | "file" | "wikipedia";

export type LibraryText = {
	id: string;
	title: string;
	source: LibrarySource;
	/** Link de origem para atribuição (ex.: artigo da Wikipedia). */
	url?: string;
	text: string;
	createdAt: string;
	finishedAt?: string;
};

export const MAX_TEXTS = 40;
export const MAX_TEXT_CHARS = 30_000;
export const LIBRARY_KEY = "pobrelingo_input_library";

export type NewText = Pick<LibraryText, "title" | "source" | "url" | "text">;

export function sanitizeText(raw: string): string {
	return raw
		.replace(/\r\n?/g, "\n")
		.replace(/[ \t]+/g, " ")
		.replace(/\n{3,}/g, "\n\n")
		.trim()
		.slice(0, MAX_TEXT_CHARS);
}

/** Adiciona no topo; o mais antigo sai quando passa do limite. */
export function addText(
	list: LibraryText[],
	input: NewText,
	now: Date,
): { list: LibraryText[]; item: LibraryText } {
	const text = sanitizeText(input.text);
	const item: LibraryText = {
		id: `t-${now.getTime().toString(36)}-${list.length}`,
		title: input.title.trim().slice(0, 120) || text.slice(0, 40),
		source: input.source,
		url: input.url,
		text,
		createdAt: now.toISOString(),
	};
	return { list: [item, ...list].slice(0, MAX_TEXTS), item };
}

export function markFinished(
	list: LibraryText[],
	id: string,
	now: Date,
): LibraryText[] {
	return list.map((t) =>
		t.id === id && !t.finishedAt ? { ...t, finishedAt: now.toISOString() } : t,
	);
}

export function removeText(list: LibraryText[], id: string): LibraryText[] {
	return list.filter((t) => t.id !== id);
}
