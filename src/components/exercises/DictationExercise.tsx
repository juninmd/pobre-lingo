import { CheckCircle2, Eye, Play, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSrs } from "@/hooks/useSrs";
import type { DictationItem } from "@/lib/dictationData";
import { dictationReviewCard } from "@/lib/dictationReview";
import { tts } from "@/lib/tts";
import { cn } from "@/lib/utils";

const normalize = (text: string) =>
	text
		.toLowerCase()
		.replace(/[.,!?;:'"]/g, "")
		.replace(/\s+/g, " ")
		.trim();

export function DictationExercise({ items }: { items: DictationItem[] }) {
	const [index, setIndex] = useState(0);
	const [input, setInput] = useState("");
	const [checked, setChecked] = useState(false);
	const [revealed, setRevealed] = useState(false);
	const { addCard } = useSrs();

	const item = items[index];
	const expectedWords = useMemo(
		() => (item ? normalize(item.sentence).split(" ") : []),
		[item],
	);
	const inputWords = normalize(input).split(" ").filter(Boolean);
	const isCorrect = normalize(input) === normalize(item?.sentence ?? "");
	const progress = ((index + (checked ? 1 : 0)) / items.length) * 100;

	const check = () => {
		setChecked(true);
		if (item && !isCorrect) {
			addCard(dictationReviewCard(item));
		}
	};

	const next = () => {
		setIndex((value) => (value + 1) % items.length);
		setInput("");
		setChecked(false);
		setRevealed(false);
	};

	if (!item) return null;

	return (
		<Card className="glass-card" data-private>
			<CardContent className="p-5 space-y-4">
				<div className="flex items-center justify-between">
					<Badge variant="secondary">
						{item.level} · {index + 1}/{items.length}
					</Badge>
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="gap-2"
						onClick={() => tts.speak(item.sentence, "en-US", 0.85)}
					>
						<Play className="h-4 w-4" aria-hidden="true" />
						Ouvir
					</Button>
				</div>

				<p className="text-sm text-muted-foreground">
					Ouça e escreva exatamente o que você ouviu.
				</p>

				<textarea
					value={input}
					onChange={(event) => setInput(event.target.value)}
					rows={2}
					placeholder="Digite a frase em inglês..."
					aria-label="Digite a frase em inglês"
					className="w-full rounded-xl border border-border bg-background/60 p-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
				/>

				{checked && (
					<div className="space-y-2" role="status" aria-live="polite">
						<div
							className={cn(
								"flex items-center gap-2 text-sm font-semibold",
								isCorrect ? "text-brand-aqua" : "text-destructive",
							)}
						>
							{isCorrect ? (
								<CheckCircle2 className="h-4 w-4" aria-hidden="true" />
							) : (
								<XCircle className="h-4 w-4" aria-hidden="true" />
							)}
							{isCorrect ? "Perfeito!" : "Quase! Confira as diferenças:"}
						</div>
						<div className="flex flex-wrap gap-1.5">
							{expectedWords.map((word, wordIndex) => (
								<span
									key={word}
									className={cn(
										"px-2 py-0.5 rounded-md text-sm border",
										inputWords[wordIndex] === word
											? "border-brand-aqua/40 text-brand-aqua bg-brand-aqua/10"
											: "border-destructive/40 text-destructive bg-destructive/10",
									)}
								>
									{word}
								</span>
							))}
						</div>
						<p className="text-xs text-muted-foreground">
							Tradução: {item.translation}
						</p>
					</div>
				)}

				{revealed && !isCorrect && (
					<p className="text-sm bg-muted/50 rounded-lg p-3">{item.sentence}</p>
				)}

				<Progress value={progress} className="h-1.5" />

				<div className="flex flex-wrap justify-end gap-2">
					<Button
						type="button"
						variant="ghost"
						className="gap-2"
						onClick={() => setRevealed(true)}
					>
						<Eye className="h-4 w-4" aria-hidden="true" />
						Ver resposta
					</Button>
					{!checked ? (
						<Button type="button" onClick={check} disabled={!input.trim()}>
							Verificar
						</Button>
					) : (
						<Button type="button" onClick={next}>
							Próxima
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
