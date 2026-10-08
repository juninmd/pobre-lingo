import { BarChart3, CheckCircle2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

/**
 * DataDrivenLearningWidget component
 * Introduces Data-Driven Learning (DDL) methodology by analyzing real-world usage patterns.
 */
export function DataDrivenLearningWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isAnalyzing, setIsAnalyzing] = useState(false);

	useEffect(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_ddl_claimed") === todayStr);
	}, []);

	const handleAction = () => {
		if (claimed) return;
		setIsAnalyzing(true);

		// Simulate analyzing corpus data
		setTimeout(() => {
			setIsAnalyzing(false);
			setClaimed(true);
			addXp(35);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_ddl_claimed", todayStr);
		}, 1000);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-cyan-50/70 to-blue-50/70 dark:from-cyan-950/30 dark:to-blue-950/30 border-cyan-200/50 dark:border-cyan-800/50 shadow-lg hover:shadow-cyan-500/10 relative overflow-hidden">
			<div className="absolute -left-4 -bottom-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 border-none font-bold"
					>
						<BarChart3 className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-sm font-bold flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
						<Search className="w-4 h-4" />
						Data-Driven Learning
					</CardTitle>
				</div>
				<span className="text-[11px] uppercase font-bold tracking-widest text-cyan-500/70 bg-cyan-500/10 px-2 py-0.5 rounded-full">
					Imersão Digital
				</span>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="flex justify-between items-center mb-1">
						<h4 className="font-bold text-cyan-900 dark:text-cyan-300 text-base">
							Análise de Corpus
						</h4>
					</div>

					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-cyan-100 dark:border-cyan-900/50 text-sm mb-3">
						<p className="text-muted-foreground">
							Descubra como falantes nativos usam a palavra "actually" em
							conversas reais, extraído de bancos de dados.
						</p>
					</div>

					<Button
						variant={claimed ? "secondary" : "gamified"}
						size="sm"
						className={`w-full font-bold shadow-sm ${!claimed ? "bg-cyan-600 hover:bg-cyan-700 text-white" : ""}`}
						disabled={claimed || isAnalyzing}
						onClick={handleAction}
					>
						{isAnalyzing ? (
							<span className="flex items-center gap-1.5 animate-pulse">
								Analisando...
							</span>
						) : claimed ? (
							<span className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400">
								<CheckCircle2 className="w-4 h-4" />
								Analisado!
							</span>
						) : (
							<span className="flex items-center gap-1.5">
								Analisar Padrões (+35 XP)
							</span>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
