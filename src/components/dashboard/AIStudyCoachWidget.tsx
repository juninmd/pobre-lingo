import { Brain, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { localDay } from "@/lib/localDay";

const COACHING_TIPS = [
	{
		title: "Foco em Vocabulário",
		advice:
			"Para reter melhor o vocabulário, tente usar a nova palavra em 3 frases diferentes hoje, em vez de apenas decorá-la.",
		xp: 15,
	},
	{
		title: "Prática Distribuída",
		advice:
			"Estudar 15 minutos todos os dias é muito mais eficaz do que estudar 2 horas de uma vez só no domingo.",
		xp: 15,
	},
	{
		title: "Consumo Ativo",
		advice:
			"Ao assistir a um filme em inglês, pause e repita as frases que você achou interessantes em voz alta.",
		xp: 15,
	},
];

export function AIStudyCoachWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [tip, setTip] = useState(COACHING_TIPS[0]);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setTip(COACHING_TIPS[dayOfYear % COACHING_TIPS.length]);

		const todayStr = localDay();
		setClaimed(localStorage.getItem("daily_ai_coach_claimed") === todayStr);
	}, []);

	const handleRequestAdvice = () => {
		if (claimed) return;
		setIsAnalyzing(true);
		setTimeout(() => {
			setIsAnalyzing(false);
			setClaimed(true);
			addXp(tip.xp);
			const todayStr = localDay();
			localStorage.setItem("daily_ai_coach_claimed", todayStr);
		}, 1500); // Simulate AI thinking
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-violet-50/70 to-fuchsia-50/70 dark:from-violet-950/30 dark:to-fuchsia-950/30 border-violet-200/50 dark:border-violet-800/50 shadow-lg hover:shadow-violet-500/10">
			<CardHeader className="pb-2 flex flex-row items-start justify-between">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-violet-700 dark:text-violet-400">
						<Brain className="w-5 h-5" />
						<span>AI Study Coach</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm font-medium text-muted-foreground">
					Pedagogia estruturada com IA. Receba feedback e planos de estudo.
				</div>

				{claimed ? (
					<div className="p-4 bg-white/60 dark:bg-black/30 rounded-lg border border-violet-100 dark:border-violet-900 animate-in fade-in zoom-in duration-300">
						<h4 className="font-bold text-violet-900 dark:text-violet-300 mb-2 flex items-center gap-2">
							<MessageCircle className="w-4 h-4 text-violet-500" />
							{tip.title}
						</h4>
						<p className="text-sm text-foreground/80 leading-relaxed mb-3">
							"{tip.advice}"
						</p>
						<div className="bg-violet-100/50 dark:bg-violet-900/30 p-2 rounded text-center border border-violet-200 dark:border-violet-800">
							<span className="flex items-center justify-center gap-1.5 text-violet-700 dark:text-violet-400 font-bold text-sm">
								<CheckCircle2 className="w-4 h-4" />
								Dica do Coach Lida! (+{tip.xp} XP)
							</span>
						</div>
					</div>
				) : (
					<div className="p-4 bg-white/40 dark:bg-black/20 rounded-lg border border-dashed border-violet-300 dark:border-violet-700 flex flex-col items-center text-center space-y-3">
						<Brain className="w-8 h-8 text-violet-400 dark:text-violet-600 mb-1" />
						<p className="text-sm font-medium text-violet-800 dark:text-violet-300">
							Pronto para analisar seu progresso e gerar uma dica de estudo
							personalizada.
						</p>
						<Button
							className="w-full gap-2 bg-violet-600 hover:bg-violet-700 text-white"
							onClick={handleRequestAdvice}
							disabled={isAnalyzing}
						>
							{isAnalyzing ? (
								<span className="flex items-center gap-1.5 animate-pulse">
									<Brain className="w-4 h-4 animate-spin" /> Analisando
									Perfil...
								</span>
							) : (
								<>
									<Sparkles className="w-4 h-4" /> Gerar Dica Diária (+{tip.xp}{" "}
									XP)
								</>
							)}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
