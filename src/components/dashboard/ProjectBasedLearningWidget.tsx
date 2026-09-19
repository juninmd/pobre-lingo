import { Briefcase, CheckCircle2, FolderKanban } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

/**
 * ProjectBasedLearningWidget component
 * Promotes Project-Based Learning methodology by simulating an ongoing English project.
 */
export function ProjectBasedLearningWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const todayStr = new Date().toISOString().split("T")[0];
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
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_pbl_claimed", todayStr);
		}, 1000);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-primary/10 to-brand-violet/10 dark:from-primary/30 dark:to-brand-violet/30 border-primary/20 dark:border-primary/50 shadow-lg hover:shadow-primary/10 relative overflow-hidden">
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-primary/15 text-primary dark:bg-primary/60 border-none font-bold"
					>
						<Briefcase className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
						<FolderKanban className="w-4 h-4" />
						Project-Based Learning
					</CardTitle>
				</div>
				<span className="text-[10px] uppercase font-bold tracking-widest text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
					Metodologia Ativa
				</span>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="flex justify-between items-center mb-1">
						<h4 className="font-bold text-primary text-base">
							Pitch de Startup
						</h4>
					</div>

					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-primary/15 dark:border-primary/50 text-sm mb-3">
						<p className="text-muted-foreground">
							Trabalhe no projeto de hoje: Grave um áudio simulando o pitch da
							sua nova ideia em inglês.
						</p>
					</div>

					<Button
						variant={claimed ? "secondary" : "gamified"}
						size="sm"
						className={`w-full font-bold shadow-sm ${!claimed ? "bg-primary/90 hover:bg-primary/80 text-white" : ""}`}
						disabled={claimed || isSubmitting}
						onClick={handleAction}
					>
						{isSubmitting ? (
							<span className="flex items-center gap-1.5 animate-pulse">
								Trabalhando...
							</span>
						) : claimed ? (
							<span className="flex items-center gap-1.5 text-primary">
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
