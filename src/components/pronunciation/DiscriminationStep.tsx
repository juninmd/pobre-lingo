import { Volume2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	buildDiscriminationRounds,
	type DiscriminationResult,
	gradeDiscriminationChoice,
	summarizeDiscrimination,
} from "@/lib/pronunciation/drill";
import type { MinimalPair } from "@/lib/pronunciation/types";
import { tts } from "@/lib/tts";
import { cn } from "@/lib/utils";

const ROUND_COUNT = 10;

interface DiscriminationStepProps {
	pairs: MinimalPair[];
	onComplete: (summary: ReturnType<typeof summarizeDiscrimination>) => void;
}

export function DiscriminationStep({
	pairs,
	onComplete,
}: DiscriminationStepProps) {
	const rounds = useMemo(
		() => buildDiscriminationRounds(pairs, ROUND_COUNT),
		[pairs],
	);
	const [index, setIndex] = useState(0);
	const [results, setResults] = useState<DiscriminationResult[]>([]);
	const [lastChoice, setLastChoice] = useState<"a" | "b" | null>(null);

	const round = rounds[index];
	const spoken = round
		? round.answer === "a"
			? round.pair.a
			: round.pair.b
		: "";

	const playRound = () => {
		if (round) tts.speak(spoken);
	};

	const choose = (choice: "a" | "b") => {
		if (!round || lastChoice) return;
		setLastChoice(choice);
		const result = gradeDiscriminationChoice(round, choice);
		const next = [...results, result];
		setResults(next);
		setTimeout(() => {
			setLastChoice(null);
			if (index + 1 >= rounds.length) {
				onComplete(summarizeDiscrimination(next));
			} else {
				setIndex((i) => i + 1);
			}
		}, 700);
	};

	if (!round) return null;

	return (
		<div className="space-y-6 max-w-xl mx-auto">
			<div className="flex justify-between text-sm text-muted-foreground">
				<span>
					Rodada {index + 1} de {rounds.length}
				</span>
				<span>{results.filter((r) => r.correct).length} acertos</span>
			</div>
			<Progress value={(index / rounds.length) * 100} className="h-2" />

			<Card>
				<CardContent className="p-8 flex flex-col items-center gap-6">
					<p className="text-center text-muted-foreground">
						Ouça a palavra e escolha qual você ouviu.
					</p>
					<Button
						type="button"
						onClick={playRound}
						size="lg"
						variant="secondary"
						className="rounded-full w-16 h-16 p-0"
						aria-label="Ouvir palavra"
					>
						<Volume2 className="h-8 w-8" />
					</Button>

					<div className="grid grid-cols-2 gap-4 w-full" aria-live="polite">
						{(["a", "b"] as const).map((option) => {
							const word = option === "a" ? round.pair.a : round.pair.b;
							const isChosen = lastChoice === option;
							const isCorrectChoice = lastChoice && round.answer === option;
							return (
								<button
									key={option}
									type="button"
									aria-pressed={isChosen}
									disabled={!!lastChoice}
									onClick={() => choose(option)}
									className={cn(
										"rounded-xl border-2 p-5 text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										isCorrectChoice
											? "border-primary bg-primary/10 text-primary"
											: isChosen
												? "border-destructive bg-destructive/10"
												: "border-border bg-card hover:border-primary/50",
									)}
								>
									{word}
								</button>
							);
						})}
					</div>
					{lastChoice && (
						<p className="text-sm text-muted-foreground" aria-live="polite">
							{lastChoice === round.answer ? "Isso mesmo!" : `Era "${spoken}".`}
						</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
