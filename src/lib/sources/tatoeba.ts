import type { CEFRLevel } from "@/lib/curriculumData";

/**
 * Frases gravadas por falantes reais no Tatoeba (texto CC BY 2.0 FR; cada
 * áudio tem autor e licença próprios, exibidos junto do player). Sem chave.
 */
const API = "https://api.tatoeba.org/v1/sentences";
const AUDIO_HOST = "https://api.tatoeba.org/";

export type NativeSentence = {
	id: number;
	text: string;
	translation?: string;
	audioUrl: string;
	audioAuthor: string;
	audioLicense: string;
	attributionUrl?: string;
};

/** Tamanho da frase como aproximação de nível (frases longas = mais carga). */
export const LEVEL_WORD_COUNT: Record<CEFRLevel, string> = {
	A1: "3-6",
	A2: "5-8",
	B1: "7-11",
	B2: "10-15",
	C1: "13-20",
	C2: "16-30",
};

type RawAudio = {
	author?: unknown;
	license?: unknown;
	attribution_url?: unknown;
	download_url?: unknown;
};
type RawSentence = {
	id?: unknown;
	text?: unknown;
	audios?: RawAudio[];
	translations?: { text?: unknown; lang?: unknown }[];
};

function toSentence(raw: RawSentence): NativeSentence | null {
	const audio = raw.audios?.[0];
	const audioUrl = audio?.download_url;
	if (
		typeof raw.id !== "number" ||
		typeof raw.text !== "string" ||
		typeof audioUrl !== "string" ||
		!audioUrl.startsWith(AUDIO_HOST)
	) {
		return null;
	}
	const translation = raw.translations?.find((t) => t.lang === "por")?.text;
	const attribution = audio?.attribution_url;
	return {
		id: raw.id,
		text: raw.text.slice(0, 400),
		translation: typeof translation === "string" ? translation : undefined,
		audioUrl,
		audioAuthor: String(audio?.author ?? "desconhecido"),
		audioLicense: String(audio?.license ?? "ver Tatoeba"),
		attributionUrl:
			typeof attribution === "string" && attribution.startsWith("http")
				? attribution
				: undefined,
	};
}

export async function fetchNativeSentences(
	options: { level: CEFRLevel; query?: string; limit?: number },
	signal?: AbortSignal,
): Promise<NativeSentence[]> {
	const params = new URLSearchParams({
		lang: "eng",
		has_audio: "yes",
		sort: "random",
		include: "audios",
		"trans:lang": "por",
		"showtrans:lang": "por",
		word_count: LEVEL_WORD_COUNT[options.level],
		limit: String(Math.min(options.limit ?? 10, 20)),
	});
	const query = options.query?.trim().slice(0, 60);
	if (query) params.set("q", query);
	const response = await fetch(`${API}?${params}`, { signal });
	if (!response.ok) throw new Error(`Tatoeba respondeu ${response.status}`);
	const data = (await response.json()) as { data?: RawSentence[] };
	return (data.data ?? [])
		.map(toSentence)
		.filter((s): s is NativeSentence => s !== null);
}
