import { Volume2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { StressItem } from "@/lib/pronunciation/types";
import { tts } from "@/lib/tts";
import { cn } from "@/lib/utils";

const ROUND_COUNT = 8;

interface WordStressStepProps {
	items: StressItem[];
	onComplete: (attempted: number, correct: number) => void;
}

export function WordStressStep({ items, onComplete }: WordStressStepProps) {
	const rounds = useMemo(() => items.slice(0, ROUND_COUNT), [items]);
	const [index, setIndex] = useState(0);
	const [correctCount, setCorrectCount] = useState(0);
	const [picked, setPicked] = useState<number | null>(null);

	const current = rounds[index];

	const choose = (syllableIndex: number) => {
		if (!current || picked !== null) return;
		setPicked(syllableIndex);
		const isCorrect = syllableIndex === current.stressed;
		const nextCorrect = isCorrect ? correctCount + 1 : correctCount;
		setTimeout(() => {
			setPicked(null);
			if (index + 1 >= rounds.length) {
				onComplete(rounds.length, nextCorrect);
			} else {
				setIndex((i) => i + 1);
			}
		}, 900);
		if (isCorrect) setCorrectCount(nextCorrect);
	};

	if (!current) return null;

	return (
		<div className="space-y-6 max-w-xl mx-auto">
			<div className="flex justify-between text-sm text-muted-foreground">
				<span>
					Palavra {index + 1} de {rounds.length}
				</span>
				<span>{correctCount} acertos</span>
			</div>
			<Progress value={(index / rounds.length) * 100} className="h-2" />

			<Card>
				<CardContent className="p-8 flex flex-col items-center gap-6">
					<p className="text-muted-foreground text-center">
						Qual sílaba é a mais forte (tônica)?
					</p>
					<Button
						type="button"
						onClick={() => tts.speak(current.word)}
						size="lg"
						variant="secondary"
						className="rounded-full w-14 h-14 p-0"
						aria-label="Ouvir palavra"
					>
						<Volume2 className="h-7 w-7" />
					</Button>

					<div
						className="flex flex-wrap justify-center gap-2"
						aria-live="polite"
					>
						{current.syllables.map((syllable, syllableIndex) => {
							const isPicked = picked === syllableIndex;
							const isRightAnswer =
								picked !== null && syllableIndex === current.stressed;
							return (
								<button
									// biome-ignore lint/suspicious/noArrayIndexKey: syllable order is fixed static data, never reordered
									key={`${current.id}-${syllableIndex}`}
									type="button"
									aria-pressed={isPicked}
									disabled={picked !== null}
									onClick={() => choose(syllableIndex)}
									className={cn(
										"rounded-lg border-2 px-4 py-3 text-lg font-semibold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										isRightAnswer
											? "border-primary bg-primary/10 text-primary"
											: isPicked
												? "border-destructive bg-destructive/10"
												: "border-border bg-card hover:border-primary/50",
									)}
								>
									{syllable.toLowerCase()}
								</button>
							);
						})}
					</div>

					{picked !== null && current.tipPt && (
						<p
							className="text-sm text-muted-foreground text-center"
							aria-live="polite"
						>
							{current.tipPt}
						</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
