import { BookOpen, CheckCircle2, Navigation, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { localDay } from "@/lib/localDay";

const TPRS_STORIES = [
	{
		title: "A Strange Morning",
		story:
			"John woke up at 7 AM. He went to the kitchen to make coffee, but there was no water. Then he looked out the window and saw a flying car.",
		question: "What happened after John couldn't make coffee?",
		options: [
			{ text: "He went back to sleep.", correct: false },
			{ text: "He saw a flying car.", correct: true },
			{ text: "He drank milk instead.", correct: false },
		],
		xp: 15,
	},
	{
		title: "The Missing Keys",
		story:
			"Maria was late for work. She looked for her car keys on the table, in her bag, and under the sofa. Finally, she found them in the refrigerator next to the milk.",
		question: "Where did Maria find her keys?",
		options: [
			{ text: "In her bag.", correct: false },
			{ text: "On the table.", correct: false },
			{ text: "In the refrigerator.", correct: true },
		],
		xp: 15,
	},
	{
		title: "A Hungry Dog",
		story:
			"Max is a very smart dog. One day, he was hungry but his owner was asleep. Max took his bowl in his mouth and dropped it on his owner's face.",
		question: "Why did Max drop his bowl on his owner's face?",
		options: [
			{ text: "Because he wanted to play.", correct: false },
			{ text: "Because he was hungry.", correct: true },
			{ text: "Because he was angry.", correct: false },
		],
		xp: 15,
	},
];

export function StorytellingWidget() {
	const { addXp } = useGamification();
	const [story, setStory] = useState(TPRS_STORIES[0]);
	const [claimed, setClaimed] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

	useEffect(() => {
		// Pick a story based on the day of the year
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setStory(TPRS_STORIES[dayOfYear % TPRS_STORIES.length]);

		// Check if claimed today
		const todayStr = localDay();
		setClaimed(localStorage.getItem("daily_storytelling_claimed") === todayStr);
	}, []);

	const handleAnswer = (index: number, isCorrect: boolean) => {
		if (claimed || selectedAnswer !== null) return;

		setSelectedAnswer(index);

		if (isCorrect) {
			addXp(story.xp);
			setClaimed(true);
			const todayStr = localDay();
			localStorage.setItem("daily_storytelling_claimed", todayStr);
		}
	};

	return (
		<Card className="glass-card bg-gradient-to-br from-pink-50/50 to-rose-50/50 dark:from-pink-950/20 dark:to-rose-950/20 border-pink-200/50 dark:border-pink-800/50 relative overflow-hidden">
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-pink-700 dark:text-pink-400">
					<BookOpen className="w-4 h-4" />
					História Interativa
				</CardTitle>
				<span className="text-[11px] uppercase font-bold tracking-widest text-pink-500/70 bg-pink-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
					<Target className="w-3 h-3" />
					TPRS
				</span>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<h4 className="font-bold text-pink-900 dark:text-pink-300 text-base mb-1">
						{story.title}
					</h4>
					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-pink-100 dark:border-pink-900/50 text-sm mb-3">
						<p className="text-muted-foreground italic mb-2 leading-relaxed">
							"{story.story}"
						</p>
						<p className="font-semibold text-foreground flex items-start gap-2">
							<Navigation className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
							<span>{story.question}</span>
						</p>
					</div>

					<div className="space-y-2">
						{story.options.map((opt, idx) => {
							const isSelected = selectedAnswer === idx;
							const isCorrect = opt.correct;
							const showCorrect = selectedAnswer !== null && isCorrect;
							const showIncorrect = isSelected && !isCorrect;

							let variant: "outline" | "default" | "destructive" | "gamified" =
								"outline";
							if (showCorrect) variant = "gamified";
							else if (showIncorrect) variant = "destructive";

							return (
								<Button
									key={idx}
									variant={variant}
									className={`w-full justify-start text-left font-medium ${
										variant === "outline"
											? "border-pink-200 text-pink-700 hover:bg-pink-50 dark:border-pink-800 dark:text-pink-400 dark:hover:bg-pink-900/30"
											: ""
									}`}
									disabled={selectedAnswer !== null}
									onClick={() => handleAnswer(idx, isCorrect)}
								>
									{opt.text}
									{showCorrect && (
										<CheckCircle2 className="w-4 h-4 ml-auto text-green-500" />
									)}
								</Button>
							);
						})}
					</div>

					{claimed && (
						<div className="mt-3 bg-pink-100/50 dark:bg-pink-900/30 p-2 rounded border border-pink-200 dark:border-pink-800 text-center animate-in fade-in slide-in-from-top-2 duration-300">
							<span className="flex items-center justify-center gap-1.5 text-pink-700 dark:text-pink-400 font-bold text-sm">
								<CheckCircle2 className="w-4 h-4" />
								História Concluída! (+{story.xp} XP)
							</span>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
