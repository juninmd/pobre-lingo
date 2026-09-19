import { Brain, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

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

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_ai_coach_claimed") === todayStr);
	}, []);

	const handleRequestAdvice = () => {
		if (claimed) return;
		setIsAnalyzing(true);
		setTimeout(() => {
			setIsAnalyzing(false);
			setClaimed(true);
			addXp(tip.xp);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_ai_coach_claimed", todayStr);
		}, 1500); // Simulate AI thinking
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-brand-violet/10 to-brand-violet/10 dark:from-brand-violet/30 dark:to-brand-violet/30 border-brand-violet/20 dark:border-brand-violet/50 shadow-lg hover:shadow-brand-violet/10">
			<CardHeader className="pb-2 flex flex-row items-start justify-between">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-brand-violet/15 text-brand-violet dark:bg-brand-violet/60 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-brand-violet">
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
					<div className="p-4 bg-white/60 dark:bg-black/30 rounded-lg border border-brand-violet/15 dark:border-brand-violet/60 animate-in fade-in zoom-in duration-300">
						<h4 className="font-bold text-brand-violet mb-2 flex items-center gap-2">
							<MessageCircle className="w-4 h-4 text-brand-violet" />
							{tip.title}
						</h4>
						<p className="text-sm text-foreground/80 leading-relaxed mb-3">
							"{tip.advice}"
						</p>
						<div className="bg-brand-violet/15 dark:bg-brand-violet/30 p-2 rounded text-center border border-brand-violet/20 dark:border-brand-violet/70">
							<span className="flex items-center justify-center gap-1.5 text-brand-violet font-bold text-sm">
								<CheckCircle2 className="w-4 h-4" />
								Dica do Coach Lida! (+{tip.xp} XP)
							</span>
						</div>
					</div>
				) : (
					<div className="p-4 bg-white/40 dark:bg-black/20 rounded-lg border border-dashed border-brand-violet/30 dark:border-brand-violet/80 flex flex-col items-center text-center space-y-3">
						<Brain className="w-8 h-8 text-brand-violet mb-1" />
						<p className="text-sm font-medium text-brand-violet">
							Pronto para analisar seu progresso e gerar uma dica de estudo
							personalizada.
						</p>
						<Button
							className="w-full gap-2 bg-brand-violet/90 hover:bg-brand-violet/80 text-white"
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
