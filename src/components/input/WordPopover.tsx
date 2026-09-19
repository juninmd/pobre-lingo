import { Check, Plus, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { translateToPortuguese } from "@/lib/ai/translator";
import { knownKeyFor, lookupWord } from "@/lib/input/lexicon";
import { tts } from "@/lib/tts";

type WordPopoverProps = {
	word: string;
	wordKey: string;
	/** Frase onde a palavra apareceu: vira o verso do card de revisão. */
	context: string;
	isKnown: boolean;
	isQueued: boolean;
	onToggleKnown: (key: string) => void;
	onReview: (card: {
		key: string;
		word: string;
		translation: string;
		context: string;
	}) => void;
};

export function WordPopover({
	word,
	wordKey,
	context,
	isKnown,
	isQueued,
	onToggleKnown,
	onReview,
}: WordPopoverProps) {
	const hit = lookupWord(wordKey);
	const [fallback, setFallback] = useState<string | null>(null);
	const [looking, setLooking] = useState(false);

	useEffect(() => {
		if (hit) return;
		let cancelled = false;
		setLooking(true);
		translateToPortuguese(word)
			.then((text) => {
				if (!cancelled) setFallback(text);
			})
			.finally(() => {
				if (!cancelled) setLooking(false);
			});
		return () => {
			cancelled = true;
		};
	}, [hit, word]);

	const translation = hit?.translation ?? fallback;
	const key = knownKeyFor(wordKey);

	return (
		<div className="space-y-3 text-sm" lang="pt-BR">
			<div className="flex items-start justify-between gap-2">
				<div>
					<p className="font-display text-lg font-semibold" lang="en">
						{hit?.word ?? word}
					</p>
					<p className="text-muted-foreground">
						{translation ??
							(looking
								? "Procurando tradução…"
								: "Sem tradução offline: tente entender pelo contexto.")}
					</p>
				</div>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					aria-label={`Ouvir "${word}"`}
					onClick={() => tts.speak(hit?.word ?? word, "en-US", 0.85)}
				>
					<Volume2 className="h-4 w-4" aria-hidden="true" />
				</Button>
			</div>
			<div className="flex flex-wrap gap-2">
				<Button
					type="button"
					size="sm"
					variant={isKnown ? "secondary" : "outline"}
					className="gap-1.5"
					aria-pressed={isKnown}
					onClick={() => onToggleKnown(key)}
				>
					<Check className="h-4 w-4" aria-hidden="true" />
					{isKnown ? "Conhecida" : "Já sei"}
				</Button>
				<Button
					type="button"
					size="sm"
					className="gap-1.5"
					disabled={isQueued || !translation}
					onClick={() =>
						translation &&
						onReview({ key, word: hit?.word ?? word, translation, context })
					}
				>
					<Plus className="h-4 w-4" aria-hidden="true" />
					{isQueued ? "Na revisão" : "Revisar depois"}
				</Button>
			</div>
		</div>
	);
}
