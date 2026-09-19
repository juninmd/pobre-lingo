import confetti from "canvas-confetti";
import { Play, RefreshCw, Timer, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useActivityLog } from "@/hooks/useActivityLog";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { sentenceOrderingExercises } from "@/lib/exerciseData";
import { cn } from "@/lib/utils";

function shuffleArray<T>(array: T[]): T[] {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}

export default function SentenceRushPage() {
	const [searchParams] = useSearchParams();
	const moduleId = searchParams.get("module");
	const lessonId = searchParams.get("lesson");
	const { completeLesson } = useCurriculumProgress();
	const { logActivity } = useActivityLog();

	const { toast } = useToast();
	const [timeLeft, setTimeLeft] = useState(60);
	const [isPlaying, setIsPlaying] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [score, setScore] = useState(0);
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

	// Game State
	const [targetSentence, setTargetSentence] = useState<string>("");
	const [shuffledWords, setShuffledWords] = useState<
		{ id: string; text: string }[]
	>([]);
	const [orderedWords, setOrderedWords] = useState<
		{ id: string; text: string }[]
	>([]);
	const [gameQueue, setGameQueue] = useState<typeof sentenceOrderingExercises>(
		[],
	);

	const startGame = () => {
		// Shuffle all exercises to make a random queue
		const queue = shuffleArray([...sentenceOrderingExercises]);
		setGameQueue(queue);
		setCurrentSentenceIndex(0);
		setScore(0);
		setTimeLeft(60);
		setIsPlaying(true);
		setGameOver(false);
		loadLevel(queue[0]);
	};

	const loadLevel = (exercise: (typeof sentenceOrderingExercises)[0]) => {
		setTargetSentence(exercise.correctSentence);
		const words = exercise.words.map((w, i) => ({ id: `${i}-${w}`, text: w }));
		setShuffledWords(shuffleArray(words));
		setOrderedWords([]);
	};

	const handleWordClick = (wordObj: { id: string; text: string }) => {
		if (!isPlaying) return;

		// Move from shuffled to ordered
		const newOrdered = [...orderedWords, wordObj];
		setOrderedWords(newOrdered);
		setShuffledWords((prev) => prev.filter((w) => w.id !== wordObj.id));

		// Check if sentence is complete (all words used)
		if (
			newOrdered.length === targetSentence.split(" ").length ||
			shuffledWords.length === 1
		) {
			checkSentence(newOrdered);
		}
	};

	const handleUndoWord = (wordObj: { id: string; text: string }) => {
		if (!isPlaying) return;
		setOrderedWords((prev) => prev.filter((w) => w.id !== wordObj.id));
		setShuffledWords((prev) => [...prev, wordObj]);
	};

	const checkSentence = (currentOrdered: { id: string; text: string }[]) => {
		const builtSentence = currentOrdered.map((w) => w.text).join(" ");
		// Simple check ignoring punctuation for flexibility if needed, but exact match is better for "ordering"
		// The exerciseData defines correctSentence with punctuation, but words array might not have it attached sometimes.
		// Let's normalize.

		const cleanBuilt = builtSentence
			.replace(/[.,!?]/g, "")
			.toLowerCase()
			.trim();
		const cleanTarget = targetSentence
			.replace(/[.,!?]/g, "")
			.toLowerCase()
			.trim();

		if (cleanBuilt === cleanTarget) {
			// Correct!
			handleCorrect();
		} else {
			// If all words are used and it's wrong
			if (shuffledWords.length === 0) {
				// Wrong order, flash error
				toast({
					title: "Ordem incorreta!",
					description: "Tente novamente.",
					variant: "destructive",
					duration: 1000,
				});
				// Reset logic could go here, or just let them undo
			}
		}
	};

	const handleCorrect = () => {
		const bonusTime = 5;
		setTimeLeft((prev) => prev + bonusTime);
		setScore((prev) => prev + 10);

		// Animation or Toast
		toast({
			title: "Correto! +10pts",
			description: `+${bonusTime} segundos`,
			className: "bg-brand-aqua text-white border-none",
		});

		// Next level
		const nextIndex = currentSentenceIndex + 1;
		if (nextIndex < gameQueue.length) {
			setCurrentSentenceIndex(nextIndex);
			loadLevel(gameQueue[nextIndex]);
		} else {
			// Finished all available sentences!
			endGame(true);
		}
	};

	const endGame = (completedAll = false) => {
		setIsPlaying(false);
		setGameOver(true);
		logActivity();
		if (score > 50 || completedAll) {
			confetti();
			if (moduleId && lessonId) {
				completeLesson(moduleId, lessonId, Math.max(score, 50));
			}
		}
	};

	useEffect(() => {
		if (isPlaying && timeLeft > 0) {
			const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
			return () => clearInterval(timer);
		} else if (timeLeft === 0 && isPlaying) {
			endGame();
		}
	}, [isPlaying, timeLeft, endGame]);

	return (
		<PageContainer>
			<div className="max-w-3xl mx-auto flex flex-col gap-6 items-center">
				{/* Header */}
				<div className="w-full flex justify-between items-center bg-card p-4 rounded-xl border shadow-sm">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-brand-gold/10 rounded-full">
							<Zap className="w-6 h-6 text-brand-gold fill-brand-gold" />
						</div>
						<div>
							<h1 className="font-bold text-xl leading-none">Sentence Rush</h1>
							<p className="text-xs text-muted-foreground">
								Monte frases contra o tempo
							</p>
						</div>
					</div>

					<div
						className="flex gap-6 font-mono font-bold text-xl"
						aria-live="polite"
						role="status"
					>
						<div
							className={cn(
								"flex items-center gap-2",
								timeLeft < 10 && "text-destructive animate-pulse",
							)}
						>
							<Timer className="w-5 h-5" />
							{timeLeft}s
						</div>
						<div className="flex items-center gap-2 text-primary">
							<Trophy className="w-5 h-5" />
							{score}
						</div>
					</div>
				</div>

				{/* Game Area */}
				<div className="w-full min-h-[400px] flex flex-col justify-center">
					{!isPlaying && !gameOver && (
						<Card className="p-10 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-300">
							<div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-4">
								<Zap className="w-16 h-16 text-primary" />
							</div>
							<div>
								<h2 className="text-3xl font-bold mb-2">Está pronto?</h2>
								<p className="text-muted-foreground max-w-md">
									Você tem 60 segundos. Monte o máximo de frases que conseguir.
									Cada acerto dá{" "}
									<span className="text-brand-aqua font-bold">+5 segundos</span>.
								</p>
							</div>
							<Button
								size="lg"
								className="text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
								onClick={startGame}
							>
								<Play className="mr-2 fill-current" /> Começar Agora
							</Button>
						</Card>
					)}

					{isPlaying && (
						<div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
							{/* Active Construction Area */}
							<fieldset
								className="min-h-[120px] bg-background border-2 border-dashed border-primary/30 rounded-2xl p-6 flex flex-wrap gap-3 items-center justify-center content-center shadow-inner transition-colors hover:border-primary/50"
								aria-label="Frase montada"
							>
								{orderedWords.length === 0 && (
									<span className="text-muted-foreground/50 text-lg font-medium select-none">
										Toque nas palavras abaixo...
									</span>
								)}
								{orderedWords.map((word) => (
									<button
										key={`ordered-${word.id}`}
										type="button"
										aria-label={`Remover palavra "${word.text}" da frase`}
										onClick={() => handleUndoWord(word)}
										className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold text-lg shadow-md hover:bg-primary/90 active:scale-95 transition-all animate-in zoom-in duration-200"
									>
										{word.text}
									</button>
								))}
							</fieldset>

							{/* Word Bank */}
							<fieldset
								className="flex flex-wrap gap-3 justify-center"
								aria-label="Banco de palavras"
							>
								{shuffledWords.map((word) => (
									<button
										key={`shuffled-${word.id}`}
										type="button"
										onClick={() => handleWordClick(word)}
										className="bg-card border border-border hover:border-primary/50 text-card-foreground px-4 py-3 rounded-xl font-medium text-lg shadow-sm hover:shadow-md active:scale-95 transition-all"
									>
										{word.text}
									</button>
								))}
							</fieldset>

							<div className="text-center">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										// Skip penalty? Maybe not for now
										setOrderedWords([]);
										setShuffledWords((prev) =>
											shuffleArray([...prev, ...orderedWords]),
										);
									}}
								>
									<RefreshCw className="w-4 h-4 mr-2" /> Embaralhar / Limpar
								</Button>
							</div>
						</div>
					)}

					{gameOver && (
						<Card className="p-10 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-300 border-2 border-primary/20">
							<div className="relative">
								<Trophy className="w-24 h-24 text-yellow-500 mb-4 drop-shadow-lg" />
								<div className="absolute -top-2 -right-2 bg-destructive text-white font-bold rounded-full w-10 h-10 flex items-center justify-center border-2 border-background shadow">
									{score > 100 ? "S+" : score > 50 ? "A" : "B"}
								</div>
							</div>
							<div>
								<h2 className="text-3xl font-bold mb-2">Fim de Jogo!</h2>
								<div className="text-5xl font-black text-primary mb-2">
									{score}
								</div>
								<p className="text-muted-foreground">Pontos Totais</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
								<Button
									size="lg"
									onClick={startGame}
									className="w-full sm:w-auto"
								>
									<RefreshCw className="mr-2" /> Jogar Novamente
								</Button>
								<Button
									asChild
									variant="outline"
									size="lg"
									className="w-full sm:w-auto"
								>
									<Link to={moduleId && lessonId ? "/" : "/arcade"}>
										{moduleId && lessonId
											? "Voltar ao Mapa"
											: "Voltar ao Arcade"}
									</Link>
								</Button>
							</div>
						</Card>
					)}
				</div>
			</div>
		</PageContainer>
	);
}
