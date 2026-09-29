import { Bot, Leaf, Globe, Heart, Brain, Users, BookOpen, MessageSquare, Target, Lightbulb, Puzzle, Trees, Network, Shield } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";

interface TrendWidgetProps {
	id: string;
	title: string;
	description: string;
	icon: "Bot" | "Leaf" | "Globe" | "Heart" | "Brain" | "Users" | "BookOpen" | "MessageSquare" | "Target" | "Lightbulb" | "Puzzle" | "Trees" | "Network" | "Shield";
	actionText: string;
	onInteract?: () => void;
	children?: React.ReactNode;
}

const iconMap = {
	Bot,
	Leaf,
	Globe,
	Heart,
	Brain,
	Users,
	BookOpen,
	MessageSquare,
	Target,
	Lightbulb,
	Puzzle,
	Trees,
	Network,
	Shield,
};

export function TrendWidget({
	id,
	title,
	description,
	icon,
	actionText,
	onInteract,
	children,
}: TrendWidgetProps) {
	const { addXp } = useGamification();
	const { notify } = useNotifications();
	const [completed, setCompleted] = useState(false);

	const IconComponent = iconMap[icon];

	const handleInteraction = () => {
		if (completed) return;

		setCompleted(true);
		addXp(10);
		notify({
			title: "Prática Concluída!",
			body: `Você ganhou 10 XP por explorar: ${title}`,
			category: "quest",
			dedupeKey: `trend-${id}-${Date.now()}`
		});

		if (onInteract) {
			onInteract();
		}
	};

	return (
		<Card className="glass-card hover:shadow-xl transition-all duration-300">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg flex items-center gap-2">
					<IconComponent className="w-5 h-5 text-primary" />
					{title}
				</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{children}
				<Button
					onClick={handleInteraction}
					disabled={completed}
					className="w-full sm:w-auto"
					variant={completed ? "secondary" : "default"}
				>
					{completed ? "Praticado hoje" : actionText}
				</Button>
			</CardContent>
		</Card>
	);
}
