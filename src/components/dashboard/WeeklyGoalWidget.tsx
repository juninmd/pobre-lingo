import { Calendar, Check, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";

export function WeeklyGoalWidget() {
	const { completedLessons } = useCurriculumProgress();
	const [weeklyCount, setWeeklyCount] = useState(0);
	const WEEKLY_GOAL = 10;

	useEffect(() => {
		// Calculate lessons completed in the last 7 days
		const today = new Date();
		const sevenDaysAgo = new Date(today);
		sevenDaysAgo.setDate(today.getDate() - 7);

		const recentLessons = completedLessons.filter((l) => {
			if (!l.completedAt) return false;
			const completedDate = new Date(l.completedAt);
			return completedDate >= sevenDaysAgo && completedDate <= today;
		});

		setWeeklyCount(recentLessons.length);
	}, [completedLessons]);

	const progressPct = Math.min(
		Math.round((weeklyCount / WEEKLY_GOAL) * 100),
		100,
	);
	const isCompleted = weeklyCount >= WEEKLY_GOAL;

	// Get current day of week (0-6)
	const currentDay = new Date().getDay();
	const days = ["D", "S", "T", "Q", "Q", "S", "S"];

	return (
		<Card className="glass-card bg-gradient-to-br from-brand-aqua/10 to-brand-aqua/10 dark:from-brand-aqua/20 dark:to-brand-aqua/20 border-brand-aqua/20 dark:border-brand-aqua/50">
			<CardHeader className="pb-2 flex flex-row items-center justify-between">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-brand-aqua">
					<Calendar className="w-4 h-4" />
					Meta Semanal
				</CardTitle>
				{isCompleted && (
					<div className="bg-brand-aqua/20 text-brand-aqua p-1 rounded-full">
						<Check className="w-3.5 h-3.5" />
					</div>
				)}
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-between items-end mb-1">
					<div className="space-y-1">
						<p className="text-2xl font-black text-brand-aqua">
							{weeklyCount}{" "}
							<span className="text-sm font-semibold text-brand-aqua/70">
								/ {WEEKLY_GOAL}
							</span>
						</p>
						<p className="text-xs font-medium text-brand-aqua/80">
							Lições concluídas nesta semana
						</p>
					</div>
					<TrendingUp
						className={`w-8 h-8 ${isCompleted ? "text-brand-aqua" : "text-brand-aqua"} opacity-50`}
					/>
				</div>

				<div className="space-y-1.5">
					<Progress
						value={progressPct}
						className="h-2.5 bg-brand-aqua/15 dark:bg-brand-aqua/50"
					/>
					<div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-brand-aqua/60">
						<span>Progresso</span>
						<span>{progressPct}%</span>
					</div>
				</div>

				{/* Weekly mini calendar representation */}
				<div className="flex justify-between pt-2">
					{days.map((day, idx) => {
						const dayKey = `calendar-day-${idx}`;
						return (
							<div key={dayKey} className="flex flex-col items-center gap-1">
								<div
									className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
										idx === currentDay
											? "bg-brand-aqua text-white shadow-md ring-2 ring-brand-aqua/20 dark:ring-brand-aqua/70"
											: idx < currentDay
												? "bg-brand-aqua/15 dark:bg-brand-aqua/50 text-brand-aqua"
												: "bg-muted/50 text-muted-foreground"
									}`}
								>
									{day}
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
