import { Coins, Lightbulb, RefreshCw } from "lucide-react";
import { useState } from "react";
import { CertificationPlanCard } from "@/components/dashboard/CertificationPlanCard";
import { DailyQuestsWidget } from "@/components/dashboard/DailyQuestsWidget";
import { MindfulWidget } from "@/components/dashboard/MindfulWidget";
import { SmartReviewWidget } from "@/components/dashboard/SmartReviewWidget";
import { WeeklyGoalWidget } from "@/components/dashboard/WeeklyGoalWidget";
import { WordOfTheDayWidget } from "@/components/dashboard/WordOfTheDayWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
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
		const todayStr = new Date().toISOString().split("T")[0];
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
			const todayStr = new Date().toISOString().split("T")[0];
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

				{/* Mindful Learning - Well-being */}
				<MindfulWidget />

				<CertificationPlanCard />

				{/* Tip of the Day */}
				<Card className="glass-card bg-primary/5 border-primary/20 border-l-4 border-l-primary hover:shadow-lg transition-all hover:-translate-y-1 duration-300 sticky top-20 sm:top-24">
					<CardHeader className="pb-2 sm:pb-3 flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-2 text-primary">
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
					<CardContent className="pt-0 space-y-4">
						<p
							className="text-xs sm:text-sm italic text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-500"
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
