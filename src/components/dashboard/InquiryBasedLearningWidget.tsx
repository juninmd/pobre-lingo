import {
	CheckCircle2,
	FlaskConical,
	HelpCircle,
	Search,
	Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const INQUIRY_PROMPTS = [
	{
		title: "Mistério Gramatical",
		prompt:
			"Por que dizemos 'I am listening TO music' mas apenas 'I am hearing music'? Investigue a diferença entre Hear e Listen.",
		xp: 20,
	},
	{
		title: "Origem das Palavras",
		prompt:
			"Você sabia que a palavra 'Sandwich' tem uma origem curiosa? Pesquise de onde ela vem e conte para alguém.",
		xp: 15,
	},
	{
		title: "Gírias Locais",
		prompt:
			"O que significa 'It is raining cats and dogs'? Descubra a origem dessa expressão idiomática.",
		xp: 15,
	},
];

export function InquiryBasedLearningWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [prompt, setPrompt] = useState(INQUIRY_PROMPTS[0]);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setPrompt(INQUIRY_PROMPTS[dayOfYear % INQUIRY_PROMPTS.length]);

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_inquiry_claimed") === todayStr);
	}, []);

	const handleCompleteInvestigation = () => {
		if (claimed) return;
		setClaimed(true);
		addXp(prompt.xp);
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_inquiry_claimed", todayStr);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-cyan-50/70 to-blue-50/70 dark:from-cyan-950/30 dark:to-blue-950/30 border-cyan-200/50 dark:border-cyan-800/50 shadow-lg hover:shadow-cyan-500/10">
			<CardHeader className="pb-2 flex flex-row items-start justify-between">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
						<Search className="w-5 h-5" />
						<span>Inquiry-Based Learning</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm font-medium text-muted-foreground">
					Seja curioso! Investigue e descubra como o idioma funciona.
				</div>

				{claimed ? (
					<div className="p-4 bg-white/60 dark:bg-black/30 rounded-lg border border-cyan-100 dark:border-cyan-900 animate-in fade-in zoom-in duration-300">
						<h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-2 flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 text-cyan-500" />
							{prompt.title}
						</h4>
						<p className="text-sm text-foreground/80 leading-relaxed mb-3">
							Investigação concluída com sucesso!
						</p>
						<div className="bg-cyan-100/50 dark:bg-cyan-900/30 p-2 rounded text-center border border-cyan-200 dark:border-cyan-800">
							<span className="flex items-center justify-center gap-1.5 text-cyan-700 dark:text-cyan-400 font-bold text-sm">
								<Sparkles className="w-4 h-4" />
								Descoberta Feita (+{prompt.xp} XP)
							</span>
						</div>
					</div>
				) : (
					<div className="p-4 bg-white/40 dark:bg-black/20 rounded-lg border border-dashed border-cyan-300 dark:border-cyan-700 flex flex-col items-center text-center space-y-3">
						<HelpCircle className="w-8 h-8 text-cyan-400 dark:text-cyan-600 mb-1" />
						<h4 className="font-bold text-cyan-900 dark:text-cyan-300">
							{prompt.title}
						</h4>
						<p className="text-sm font-medium text-cyan-800 dark:text-cyan-300">
							{prompt.prompt}
						</p>
						<Button
							className="w-full gap-2 bg-cyan-600 hover:bg-cyan-700 text-white"
							onClick={handleCompleteInvestigation}
						>
							<CheckCircle2 className="w-4 h-4" /> Concluir Investigação (+
							{prompt.xp} XP)
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
