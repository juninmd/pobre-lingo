import { CheckCircle2, Globe2, Languages, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const PLURI_TIPS = [
	{
		title: "Abraçando seu Sotaque",
		advice: "No plurilinguismo, seu sotaque é parte da sua identidade. Foco na clareza (inteligibilidade), não em soar como um nativo.",
		xp: 15,
	},
	{
		title: "Tradução Mental é Normal",
		advice: "Não tenha medo de comparar o inglês com o português ou outras línguas que você conhece. Seu repertório linguístico é uma vantagem, não um obstáculo.",
		xp: 15,
	},
	{
		title: "Comunicação Global",
		advice: "O inglês é uma língua global. Você se comunicará com pessoas de diversas culturas. A empatia e a adaptação superam a gramática perfeita.",
		xp: 15,
	},
];

export function PlurilingualismWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isReflecting, setIsReflecting] = useState(false);
	const [tip, setTip] = useState(PLURI_TIPS[0]);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setTip(PLURI_TIPS[dayOfYear % PLURI_TIPS.length]);

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_pluri_claimed") === todayStr);
	}, []);

	const handleReflect = () => {
		if (claimed) return;
		setIsReflecting(true);
		setTimeout(() => {
			setIsReflecting(false);
			setClaimed(true);
			addXp(tip.xp);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_pluri_claimed", todayStr);
		}, 2000); // Simulate reflection
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 dark:border-blue-800/50 shadow-lg hover:shadow-blue-500/10 relative overflow-hidden">
			<div className="absolute -left-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-400">
						<Globe2 className="w-5 h-5" />
						<span>Plurilinguismo</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div className="text-sm font-medium text-muted-foreground">
					Seu repertório linguístico é sua maior força.
				</div>

				{claimed ? (
					<div className="p-4 bg-white/60 dark:bg-black/30 rounded-lg border border-blue-100 dark:border-blue-900 animate-in fade-in zoom-in duration-300">
						<h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
							<Languages className="w-4 h-4 text-blue-500" />
							{tip.title}
						</h4>
						<p className="text-sm text-foreground/80 leading-relaxed mb-3">
							"{tip.advice}"
						</p>
						<div className="bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded text-center border border-blue-200 dark:border-blue-800">
							<span className="flex items-center justify-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold text-sm">
								<CheckCircle2 className="w-4 h-4" />
								Reflexão Concluída! (+{tip.xp} XP)
							</span>
						</div>
					</div>
				) : (
					<div className="p-4 bg-white/40 dark:bg-black/20 rounded-lg border border-dashed border-blue-300 dark:border-blue-700 flex flex-col items-center text-center space-y-3">
						<Globe2 className="w-8 h-8 text-blue-400 dark:text-blue-600 mb-1" />
						<p className="text-sm font-medium text-blue-800 dark:text-blue-300">
							Pronto para quebrar mitos sobre fluência e abraçar sua identidade global?
						</p>
						<Button
							className="w-full gap-2 bg-blue-500 hover:bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
							onClick={handleReflect}
							disabled={isReflecting}
						>
							{isReflecting ? (
								<span className="flex items-center gap-1.5 animate-pulse">
									<Languages className="w-4 h-4 animate-bounce" /> Refletindo...
								</span>
							) : (
								<>
									<Globe2 className="w-4 h-4" /> Refletir (+{tip.xp} XP)
								</>
							)}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
