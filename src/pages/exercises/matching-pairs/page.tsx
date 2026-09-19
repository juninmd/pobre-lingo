import { ArrowLeft, Heart, RefreshCw, Trophy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CefrBadge } from "@/components/common/CefrBadge";
import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useLessonFromUrl } from "@/contexts/ActiveLessonContext";
import { useGamification } from "@/contexts/GamificationContext";
import { triggerConfetti } from "@/lib/confetti";
import { getCEFRLevel } from "@/lib/curriculumData";
import {
	type MatchingPairsExercise,
	matchingPairsExercises,
} from "@/lib/exerciseData";
import { cn } from "@/lib/utils";

interface CardState {
	id: string; // "p1-word" or "p1-translation"
	pairId: string;
	text: string;
	type: "word" | "translation";
	status: "hidden" | "selected" | "matched" | "error";
}

export default function MatchingPairsPage() {
	const [searchParams] = useSearchParams();
	const exerciseId = searchParams.get("id");
	const { hearts, loseHeart, addGem, addStreak } = useGamification();
	const [exercise, setExercise] = useState<MatchingPairsExercise | null>(null);
	const [cards, setCards] = useState<CardState[]>([]);
	const [selectedCards, setSelectedCards] = useState<CardState[]>([]);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);

	const initializeGame = useCallback((ex: MatchingPairsExercise) => {
		// Create card items from pairs
		const newCards: CardState[] = [];
		ex.pairs.forEach((pair) => {
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
		// Select an exercise (random or specific)
		const currentExercise = exerciseId
			? matchingPairsExercises.find((e) => e.id === exerciseId)
			: matchingPairsExercises[
					Math.floor(Math.random() * matchingPairsExercises.length)
				];

		if (currentExercise) {
			setExercise(currentExercise);
			initializeGame(currentExercise);
		}
	}, [exerciseId, initializeGame]);

	const handleCardClick = (card: CardState) => {
		if (isProcessing || card.status === "matched" || card.status === "selected")
			return;
		if (hearts <= 0) return;

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
					loseHeart();
				}
				return next;
			});

			if (!isMatch) {
				setTimeout(() => {
					setCards((prev) => {
						const next = [...prev];
						const idx1 = next.findIndex((c) => c.id === card1.id);
						const idx2 = next.findIndex((c) => c.id === card2.id);
						// Only reset if they aren't somehow matched in a weird edge case (not possible here)
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
	};

	const { module } = useLessonFromUrl();
	const cefrLevel = module
		? getCEFRLevel(module.unitId)
		: exercise
			? exercise.difficulty === "easy"
				? "A1"
				: exercise.difficulty === "medium"
					? "B1"
					: "C1"
			: undefined;

	if (!exercise) return <div>Carregando...</div>;

	return (
		<PageContainer>
			<div className="mb-6 flex items-center justify-between">
				<Link
					to="/"
					className="flex items-center text-sm text-muted-foreground hover:text-primary"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Voltar
				</Link>
				<div className="flex items-center gap-2">
					<Heart
						className={cn(
							"h-6 w-6 fill-destructive text-destructive",
							hearts === 0 && "animate-pulse",
						)}
					/>
					<span className="font-bold text-lg">{hearts}</span>
				</div>
			</div>

			<Card className="max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 flex-wrap">
						<Trophy className="h-6 w-6 text-brand-gold" />
						<span>Par de Palavras: {exercise.topic}</span>
						{cefrLevel && <CefrBadge level={cefrLevel} />}
					</CardTitle>
					<CardDescription>
						Combine as palavras em inglês com suas traduções.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{hearts <= 0 ? (
						<div className="text-center py-10">
							<Heart className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
							<h3 className="text-xl font-bold mb-2">Sem vidas!</h3>
							<p className="text-muted-foreground mb-6">
								Você perdeu todas as suas vidas. Espere recarregar ou pratique
								outras lições.
							</p>
							<Button asChild>
								<Link to="/">Voltar ao início</Link>
							</Button>
						</div>
					) : isCompleted ? (
						<div className="text-center py-10">
							<div className="h-20 w-20 bg-brand-gold/15 rounded-full flex items-center justify-center mx-auto mb-6">
								<Trophy className="h-10 w-10 text-brand-gold" />
							</div>
							<h3 className="text-2xl font-bold mb-2">Parabéns!</h3>
							<p className="text-muted-foreground mb-6">
								Você completou o exercício e ganhou 10 gemas!
							</p>
							<div className="flex justify-center gap-4">
								<Button
									onClick={() => window.location.reload()}
									variant="outline"
								>
									<RefreshCw className="mr-2 h-4 w-4" /> Jogar Novamente
								</Button>
								<Button asChild>
									<Link to="/">Continuar</Link>
								</Button>
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
										card.status === "hidden" &&
											"bg-card hover:border-primary/50",
										card.status === "selected" &&
											"border-primary bg-primary/10 scale-105 ring-2 ring-primary/20",
										card.status === "matched" &&
											"border-transparent bg-brand-aqua/15 text-brand-aqua opacity-50 cursor-default",
										card.status === "error" &&
											"border-destructive bg-destructive/10 text-destructive animate-shake",
									)}
								>
									{card.text}
								</button>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</PageContainer>
	);
}
