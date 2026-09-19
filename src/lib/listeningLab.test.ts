import { describe, expect, it } from "vitest";
import { isSubtitleFileValid, mediaKindFor } from "./listeningLab";

function makeFile(name: string, size: number, type = ""): File {
	const file = new File([new Uint8Array(size)], name, { type });
	return file;
}

describe("isSubtitleFileValid", () => {
	it("accepts .srt within size limit", () => {
		expect(isSubtitleFileValid(makeFile("legenda.srt", 1024))).toBe(true);
	});

	it("accepts .vtt within size limit", () => {
		expect(isSubtitleFileValid(makeFile("legenda.vtt", 1024))).toBe(true);
	});

	it("rejects files over 2MB", () => {
		expect(
			isSubtitleFileValid(makeFile("legenda.srt", 2 * 1024 * 1024 + 1)),
		).toBe(false);
	});

	it("rejects unsupported extensions", () => {
		expect(isSubtitleFileValid(makeFile("legenda.txt", 100))).toBe(false);
	});
});

describe("mediaKindFor", () => {
	it("detects video by mime type", () => {
		expect(mediaKindFor(makeFile("clip.mp4", 10, "video/mp4"))).toBe("video");
	});

	it("defaults to audio otherwise", () => {
		expect(mediaKindFor(makeFile("clip.mp3", 10, "audio/mpeg"))).toBe("audio");
		expect(mediaKindFor(makeFile("clip.bin", 10, ""))).toBe("audio");
	});
});
