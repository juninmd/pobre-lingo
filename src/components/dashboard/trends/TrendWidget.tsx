import { type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";

interface TrendWidgetProps {
	title: string;
	description: string;
	icon: LucideIcon;
	xpReward: number;
	actionText: string;
	content: React.ReactNode;
}

export function TrendWidget({
	title,
	description,
	icon: Icon,
	xpReward,
	actionText,
	content,
}: TrendWidgetProps) {
	const [isCompleted, setIsCompleted] = useState(false);
	const { addXp } = useGamification();
	const { notify } = useNotifications();

	const handleAction = () => {
		if (isCompleted) return;

		setIsCompleted(true);
		addXp(xpReward);

		notify({
			category: "quest",
			title: `Missão: ${title}`,
			body: `Você ganhou +${xpReward} XP pela prática!`,
		});
	};

	return (
		<Card className="glass-card bg-gradient-to-br from-card to-card/50 border-border hover:shadow-xl hover:border-primary/40 transition-all duration-300 relative overflow-hidden h-full flex flex-col">
			<CardHeader className="pb-3 flex flex-row items-center gap-3">
				<div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20 shrink-0">
					<Icon className="w-5 h-5 text-primary" strokeWidth={2} />
				</div>
				<div className="flex-1 min-w-0">
					<CardTitle className="text-base font-bold text-foreground truncate">
						{title}
					</CardTitle>
					<p className="text-xs text-muted-foreground truncate">{description}</p>
				</div>
			</CardHeader>
			<CardContent className="pt-0 flex flex-col flex-1 gap-4">
				<div className="text-sm text-foreground/90 bg-muted/30 p-3 rounded-lg border border-border/50 flex-1 flex flex-col justify-center">
					{content}
				</div>
				<Button
					onClick={handleAction}
					disabled={isCompleted}
					className="w-full relative overflow-hidden group"
					variant={isCompleted ? "secondary" : "default"}
				>
					{isCompleted ? (
						<span className="text-green-500 font-semibold">Concluído (+{xpReward} XP)</span>
					) : (
						<>
							<span className="relative z-10 font-semibold">{actionText}</span>
							<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
