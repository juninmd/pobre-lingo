// @ts-nocheck
import { Mic, Square } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSpeechInput } from "@/hooks/useSpeechInput";
import type { NativeSentence } from "@/lib/sources/tatoeba";
import { type SpeechScore, scoreSpeech } from "@/lib/speechMatch";
import { SpeechScoreView } from "./SpeechScoreView";

/** Modo "Shadowing": repete em voz alta após ouvir; pontua com o microfone. */
export function ShadowingMode({ sentence }: { sentence: NativeSentence }) {
	const [result, setResult] = useState<SpeechScore | null>(null);
	const { supported, listening, toggle } = useSpeechInput((transcript) =>
		setResult(scoreSpeech(sentence.text, transcript)),
	);

	if (!supported) {
		return (
			<p className="text-sm text-muted-foreground" role="alert">
				Reconhecimento de voz não é compatível com este navegador.
			</p>
		);
	}

	return (
		<div className="space-y-3">
			<Button variant={listening ? "destructive" : "default"} onClick={toggle}>
				{listening ? (
					<Square className="mr-2 h-4 w-4" />
				) : (
					<Mic className="mr-2 h-4 w-4" />
				)}
				{listening ? "Parar" : "Falar"}
			</Button>
			{result && <SpeechScoreView result={result} />}
		</div>
	);
}
