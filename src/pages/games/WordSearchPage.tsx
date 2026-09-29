import { Gamepad2, RefreshCw, Timer, Trophy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { Pobrelingo } from "@/components/mascot/Pobrelingo";
import { Button } from "@/components/ui/button";
import { useActivityLog } from "@/hooks/useActivityLog";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { triggerConfetti } from "@/lib/confetti";
import { dictionaryEntries } from "@/lib/dictionaryData";
import { cn } from "@/lib/utils";

// --- Game Logic ---

const GRID_SIZE = 10;
const DIRECTIONS = [
	[0, 1], // horizontal
	[1, 0], // vertical
	[1, 1], // diagonal down-right
	[-1, 1], // diagonal up-right
];

interface WordLocation {
	word: string;
	startRow: number;
	startCol: number;
	direction: number[];
	color: string; // For solved highlighting
}

function generateGrid(wordsToPlace: string[]) {
	const grid: string[][] = Array(GRID_SIZE)
		.fill(null)
		.map(() => Array(GRID_SIZE).fill(""));
	const placedWords: WordLocation[] = [];

	for (const word of wordsToPlace) {
		const cleanWord = word.toUpperCase();
		let placed = false;
		let attempts = 0;

		while (!placed && attempts < 50) {
			const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
			const startRow = Math.floor(Math.random() * GRID_SIZE);
			const startCol = Math.floor(Math.random() * GRID_SIZE);

			// Check boundary
			const endRow = startRow + dir[0] * (cleanWord.length - 1);
			const endCol = startCol + dir[1] * (cleanWord.length - 1);

			if (
				endRow >= 0 &&
				endRow < GRID_SIZE &&
				endCol >= 0 &&
				endCol < GRID_SIZE
			) {
				// Check collision
				let collision = false;
				for (let i = 0; i < cleanWord.length; i++) {
					const r = startRow + dir[0] * i;
					const c = startCol + dir[1] * i;
					if (grid[r][c] !== "" && grid[r][c] !== cleanWord[i]) {
						collision = true;
						break;
					}
				}

				if (!collision) {
					// Place
					for (let i = 0; i < cleanWord.length; i++) {
						grid[startRow + dir[0] * i][startCol + dir[1] * i] = cleanWord[i];
					}
					placedWords.push({
						word: cleanWord,
						startRow,
						startCol,
						direction: dir,
						color: "bg-green-500",
					});
					placed = true;
				}
			}
			attempts++;
		}
	}

	// Fill empty
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (let r = 0; r < GRID_SIZE; r++) {
		for (let c = 0; c < GRID_SIZE; c++) {
			if (grid[r][c] === "") {
				grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
			}
		}
	}

	return { grid, placedWords };
}

// --- Component ---

export default function WordSearchPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const moduleId = searchParams.get("module");
	const lessonId = searchParams.get("lesson");
	const { completeLesson } = useCurriculumProgress();
	const { logActivity } = useActivityLog();

	const [grid, setGrid] = useState<string[][]>([]);
	const [words, setWords] = useState<string[]>([]); // Original words
	const [locations, setLocations] = useState<WordLocation[]>([]);
	const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
	const [selectionStart, setSelectionStart] = useState<{
		r: number;
		c: number;
	} | null>(null);
	const [currentSelection, setCurrentSelection] = useState<{
		r: number;
		c: number;
	} | null>(null); // For hover effect
	const [timeLeft, setTimeLeft] = useState(120);
	const [gameOver, setGameOver] = useState(false);
	const [gameWon, setGameWon] = useState(false);

	// Initialize Game
	const startNewGame = useCallback(() => {
		// Pick 6 random words
		const shuffled = [...dictionaryEntries].sort(() => 0.5 - Math.random());
		const selected = shuffled.slice(0, 6).map((e) => e.word);

		// Only use words that fit (<= 10 chars)
		const validWords = selected.filter((w) => w.length <= 10 && w.length > 2);

		// Generate Grid
		const { grid: newGrid, placedWords } = generateGrid(validWords);

		setGrid(newGrid);
		setLocations(placedWords);
		setWords(placedWords.map((l) => l.word)); // Store Uppercase words
		setFoundWords(new Set());
		setSelectionStart(null);
		setCurrentSelection(null);
		setTimeLeft(120); // 2 minutes
		setGameOver(false);
		setGameWon(false);
	}, []);

	useEffect(() => {
		startNewGame();
	}, [startNewGame]);

	// Timer
	useEffect(() => {
		if (!gameOver && !gameWon && timeLeft > 0) {
			const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
			return () => clearInterval(timer);
		} else if (timeLeft === 0 && !gameWon) {
			setGameOver(true);
		}
	}, [timeLeft, gameOver, gameWon]);

	// Handle Win
	useEffect(() => {
		if (words.length > 0 && foundWords.size === words.length) {
			setGameWon(true);
			triggerConfetti();
			logActivity();
			if (moduleId && lessonId) {
				completeLesson(moduleId, lessonId, 100);
			}
		}
	}, [foundWords, words, moduleId, lessonId, completeLesson, logActivity]);

	// Selection Logic
	const handleCellClick = (r: number, c: number) => {
		if (gameOver || gameWon) return;

		if (!selectionStart) {
			setSelectionStart({ r, c });
			setCurrentSelection({ r, c });
		} else {
			// Validate selection
			checkSelection(selectionStart, { r, c });
			setSelectionStart(null);
			setCurrentSelection(null);
		}
	};

	const handleCellHover = (r: number, c: number) => {
		if (selectionStart && !gameOver && !gameWon) {
			setCurrentSelection({ r, c });
		}
	};

	const checkSelection = (
		start: { r: number; c: number },
		end: { r: number; c: number },
	) => {
		// Determine word formed
		const dr = end.r - start.r;
		const dc = end.c - start.c;

		// Check if straight line
		const steps = Math.max(Math.abs(dr), Math.abs(dc));
		if (steps === 0) return;

		// Normalize direction
		const stepR = dr === 0 ? 0 : dr / steps;
		const stepC = dc === 0 ? 0 : dc / steps;

		// Only allow standard directions (integers)
		if (!Number.isInteger(stepR) || !Number.isInteger(stepC)) return;

		let formedWord = "";
		for (let i = 0; i <= steps; i++) {
			formedWord += grid[start.r + i * stepR][start.c + i * stepC];
		}

		// Check backwards too just in case (though we usually enforce direction)
		const reversed = formedWord.split("").reverse().join("");

		if (words.includes(formedWord) && !foundWords.has(formedWord)) {
			setFoundWords((prev) => new Set(prev).add(formedWord));
			// Add a nice sound effect here if possible
		} else if (words.includes(reversed) && !foundWords.has(reversed)) {
			setFoundWords((prev) => new Set(prev).add(reversed));
		}
	};

	// Helper to check if a cell is part of a found word
	const isCellFound = (r: number, c: number) => {
		for (const loc of locations) {
			if (!foundWords.has(loc.word)) continue;

			// Check if this cell is in this word's path
			const len = loc.word.length;
			for (let i = 0; i < len; i++) {
				if (
					loc.startRow + loc.direction[0] * i === r &&
					loc.startCol + loc.direction[1] * i === c
				) {
					return true;
				}
			}
		}
		return false;
	};

	// Helper for selection highlight
	const isCellSelected = (r: number, c: number) => {
		if (!selectionStart || !currentSelection) return false;

		const start = selectionStart;
		const end = currentSelection;

		const dr = end.r - start.r;
		const dc = end.c - start.c;
		const steps = Math.max(Math.abs(dr), Math.abs(dc));
		if (steps === 0) return r === start.r && c === start.c;

		const stepR = dr / steps;
		const stepC = dc / steps;

		// Check if on the line
		if (!Number.isInteger(stepR) || !Number.isInteger(stepC)) return false; // Not a straight line

		// Check bounds of line segment
		// Project point onto line... simple way: iterate points
		for (let i = 0; i <= steps; i++) {
			if (start.r + i * stepR === r && start.c + i * stepC === c) return true;
		}
		return false;
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	let rowIndex = 0;
	const gridRender = grid.map((row) => {
		const r = rowIndex;
		rowIndex++;
		let colIndex = 0;
		return row.map((cell) => {
			const c = colIndex;
			colIndex++;
			const isFound = isCellFound(r, c);
			const isSelected = isCellSelected(r, c);
			return (
				<button
					key={`${r}-${c}`}
					type="button"
					className={cn(
						"w-[8.5vw] h-[8.5vw] max-w-[40px] max-h-[40px] sm:w-10 sm:h-10 flex items-center justify-center font-bold text-base sm:text-xl rounded-md cursor-pointer transition-all duration-100 select-none",
						isFound
							? "bg-green-500 text-white shadow-inner scale-95"
							: isSelected
								? "bg-primary text-primary-foreground scale-105 shadow-lg z-10"
								: "bg-muted/50 hover:bg-muted text-foreground",
					)}
					onMouseDown={() => handleCellClick(r, c)}
					onMouseEnter={() => handleCellHover(r, c)}
					onMouseUp={() => selectionStart && handleCellClick(r, c)}
				>
					{cell}
				</button>
			);
		});
	});

	return (
		<PageContainer className="pb-20">
			<PageHeader
				title="Caça Palavras"
				description="Encontre as palavras escondidas na grade!"
				icon={Gamepad2}
				iconClassName="text-purple-500"
			>
				<div className="flex items-center gap-4">
					<div
						className={cn(
							"flex items-center gap-2 font-mono text-xl font-bold px-3 py-1 rounded-md",
							timeLeft < 30 ? "bg-red-100 text-red-600" : "bg-muted",
						)}
					>
						<Timer className="w-5 h-5" />
						{formatTime(timeLeft)}
					</div>
				</div>
			</PageHeader>

			<div className="flex flex-col lg:flex-row gap-8 items-start justify-center mt-4">
				{/* Game Grid */}
				<div className="relative p-4 bg-card rounded-xl shadow-lg border-4 border-muted select-none touch-none mx-auto">
					{/* Overlay for Game Over / Win */}
					{(gameOver || gameWon) && (
						<div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg animate-in fade-in duration-300">
							<Pobrelingo
								emotion={gameWon ? "excited" : "neutral"}
								width={150}
								height={150}
								className="mb-4"
							/>
							<h2 className="text-4xl font-black mb-2 uppercase">
								{gameWon ? "Vitória!" : "Tempo Esgotado!"}
							</h2>
							<p className="text-muted-foreground mb-6">
								Você encontrou {foundWords.size} de {words.length} palavras.
							</p>
							<div className="flex gap-4">
								<Button
									onClick={() =>
										navigate(moduleId && lessonId ? "/" : "/arcade")
									}
									variant="outline"
								>
									{moduleId && lessonId ? "Voltar ao Mapa" : "Sair"}
								</Button>
								<Button onClick={startNewGame} size="lg" className="gap-2">
									<RefreshCw className="w-5 h-5" /> Jogar Novamente
								</Button>
							</div>
						</div>
					)}

					{/* biome-ignore lint/a11y/noStaticElementInteractions: board container mouseLeave handles drag reset */}
					<div
						className="grid gap-1"
						style={{
							gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
						}}
						onMouseLeave={() => setSelectionStart(null)}
					>
						{gridRender}
					</div>
				</div>

				{/* Word List */}
				<div className="w-full lg:w-64 bg-card border rounded-xl p-6 shadow-sm">
					<h3 className="text-lg font-bold mb-4 flex items-center gap-2">
						<Trophy className="w-5 h-5 text-yellow-500" />
						Palavras
					</h3>
					<div className="flex flex-wrap lg:flex-col gap-2">
						{words.map((word) => (
							<div
								key={word}
								className={cn(
									"px-3 py-2 rounded-lg text-sm font-bold transition-all border",
									foundWords.has(word)
										? "bg-green-100 text-green-700 border-green-200 line-through opacity-60 dark:bg-green-900/30 dark:text-green-400"
										: "bg-background border-border hover:bg-muted",
								)}
							>
								{word}
							</div>
						))}
					</div>
				</div>
			</div>
		</PageContainer>
	);
}
