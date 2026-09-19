import { BrainCircuit, CheckCircle2, HeartPulse, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const NEURO_TIPS = [
	{
		title: "Filtro Afetivo Baixo",
		advice:
			"Estudar quando você está relaxado melhora a retenção de memória em até 30%. Respire fundo antes da próxima lição.",
		xp: 15,
	},
	{
		title: "Aprendizado Espaçado",
		advice:
			"Seu cérebro precisa de pausas para consolidar memórias. A cada 20 minutos de estudo, descanse 5 minutos.",
		xp: 15,
	},
	{
		title: "Conexão Emocional",
		advice:
			"Palavras associadas a emoções ou experiências pessoais são armazenadas mais facilmente na memória de longo prazo.",
		xp: 15,
	},
];

export function NeuroELTWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isCalibrating, setIsCalibrating] = useState(false);
	const [tip, setTip] = useState(NEURO_TIPS[0]);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setTip(NEURO_TIPS[dayOfYear % NEURO_TIPS.length]);

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_neuro_elt_claimed") === todayStr);
	}, []);

	const handleCalibrate = () => {
		if (claimed) return;
		setIsCalibrating(true);
		setTimeout(() => {
			setIsCalibrating(false);
			setClaimed(true);
			addXp(tip.xp);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_neuro_elt_claimed", todayStr);
		}, 2000); // Simulate calibration
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-destructive/10 to-brand-gold/10 dark:from-destructive/30 dark:to-brand-gold/30 border-destructive/20 dark:border-destructive/50 shadow-lg hover:shadow-destructive/10 relative overflow-hidden">
			<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-destructive/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-destructive/15 text-destructive dark:bg-destructive/60 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-destructive">
						<BrainCircuit className="w-5 h-5" />
						<span>Neuro ELT</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div className="text-sm font-medium text-muted-foreground">
					Otimize seu cérebro para aprender inglês usando a neurociência.
				</div>

				{claimed ? (
					<div className="p-4 bg-white/60 dark:bg-black/30 rounded-lg border border-destructive/15 dark:border-destructive/60 animate-in fade-in zoom-in duration-300">
						<h4 className="font-bold text-destructive mb-2 flex items-center gap-2">
							<HeartPulse className="w-4 h-4 text-destructive" />
							{tip.title}
						</h4>
						<p className="text-sm text-foreground/80 leading-relaxed mb-3">
							"{tip.advice}"
						</p>
						<div className="bg-destructive/15 dark:bg-destructive/30 p-2 rounded text-center border border-destructive/20 dark:border-destructive/70">
							<span className="flex items-center justify-center gap-1.5 text-destructive font-bold text-sm">
								<CheckCircle2 className="w-4 h-4" />
								Mente Otimizada! (+{tip.xp} XP)
							</span>
						</div>
					</div>
				) : (
					<div className="p-4 bg-white/40 dark:bg-black/20 rounded-lg border border-dashed border-destructive/30 dark:border-destructive/80 flex flex-col items-center text-center space-y-3">
						<BrainCircuit className="w-8 h-8 text-destructive mb-1" />
						<p className="text-sm font-medium text-destructive">
							Respire fundo. Pronto para calibrar seu foco e reduzir o filtro
							afetivo?
						</p>
						<Button
							className="w-full gap-2 bg-destructive hover:bg-destructive/90 text-white shadow-[0_0_15px_hsl(var(--destructive)_/_0.3)]"
							onClick={handleCalibrate}
							disabled={isCalibrating}
						>
							{isCalibrating ? (
								<span className="flex items-center gap-1.5 animate-pulse">
									<HeartPulse className="w-4 h-4 animate-ping" /> Calibrando
									Foco...
								</span>
							) : (
								<>
									<BrainCircuit className="w-4 h-4" /> Calibrar Foco (+{tip.xp}{" "}
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
