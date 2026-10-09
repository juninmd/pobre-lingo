import { Coins, Flame, GraduationCap, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { cn } from "@/lib/utils";

export function DashboardStats() {
	const { overallProgress } = useCurriculumProgress();
	const { gems } = useGamification();

	return (
		<>
			{/* 1. Statistics Summary Cards */}
			<section className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 md:grid-cols-4">
				<Card className="glass-card backdrop-blur-xl bg-gradient-to-br from-orange-50/90 to-red-50/50 dark:from-orange-950/40 dark:to-red-950/20 border-orange-200/80 dark:border-orange-800/60 shadow-lg shadow-orange-500/5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/30 active:scale-[0.98] touch-manipulation hover:animate-float group">
					<CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
						<div className="p-2 sm:p-2.5 bg-gradient-to-br from-orange-100 to-orange-200/80 dark:from-orange-900/60 dark:to-orange-800/50 rounded-xl sm:rounded-2xl shadow-sm border border-orange-200/50 dark:border-orange-800/50">
							<Flame
								className={cn(
									"w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-600 dark:text-orange-400 drop-shadow-sm",
									overallProgress.streak > 0 && "animate-bounce",
								)}
							/>
						</div>
						<div>
							<span className="text-2xl sm:text-3xl md:text-4xl font-extrabold block text-orange-600 dark:text-orange-400 bg-gradient-to-br from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text [.bg-clip-text_&]:text-transparent drop-shadow-sm">
								{overallProgress.streak}
							</span>
							<span className="text-[0.625rem] sm:text-xs text-orange-800/90 dark:text-orange-200/90 uppercase font-black tracking-widest mt-0.5 block">
								Dias Seguidos
							</span>
						</div>
					</CardContent>
				</Card>

				<Card
					className="glass-card backdrop-blur-xl bg-gradient-to-br from-yellow-50/90 to-amber-50/50 dark:from-yellow-950/40 dark:to-amber-950/20 border-yellow-200/80 dark:border-yellow-800/60 shadow-lg shadow-yellow-500/5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-yellow-500/30 active:scale-[0.98] touch-manipulation hover:animate-float group"
					style={{ animationDelay: "0.2s" }}
				>
					<CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
						<div className="p-2 sm:p-2.5 bg-gradient-to-br from-yellow-100 to-yellow-200/80 dark:from-yellow-900/60 dark:to-yellow-800/50 rounded-xl sm:rounded-2xl shadow-sm border border-yellow-200/50 dark:border-yellow-800/50">
							<Coins className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-600 dark:text-yellow-400 fill-current drop-shadow-sm" />
						</div>
						<div>
							<span className="text-2xl sm:text-3xl md:text-4xl font-extrabold block text-yellow-600 dark:text-yellow-400 bg-gradient-to-br from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text [.bg-clip-text_&]:text-transparent tabular-nums drop-shadow-sm">
								{gems}
							</span>
							<span className="text-[0.625rem] sm:text-xs text-yellow-800/90 dark:text-yellow-200/90 uppercase font-black tracking-widest mt-0.5 block">
								PobreCoins
							</span>
						</div>
					</CardContent>
				</Card>

				<Card
					className="glass-card backdrop-blur-xl bg-gradient-to-br from-blue-50/90 to-indigo-50/50 dark:from-blue-950/40 dark:to-indigo-950/20 border-blue-200/80 dark:border-blue-800/60 shadow-lg shadow-blue-500/5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/30 active:scale-[0.98] touch-manipulation hover:animate-float group"
					style={{ animationDelay: "0.4s" }}
				>
					<CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
						<div className="p-2 sm:p-2.5 bg-gradient-to-br from-blue-100 to-blue-200/80 dark:from-blue-900/60 dark:to-blue-800/50 rounded-xl sm:rounded-2xl shadow-sm border border-blue-200/50 dark:border-blue-800/50">
							<GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600 dark:text-blue-400 drop-shadow-sm" />
						</div>
						<div>
							<span className="text-2xl sm:text-3xl md:text-4xl font-extrabold block text-blue-600 dark:text-blue-400 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text [.bg-clip-text_&]:text-transparent tabular-nums drop-shadow-sm">
								{overallProgress.userLevel}
							</span>
							<span className="text-[0.625rem] sm:text-xs text-blue-800/90 dark:text-blue-200/90 uppercase font-black tracking-widest mt-0.5 block">
								Nível
							</span>
						</div>
					</CardContent>
				</Card>

				<Card
					className="glass-card backdrop-blur-xl bg-gradient-to-br from-green-50/90 to-emerald-50/50 dark:from-green-950/40 dark:to-emerald-950/20 border-green-200/80 dark:border-green-800/60 shadow-lg shadow-green-500/5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-500/30 active:scale-[0.98] touch-manipulation hover:animate-float group"
					style={{ animationDelay: "0.6s" }}
				>
					<CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
						<div className="p-2 sm:p-2.5 bg-gradient-to-br from-green-100 to-green-200/80 dark:from-green-900/60 dark:to-green-800/50 rounded-xl sm:rounded-2xl shadow-sm border border-green-200/50 dark:border-green-800/50">
							<Trophy className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600 dark:text-green-400 drop-shadow-sm" />
						</div>
						<div>
							<span className="text-2xl sm:text-3xl md:text-4xl font-extrabold block text-green-600 dark:text-green-400 bg-gradient-to-br from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text [.bg-clip-text_&]:text-transparent tabular-nums drop-shadow-sm">
								{overallProgress.overallPercentage}%
							</span>
							<span className="text-[0.625rem] sm:text-xs text-green-800/90 dark:text-green-200/90 uppercase font-black tracking-widest mt-0.5 block">
								Completo
							</span>
						</div>
					</CardContent>
				</Card>
			</section>
		</>
	);
}
