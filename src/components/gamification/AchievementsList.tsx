import * as LucideIcons from "lucide-react";
import { CheckCircle, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ACHIEVEMENTS_LIST,
	useGamification,
} from "@/contexts/GamificationContext";
import { cn } from "@/lib/utils";

const getIcon = (name: string) => {
	// @ts-expect-error
	return LucideIcons[name] || LucideIcons.Award;
};

export function AchievementsList() {
	const { unlockedAchievements } = useGamification();

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<LucideIcons.Medal className="w-6 h-6 text-yellow-500" aria-hidden="true" />
					Conquistas
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{ACHIEVEMENTS_LIST.map((achievement) => {
						const isUnlocked = unlockedAchievements.includes(achievement.id);
						const Icon = getIcon(achievement.icon);

						return (
							<div
								key={achievement.id}
								className={cn(
									"relative flex items-center p-4 rounded-xl border transition-all duration-300",
									isUnlocked
										? "bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/10 dark:to-background border-yellow-200 dark:border-yellow-900/30 shadow-sm"
										: "bg-muted/40 border-transparent opacity-70 grayscale",
								)}
							>
								<div
									className={cn(
										"w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0 shadow-inner",
										isUnlocked
											? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400"
											: "bg-muted text-muted-foreground",
									)}
								>
									{isUnlocked ? (
										<Icon className="w-6 h-6" aria-hidden="true" />
									) : (
										<Lock className="w-5 h-5" aria-hidden="true" />
									)}
								</div>

								<div className="flex-1 min-w-0">
									<h4
										className={cn(
											"font-bold text-sm truncate",
											isUnlocked ? "text-foreground" : "text-muted-foreground",
										)}
									>
										{achievement.title}
									</h4>
									<p className="text-xs text-muted-foreground line-clamp-2">
										{achievement.description}
									</p>
								</div>

								{isUnlocked && (
									<div className="absolute top-2 right-2">
										<CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
										<span className="sr-only">Conquista desbloqueada</span>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
