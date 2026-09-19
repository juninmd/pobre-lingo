import { MAX_TEXT_CHARS } from "@/lib/input/library";

/**
 * Artigos da Simple English Wikipedia (CC BY-SA 4.0): inglês simplificado,
 * ideal para leitura extensiva B1–B2. API pública com CORS, sem chave.
 */
const API = "https://simple.wikipedia.org/w/api.php";

export type WikiArticle = { title: string; text: string; url: string };
export type WikiSearchHit = { title: string; snippet: string };

type QueryPage = { title?: unknown; extract?: unknown; fullurl?: unknown };

function buildUrl(params: Record<string, string>): string {
	const search = new URLSearchParams({
		format: "json",
		formatversion: "2",
		origin: "*",
		...params,
	});
	return `${API}?${search}`;
}

async function getJson(url: string, signal?: AbortSignal): Promise<unknown> {
	const response = await fetch(url, { signal });
	if (!response.ok) throw new Error(`Wikipedia respondeu ${response.status}`);
	return response.json();
}

function toArticle(page: QueryPage | undefined): WikiArticle {
	const title = typeof page?.title === "string" ? page.title : "";
	const text = typeof page?.extract === "string" ? page.extract : "";
	if (!title || !text.trim()) throw new Error("Artigo vazio ou indisponível");
	const url =
		typeof page?.fullurl === "string" &&
		page.fullurl.startsWith("https://simple.wikipedia.org/")
			? page.fullurl
			: `https://simple.wikipedia.org/wiki/${encodeURIComponent(title)}`;
	// Tira cabeçalhos "== Seção ==" que o explaintext mantém.
	const clean = text.replace(/^=+\s*.*?\s*=+$/gm, "").trim();
	return { title, text: clean.slice(0, MAX_TEXT_CHARS), url };
}

const EXTRACT = {
	action: "query",
	prop: "extracts|info",
	inprop: "url",
	explaintext: "1",
	redirects: "1",
};

/** Sorteia 10 páginas e abre a maior: evita esboços de uma linha. */
export async function fetchRandomArticle(
	signal?: AbortSignal,
): Promise<WikiArticle> {
	const data = (await getJson(
		buildUrl({
			action: "query",
			prop: "info",
			generator: "random",
			grnnamespace: "0",
			grnlimit: "10",
		}),
		signal,
	)) as { query?: { pages?: { title?: unknown; length?: unknown }[] } };
	const pages = (data.query?.pages ?? []).filter(
		(p): p is { title: string; length: number } =>
			typeof p.title === "string" && typeof p.length === "number",
	);
	const biggest = pages.sort((a, b) => b.length - a.length)[0];
	if (!biggest) throw new Error("Nenhum artigo encontrado");
	return fetchArticle(biggest.title, signal);
}

export async function fetchArticle(
	title: string,
	signal?: AbortSignal,
): Promise<WikiArticle> {
	const data = (await getJson(
		buildUrl({ ...EXTRACT, titles: title.slice(0, 200) }),
		signal,
	)) as { query?: { pages?: QueryPage[] } };
	return toArticle(data.query?.pages?.[0]);
}

export async function searchArticles(
	query: string,
	signal?: AbortSignal,
): Promise<WikiSearchHit[]> {
	const data = (await getJson(
		buildUrl({
			action: "query",
			list: "search",
			srsearch: query.slice(0, 100),
			srlimit: "8",
		}),
		signal,
	)) as { query?: { search?: { title?: unknown; snippet?: unknown }[] } };
	return (data.query?.search ?? [])
		.filter((hit) => typeof hit.title === "string")
		.map((hit) => ({
			title: hit.title as string,
			// O snippet vem com HTML de destaque: vira texto puro.
			snippet: String(hit.snippet ?? "").replace(/<[^>]*>/g, ""),
		}));
}
