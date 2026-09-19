/** Legendas SRT/WebVTT → falas com tempo, para ouvir áudio real com transcrição. */

export type Cue = { start: number; end: number; text: string };

const TIME =
	/(?:(\d{1,2}):)?(\d{1,2}):(\d{2})[,.](\d{1,3})\s*-->\s*(?:(\d{1,2}):)?(\d{1,2}):(\d{2})[,.](\d{1,3})/;

export const MAX_CUES = 5000;

function seconds(h: string | undefined, m: string, s: string, ms: string) {
	return (
		Number(h ?? 0) * 3600 +
		Number(m) * 60 +
		Number(s) +
		Number(ms.padEnd(3, "0")) / 1000
	);
}

function cleanLine(line: string): string {
	return line
		.replace(/<[^>]*>/g, "")
		.replace(/\{[^}]*\}/g, "")
		.trim();
}

export function parseSubtitles(raw: string): Cue[] {
	const blocks = raw
		.replace(/^﻿/, "")
		.replace(/\r\n?/g, "\n")
		.split(/\n{2,}/);
	const cues: Cue[] = [];
	for (const block of blocks) {
		const lines = block.split("\n");
		const timeIndex = lines.findIndex((line) => TIME.test(line));
		if (timeIndex < 0) continue;
		const match = TIME.exec(lines[timeIndex]);
		if (!match) continue;
		const start = seconds(match[1], match[2], match[3], match[4]);
		const end = seconds(match[5], match[6], match[7], match[8]);
		const text = lines
			.slice(timeIndex + 1)
			.map(cleanLine)
			.filter(Boolean)
			.join(" ");
		if (text && end > start) cues.push({ start, end, text });
		if (cues.length >= MAX_CUES) break;
	}
	return cues.sort((a, b) => a.start - b.start);
}

/** Índice da fala ativa no instante `time`, ou -1 (busca binária). */
export function activeCueIndex(cues: Cue[], time: number): number {
	let low = 0;
	let high = cues.length - 1;
	while (low <= high) {
		const mid = (low + high) >> 1;
		const cue = cues[mid];
		if (time < cue.start) high = mid - 1;
		else if (time >= cue.end) low = mid + 1;
		else return mid;
	}
	return -1;
}
