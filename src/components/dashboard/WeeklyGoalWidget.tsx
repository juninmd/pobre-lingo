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
		<Card className="glass-card bg-gradient-to-br from-teal-50/50 to-emerald-50/50 dark:from-teal-950/20 dark:to-emerald-950/20 border-teal-200/50 dark:border-teal-800/50">
			<CardHeader className="pb-2 flex flex-row items-center justify-between">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-teal-700 dark:text-teal-400">
					<Calendar className="w-4 h-4" />
					Meta Semanal
				</CardTitle>
				{isCompleted && (
					<div className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-1 rounded-full">
						<Check className="w-3.5 h-3.5" />
					</div>
				)}
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-between items-end mb-1">
					<div className="space-y-1">
						<p className="text-2xl font-black text-teal-900 dark:text-teal-300">
							{weeklyCount}{" "}
							<span className="text-sm font-semibold text-teal-600/70 dark:text-teal-400/70">
								/ {WEEKLY_GOAL}
							</span>
						</p>
						<p className="text-xs font-medium text-teal-700/80 dark:text-teal-400/80">
							Lições concluídas nesta semana
						</p>
					</div>
					<TrendingUp
						className={`w-8 h-8 ${isCompleted ? "text-emerald-500" : "text-teal-400"} opacity-50`}
					/>
				</div>

				<div className="space-y-1.5">
					<Progress
						value={progressPct}
						className="h-2.5 bg-teal-100 dark:bg-teal-950"
					/>
					<div className="flex justify-between text-[11px] uppercase font-bold tracking-wider text-teal-600/60 dark:text-teal-400/60">
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
									className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
										idx === currentDay
											? "bg-teal-500 text-white shadow-md ring-2 ring-teal-200 dark:ring-teal-800"
											: idx < currentDay
												? "bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400"
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
