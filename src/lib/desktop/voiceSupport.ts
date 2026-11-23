import { useEffect, useState } from "react";

export type VoiceStatus = "ok" | "missing" | "unknown";

/** True quando há ao menos uma voz em inglês instalada. */
export const hasEnglishVoice = (voices: { lang: string }[]): boolean =>
	voices.some((v) => v.lang.toLowerCase().startsWith("en"));

/** O Windows só traz vozes dos idiomas instalados: sem pacote de inglês o TTS fala inglês com sotaque errado. */
export function useEnglishVoiceStatus(): VoiceStatus {
	const [status, setStatus] = useState<VoiceStatus>("unknown");

	useEffect(() => {
		if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
		const synth = window.speechSynthesis;
		const read = () => {
			const voices = synth.getVoices();
			if (voices.length > 0) setStatus(hasEnglishVoice(voices) ? "ok" : "missing");
		};
		read();
		synth.addEventListener("voiceschanged", read);
		return () => synth.removeEventListener("voiceschanged", read);
	}, []);

	return status;
}
