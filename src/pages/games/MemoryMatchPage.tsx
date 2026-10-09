import {
	ArrowLeft,
	ArrowRight,
	RefreshCw,
	Shuffle,
	Trophy,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useActivityLog } from "@/hooks/useActivityLog";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { fireConfetti } from "@/lib/confetti";
import { dictionaryEntries } from "@/lib/dictionaryData";

interface MemoryCard {
	id: string; // unique id for the card instance
	wordId: string; // to identify the pair
	content: string;
	type: "en" | "pt";
	isFlipped: boolean;
	isMatched: boolean;
}

const GAME_SIZE = 8; // pairs

export default function MemoryMatchPage() {
	const [searchParams] = useSearchParams();
	const moduleId = searchParams.get("module");
	const lessonId = searchParams.get("lesson");
	const { completeLesson } = useCurriculumProgress();
	const { logActivity } = useActivityLog();
	const navigate = useNavigate();

	const [cards, setCards] = useState<MemoryCard[]>([]);
	const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
	const [_matches, setMatches] = useState(0);
	const [moves, setMoves] = useState(0);
	const [gameWon, setGameWon] = useState(false);

	// Estável de propósito: é dependência do efeito de montagem; uma nova
	// identidade a cada render provocaria loop infinito de render.
	const startNewGame = useCallback(() => {
		// Select random words
		const shuffledDictionary = [...dictionaryEntries].sort(
			() => 0.5 - Math.random(),
		);
		const selectedWords = shuffledDictionary.slice(0, GAME_SIZE);

		const gameCards: MemoryCard[] = [];

		selectedWords.forEach((word) => {
			// English card
			gameCards.push({
				id: `${word.id}-en`,
				wordId: word.id,
				content: word.word,
				type: "en",
				isFlipped: false,
				isMatched: false,
			});
			// Portuguese card
			gameCards.push({
				id: `${word.id}-pt`,
				wordId: word.id,
				content: word.translation_pt,
				type: "pt",
				isFlipped: false,
				isMatched: false,
			});
		});

		// Shuffle cards
		const shuffledCards = gameCards.sort(() => 0.5 - Math.random());

		setCards(shuffledCards);
		setFlippedIndices([]);
		setMatches(0);
		setMoves(0);
		setGameWon(false);
	}, []);

	useEffect(() => {
		startNewGame();
	}, [startNewGame]);

	const handleCardClick = (index: number) => {
		// Prevent clicking if game won, card already flipped/matched, or 2 cards already flipped
		if (
			gameWon ||
			cards[index].isFlipped ||
			cards[index].isMatched ||
			flippedIndices.length >= 2
		) {
			return;
		}

		const newCards = [...cards];
		newCards[index].isFlipped = true;
		setCards(newCards);

		const newFlippedIndices = [...flippedIndices, index];
		setFlippedIndices(newFlippedIndices);

		if (newFlippedIndices.length === 2) {
			setMoves((prev) => prev + 1);
			checkForMatch(newFlippedIndices, newCards);
		}
	};

	const checkForMatch = (indices: number[], currentCards: MemoryCard[]) => {
		const [index1, index2] = indices;
		const card1 = currentCards[index1];
		const card2 = currentCards[index2];

		if (card1.wordId === card2.wordId) {
			// Match found
			setTimeout(() => {
				const newCards = [...currentCards];
				newCards[index1].isMatched = true;
				newCards[index2].isMatched = true;
				setCards(newCards);
				setFlippedIndices([]);
				setMatches((prev) => {
					const newMatches = prev + 1;
					if (newMatches === GAME_SIZE) {
						handleWin();
					}
					return newMatches;
				});
			}, 500);
		} else {
			// No match
			setTimeout(() => {
				const newCards = [...currentCards];
				newCards[index1].isFlipped = false;
				newCards[index2].isFlipped = false;
				setCards(newCards);
				setFlippedIndices([]);
			}, 1000);
		}
	};

	const handleWin = () => {
		setGameWon(true);
		logActivity();
		fireConfetti({
			particleCount: 150,
			spread: 70,
			origin: { y: 0.6 },
			colors: ["#22c55e", "#eab308", "#3b82f6"],
		});

		if (moduleId && lessonId) {
			// Auto complete or let them click continue. Let's do instant complete but wait for user to click "Continue"
			completeLesson(moduleId, lessonId, 100);
		}
	};

	const handleContinue = () => {
		navigate("/");
	};

	return (
		<PageContainer>
			<div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
				<div className="w-full flex items-center justify-between">
					<Button variant="ghost" asChild>
						<Link to={moduleId ? "/" : "/arcade"} className="gap-2">
							<ArrowLeft className="h-4 w-4" />
							{moduleId ? "Voltar ao Mapa" : "Voltar"}
						</Link>
					</Button>
					<div className="flex items-center gap-4">
						<div className="text-sm font-medium text-muted-foreground">
							Movimentos: {moves}
						</div>
						<Button
							onClick={startNewGame}
							variant="outline"
							size="sm"
							className="gap-2"
						>
							<RefreshCw className="h-4 w-4" />
							Reiniciar
						</Button>
					</div>
				</div>

				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold tracking-tight text-primary">
						Jogo da Memória
					</h1>
					<p className="text-muted-foreground">
						Encontre os pares entre Inglês e Português
					</p>
				</div>

				{gameWon && (
					<Card className="w-full max-w-md p-6 bg-green-500/10 border-green-500/50 text-center animate-in zoom-in duration-300">
						<div className="flex flex-col items-center gap-4">
							<div className="p-3 bg-green-500 rounded-full text-white">
								<Trophy className="h-8 w-8" />
							</div>
							<div>
								<h3 className="text-2xl font-bold text-green-700 dark:text-green-300">
									Parabéns!
								</h3>
								<p className="text-green-600 dark:text-green-400">
									Você completou o jogo em {moves} movimentos.
								</p>
							</div>

							{moduleId && lessonId ? (
								<Button
									onClick={handleContinue}
									className="w-full bg-green-600 hover:bg-green-700 gap-2"
									size="lg"
								>
									Continuar <ArrowRight className="w-4 h-4" />
								</Button>
							) : (
								<Button
									onClick={startNewGame}
									className="w-full bg-green-600 hover:bg-green-700"
								>
									Jogar Novamente
								</Button>
							)}
						</div>
					</Card>
				)}

				<div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-3 w-full max-w-2xl">
					{cards.map((card, index) => {
						const isRevealed = card.isFlipped || card.isMatched;
						return (
							// 3D flip lives on the inner span: Firefox mishandles preserve-3d on a button itself.
							<button
								type="button"
								key={card.id}
								onClick={() => handleCardClick(index)}
								disabled={card.isMatched}
								aria-label={
									isRevealed ? card.content : "Carta virada para baixo"
								}
								data-pair-id={card.wordId}
								className="aspect-[3/4] cursor-pointer relative perspective-1000 transition-opacity duration-300 disabled:pointer-events-none"
								style={{ opacity: card.isMatched ? 0.6 : 1 }}
							>
								<span
									className="absolute inset-0 block transition-transform duration-300 preserve-3d"
									style={{
										transformStyle: "preserve-3d",
										transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
									}}
								>
									{/* Front of card (Hidden state) */}
									<span className="absolute inset-0 w-full h-full backface-hidden bg-primary/10 border-2 border-primary/20 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors shadow-sm">
										<Shuffle className="h-8 w-8 text-primary/40" />
									</span>

									{/* Back of card (Revealed state) */}
									<span
										className={`absolute inset-0 w-full h-full backface-hidden rounded-xl flex items-center justify-center p-2 text-center shadow-md border-2 ${
											card.type === "en"
												? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-100"
												: "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-100"
										}`}
										style={{ transform: "rotateY(180deg)" }}
									>
										<span className="font-semibold text-sm sm:text-base break-words leading-tight select-none">
											{card.content}
										</span>
									</span>
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</PageContainer>
	);
}
