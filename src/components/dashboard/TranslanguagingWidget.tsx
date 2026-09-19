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
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-primary/10 to-brand-violet/10 dark:from-primary/30 dark:to-brand-violet/30 border-primary/20 dark:border-brand-violet/50 shadow-lg hover:shadow-primary/10 relative overflow-hidden">
			<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-primary/15 text-primary dark:bg-primary/60 border-none font-bold"
					>
						<Languages className="w-3 h-3 mr-1 inline" /> Translanguaging
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-primary">
						<ArrowRightLeft className="w-5 h-5" />
						<span>{topic.title}</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-primary/15 dark:border-primary/50 text-sm mb-3">
						<div className="flex justify-between items-center mb-2">
							<span className="font-bold text-muted-foreground">🇧🇷 PT:</span>
							<span className="text-muted-foreground font-medium">
								{topic.pt}
							</span>
						</div>
						<div className="flex justify-between items-center border-t border-primary/15 dark:border-primary/50 pt-2">
							<span className="font-bold text-primary">🇺🇸 EN:</span>
							<span className="text-primary font-bold">{topic.en}</span>
						</div>
					</div>

					{claimed ? (
						<div className="space-y-3">
							<div className="bg-primary/15 dark:bg-primary/30 p-3 rounded border border-primary/20 dark:border-primary/70 animate-in fade-in zoom-in duration-300">
								<p className="text-sm text-primary flex items-start gap-2">
									<Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
									<span>{topic.explanation}</span>
								</p>
							</div>
							<div className="bg-primary/15 dark:bg-primary/20 p-2 rounded border border-primary/20 dark:border-primary/50 text-center animate-in fade-in slide-in-from-top-2 duration-300">
								<span className="flex items-center justify-center gap-1.5 text-primary font-bold text-sm">
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
