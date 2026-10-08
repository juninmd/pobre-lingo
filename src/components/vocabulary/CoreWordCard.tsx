import { Check, Layers, RotateCcw, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BAND_LABELS, type CoreWord } from "@/lib/coreVocabulary";
import { tts } from "@/lib/tts";
import { cn } from "@/lib/utils";

type CoreWordCardProps = {
	word: CoreWord;
	known: boolean;
	inReview: boolean;
	onToggleKnown: () => void;
	onReview: () => void;
};

export function CoreWordCard({
	word,
	known,
	inReview,
	onToggleKnown,
	onReview,
}: CoreWordCardProps) {
	return (
		<Card
			className={cn(
				"glass-card transition-all",
				known && "border-brand-aqua/40 bg-brand-aqua/5",
			)}
		>
			<CardContent className="p-4 flex items-start justify-between gap-3">
				<div className="min-w-0">
					<div className="flex items-center gap-2">
						<h3 className="font-headline text-lg font-bold truncate" lang="en">
							{word.word}
						</h3>
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7"
							aria-label={`Ouvir "${word.word}"`}
							onClick={() => tts.speak(word.word, "en-US", 0.9)}
						>
							<Volume2 className="h-4 w-4 text-primary" aria-hidden="true" />
						</Button>
					</div>
					<p className="text-sm text-muted-foreground">{word.translation}</p>
					<Badge variant="outline" className="mt-2 text-[11px] gap-1">
						<Layers className="h-3 w-3" aria-hidden="true" />
						{BAND_LABELS[word.band]}
					</Badge>
				</div>
				<div className="flex flex-col gap-2 shrink-0">
					<Button
						variant={known ? "default" : "outline"}
						size="sm"
						aria-pressed={known}
						aria-label={
							known ? `Desmarcar "${word.word}"` : `Já sei "${word.word}"`
						}
						onClick={onToggleKnown}
						className={cn(known && "bg-brand-aqua text-white")}
					>
						{known ? <Check className="h-4 w-4" aria-hidden="true" /> : "Sei"}
					</Button>
					<Button
						variant="ghost"
						size="sm"
						disabled={inReview}
						aria-label={`Revisar "${word.word}" depois`}
						onClick={onReview}
						className="gap-1 text-xs"
					>
						<RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
						{inReview ? "Na revisão" : "Revisar"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
