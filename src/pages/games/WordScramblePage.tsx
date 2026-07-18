import confetti from "canvas-confetti";
import {
	ArrowLeft,
	ArrowRight,
	Brain,
	CheckCircle2,
	RefreshCw,
	Trophy,
	XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useActivityLog } from "@/hooks/useActivityLog";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { dictionaryEntries } from "@/lib/dictionaryData";
import { cn } from "@/lib/utils";

const WORDS_TO_WIN = 5;

export default function WordScramblePage() {
	const [searchParams] = useSearchParams();
	const moduleId = searchParams.get("module");
	const lessonId = searchParams.get("lesson");
	const { completeLesson } = useCurriculumProgress();
	const { logActivity } = useActivityLog();
	const navigate = useNavigate();

	const { toast } = useToast();
	const [currentWord, setCurrentWord] = useState({
		word: "",
		hint: "",
		translation: "",
	});
	const [scrambled, setScrambled] = useState("");
	const [guess, setGuess] = useState("");
	const [feedback, setFeedback] = useState<"none" | "success" | "error">(
		"none",
	);
	const [streak, setStreak] = useState(0);
	const [wordsSolved, setWordsSolved] = useState(0);
	const [gameComplete, setGameComplete] = useState(false);

	const shuffleWord = (word: string) => {
		const arr = word.split("");
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr.join("");
	};

	const nextWord = React.useCallback(() => {
		// Pick from dictionary
		const randomEntry =
			dictionaryEntries[Math.floor(Math.random() * dictionaryEntries.length)];

		let newScrambled = shuffleWord(randomEntry.word.toUpperCase());
		while (
			newScrambled === randomEntry.word.toUpperCase() &&
			randomEntry.word.length > 1
		) {
			newScrambled = shuffleWord(randomEntry.word.toUpperCase());
		}

		setCurrentWord({
			word: randomEntry.word.toUpperCase(),
			hint: `Start with ${randomEntry.word.charAt(0).toUpperCase()}`, // Generic hint or we could use translation as hint?
			translation: randomEntry.translation_pt,
		});
		setScrambled(newScrambled);
		setGuess("");
		setFeedback("none");
	}, [shuffleWord]);

	useEffect(() => {
		nextWord();
	}, [nextWord]);

	const handleCheck = () => {
		if (guess.toUpperCase().trim() === currentWord.word) {
			setFeedback("success");
			setStreak((s) => s + 1);
			const newSolved = wordsSolved + 1;
			setWordsSolved(newSolved);

			confetti({
				particleCount: 50,
				spread: 50,
				origin: { y: 0.7 },
			});

			if (newSolved >= WORDS_TO_WIN) {
				setTimeout(() => {
					handleLevelComplete();
				}, 1000);
			} else {
				setTimeout(nextWord, 1500);
			}
		} else {
			setFeedback("error");
			setStreak(0);
			toast({
				title: "Incorreto",
				description: "Tente novamente!",
				variant: "destructive",
			});
		}
	};

	const handleLevelComplete = () => {
		setGameComplete(true);
		logActivity();
		confetti({
			particleCount: 200,
			spread: 100,
			origin: { y: 0.5 },
		});
		if (moduleId && lessonId) {
			completeLesson(moduleId, lessonId, 100);
		}
	};

	const handleContinue = () => {
		navigate("/");
	};

	return (
		<PageContainer>
			<div className="max-w-md mx-auto flex flex-col items-center gap-8 py-8">
				<div className="w-full flex justify-between items-center">
					<Button variant="ghost" asChild>
						<Link to={moduleId ? "/" : "/arcade"} className="gap-2">
							<ArrowLeft className="h-4 w-4" />
							{moduleId ? "Sair" : "Voltar"}
						</Link>
					</Button>
					<div className="flex items-center gap-2">
						<div className="text-sm font-medium text-muted-foreground">
							Progresso: {wordsSolved}/{WORDS_TO_WIN}
						</div>
						<div className="text-sm font-medium text-muted-foreground">
							Streak:{" "}
							<span className="text-primary font-bold">{streak} 🔥</span>
						</div>
					</div>
				</div>

				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold flex items-center justify-center gap-2">
						<Brain className="w-8 h-8 text-purple-500" />
						Word Scramble
					</h1>
					<p className="text-muted-foreground">
						Desembaralhe as letras para formar a palavra.
					</p>
				</div>

				{gameComplete ? (
					<Card className="w-full p-8 flex flex-col items-center gap-6 shadow-xl border-t-4 border-t-green-500 animate-in zoom-in">
						<Trophy className="w-20 h-20 text-yellow-500" />
						<div className="text-center">
							<h2 className="text-2xl font-bold">Nível Completo!</h2>
							<p className="text-muted-foreground">
								Você desembaralhou {WORDS_TO_WIN} palavras.
							</p>
						</div>
						{moduleId && lessonId ? (
							<Button
								onClick={handleContinue}
								size="lg"
								className="w-full gap-2"
							>
								Continuar <ArrowRight className="w-4 h-4" />
							</Button>
						) : (
							<Button
								onClick={() => {
									setWordsSolved(0);
									setGameComplete(false);
									nextWord();
								}}
								className="w-full"
							>
								Jogar Novamente
							</Button>
						)}
					</Card>
				) : (
					<Card className="w-full p-8 flex flex-col items-center gap-6 shadow-xl border-t-4 border-t-purple-500">
						<div
							className="space-y-4 text-center w-full"
							data-answer={currentWord.word}
						>
							<div className="text-4xl font-mono font-bold tracking-[0.2em] text-primary break-all">
								{scrambled}
							</div>
							<div className="text-sm font-medium text-purple-600 bg-purple-50 dark:bg-purple-900/20 py-2 px-4 rounded-lg inline-block">
								Tradução: {currentWord.translation}
							</div>
						</div>

						<div className="w-full space-y-4">
							<Input
								value={guess}
								onChange={(e) => {
									setGuess(e.target.value);
									setFeedback("none");
								}}
								onKeyDown={(e) => e.key === "Enter" && handleCheck()}
								placeholder="Digite sua resposta..."
								className={cn(
									"text-center text-lg uppercase h-12 tracking-widest",
									feedback === "success" &&
										"border-green-500 bg-green-50 text-green-900",
									feedback === "error" &&
										"border-red-500 bg-red-50 text-red-900",
								)}
								autoFocus
							/>

							<Button
								className="w-full"
								size="lg"
								onClick={handleCheck}
								disabled={!guess}
							>
								{feedback === "success" ? (
									<span className="flex items-center gap-2">
										<CheckCircle2 className="w-5 h-5" /> Correto!
									</span>
								) : feedback === "error" ? (
									<span className="flex items-center gap-2">
										<XCircle className="w-5 h-5" /> Tente Novamente
									</span>
								) : (
									"Verificar"
								)}
							</Button>

							<Button
								variant="ghost"
								size="sm"
								onClick={nextWord}
								className="w-full text-muted-foreground"
							>
								Pular Palavra <RefreshCw className="ml-2 w-3 h-3" />
							</Button>
						</div>
					</Card>
				)}
			</div>
		</PageContainer>
	);
}
