import { CheckCircle2, Laptop, Sparkles, Users, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const LEARNING_MODES = [
	{
		id: "sync",
		title: "Síncrono",
		description: "Participar de uma sessão ao vivo.",
		icon: Video,
		xp: 15,
	},
	{
		id: "async",
		title: "Assíncrono",
		description: "Completar módulos no seu ritmo.",
		icon: Laptop,
		xp: 10,
	},
	{
		id: "collab",
		title: "Colaborativo",
		description: "Praticar com peers na comunidade.",
		icon: Users,
		xp: 20,
	},
];

export function HyFlexLearningWidget() {
	const { addXp } = useGamification();
	const [claimedMode, setClaimedMode] = useState<string | null>(null);
	const [isSelecting, setIsSelecting] = useState<string | null>(null);

	useEffect(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		const saved = localStorage.getItem("daily_hyflex_claimed");
		if (saved && saved.startsWith(todayStr)) {
			setClaimedMode(saved.split("_")[1]);
		}
	}, []);

	const handleSelect = (mode: (typeof LEARNING_MODES)[0]) => {
		if (claimedMode) return;
		setIsSelecting(mode.id);
		setTimeout(() => {
			setIsSelecting(null);
			setClaimedMode(mode.id);
			addXp(mode.xp);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_hyflex_claimed", `${todayStr}_${mode.id}`);
		}, 1000);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-500/30 dark:to-emerald-500/30 border-teal-500/20 dark:border-teal-500/50 shadow-lg hover:shadow-teal-500/10 relative overflow-hidden">
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-teal-500/15 text-teal-700 dark:text-teal-400 dark:bg-teal-500/30 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-teal-700 dark:text-teal-400">
						<Laptop className="w-5 h-5" />
						<span>HyFlex Learning</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div className="text-sm font-medium text-muted-foreground">
					Escolha como você quer aprender hoje (Hybrid Flexible).
				</div>

				{claimedMode ? (
					<div className="p-4 bg-white/60 dark:bg-black/30 rounded-lg border border-teal-500/15 dark:border-teal-500/30 animate-in fade-in zoom-in duration-300">
						{LEARNING_MODES.map(
							(mode) =>
								mode.id === claimedMode && (
									<div key={mode.id} className="text-center space-y-2">
										<mode.icon className="w-8 h-8 text-teal-600 mx-auto" />
										<h4 className="font-bold text-teal-700 dark:text-teal-400">
											Modo {mode.title} Selecionado
										</h4>
										<p className="text-sm text-foreground/80 leading-relaxed mb-3">
											{mode.description}
										</p>
										<div className="bg-teal-500/15 dark:bg-teal-500/30 p-2 rounded border border-teal-500/20 dark:border-teal-500/50">
											<span className="flex items-center justify-center gap-1.5 text-teal-700 dark:text-teal-400 font-bold text-sm">
												<CheckCircle2 className="w-4 h-4" />
												Trilha Adaptada! (+{mode.xp} XP)
											</span>
										</div>
									</div>
								),
						)}
					</div>
				) : (
					<div className="grid grid-cols-1 gap-2">
						{LEARNING_MODES.map((mode) => (
							<Button
								key={mode.id}
								variant="outline"
								className="justify-start h-auto py-3 px-4 hover:bg-teal-500/10 hover:text-teal-700 dark:hover:text-teal-300 border-teal-500/20"
								onClick={() => handleSelect(mode)}
								disabled={isSelecting !== null}
							>
								{isSelecting === mode.id ? (
									<Sparkles className="w-5 h-5 mr-3 animate-spin text-teal-600" />
								) : (
									<mode.icon className="w-5 h-5 mr-3 text-teal-600 dark:text-teal-400" />
								)}
								<div className="text-left flex-1">
									<div className="font-semibold text-sm">{mode.title}</div>
									<div className="text-xs text-muted-foreground">
										{mode.description}
									</div>
								</div>
								<span className="text-xs font-bold text-teal-600 dark:text-teal-400">
									+{mode.xp} XP
								</span>
							</Button>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
