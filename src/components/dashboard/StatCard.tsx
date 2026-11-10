import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

export type StatTone = "orange" | "yellow" | "blue" | "green";

/** Classes por tom. Literais completos: o Tailwind só gera o que encontra escrito. */
const TONES: Record<
	StatTone,
	{ card: string; badge: string; icon: string; value: string; label: string }
> = {
	orange: {
		card: "from-orange-50 to-red-50/60 dark:from-orange-950/40 dark:to-red-950/20 border-orange-200/80 dark:border-orange-800/60",
		badge:
			"from-orange-100 to-orange-200/80 dark:from-orange-900/60 dark:to-orange-800/50 border-orange-200/50 dark:border-orange-800/50",
		icon: "text-orange-600 dark:text-orange-400",
		value: "text-orange-600 dark:text-orange-400",
		label: "text-orange-800/90 dark:text-orange-200/90",
	},
	yellow: {
		card: "from-yellow-50 to-amber-50/60 dark:from-yellow-950/40 dark:to-amber-950/20 border-yellow-200/80 dark:border-yellow-800/60",
		badge:
			"from-yellow-100 to-yellow-200/80 dark:from-yellow-900/60 dark:to-yellow-800/50 border-yellow-200/50 dark:border-yellow-800/50",
		icon: "text-yellow-600 dark:text-yellow-400",
		value: "text-yellow-600 dark:text-yellow-400",
		label: "text-yellow-800/90 dark:text-yellow-200/90",
	},
	blue: {
		card: "from-blue-50 to-indigo-50/60 dark:from-blue-950/40 dark:to-indigo-950/20 border-blue-200/80 dark:border-blue-800/60",
		badge:
			"from-blue-100 to-blue-200/80 dark:from-blue-900/60 dark:to-blue-800/50 border-blue-200/50 dark:border-blue-800/50",
		icon: "text-blue-600 dark:text-blue-400",
		value: "text-blue-600 dark:text-blue-400",
		label: "text-blue-800/90 dark:text-blue-200/90",
	},
	green: {
		card: "from-green-50 to-emerald-50/60 dark:from-green-950/40 dark:to-emerald-950/20 border-green-200/80 dark:border-green-800/60",
		badge:
			"from-green-100 to-green-200/80 dark:from-green-900/60 dark:to-green-800/50 border-green-200/50 dark:border-green-800/50",
		icon: "text-green-600 dark:text-green-400",
		value: "text-green-600 dark:text-green-400",
		label: "text-green-800/90 dark:text-green-200/90",
	},
};

interface StatCardProps {
	label: string;
	value: number;
	suffix?: string;
	icon: LucideIcon;
	tone: StatTone;
	/** Posição na fileira: escalona a entrada. */
	index: number;
	iconClassName?: string;
}

export function StatCard({
	label,
	value,
	suffix = "",
	icon: Icon,
	tone,
	index,
	iconClassName,
}: StatCardProps) {
	const shown = useCountUp(value);
	const classes = TONES[tone];

	return (
		<Card
			className={cn("glass-card reveal bg-gradient-to-br", classes.card)}
			style={{ "--i": index } as CSSProperties}
		>
			<CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
				<div
					className={cn(
						"p-2 sm:p-2.5 bg-gradient-to-br rounded-xl sm:rounded-2xl border",
						classes.badge,
					)}
				>
					<Icon
						aria-hidden="true"
						className={cn(
							"w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7",
							classes.icon,
							iconClassName,
						)}
					/>
				</div>
				<div>
					<span
						className={cn(
							"text-2xl sm:text-3xl md:text-4xl font-extrabold block tabular-nums",
							classes.value,
						)}
					>
						{/* O leitor de tela recebe o valor final, não a contagem. */}
						<span aria-hidden="true">
							{shown}
							{suffix}
						</span>
						<span className="sr-only">
							{value}
							{suffix}
						</span>
					</span>
					<span
						className={cn(
							"text-[0.625rem] sm:text-xs uppercase font-black tracking-widest mt-0.5 block",
							classes.label,
						)}
					>
						{label}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
