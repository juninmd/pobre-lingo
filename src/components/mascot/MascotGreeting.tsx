import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGamification } from "@/contexts/GamificationContext";
import { cn } from "@/lib/utils";
import { Pobrelingo } from "./Pobrelingo";

interface MascotGreetingProps {
	message?: string;
	userName?: string;
	className?: string;
}

export function MascotGreeting({
	message,
	userName,
	className,
}: MascotGreetingProps) {
	const { xp, level } = useGamification();
	const greeting =
		message ||
		(userName
			? `Oi, ${userName}! Pronto para aprender?`
			: "Oi! Pronto para aprender?");

	// Calculate Level Progress
	const currentLevelStartXP = (level - 1) ** 2 * 100;
	const nextLevelStartXP = level ** 2 * 100;
	const xpInCurrentLevel = xp - currentLevelStartXP;
	const xpRequiredForNextLevel = nextLevelStartXP - currentLevelStartXP;
	const progressPercent = Math.min(
		100,
		Math.max(0, (xpInCurrentLevel / xpRequiredForNextLevel) * 100),
	);

	return (
		<Card
			className={cn(
				"bg-gradient-to-r from-green-50 to-emerald-100 border-green-200 dark:from-green-950/40 dark:to-emerald-900/40 dark:border-green-800 overflow-hidden relative",
				className,
			)}
		>
			<CardContent className="p-6 flex items-center gap-6 relative z-10">
				<div className="flex-shrink-0 animate-bounce-slow">
					<Pobrelingo width={120} height={120} emotion="excited" />
				</div>

				<div className="flex-1">
					<div className="relative bg-white dark:bg-zinc-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-green-100 dark:border-green-900">
						<h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-1">
							Vamos lá!
						</h3>
						<p className="text-muted-foreground text-sm sm:text-base mb-3">
							{greeting}
						</p>

						{/* Level Progress */}
						<div className="space-y-1">
							<div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
								<span>Nível {level}</span>
								<span>
									{Math.floor(xpInCurrentLevel)} / {xpRequiredForNextLevel} XP
								</span>
							</div>
							<Progress
								value={progressPercent}
								className="h-2 bg-green-200 dark:bg-green-900/50 [&>div]:bg-green-500"
							/>
						</div>

						{/* Speech bubble tail */}
						<div
							className="absolute top-0 -left-2 w-4 h-4 bg-white dark:bg-zinc-800 border-l border-t border-green-100 dark:border-green-900 transform -skew-x-12"
							style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
						></div>
					</div>
				</div>
			</CardContent>

			{/* Decorative background circles */}
			<div className="absolute -right-10 -bottom-20 w-40 h-40 bg-green-200/30 rounded-full blur-3xl"></div>
			<div className="absolute top-10 left-1/3 w-20 h-20 bg-emerald-200/20 rounded-full blur-2xl"></div>
		</Card>
	);
}
