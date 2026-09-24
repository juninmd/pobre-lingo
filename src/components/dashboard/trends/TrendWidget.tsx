import { type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";

interface TrendWidgetProps {
	title: string;
	description: string;
	icon: LucideIcon;
	actionText: string;
	successMessage: string;
}

export function TrendWidget({
	title,
	description,
	icon: Icon,
	actionText,
	successMessage,
}: TrendWidgetProps) {
	const { addXp } = useGamification();
	const { notify } = useNotifications();
	const [isLoading, setIsLoading] = useState(false);

	const handleAction = () => {
		setIsLoading(true);
		// Simulate network request
		setTimeout(() => {
			addXp(5);
			notify({
				category: "content",
				title: title,
				body: successMessage,
			});
			setIsLoading(false);
		}, 600);
	};

	return (
		<div className="glass-card bg-card/50 p-4 rounded-xl border border-border flex flex-col items-start gap-3 transition-colors hover:border-primary/50">
			<div className="flex items-center gap-3">
				<span className="rounded-lg bg-primary/10 p-2 text-primary">
					<Icon className="h-5 w-5" aria-hidden="true" />
				</span>
				<h4 className="font-semibold text-foreground">{title}</h4>
			</div>
			<p className="text-sm text-muted-foreground flex-1">{description}</p>
			<Button
				variant="secondary"
				size="sm"
				className="w-full mt-2"
				onClick={handleAction}
				disabled={isLoading}
			>
				{isLoading ? "Processando..." : actionText}
			</Button>
		</div>
	);
}
