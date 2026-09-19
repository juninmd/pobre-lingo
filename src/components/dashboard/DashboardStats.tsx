import type { LucideIcon } from "lucide-react";
import { Coins, Flame, GraduationCap, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { cn } from "@/lib/utils";

type StatCard = {
	key: string;
	icon: LucideIcon;
	value: string | number;
	label: string;
	valueClass: string;
	iconClass: string;
	borderClass: string;
	shadowClass: string;
};

export function DashboardStats() {
	const { overallProgress } = useCurriculumProgress();
	const { gems } = useGamification();

	const stats: StatCard[] = [
		{
			key: "streak",
			icon: Flame,
			value: overallProgress.streak,
			label: "Dias Seguidos",
			valueClass: "text-brand-gold",
			iconClass: "bg-brand-gold/10 text-brand-gold border-brand-gold/20",
			borderClass: "hover:border-brand-gold/40",
			shadowClass: "hover:shadow-brand-gold/20",
		},
		{
			key: "coins",
			icon: Coins,
			value: gems,
			label: "PobreCoins",
			valueClass: "text-brand-gold",
			iconClass: "bg-brand-gold/10 text-brand-gold border-brand-gold/20",
			borderClass: "hover:border-brand-gold/40",
			shadowClass: "hover:shadow-brand-gold/20",
		},
		{
			key: "level",
			icon: GraduationCap,
			value: overallProgress.userLevel,
			label: "Nível",
			valueClass: "text-brand-violet",
			iconClass: "bg-brand-violet/10 text-brand-violet border-brand-violet/20",
			borderClass: "hover:border-brand-violet/40",
			shadowClass: "hover:shadow-brand-violet/20",
		},
		{
			key: "progress",
			icon: Trophy,
			value: `${overallProgress.overallPercentage}%`,
			label: "Completo",
			valueClass: "text-brand-aqua",
			iconClass: "bg-brand-aqua/10 text-brand-aqua border-brand-aqua/20",
			borderClass: "hover:border-brand-aqua/40",
			shadowClass: "hover:shadow-brand-aqua/20",
		},
	];

	return (
		<section className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 md:grid-cols-4">
			{stats.map((stat) => (
				<Card
					key={stat.key}
					className={cn(
						"glass-card backdrop-blur-xl bg-card/60 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] touch-manipulation",
						stat.borderClass,
						stat.shadowClass,
					)}
				>
					<CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
						<div
							className={cn(
								"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border shadow-sm",
								stat.iconClass,
							)}
						>
							<stat.icon
								className={cn(
									"w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7",
									stat.key === "streak" && overallProgress.streak > 0
										? "animate-bounce"
										: "",
								)}
							/>
						</div>
						<div>
							<span
								className={cn(
									"block text-2xl sm:text-3xl md:text-4xl font-extrabold tabular-nums font-headline",
									stat.valueClass,
								)}
							>
								{stat.value}
							</span>
							<span className="mt-0.5 block text-[0.625rem] sm:text-xs uppercase font-bold tracking-widest text-muted-foreground">
								{stat.label}
							</span>
						</div>
					</CardContent>
				</Card>
			))}
		</section>
	);
}
