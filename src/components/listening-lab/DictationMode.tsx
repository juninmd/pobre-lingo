// @ts-nocheck
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSrs } from "@/hooks/useSrs";
import type { CEFRLevel } from "@/lib/curriculumData";
import { dictationReviewCard } from "@/lib/dictationReview";
import type { NativeSentence } from "@/lib/sources/tatoeba";
import { type SpeechScore, scoreSpeech } from "@/lib/speechMatch";
import { SpeechScoreView } from "./SpeechScoreView";

type DictationModeProps = { sentence: NativeSentence; level: CEFRLevel };

/** Modo "Ditado": escreve o que ouviu; erro vai para a fila de revisão. */
export function DictationMode({ sentence, level }: DictationModeProps) {
	const [typed, setTyped] = useState("");
	const [result, setResult] = useState<SpeechScore | null>(null);
	const { addCard } = useSrs();

	const check = () => {
		const score = scoreSpeech(sentence.text, typed);
		setResult(score);
		if (!score.passed) {
			addCard(
				dictationReviewCard({
					id: `tatoeba-${sentence.id}`,
					level,
					sentence: sentence.text,
					translation: sentence.translation ?? "",
				}),
			);
		}
	};

	return (
		<div className="space-y-3">
			<Textarea
				value={typed}
				onChange={(e) => setTyped(e.target.value)}
				placeholder="Escreva o que ouviu"
				aria-label="Escreva o que ouviu"
			/>
			<Button onClick={check} disabled={!typed.trim()}>
				Conferir
			</Button>
			{result && <SpeechScoreView result={result} />}
		</div>
	);
}
