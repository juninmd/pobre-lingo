import { BrainCircuit, CheckCircle2, HeartPulse, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const NEURO_TIPS = [
	{
		title: "Filtro Afetivo Baixo",
		advice: "Estudar quando você está relaxado melhora a retenção de memória em até 30%. Respire fundo antes da próxima lição.",
		xp: 15,
	},
	{
		title: "Aprendizado Espaçado",
		advice: "Seu cérebro precisa de pausas para consolidar memórias. A cada 20 minutos de estudo, descanse 5 minutos.",
		xp: 15,
	},
	{
		title: "Conexão Emocional",
		advice: "Palavras associadas a emoções ou experiências pessoais são armazenadas mais facilmente na memória de longo prazo.",
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
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-rose-50/70 to-orange-50/70 dark:from-rose-950/30 dark:to-orange-950/30 border-rose-200/50 dark:border-rose-800/50 shadow-lg hover:shadow-rose-500/10 relative overflow-hidden">
			<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-rose-700 dark:text-rose-400">
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
					<div className="p-4 bg-white/60 dark:bg-black/30 rounded-lg border border-rose-100 dark:border-rose-900 animate-in fade-in zoom-in duration-300">
						<h4 className="font-bold text-rose-900 dark:text-rose-300 mb-2 flex items-center gap-2">
							<HeartPulse className="w-4 h-4 text-rose-500" />
							{tip.title}
						</h4>
						<p className="text-sm text-foreground/80 leading-relaxed mb-3">
							"{tip.advice}"
						</p>
						<div className="bg-rose-100/50 dark:bg-rose-900/30 p-2 rounded text-center border border-rose-200 dark:border-rose-800">
							<span className="flex items-center justify-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold text-sm">
								<CheckCircle2 className="w-4 h-4" />
								Mente Otimizada! (+{tip.xp} XP)
							</span>
						</div>
					</div>
				) : (
					<div className="p-4 bg-white/40 dark:bg-black/20 rounded-lg border border-dashed border-rose-300 dark:border-rose-700 flex flex-col items-center text-center space-y-3">
						<BrainCircuit className="w-8 h-8 text-rose-400 dark:text-rose-600 mb-1" />
						<p className="text-sm font-medium text-rose-800 dark:text-rose-300">
							Respire fundo. Pronto para calibrar seu foco e reduzir o filtro afetivo?
						</p>
						<Button
							className="w-full gap-2 bg-rose-500 hover:bg-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]"
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
									<BrainCircuit className="w-4 h-4" /> Calibrar Foco (+{tip.xp} XP)
								</>
							)}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
