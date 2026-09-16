import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGamification } from "@/contexts/GamificationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
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
	const { xp, level, addXp } = useGamification();
	const { theme } = useTheme();
	const { toast } = useToast();

	const TRENDY_GREETINGS = [
		"Microlearning é a chave! 5 minutos por dia fazem a diferença.",
		"Consistência vence a intensidade. Vamos praticar um pouco?",
		"A imersão diária cria o hábito. Pronto para mergulhar?",
		"Pequenos passos todos os dias. Vamos subir de nível?",
		"O segredo é não parar. Bora aprender inglês hoje?",
	];

	// Pick a stable greeting for the day based on the date
	const dayOfYear = Math.floor(
		(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
			1000 /
			60 /
			60 /
			24,
	);

	const dynamicGreeting = userName
		? `Oi, ${userName}! ${TRENDY_GREETINGS[dayOfYear % TRENDY_GREETINGS.length]}`
		: `Oi! ${TRENDY_GREETINGS[dayOfYear % TRENDY_GREETINGS.length]}`;

	const greeting = message || dynamicGreeting;

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
			card: "backdrop-blur-xl bg-opacity-80 bg-gradient-to-br from-[#080711] via-[#0e0c1b] to-[#080711] border-primary/25 text-foreground",
			bubble: "bg-[#0e0c1b]/95 border-primary/25 shadow-md",
			bubbleTail: "bg-[#0e0c1b] border-l border-t border-primary/25",
			title: "text-gold font-bold",
			progress:
				"h-2 bg-primary/20 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent",
			circleLarge: "bg-primary/15",
			circleSmall: "bg-accent/5",
		},
		dark: {
			card: "backdrop-blur-xl bg-opacity-80 bg-gradient-to-br from-slate-900 via-indigo-950/25 to-slate-950 border-indigo-500/20 text-foreground",
			bubble: "bg-slate-900/95 border-indigo-500/20 shadow-md",
			bubbleTail: "bg-slate-900 border-l border-t border-indigo-500/20",
			title: "text-primary font-bold",
			progress:
				"h-2 bg-indigo-900/50 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent",
			circleLarge: "bg-primary/10",
			circleSmall: "bg-accent/5",
		},
		light: {
			card: "backdrop-blur-xl bg-opacity-80 bg-gradient-to-br from-violet-50/70 via-indigo-50/50 to-violet-100/50 border-violet-200 text-foreground",
			bubble: "bg-white border-violet-100 shadow-sm",
			bubbleTail: "bg-white border-l border-t border-violet-100",
			title: "text-primary font-bold",
			progress:
				"h-2 bg-violet-100 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent",
			circleLarge: "bg-primary/10",
			circleSmall: "bg-accent/5",
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
				<div
					className="flex-shrink-0 animate-bounce-slow cursor-pointer hover:scale-110 hover:rotate-3 active:scale-95 transition-all duration-300 hover:drop-shadow-xl"
					onClick={() => {
						addXp(5);
						toast({
							title: "Bônus Diário!",
							description:
								"PobreLingo está animado para aprender com você hoje! +5 XP",
						});
					}}
				>
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
