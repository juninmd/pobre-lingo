import { useEffect, useRef, useState } from "react";

export function useQuestionAudio() {
	const [heard, setHeard] = useState(false);
	const [status, setStatus] = useState<
		"idle" | "playing" | "finished" | "error"
	>("idle");
	const active = useRef<SpeechSynthesisUtterance | null>(null);
	const supported =
		typeof window !== "undefined" &&
		"speechSynthesis" in window &&
		"SpeechSynthesisUtterance" in window;
	useEffect(
		() => () => {
			if (active.current) {
				active.current.onend = null;
				active.current.onerror = null;
			}
			if (supported) window.speechSynthesis.cancel();
		},
		[supported],
	);
	const play = (text: string) => {
		if (!supported) {
			setStatus("error");
			return;
		}
		const synthesis = window.speechSynthesis;
		const voice = synthesis
			.getVoices()
			.find((item) => item.lang.toLowerCase().startsWith("en"));
		if (!voice) {
			setStatus("error");
			return;
		}
		if (active.current) {
			active.current.onend = null;
			active.current.onerror = null;
		}
		synthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		active.current = utterance;
		utterance.voice = voice;
		utterance.lang = voice.lang;
		utterance.rate = 0.85;
		utterance.onend = () => {
			setHeard(true);
			setStatus("finished");
		};
		utterance.onerror = () => setStatus("error");
		setStatus("playing");
		try {
			synthesis.speak(utterance);
		} catch {
			setStatus("error");
		}
	};
	return { heard, status, supported, play };
}
