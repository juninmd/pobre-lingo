import {
	ArrowRightLeft,
	CheckCircle2,
	Languages,
	Lightbulb,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const TRANSLANGUAGING_TOPICS = [
	{
		title: "False Friends",
		pt: "Atualmente",
		en: "Actually",
		explanation:
			"Cuidado! 'Actually' não significa 'Atualmente', mas sim 'Na verdade'. Para dizer 'Atualmente', use 'Currently' ou 'Nowadays'.",
		xp: 15,
	},
	{
		title: "Idioms Bridge",
		pt: "Chutar o balde",
		en: "To throw in the towel",
		explanation:
			"Embora a tradução literal seja diferente, ambas as expressões são usadas para indicar que alguém desistiu de algo.",
		xp: 15,
	},
	{
		title: "Structural Difference",
		pt: "Eu tenho 20 anos.",
		en: "I am 20 years old.",
		explanation:
			"Em português, nós 'temos' (have) idade. Em inglês, nós 'somos' (are) a idade. O verbo to be é usado para idade.",
		xp: 15,
	},
];

export function TranslanguagingWidget() {
	const { addXp } = useGamification();
	const [topic, setTopic] = useState(TRANSLANGUAGING_TOPICS[0]);
	const [claimed, setClaimed] = useState(false);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setTopic(TRANSLANGUAGING_TOPICS[dayOfYear % TRANSLANGUAGING_TOPICS.length]);

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(
			localStorage.getItem("daily_translanguaging_claimed") === todayStr,
		);
	}, []);

	const handleAcknowledge = () => {
		if (claimed) return;

		addXp(topic.xp);
		setClaimed(true);
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_translanguaging_claimed", todayStr);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden">
			<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 border-none font-bold"
					>
						<Languages className="w-3 h-3 mr-1 inline" /> Translanguaging
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
						<ArrowRightLeft className="w-5 h-5" />
						<span>{topic.title}</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50 text-sm mb-3">
						<div className="flex justify-between items-center mb-2">
							<span className="font-bold text-slate-700 dark:text-slate-300">
								🇧🇷 PT:
							</span>
							<span className="text-slate-600 dark:text-slate-400 font-medium">
								{topic.pt}
							</span>
						</div>
						<div className="flex justify-between items-center border-t border-indigo-100 dark:border-indigo-900/50 pt-2">
							<span className="font-bold text-indigo-700 dark:text-indigo-400">
								🇺🇸 EN:
							</span>
							<span className="text-indigo-700 dark:text-indigo-400 font-bold">
								{topic.en}
							</span>
						</div>
					</div>

					{claimed ? (
						<div className="space-y-3">
							<div className="bg-indigo-100/50 dark:bg-indigo-900/30 p-3 rounded border border-indigo-200 dark:border-indigo-800 animate-in fade-in zoom-in duration-300">
								<p className="text-sm text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
									<Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
									<span>{topic.explanation}</span>
								</p>
							</div>
							<div className="bg-indigo-100/30 dark:bg-indigo-900/20 p-2 rounded border border-indigo-200/50 dark:border-indigo-800/50 text-center animate-in fade-in slide-in-from-top-2 duration-300">
								<span className="flex items-center justify-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
									<CheckCircle2 className="w-4 h-4" />
									Conexão Feita! (+{topic.xp} XP)
								</span>
							</div>
						</div>
					) : (
						<Button
							variant="gamified"
							className="w-full font-bold shadow-sm"
							onClick={handleAcknowledge}
						>
							Revelar Conexão (+{topic.xp} XP)
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
