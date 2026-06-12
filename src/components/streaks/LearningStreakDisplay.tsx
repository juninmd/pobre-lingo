"use client";

import { Flame, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLearningStreak } from "@/hooks/useLearningStreak";
import { cn } from "@/lib/utils";

interface LearningStreakDisplayProps {
	className?: string;
	variant?: "default" | "compact";
}

export function LearningStreakDisplay({
	className,
	variant = "default",
}: LearningStreakDisplayProps) {
	const { streak } = useLearningStreak();

	if (variant === "compact") {
		return (
			<div
				className={cn(
					"flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/30 text-sidebar-foreground",
					className,
				)}
			>
				<div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20">
					<Flame className="h-5 w-5 text-accent" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-baseline gap-1.5">
						<span className="text-lg font-bold">{streak}</span>
						<span className="text-xs opacity-70">
							{streak === 1 ? "dia" : "dias"}
						</span>
					</div>
					<p className="text-[10px] opacity-60 truncate">
						{streak > 0 ? "Continue assim!" : "Comece hoje!"}
					</p>
				</div>
				{streak >= 7 && <Sparkles className="h-4 w-4 text-accent" />}
			</div>
		);
	}

	return (
		<Card className={cn("bg-card shadow-lg", className)}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-card-foreground">
					Sequência de Aprendizado
				</CardTitle>
				<Flame className="h-5 w-5 text-accent" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-primary">
					{streak} {streak === 1 ? "dia" : "dias"}
				</div>
				<p className="text-xs text-muted-foreground">
					{streak > 0
						? "Continue assim para não perder sua sequência!"
						: "Comece hoje sua jornada de aprendizado!"}
				</p>
			</CardContent>
		</Card>
	);
}
