import { useCallback, useEffect, useRef, useState } from "react";

export type RecognitionResultEvent = {
	results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

export type Recognition = {
	lang: string;
	continuous?: boolean;
	interimResults: boolean;
	maxAlternatives: number;
	onresult: ((event: RecognitionResultEvent) => void) | null;
	onend: (() => void) | null;
	onerror: (() => void) | null;
	start(): void;
	stop(): void;
	abort(): void;
};

type RecognitionCtor = new () => Recognition;

export function getRecognitionCtor(): RecognitionCtor | undefined {
	const scope = window as unknown as {
		SpeechRecognition?: RecognitionCtor;
		webkitSpeechRecognition?: RecognitionCtor;
	};
	return scope.SpeechRecognition ?? scope.webkitSpeechRecognition;
}

/** Ditado por voz em inglês (Web Speech API; Chrome/Edge). */
export function useSpeechInput(onTranscript: (text: string) => void) {
	const recognitionRef = useRef<Recognition | null>(null);
	const [listening, setListening] = useState(false);
	const supported = typeof window !== "undefined" && !!getRecognitionCtor();

	useEffect(() => () => recognitionRef.current?.stop(), []);

	const toggle = useCallback(() => {
		if (listening) {
			recognitionRef.current?.stop();
			return;
		}
		const Ctor = getRecognitionCtor();
		if (!Ctor) return;
		const recognition = new Ctor();
		recognition.lang = "en-US";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;
		recognition.onresult = (event) => {
			const transcript = event.results[0]?.[0]?.transcript ?? "";
			if (transcript) onTranscript(transcript);
		};
		recognition.onend = () => setListening(false);
		recognition.onerror = () => setListening(false);
		recognitionRef.current = recognition;
		recognition.start();
		setListening(true);
	}, [listening, onTranscript]);

	return { supported, listening, toggle };
}
