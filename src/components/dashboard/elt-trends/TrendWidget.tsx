import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";

interface TrendWidgetProps {
	title: string;
	description: string;
	icon: LucideIcon;
	actionText: string;
}

export function TrendWidget({
	title,
	description,
	icon: Icon,
	actionText,
}: TrendWidgetProps) {
	const [isInteracted, setIsInteracted] = useState(false);
	const { addXp } = useGamification();
	const { notify } = useNotifications();

	const handleAction = () => {
		if (isInteracted) return;

		setIsInteracted(true);
		addXp(10);
		notify({
			category: "quest",
			title: `Praticou: ${title}`,
			body: "Você ganhou 10 XP por interagir com esta tendência!",
			href: "",
			dedupeKey: `trend-${title}`,
		});
	};

	return (
		<Card className="glass-card hover:border-primary/50 transition-colors h-full flex flex-col group">
			<CardHeader className="pb-2 flex flex-row items-center gap-3">
				<div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
					<Icon className="w-5 h-5" />
				</div>
				<CardTitle className="text-base sm:text-lg font-bold">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col justify-between space-y-4">
				<p className="text-sm text-muted-foreground">{description}</p>
				<Button
					onClick={handleAction}
					disabled={isInteracted}
					variant={isInteracted ? "secondary" : "default"}
					className="w-full font-bold"
				>
					{isInteracted ? "Explorado ✓" : actionText}
				</Button>
			</CardContent>
		</Card>
	);
}
