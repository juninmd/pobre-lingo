import {
	CheckCircle2,
	FlaskConical,
	Hammer,
	HandMetal,
	Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const EXPERIENTIAL_TASKS = [
	{
		title: "Cozinhar em Inglês",
		task: "Siga uma receita totalmente em inglês hoje para preparar uma refeição.",
		xp: 20,
	},
	{
		title: "Navegação em Inglês",
		task: "Mude o idioma do seu GPS ou Google Maps para inglês na sua próxima saída.",
		xp: 15,
	},
	{
		title: "Diário de Bordo",
		task: "Escreva 3 frases em inglês sobre o que você fez hoje, focando na ação.",
		xp: 15,
	},
];

export function ExperientialLearningWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [task, setTask] = useState(EXPERIENTIAL_TASKS[0]);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setTask(EXPERIENTIAL_TASKS[dayOfYear % EXPERIENTIAL_TASKS.length]);

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_experiential_claimed") === todayStr);
	}, []);

	const handleCompleteTask = () => {
		if (claimed) return;
		setClaimed(true);
		addXp(task.xp);
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_experiential_claimed", todayStr);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-orange-50/70 to-amber-50/70 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200/50 dark:border-orange-800/50 shadow-lg hover:shadow-orange-500/10">
			<CardHeader className="pb-2 flex flex-row items-start justify-between">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-orange-700 dark:text-orange-400">
						<Hammer className="w-5 h-5" />
						<span>Experiential Learning</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm font-medium text-muted-foreground">
					Aprenda fazendo! Vivencie o idioma na prática.
				</div>

				{claimed ? (
					<div className="p-4 bg-white/60 dark:bg-black/30 rounded-lg border border-orange-100 dark:border-orange-900 animate-in fade-in zoom-in duration-300">
						<h4 className="font-bold text-orange-900 dark:text-orange-300 mb-2 flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 text-orange-500" />
							{task.title}
						</h4>
						<p className="text-sm text-foreground/80 leading-relaxed mb-3">
							Você completou a experiência de hoje!
						</p>
						<div className="bg-orange-100/50 dark:bg-orange-900/30 p-2 rounded text-center border border-orange-200 dark:border-orange-800">
							<span className="flex items-center justify-center gap-1.5 text-orange-700 dark:text-orange-400 font-bold text-sm">
								<Sparkles className="w-4 h-4" />
								Experiência Concluída (+{task.xp} XP)
							</span>
						</div>
					</div>
				) : (
					<div className="p-4 bg-white/40 dark:bg-black/20 rounded-lg border border-dashed border-orange-300 dark:border-orange-700 flex flex-col items-center text-center space-y-3">
						<HandMetal className="w-8 h-8 text-orange-400 dark:text-orange-600 mb-1" />
						<h4 className="font-bold text-orange-900 dark:text-orange-300">
							{task.title}
						</h4>
						<p className="text-sm font-medium text-orange-800 dark:text-orange-300">
							{task.task}
						</p>
						<Button
							className="w-full gap-2 bg-orange-600 hover:bg-orange-700 text-white"
							onClick={handleCompleteTask}
						>
							<CheckCircle2 className="w-4 h-4" /> Concluir Experiência (+
							{task.xp} XP)
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
