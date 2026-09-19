/**
 * Tradução no aparelho (Translator API do Chrome), usada para mostrar em
 * português as dicas que a IA do Chrome só consegue escrever em inglês.
 * Nunca faz a conversa esperar um download: sem tradutor pronto, a dica fica
 * em inglês e o download segue em segundo plano para as próximas.
 */

type TranslatorInstance = { translate(text: string): Promise<string> };

type TranslatorApi = {
	availability(options: {
		sourceLanguage: string;
		targetLanguage: string;
	}): Promise<string>;
	create(options: {
		sourceLanguage: string;
		targetLanguage: string;
	}): Promise<TranslatorInstance>;
};

const PAIR = { sourceLanguage: "en", targetLanguage: "pt" };

let ready: TranslatorInstance | null = null;
let pending: Promise<void> | null = null;

function getApi(): TranslatorApi | undefined {
	return (globalThis as { Translator?: TranslatorApi }).Translator;
}

function prepare(api: TranslatorApi) {
	pending ??= api
		.create(PAIR)
		.then((instance) => {
			ready = instance;
		})
		.catch(() => {
			pending = null;
		});
}

/** Traduz para português; devolve null quando ainda não há tradutor pronto. */
export async function translateToPortuguese(
	text: string,
): Promise<string | null> {
	const api = getApi();
	if (!api) return null;
	if (!ready) {
		try {
			const availability = await api.availability(PAIR);
			if (availability === "unavailable") return null;
			prepare(api);
			// Pronto no aparelho: cria na hora. Senão, baixa sem bloquear a conversa.
			if (availability === "available") await pending;
		} catch {
			return null;
		}
	}
	if (!ready) return null;
	try {
		return await ready.translate(text);
	} catch {
		return null;
	}
}
