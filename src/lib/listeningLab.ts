/** Regras puras do Laboratório de Escuta: validação de arquivos e tipo de mídia. */

const MAX_SUBTITLE_BYTES = 2 * 1024 * 1024;
const SUBTITLE_EXTENSIONS = [".srt", ".vtt"];

export function isSubtitleFileValid(file: File): boolean {
	const name = file.name.toLowerCase();
	const hasExtension = SUBTITLE_EXTENSIONS.some((ext) => name.endsWith(ext));
	return hasExtension && file.size <= MAX_SUBTITLE_BYTES;
}

export type MediaKind = "audio" | "video";

export function mediaKindFor(file: File): MediaKind {
	return file.type.startsWith("video/") ? "video" : "audio";
}
