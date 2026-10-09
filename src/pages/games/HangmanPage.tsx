import { AlertCircle, Heart, HelpCircle, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { useToast } from "@/hooks/use-toast";
import { useActivityLog } from "@/hooks/useActivityLog";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { fireConfetti } from "@/lib/confetti";
import { dictionaryEntries } from "@/lib/dictionaryData";
import { cn } from "@/lib/utils";

const MAX_LIVES = 6;

// Filter suitable words (length > 3 and has translation)
const WORD_POOL = dictionaryEntries.filter(
	(entry) => entry.word.length > 3 && /^[a-zA-Z]+$/.test(entry.word),
);

export default function HangmanPage() {
	const [searchParams] = useSearchParams();
	const moduleId = searchParams.get("module");
	const lessonId = searchParams.get("lesson");
	const { completeLesson } = useCurriculumProgress();

	const { addXp } = useGamification();
	const { logActivity } = useActivityLog();
	const { toast } = useToast();
	const [currentEntry, setCurrentEntry] = useState(WORD_POOL[0]);
	const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
	const [lives, setLives] = useState(MAX_LIVES);
	const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
	const [streak, setStreak] = useState(0);

	const startNewGame = useCallback(() => {
		const randomEntry = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
		setCurrentEntry(randomEntry);
		setGuessedLetters(new Set());
		setLives(MAX_LIVES);
		setStatus("playing");
	}, []);

	// Initial load
	useEffect(() => {
		startNewGame();
	}, [startNewGame]);

	// Check win/loss conditions
	useEffect(() => {
		if (status !== "playing") return;

		const wordUpper = currentEntry.word.toUpperCase();
		const isWin = wordUpper
			.split("")
			.every((letter) => guessedLetters.has(letter));

		if (isWin) {
			setStatus("won");
			setStreak((s) => s + 1);
			logActivity();
			fireConfetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
			addXp(20);
			toast({
				title: "Parabéns!",
				description: `Você acertou: ${currentEntry.word}`,
				className: "bg-green-500 text-white border-none",
			});

			if (moduleId && lessonId) {
				completeLesson(moduleId, lessonId, 120);
			}
		}

		if (lives <= 0) {
			setStatus("lost");
			setStreak(0);
			toast({
				title: "Fim de jogo!",
				description: `A palavra era: ${currentEntry.word}`,
				variant: "destructive",
			});
		}
	}, [
		guessedLetters,
		lives,
		currentEntry,
		status,
		addXp,
		toast,
		moduleId,
		logActivity,
		lessonId,
		completeLesson,
	]);

	const handleGuess = (letter: string) => {
		if (status !== "playing" || guessedLetters.has(letter)) return;

		const newGuessed = new Set(guessedLetters);
		newGuessed.add(letter);
		setGuessedLetters(newGuessed);

		if (!currentEntry.word.toUpperCase().includes(letter)) {
			setLives((prev) => prev - 1);
		}
	};

	const keyboard = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

	return (
		<PageContainer>
			<div className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-4">
				{/* Header */}
				<div className="flex w-full justify-between items-center">
					<h1 className="text-2xl font-bold flex items-center gap-2">
						<AlertCircle className="text-orange-500" /> Forca
					</h1>
					<div className="flex gap-4">
						<Badge
							variant="outline"
							className="text-lg px-3 py-1 bg-white dark:bg-slate-900"
						>
							🔥 {streak}
						</Badge>
						<Badge
							variant="outline"
							className="text-lg px-3 py-1 text-red-600 dark:text-red-400 bg-white dark:bg-slate-900"
						>
							<Heart className="w-4 h-4 mr-1 fill-current" /> {lives}
						</Badge>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
					{/* Drawing Area */}
					<Card className="p-8 flex items-center justify-center bg-slate-50 dark:bg-slate-900 border-2 min-h-[300px]">
						<HangmanDrawing lives={lives} />
					</Card>

					{/* Word & Hint Area */}
					<div className="flex flex-col gap-6 justify-center">
						{/* Word Display */}
						<div className="flex flex-wrap gap-2 justify-center">
							{currentEntry.word.split("").map((char, index) => {
								const upperChar = char.toUpperCase();
								const isGuessed = guessedLetters.has(upperChar);
								const isLost = status === "lost";

								return (
									<div
										key={index}
										className={cn(
											"w-10 h-12 border-b-4 flex items-center justify-center text-2xl font-bold transition-all",
											isGuessed
												? "border-primary text-primary"
												: "border-muted-foreground/30 text-transparent",
											isLost && !isGuessed && "text-red-500 border-red-300", // Reveal on loss
										)}
									>
										{isGuessed || isLost ? upperChar : "_"}
									</div>
								);
							})}
						</div>

						{/* Hint */}
						<div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
							<div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-1">
								<HelpCircle className="w-4 h-4" /> Dica:
							</div>
							<p className="text-sm text-muted-foreground italic">
								"{currentEntry.translation_pt}"
							</p>
							<p className="text-xs text-muted-foreground mt-2">
								Definição: {currentEntry.meaning_en}
							</p>
						</div>

						{/* Game Over Actions */}
						{status !== "playing" && (
							<div className="flex flex-col gap-2 w-full animate-in fade-in zoom-in">
								<Button onClick={startNewGame} size="lg" className="w-full">
									<RefreshCw className="mr-2 w-5 h-5" /> Jogar Novamente
								</Button>
								<Link
									to={moduleId && lessonId ? "/" : "/arcade"}
									className="w-full"
								>
									<Button variant="outline" className="w-full">
										{moduleId && lessonId ? "Voltar ao Mapa" : "Sair"}
									</Button>
								</Link>
							</div>
						)}
					</div>
				</div>

				{/* Keyboard */}
				<div className="w-full mt-4">
					<div className="flex flex-wrap justify-center gap-2">
						{keyboard.map((letter) => {
							const isGuessed = guessedLetters.has(letter);
							const isInWord = currentEntry.word.toUpperCase().includes(letter);

							const _variant = "outline";
							let className =
								"w-10 h-12 font-bold text-lg transition-all active:scale-95";

							if (isGuessed) {
								if (isInWord) {
									className +=
										" bg-green-500 text-white border-green-600 hover:bg-green-600";
								} else {
									className +=
										" bg-gray-200 text-gray-400 border-transparent dark:bg-gray-800 dark:text-gray-600 opacity-50";
								}
							} else {
								className += " hover:bg-primary/10 hover:border-primary";
							}

							return (
								<button
									type="button"
									key={letter}
									disabled={isGuessed || status !== "playing"}
									onClick={() => handleGuess(letter)}
									className={cn(
										"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
										className,
									)}
								>
									{letter}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</PageContainer>
	);
}

// Simple SVG Drawing for Hangman
function HangmanDrawing({ lives }: { lives: number }) {
	const parts = [
		// Base
		<line
			key="base"
			x1="10"
			y1="250"
			x2="150"
			y2="250"
			stroke="currentColor"
			strokeWidth="4"
		/>,
		// Pole
		<line
			key="pole"
			x1="80"
			y1="250"
			x2="80"
			y2="20"
			stroke="currentColor"
			strokeWidth="4"
		/>,
		// Top
		<line
			key="top"
			x1="80"
			y1="20"
			x2="200"
			y2="20"
			stroke="currentColor"
			strokeWidth="4"
		/>,
		// Rope
		<line
			key="rope"
			x1="200"
			y1="20"
			x2="200"
			y2="50"
			stroke="currentColor"
			strokeWidth="4"
		/>,
		// Head (Lives < 6)
		lives < 6 && (
			<circle
				key="head"
				cx="200"
				cy="80"
				r="30"
				stroke="currentColor"
				strokeWidth="4"
				fill="transparent"
			/>
		),
		// Body (Lives < 5)
		lives < 5 && (
			<line
				key="body"
				x1="200"
				y1="110"
				x2="200"
				y2="170"
				stroke="currentColor"
				strokeWidth="4"
			/>
		),
		// Left Arm (Lives < 4)
		lives < 4 && (
			<line
				key="l-arm"
				x1="200"
				y1="130"
				x2="170"
				y2="160"
				stroke="currentColor"
				strokeWidth="4"
			/>
		),
		// Right Arm (Lives < 3)
		lives < 3 && (
			<line
				key="r-arm"
				x1="200"
				y1="130"
				x2="230"
				y2="160"
				stroke="currentColor"
				strokeWidth="4"
			/>
		),
		// Left Leg (Lives < 2)
		lives < 2 && (
			<line
				key="l-leg"
				x1="200"
				y1="170"
				x2="170"
				y2="220"
				stroke="currentColor"
				strokeWidth="4"
			/>
		),
		// Right Leg (Lives < 1)
		lives < 1 && (
			<line
				key="r-leg"
				x1="200"
				y1="170"
				x2="230"
				y2="220"
				stroke="currentColor"
				strokeWidth="4"
			/>
		),
	];

	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 300 300"
			className="w-full h-full max-w-[200px] text-slate-800 dark:text-slate-200"
		>
			{parts}
		</svg>
	);
}
