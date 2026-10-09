import { Briefcase, CheckCircle2, FolderKanban } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { localDay } from "@/lib/localDay";

/**
 * ProjectBasedLearningWidget component
 * Promotes Project-Based Learning methodology by simulating an ongoing English project.
 */
export function ProjectBasedLearningWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const todayStr = localDay();
		setClaimed(localStorage.getItem("daily_pbl_claimed") === todayStr);
	}, []);

	const handleAction = () => {
		if (claimed) return;
		setIsSubmitting(true);

		// Simulate working on the project
		setTimeout(() => {
			setIsSubmitting(false);
			setClaimed(true);
			addXp(40);
			const todayStr = localDay();
			localStorage.setItem("daily_pbl_claimed", todayStr);
		}, 1000);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-indigo-50/70 to-violet-50/70 dark:from-indigo-950/30 dark:to-violet-950/30 border-indigo-200/50 dark:border-indigo-800/50 shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden">
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 border-none font-bold"
					>
						<Briefcase className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
						<FolderKanban className="w-4 h-4" />
						Project-Based Learning
					</CardTitle>
				</div>
				<span className="text-[11px] uppercase font-bold tracking-widest text-indigo-500/70 bg-indigo-500/10 px-2 py-0.5 rounded-full">
					Metodologia Ativa
				</span>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="flex justify-between items-center mb-1">
						<h4 className="font-bold text-indigo-900 dark:text-indigo-300 text-base">
							Pitch de Startup
						</h4>
					</div>

					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50 text-sm mb-3">
						<p className="text-muted-foreground">
							Trabalhe no projeto de hoje: Grave um áudio simulando o pitch da
							sua nova ideia em inglês.
						</p>
					</div>

					<Button
						variant={claimed ? "secondary" : "gamified"}
						size="sm"
						className={`w-full font-bold shadow-sm ${!claimed ? "bg-indigo-600 hover:bg-indigo-700 text-white" : ""}`}
						disabled={claimed || isSubmitting}
						onClick={handleAction}
					>
						{isSubmitting ? (
							<span className="flex items-center gap-1.5 animate-pulse">
								Trabalhando...
							</span>
						) : claimed ? (
							<span className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400">
								<CheckCircle2 className="w-4 h-4" />
								Entregue!
							</span>
						) : (
							<span className="flex items-center gap-1.5">
								Entregar Etapa (+40 XP)
							</span>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
