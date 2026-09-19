import { BookOpen, Sparkles, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const WORDS_OF_THE_DAY = [
	{
		word: "Resilience",
		phonetic: "/rɪˈzɪl.jəns/",
		type: "noun",
		translation: "Resiliência",
		example: "Her resilience helped her overcome the difficulties.",
		xp: 5,
	},
	{
		word: "Ubiquitous",
		phonetic: "/juːˈbɪk.wɪ.təs/",
		type: "adj",
		translation: "Onipresente",
		example: "Smartphones have become ubiquitous in our daily lives.",
		xp: 5,
	},
	{
		word: "Ephemeral",
		phonetic: "/ɪˈfem.ər.əl/",
		type: "adj",
		translation: "Efêmero",
		example: "Fame in the world of social media is often ephemeral.",
		xp: 5,
	},
	{
		word: "Serendipity",
		phonetic: "/ˌser.ənˈdɪp.ə.ti/",
		type: "noun",
		translation: "Serendipidade",
		example: "They found each other by pure serendipity.",
		xp: 5,
	},
	{
		word: "Tenacious",
		phonetic: "/təˈneɪ.ʃəs/",
		type: "adj",
		translation: "Tenaz",
		example: "She is a tenacious defender of human rights.",
		xp: 5,
	},
];

export function WordOfTheDayWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [wordData, setWordData] = useState(WORDS_OF_THE_DAY[0]);
	const [isFlipped, setIsFlipped] = useState(false);

	useEffect(() => {
		// Pick a word based on the day of the year
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setWordData(WORDS_OF_THE_DAY[dayOfYear % WORDS_OF_THE_DAY.length]);

		// Check if claimed today
		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("word_of_the_day_claimed") === todayStr);
	}, []);

	const claimReward = () => {
		if (!claimed) {
			addXp(wordData.xp);
			setClaimed(true);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("word_of_the_day_claimed", todayStr);
		}
	};

	const playAudio = () => {
		// simple speech synthesis
		const utterance = new SpeechSynthesisUtterance(wordData.word);
		utterance.lang = "en-US";
		window.speechSynthesis.speak(utterance);
	};

	return (
		<Card className="glass-card bg-gradient-to-br from-primary/10 to-brand-violet/10 dark:from-primary/20 dark:to-brand-violet/20 border-primary/20 dark:border-primary/50 relative overflow-hidden">
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
					<BookOpen className="w-4 h-4" />
					Palavra do Dia
				</CardTitle>
				<span className="text-[10px] uppercase font-bold tracking-widest text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
					Flashcard 3D
				</span>
			</CardHeader>
			<CardContent className="space-y-4 [perspective:1000px]">
				{/* 3D Flip Container */}
				<div
					className="relative w-full h-[140px] [transform-style:preserve-3d] transition-transform duration-500 cursor-pointer"
					style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
					onClick={() => setIsFlipped(!isFlipped)}
				>
					{/* Front Face */}
					<div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white/60 dark:bg-black/30 rounded-xl border border-primary/15 dark:border-primary/50 flex flex-col items-center justify-center shadow-sm">
						<h3 className="text-3xl font-black text-primary mb-2">
							{wordData.word}
						</h3>
						<p className="text-xs text-primary/70 font-semibold uppercase tracking-widest">
							Toque para virar
						</p>
					</div>

					{/* Back Face */}
					<div
						className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white/80 dark:bg-black/40 rounded-xl border border-primary/20 dark:border-primary/60 p-4 flex flex-col justify-center shadow-md"
						style={{ transform: "rotateY(180deg)" }}
					>
						<div className="flex items-start justify-between mb-2">
							<div>
								<div className="flex items-center gap-2 text-sm text-primary/80 font-medium">
									<span>{wordData.phonetic}</span>
									<span>•</span>
									<span className="italic">{wordData.type}</span>
								</div>
								<span className="font-bold text-lg text-primary block mt-0.5">
									{wordData.translation}
								</span>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 text-primary hover:bg-primary/15 dark:hover:bg-primary/60 shrink-0"
								onClick={(e: React.MouseEvent) => {
									e.stopPropagation();
									playAudio();
								}}
							>
								<Volume2 className="w-4 h-4" />
							</Button>
						</div>
						<div className="bg-primary/10 dark:bg-primary/30 p-2 rounded border border-primary/15 dark:border-primary/40">
							<p className="text-xs italic text-primary leading-tight">
								"{wordData.example}"
							</p>
						</div>
					</div>
				</div>

				<Button
					variant={claimed ? "secondary" : "gamified"}
					size="sm"
					className="w-full text-xs font-bold shadow-sm group mt-2"
					disabled={claimed}
					onClick={(e: React.MouseEvent) => {
						e.stopPropagation();
						claimReward();
					}}
				>
					{claimed ? (
						<>Aprendido! ✓</>
					) : (
						<span className="flex items-center gap-1.5">
							<Sparkles className="w-3.5 h-3.5 group-hover:animate-spin" />
							Entendi! (+{wordData.xp} XP)
						</span>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
