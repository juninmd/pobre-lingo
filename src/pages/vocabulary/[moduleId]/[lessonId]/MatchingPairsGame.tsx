import { RefreshCw, Trophy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { triggerConfetti } from "@/lib/confetti";
import { matchingPairsExercises } from "@/lib/exerciseData";
import { cn } from "@/lib/utils";

interface CardState {
	id: string; // "p1-word" or "p1-translation"
	pairId: string;
	text: string;
	type: "word" | "translation";
	status: "hidden" | "selected" | "matched" | "error";
}

export function MatchingPairsGame({ onComplete }: { onComplete: () => void }) {
	const { loseHeart, addGem, addStreak } = useGamification();
	const [cards, setCards] = useState<CardState[]>([]);
	const [selectedCards, setSelectedCards] = useState<CardState[]>([]);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [exerciseTopic, setExerciseTopic] = useState("");

	// Stable identity: a fresh function each render re-ran the init effect and reshuffled forever.
	const initializeGame = useCallback(() => {
		// Select random exercise
		const currentExercise =
			matchingPairsExercises[
				Math.floor(Math.random() * matchingPairsExercises.length)
			];
		setExerciseTopic(currentExercise.topic);

		// Create card items from pairs
		const newCards: CardState[] = [];
		currentExercise.pairs.forEach((pair) => {
			newCards.push({
				id: `${pair.id}-word`,
				pairId: pair.id,
				text: pair.word,
				type: "word",
				status: "hidden",
			});
			newCards.push({
				id: `${pair.id}-trans`,
				pairId: pair.id,
				text: pair.translation,
				type: "translation",
				status: "hidden",
			});
		});

		// Shuffle cards
		setCards(newCards.sort(() => Math.random() - 0.5));
		setSelectedCards([]);
		setIsCompleted(false);
		setIsProcessing(false);
	}, []);

	useEffect(() => {
		initializeGame();
	}, [initializeGame]);

	const handleCardClick = (card: CardState) => {
		if (isProcessing || card.status === "matched" || card.status === "selected")
			return;
		// Infinite lives means we don't block on 0 hearts, but we assume the gamification context handles unlimited display
		// However, if logic blocks it, we might need to ignore.
		// The previous implementation blocked if hearts <= 0. Let's assume infinite lives for now based on memory.

		const newCards = [...cards];
		const cardIndex = newCards.findIndex((c) => c.id === card.id);
		newCards[cardIndex].status = "selected";
		setCards(newCards);

		const newSelected = [...selectedCards, newCards[cardIndex]];
		setSelectedCards(newSelected);

		if (newSelected.length === 2) {
			setIsProcessing(true);
			checkForMatch(newSelected);
		}
	};

	const checkForMatch = (selected: CardState[]) => {
		const [card1, card2] = selected;
		const isMatch = card1.pairId === card2.pairId;

		setTimeout(() => {
			setCards((prev) => {
				const next = [...prev];
				const idx1 = next.findIndex((c) => c.id === card1.id);
				const idx2 = next.findIndex((c) => c.id === card2.id);

				if (isMatch) {
					next[idx1].status = "matched";
					next[idx2].status = "matched";
					// Check win condition
					if (next.every((c) => c.status === "matched")) {
						handleWin();
					}
				} else {
					next[idx1].status = "error";
					next[idx2].status = "error";
					loseHeart(); // Even with infinite lives, visual feedback or logic might exist
				}
				return next;
			});

			if (!isMatch) {
				setTimeout(() => {
					setCards((prev) => {
						const next = [...prev];
						const idx1 = next.findIndex((c) => c.id === card1.id);
						const idx2 = next.findIndex((c) => c.id === card2.id);
						if (next[idx1].status === "error") next[idx1].status = "hidden";
						if (next[idx2].status === "error") next[idx2].status = "hidden";
						return next;
					});
					setSelectedCards([]);
					setIsProcessing(false);
				}, 1000);
			} else {
				setSelectedCards([]);
				setIsProcessing(false);
			}
		}, 500);
	};

	const handleWin = () => {
		setIsCompleted(true);
		addGem(10);
		addStreak();
		triggerConfetti();
		// Allow user to finish lesson
	};

	return (
		<Card className="max-w-2xl mx-auto border-none shadow-none">
			<CardHeader className="px-0">
				<CardTitle className="flex items-center gap-2 text-xl">
					<Trophy className="h-6 w-6 text-yellow-500" />
					Par de Palavras: {exerciseTopic}
				</CardTitle>
			</CardHeader>
			<CardContent className="px-0">
				{isCompleted ? (
					<div className="text-center py-10 bg-card border rounded-xl shadow-sm">
						<div className="h-20 w-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<Trophy className="h-10 w-10 text-yellow-600" />
						</div>
						<h3 className="text-2xl font-bold mb-2">Excelente!</h3>
						<p className="text-muted-foreground mb-6">
							Você completou o exercício.
						</p>
						<div className="flex justify-center gap-4">
							<Button onClick={initializeGame} variant="outline">
								<RefreshCw className="mr-2 h-4 w-4" /> Jogar Novamente
							</Button>
							<Button onClick={onComplete}>Concluir Lição</Button>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
						{cards.map((card) => (
							<button
								type="button"
								key={card.id}
								onClick={() => handleCardClick(card)}
								disabled={card.status === "matched"}
								className={cn(
									"h-24 rounded-xl border-2 font-medium text-lg transition-all transform active:scale-95 flex items-center justify-center p-2 text-center shadow-sm",
									card.status === "hidden" && "bg-card hover:border-primary/50",
									card.status === "selected" &&
										"border-primary bg-primary/10 scale-105 ring-2 ring-primary/20",
									card.status === "matched" &&
										"border-transparent bg-green-100 text-green-700 opacity-50 cursor-default",
									card.status === "error" &&
										"border-red-500 bg-red-50 text-red-700 animate-shake",
								)}
							>
								{card.text}
							</button>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
