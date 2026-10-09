import { BookOpen, CheckCircle2, Globe, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { localDay } from "@/lib/localDay";

const CLIL_TOPICS = [
	{
		subject: "Science",
		title: "The Water Cycle",
		text: "Water on Earth is always moving. The sun heats water in oceans and lakes, causing it to evaporate into the air as water vapor. As it rises, it cools and condenses into clouds.",
		question: "What causes water to evaporate?",
		options: [
			{ text: "The moon", correct: false },
			{ text: "The sun", correct: true },
			{ text: "The wind", correct: false },
		],
		xp: 15,
	},
	{
		subject: "History",
		title: "The Pyramids of Giza",
		text: "The Great Pyramid of Giza is the oldest and largest of the three pyramids in Giza, Egypt. It was built as a tomb for the Pharaoh Khufu and took about 20 years to construct.",
		question: "What was the purpose of the Great Pyramid?",
		options: [
			{ text: "A temple", correct: false },
			{ text: "A palace", correct: false },
			{ text: "A tomb", correct: true },
		],
		xp: 15,
	},
	{
		subject: "Technology",
		title: "Artificial Intelligence",
		text: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines. These machines are programmed to think and learn like humans, solving complex problems.",
		question: "What do AI machines simulate?",
		options: [
			{ text: "Human intelligence", correct: true },
			{ text: "Animal behavior", correct: false },
			{ text: "Physical strength", correct: false },
		],
		xp: 15,
	},
];

export function CLILWidget() {
	const { addXp } = useGamification();
	const [topic, setTopic] = useState(CLIL_TOPICS[0]);
	const [claimed, setClaimed] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setTopic(CLIL_TOPICS[dayOfYear % CLIL_TOPICS.length]);

		const todayStr = localDay();
		setClaimed(localStorage.getItem("daily_clil_claimed") === todayStr);
	}, []);

	const handleAnswer = (index: number, isCorrect: boolean) => {
		if (claimed || selectedAnswer !== null) return;

		setSelectedAnswer(index);

		if (isCorrect) {
			addXp(topic.xp);
			setClaimed(true);
			const todayStr = localDay();
			localStorage.setItem("daily_clil_claimed", todayStr);
		}
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-orange-50/70 to-amber-50/70 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200/50 dark:border-orange-800/50 shadow-lg hover:shadow-orange-500/10 relative overflow-hidden">
			<div className="absolute -left-4 -bottom-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-none font-bold"
					>
						<Globe className="w-3 h-3 mr-1 inline" /> CLIL Method
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-orange-700 dark:text-orange-400">
						<BookOpen className="w-5 h-5" />
						<span>{topic.subject}</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<h4 className="font-bold text-orange-900 dark:text-orange-300 text-base mb-1">
						{topic.title}
					</h4>
					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-orange-100 dark:border-orange-900/50 text-sm mb-3">
						<p className="text-muted-foreground leading-relaxed mb-3">
							{topic.text}
						</p>
						<p className="font-semibold text-foreground flex items-start gap-2 border-t border-orange-100 dark:border-orange-900/50 pt-3">
							<Lightbulb className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
							<span>{topic.question}</span>
						</p>
					</div>

					<div className="space-y-2">
						{topic.options.map((opt, idx) => {
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
											? "border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/30"
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
						<div className="mt-3 bg-orange-100/50 dark:bg-orange-900/30 p-2 rounded border border-orange-200 dark:border-orange-800 text-center animate-in fade-in slide-in-from-top-2 duration-300">
							<span className="flex items-center justify-center gap-1.5 text-orange-700 dark:text-orange-400 font-bold text-sm">
								<CheckCircle2 className="w-4 h-4" />
								Desafio Concluído! (+{topic.xp} XP)
							</span>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
