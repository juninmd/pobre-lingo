import { CheckCircle2, Gift, Target, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

export function CommunityChallengeWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(
			localStorage.getItem("daily_community_challenge_claimed") === todayStr,
		);
		// Simulate dynamic community progress
		setProgress(75 + Math.floor(Math.random() * 20));
	}, []);

	const participate = () => {
		if (!claimed) {
			addXp(20);
			setClaimed(true);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_community_challenge_claimed", todayStr);
		}
	};

	return (
		<Card
			className="glass-card hover:animate-float group bg-gradient-to-br from-primary/10 to-primary/10 dark:from-primary/30 dark:to-primary/30 border-primary/20 dark:border-primary/50 shadow-lg hover:shadow-primary/10 relative overflow-hidden"
			style={{ animationDelay: "0.1s" }}
		>
			<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
					<Users className="w-4 h-4" />
					Social Learning
				</CardTitle>
				<span className="text-[10px] uppercase font-bold tracking-widest text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
					Trend 2025
				</span>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="flex justify-between items-center mb-2">
						<h4 className="font-bold text-primary text-base flex items-center gap-1.5">
							<Target className="w-4 h-4 text-primary" /> Meta Global: 50k
							Lições
						</h4>
					</div>

					<div className="text-sm text-primary/80 mb-3">
						Ajude a comunidade a atingir a meta diária e ganhe recompensas
						exclusivas juntos!
					</div>

					<div className="space-y-1 mb-4">
						<div className="flex justify-between text-xs font-semibold text-primary">
							<span>Progresso: {progress}%</span>
							<span>Faltam {(100 - progress) * 500}</span>
						</div>
						<div className="h-2.5 bg-primary/15 dark:bg-primary/50 rounded-full overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-primary to-primary rounded-full transition-all duration-1000 ease-out"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>

					<Button
						variant={claimed ? "secondary" : "gamified"}
						size="sm"
						className="w-full font-bold shadow-sm"
						disabled={claimed}
						onClick={participate}
					>
						{claimed ? (
							<span className="flex items-center gap-1.5 text-primary">
								<CheckCircle2 className="w-4 h-4" />
								Participou!
							</span>
						) : (
							<span className="flex items-center gap-1.5">
								<Gift className="w-4 h-4" />
								Contribuir! (+20 XP)
							</span>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
