import { Coins, Lightbulb, RefreshCw } from "lucide-react";
import { useState } from "react";
import { CalmPracticeCard } from "@/components/dashboard/CalmPracticeCard";
import { CertificationPlanCard } from "@/components/dashboard/CertificationPlanCard";
import { DailyQuestsWidget } from "@/components/dashboard/DailyQuestsWidget";
import { SmartReviewWidget } from "@/components/dashboard/SmartReviewWidget";
import { WeeklyGoalWidget } from "@/components/dashboard/WeeklyGoalWidget";
import { WordOfTheDayWidget } from "@/components/dashboard/WordOfTheDayWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { localDay } from "@/lib/localDay";
import { TIPS } from "@/lib/tips";

export function RightColumnWidgets() {
	const { addGem } = useGamification();

	const [currentTip, setCurrentTip] = useState(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		return TIPS[dayOfYear % TIPS.length];
	});

	const [claimedTipReward, setClaimedTipReward] = useState(() => {
		const todayStr = localDay();
		return localStorage.getItem("daily_tip_reward_claimed") === todayStr;
	});

	const refreshTip = () => {
		const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
		setCurrentTip(randomTip);
	};

	const claimTipReward = () => {
		if (!claimedTipReward) {
			addGem(5);
			setClaimedTipReward(true);
			const todayStr = localDay();
			localStorage.setItem("daily_tip_reward_claimed", todayStr);
		}
	};

	return (
		<>
			{/* Right Column: Quests & Tips */}
			<div className="space-y-3 sm:space-y-4 md:space-y-6">
				{/* Smart Review */}
				<SmartReviewWidget />

				{/* Daily Quests */}
				<DailyQuestsWidget />

				{/* Weekly Goal */}
				<WeeklyGoalWidget />

				{/* Word of the Day - Microlearning */}
				<WordOfTheDayWidget />
				<CalmPracticeCard />

				<details className="group rounded-xl border border-border/50 p-3">
					<summary className="cursor-pointer text-sm font-semibold text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary">
						Explorar mais
					</summary>
					<div className="mt-3 space-y-3 sm:space-y-4">
						<CertificationPlanCard />
					</div>
				</details>

				{/* Tip of the Day */}
				<Card className="glass-card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 border-l-4 border-l-primary hover:shadow-xl hover:shadow-primary/10 transition-all hover:-translate-y-1 duration-300 backdrop-blur-xl relative overflow-hidden group">
					<div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
					<CardHeader className="pb-2 sm:pb-3 flex flex-row items-center justify-between space-y-0 relative z-10">
						<CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-2 text-primary font-bold">
							<Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
							<span>Dica do Dia</span>
						</CardTitle>
						<Button
							variant="ghost"
							size="icon"
							aria-label="Nova dica"
							className="h-8 w-8 sm:h-9 sm:w-9 text-primary/70 hover:text-primary active:scale-95 transition-transform"
							onClick={refreshTip}
						>
							<RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
						</Button>
					</CardHeader>
					<CardContent className="pt-0 space-y-4 relative z-10">
						<p
							className="text-xs sm:text-sm italic text-foreground font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-500"
							key={currentTip}
						>
							"{currentTip}"
						</p>
						<Button
							variant={claimedTipReward ? "secondary" : "gamified"}
							size="sm"
							className="w-full text-xs font-bold shadow-sm"
							disabled={claimedTipReward}
							onClick={claimTipReward}
						>
							{claimedTipReward ? (
								<>Resgatado!</>
							) : (
								<span className="flex items-center gap-1.5">
									Entendi! (+5 <Coins className="w-3.5 h-3.5" />)
								</span>
							)}
						</Button>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
