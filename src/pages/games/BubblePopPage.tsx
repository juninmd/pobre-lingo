import { ArrowLeft, Pause, Play, RefreshCw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LessonCompleteModal } from "@/components/curriculum/LessonCompleteModal";
import { Button } from "@/components/ui/button";
import { useGamification } from "@/contexts/GamificationContext";
import { useActivityLog } from "@/hooks/useActivityLog";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { curriculumData } from "@/lib/curriculumData";
import {
	type DictionaryEntry,
	dictionaryEntries,
	getWordsByTopic,
} from "@/lib/dictionaryData";
import { cn } from "@/lib/utils";

interface Bubble {
	id: string;
	text: string;
	type: "en" | "pt";
	matchId: string;
	x: number; // %
	y: number; // %
	speed: number;
	size: number;
	color: string;
	isPopped: boolean;
	vx: number; // Velocity X
	vy: number; // Velocity Y
}

const COLORS = [
	"bg-red-400 border-red-500",
	"bg-blue-400 border-blue-500",
	"bg-green-400 border-green-500",
	"bg-yellow-400 border-yellow-500",
	"bg-purple-400 border-purple-500",
	"bg-pink-400 border-pink-500",
];

export default function BubblePopPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const moduleId = searchParams.get("module");
	const lessonId = searchParams.get("lesson");

	const { completeLesson } = useCurriculumProgress();
	const { addGem, addXp } = useGamification();
	const { logActivity } = useActivityLog();

	// Find Lesson Data to determine topic
	const moduleData = curriculumData.modules.find((m) => m.id === moduleId);
	const lessonData = moduleData?.lessons.find((l) => l.id === lessonId);

	const [gameState, setGameState] = useState<
		"intro" | "playing" | "paused" | "won" | "lost"
	>("intro");
	const [bubbles, setBubbles] = useState<Bubble[]>([]);
	const [score, setScore] = useState(0);
	const [selectedBubbleId, setSelectedBubbleId] = useState<string | null>(null);
	const [timeLeft, setTimeLeft] = useState(60);
	const [words, setWords] = useState<DictionaryEntry[]>([]);

	const animationFrameRef = useRef<number>(0);
	const lastTimeRef = useRef<number>(0);

	// Initialize Game
	useEffect(() => {
		let targetWords: DictionaryEntry[] = [];

		// Determine words based on lesson tags or defaults
		if (lessonData?.vocabularyTopics) {
			targetWords = lessonData.vocabularyTopics.flatMap((topic) =>
				getWordsByTopic(topic),
			);
		} else {
			// Default fallbacks if no specific topic
			if (moduleId === "unit-9" || moduleId === "internet-culture") {
				targetWords = getWordsByTopic("internet-slang");
			} else if (moduleId === "foundations" || moduleId === "unit-1") {
				targetWords = [
					...getWordsByTopic("colors"),
					...getWordsByTopic("numbers"),
				];
			} else {
				// Random mix
				targetWords = dictionaryEntries.slice(0, 10);
			}
		}

		// Fallback if empty
		if (targetWords.length < 5) targetWords = dictionaryEntries.slice(0, 10);

		// Pick 6 random pairs for the game round
		const shuffled = [...targetWords]
			.sort(() => 0.5 - Math.random())
			.slice(0, 6);
		setWords(shuffled);
	}, [lessonData, moduleId]);

	const startGame = () => {
		setGameState("playing");
		setScore(0);
		setTimeLeft(60);
		spawnBubbles();
	};

	const spawnBubbles = () => {
		const newBubbles: Bubble[] = [];

		words.forEach((w, i) => {
			const color = COLORS[i % COLORS.length];

			// English Bubble
			newBubbles.push({
				id: `en-${w.id}`,
				text: w.word,
				type: "en",
				matchId: w.id,
				x: Math.random() * 80 + 10,
				y: Math.random() * 80 + 10,
				speed: 0.5 + Math.random() * 0.5,
				size: 80 + Math.random() * 20,
				color,
				isPopped: false,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3,
			});

			// Portuguese Bubble
			newBubbles.push({
				id: `pt-${w.id}`,
				text: w.translation_pt,
				type: "pt",
				matchId: w.id,
				x: Math.random() * 80 + 10,
				y: Math.random() * 80 + 10,
				speed: 0.5 + Math.random() * 0.5,
				size: 80 + Math.random() * 20,
				color,
				isPopped: false,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3,
			});
		});

		setBubbles(newBubbles);
	};

	// Game Loop
	const animate = useCallback(
		function _animate(time: number) {
			if (gameState !== "playing") return;

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const _delta = time - lastTimeRef.current;
			lastTimeRef.current = time;

			setBubbles((prev) =>
				prev.map((b) => {
					if (b.isPopped) return b;

					const newX = b.x + b.vx;
					const newY = b.y + b.vy;

					// Bounce off walls
					if (newX <= 0 || newX >= 90) b.vx *= -1;
					if (newY <= 0 || newY >= 90) b.vy *= -1;

					return { ...b, x: newX, y: newY };
				}),
			);

			animationFrameRef.current = requestAnimationFrame(_animate);
		},
		[gameState],
	);

	useEffect(() => {
		if (gameState === "playing") {
			lastTimeRef.current = performance.now();
			animationFrameRef.current = requestAnimationFrame(animate);
		}
		return () => {
			if (animationFrameRef.current)
				cancelAnimationFrame(animationFrameRef.current);
		};
	}, [gameState, animate]);

	// Timer
	useEffect(() => {
		if (gameState !== "playing") return;
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					setGameState("lost");
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, [gameState]);

	const handleWin = () => {
		setGameState("won");
		logActivity();
		if (moduleId && lessonId) {
			completeLesson(moduleId, lessonId, lessonData?.xpReward || 50);
			addXp(lessonData?.xpReward || 50);
			addGem(10);
		}
	};

	// Check Win
	useEffect(() => {
		if (
			gameState === "playing" &&
			bubbles.length > 0 &&
			bubbles.every((b) => b.isPopped)
		) {
			handleWin();
		}
	}, [bubbles, gameState, handleWin]);

	const handleBubbleClick = (clickedId: string) => {
		if (gameState !== "playing") return;
		const clickedBubble = bubbles.find((b) => b.id === clickedId);
		if (!clickedBubble || clickedBubble.isPopped) return;

		if (!selectedBubbleId) {
			// Select first
			setSelectedBubbleId(clickedId);
		} else {
			if (selectedBubbleId === clickedId) {
				// Deselect
				setSelectedBubbleId(null);
				return;
			}

			const selectedBubble = bubbles.find((b) => b.id === selectedBubbleId);

			if (selectedBubble && selectedBubble.matchId === clickedBubble.matchId) {
				// MATCH!
				setBubbles((prev) =>
					prev.map((b) =>
						b.id === clickedId || b.id === selectedBubbleId
							? { ...b, isPopped: true }
							: b,
					),
				);
				setScore((prev) => prev + 100);
				setSelectedBubbleId(null);
				// Play sound if possible
			} else {
				// MISMATCH
				// Shake effect could be added here
				setSelectedBubbleId(null);
			}
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-sky-300 to-blue-500 overflow-hidden relative touch-none select-none font-sans">
			{/* HUD */}
			<div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-40 bg-white/10 backdrop-blur-md border-b border-white/20 text-white shadow-sm">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => navigate("/")}
					className="hover:bg-white/20 text-white"
				>
					<ArrowLeft className="w-6 h-6" />
				</Button>
				<div className="flex items-center gap-4">
					<div className="flex flex-col items-center">
						<span className="text-xs uppercase font-bold opacity-80">
							Tempo
						</span>
						<span
							className={cn(
								"text-2xl font-black tabular-nums",
								timeLeft < 10
									? "text-destructive animate-pulse"
									: "text-foreground",
							)}
						>
							{timeLeft}s
						</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="text-xs uppercase font-bold opacity-80">
							Pontos
						</span>
						<span className="text-2xl font-black text-yellow-300 drop-shadow-sm">
							{score}
						</span>
					</div>
				</div>
				<Button
					variant="ghost"
					size="icon"
					onClick={() =>
						setGameState(gameState === "paused" ? "playing" : "paused")
					}
					className="hover:bg-white/20 text-white"
				>
					{gameState === "paused" ? (
						<Play className="w-6 h-6" />
					) : (
						<Pause className="w-6 h-6" />
					)}
				</Button>
			</div>

			{/* Game Area */}
			<div className="absolute inset-0 pt-20 pb-safe">
				{bubbles.map(
					(bubble) =>
						!bubble.isPopped && (
							<div
								key={bubble.id}
								onClick={() => handleBubbleClick(bubble.id)}
								className={cn(
									"absolute rounded-full flex items-center justify-center text-center p-2 cursor-pointer shadow-xl border-4 transition-all duration-300",
									bubble.color,
									selectedBubbleId === bubble.id
										? "scale-110 ring-4 ring-white z-50 brightness-110"
										: "hover:scale-105",
									"active:scale-95",
								)}
								style={{
									left: `${bubble.x}%`,
									top: `${bubble.y}%`,
									width: `${bubble.size}px`,
									height: `${bubble.size}px`,
									transition: "transform 0.2s, filter 0.2s", // Smooth click, manual pos update handles movement
								}}
							>
								{/* Shine effect */}
								<div className="absolute top-2 left-3 w-1/3 h-1/4 bg-white/40 rounded-full blur-sm" />

								<span className="font-bold text-white text-sm md:text-base leading-tight drop-shadow-md select-none pointer-events-none">
									{bubble.text}
								</span>
							</div>
						),
				)}
			</div>

			{/* Intro Modal */}
			{gameState === "intro" && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm p-4">
					<div className="bg-white dark:bg-slate-900 p-8 rounded-3xl max-w-sm text-center shadow-2xl border-4 border-blue-500 animate-in zoom-in duration-300">
						<div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
							<Sparkles className="w-10 h-10 text-blue-600" />
						</div>
						<h2 className="text-3xl font-black mb-2 text-blue-600">
							Bubble Pop!
						</h2>
						<p className="mb-6 text-muted-foreground text-lg">
							Combine as palavras em inglês e português antes que o tempo acabe!
						</p>
						<Button
							size="lg"
							className="w-full text-lg h-12 rounded-xl shadow-lg shadow-blue-500/30"
							onClick={startGame}
						>
							Começar <Play className="w-5 h-5 ml-2 fill-current" />
						</Button>
					</div>
				</div>
			)}

			{/* Paused Modal */}
			{gameState === "paused" && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
					<div className="bg-white p-6 rounded-2xl text-center shadow-xl">
						<h2 className="text-xl font-bold mb-4">Pausado</h2>
						<div className="flex gap-4">
							<Button variant="outline" onClick={() => navigate("/")}>
								Sair
							</Button>
							<Button onClick={() => setGameState("playing")}>Continuar</Button>
						</div>
					</div>
				</div>
			)}

			{/* Lost Modal */}
			{gameState === "lost" && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm p-4">
					<div className="bg-white dark:bg-slate-900 p-8 rounded-3xl max-w-sm text-center shadow-2xl border-4 border-red-500">
						<h2 className="text-3xl font-black mb-2 text-red-500">
							O tempo acabou!
						</h2>
						<p className="mb-6 text-muted-foreground">
							Não desista! Tente novamente para melhorar seu reflexo.
						</p>
						<div className="flex flex-col gap-3">
							<Button size="lg" onClick={startGame} className="w-full">
								<RefreshCw className="w-4 h-4 mr-2" /> Tentar de Novo
							</Button>
							<Button variant="ghost" onClick={() => navigate("/")}>
								Sair
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Win Modal */}
			<LessonCompleteModal
				isOpen={gameState === "won"}
				onContinue={() => navigate("/")}
				xpEarned={lessonData?.xpReward || 50}
			/>
		</div>
	);
}
