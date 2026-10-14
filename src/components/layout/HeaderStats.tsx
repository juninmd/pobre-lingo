import { Coins, GraduationCap } from "lucide-react";

interface HeaderStatsProps {
	gems: number;
	userLevel: number;
}
export function HeaderStats({ gems, userLevel }: HeaderStatsProps) {
	return (
		<>
			{/* Gamification Stats */}
			<div className="flex items-center gap-3 sm:gap-4 font-sans">
				{/* Level Badge */}
				<div
					className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/50 dark:bg-blue-950/40 backdrop-blur-xl border border-blue-200/30 dark:border-blue-800/40 text-blue-700 dark:text-blue-400 font-sans shadow-sm transition-all hover:bg-blue-50/70 dark:hover:bg-blue-900/50"
					title="Nível"
				>
					<GraduationCap className="h-4 w-4 opacity-70" strokeWidth={1.5} />
					<span className="font-semibold tracking-tight">
						Nvl {userLevel}
					</span>
				</div>

				{/* Gems / PobreCoins */}
				<div
					className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50/50 dark:bg-amber-950/40 backdrop-blur-xl border border-amber-200/30 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 font-sans shadow-sm transition-all group cursor-default hover:bg-amber-50/70 dark:hover:bg-amber-900/50"
					title="Pobrecoins"
				>
					<Coins
						className="h-4 w-4 text-amber-500 group-hover:animate-bounce"
						strokeWidth={1.5}
					/>
					<span className="font-semibold tabular-nums tracking-tight">
						{gems}
					</span>
				</div>
			</div>
		</>
	);
}
