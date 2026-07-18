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
		<Card className="glass-card bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200/50 dark:border-indigo-800/50 relative overflow-hidden">
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
					<BookOpen className="w-4 h-4" />
					Palavra do Dia
				</CardTitle>
				<span className="text-[10px] uppercase font-bold tracking-widest text-indigo-500/70 bg-indigo-500/10 px-2 py-0.5 rounded-full">
					Microlearning
				</span>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-1">
					<div className="flex items-center justify-between">
						<h3 className="text-2xl font-black text-indigo-900 dark:text-indigo-300">
							{wordData.word}
						</h3>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900"
							onClick={playAudio}
						>
							<Volume2 className="w-4 h-4" />
						</Button>
					</div>
					<div className="flex items-center gap-2 text-sm text-indigo-600/80 dark:text-indigo-400/80 font-medium">
						<span>{wordData.phonetic}</span>
						<span>•</span>
						<span className="italic">{wordData.type}</span>
						<span>•</span>
						<span className="font-semibold text-indigo-700 dark:text-indigo-400">
							{wordData.translation}
						</span>
					</div>
				</div>

				<div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
					<p className="text-sm italic text-indigo-800 dark:text-indigo-300">
						"{wordData.example}"
					</p>
				</div>

				<Button
					variant={claimed ? "secondary" : "gamified"}
					size="sm"
					className="w-full text-xs font-bold shadow-sm group"
					disabled={claimed}
					onClick={claimReward}
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
