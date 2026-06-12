import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGamification } from "@/contexts/GamificationContext";
import { useTheme } from "@/contexts/ThemeContext";
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
	const { theme } = useTheme();

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

	// Custom styles mapped to each theme
	const themeStyles = {
		"pobre-lingo": {
			card: "bg-gradient-to-br from-[#050a07] via-[#09120e] to-[#050a07] border-primary/20 text-foreground",
			bubble: "bg-[#09120e]/95 border-primary/20 shadow-md",
			bubbleTail: "bg-[#09120e] border-l border-t border-primary/20",
			title: "text-gold font-bold",
			progress:
				"h-2 bg-primary/20 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent",
			circleLarge: "bg-primary/10",
			circleSmall: "bg-accent/5",
		},
		dark: {
			card: "bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-950 border-blue-500/20 text-foreground",
			bubble: "bg-slate-900/95 border-blue-500/20 shadow-md",
			bubbleTail: "bg-slate-900 border-l border-t border-blue-500/20",
			title: "text-blue-400 font-bold",
			progress:
				"h-2 bg-blue-900/50 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-400",
			circleLarge: "bg-blue-500/10",
			circleSmall: "bg-indigo-500/5",
		},
		light: {
			card: "bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-blue-100/50 border-blue-200 text-foreground",
			bubble: "bg-white border-blue-100 shadow-sm",
			bubbleTail: "bg-white border-l border-t border-blue-100",
			title: "text-blue-600 font-bold",
			progress:
				"h-2 bg-blue-100 [&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:to-indigo-500",
			circleLarge: "bg-blue-400/10",
			circleSmall: "bg-indigo-400/5",
		},
	};

	const currentStyles = themeStyles[theme] || themeStyles.light;

	return (
		<Card
			className={cn(
				"border overflow-hidden relative",
				currentStyles.card,
				className,
			)}
		>
			<CardContent className="p-6 flex items-center gap-6 relative z-10">
				<div className="flex-shrink-0 animate-bounce-slow">
					<Pobrelingo width={120} height={120} emotion="excited" />
				</div>

				<div className="flex-1">
					<div
						className={cn(
							"relative p-4 rounded-2xl rounded-tl-none shadow-sm border",
							currentStyles.bubble,
						)}
					>
						<h3 className={cn("text-lg font-bold mb-1", currentStyles.title)}>
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
								className={currentStyles.progress}
							/>
						</div>

						{/* Speech bubble tail */}
						<div
							className={cn(
								"absolute top-0 -left-2 w-4 h-4 transform -skew-x-12",
								currentStyles.bubbleTail,
							)}
							style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
						></div>
					</div>
				</div>
			</CardContent>

			{/* Decorative background circles */}
			<div
				className={cn(
					"absolute -right-10 -bottom-20 w-40 h-40 rounded-full blur-3xl",
					currentStyles.circleLarge,
				)}
			></div>
			<div
				className={cn(
					"absolute top-10 left-1/3 w-20 h-20 rounded-full blur-2xl",
					currentStyles.circleSmall,
				)}
			></div>
		</Card>
	);
}
