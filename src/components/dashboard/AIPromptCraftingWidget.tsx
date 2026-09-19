import { Bot, CheckCircle2, Sparkles, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useGamification } from "@/contexts/GamificationContext";

const PROMPT_SCENARIOS = [
	{
		title: "Planejamento de Viagem",
		goal: "Crie um prompt pedindo à IA um roteiro de 3 dias em Londres, destacando locais históricos.",
		xp: 20,
	},
	{
		title: "Revisão de E-mail",
		goal: "Crie um prompt pedindo à IA para revisar um e-mail formal para seu chefe sobre um atraso no projeto.",
		xp: 20,
	},
	{
		title: "Tradução com Contexto",
		goal: "Crie um prompt pedindo para traduzir uma gíria brasileira para o inglês, explicando o contexto cultural.",
		xp: 20,
	},
];

export function AIPromptCraftingWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [scenario, setScenario] = useState(PROMPT_SCENARIOS[0]);
	const [promptText, setPromptText] = useState("");

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setScenario(PROMPT_SCENARIOS[dayOfYear % PROMPT_SCENARIOS.length]);

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_ai_prompt_claimed") === todayStr);
	}, []);

	const handleSubmit = () => {
		if (claimed || promptText.trim().length < 10) return;
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setClaimed(true);
			addXp(scenario.xp);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_ai_prompt_claimed", todayStr);
		}, 1500);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/30 dark:to-purple-500/30 border-indigo-500/20 dark:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden">
			<div className="absolute -left-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 dark:bg-indigo-500/30 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
						<Terminal className="w-5 h-5" />
						<span>AI Prompt Crafting</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div className="text-sm font-medium text-muted-foreground">
					Pratique a habilidade do futuro: Engenharia de Prompts em Inglês.
				</div>

				{claimed ? (
					<div className="p-4 bg-white/60 dark:bg-black/30 rounded-lg border border-indigo-500/15 dark:border-indigo-500/30 animate-in fade-in zoom-in duration-300">
						<h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-2">
							<Bot className="w-4 h-4" />
							Prompt Enviado!
						</h4>
						<p className="text-sm text-foreground/80 leading-relaxed mb-3 italic">
							"{promptText}"
						</p>
						<div className="bg-indigo-500/15 dark:bg-indigo-500/30 p-2 rounded text-center border border-indigo-500/20 dark:border-indigo-500/50">
							<span className="flex items-center justify-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
								<CheckCircle2 className="w-4 h-4" />
								AI Literacy aprimorada! (+{scenario.xp} XP)
							</span>
						</div>
					</div>
				) : (
					<div className="space-y-3">
						<div className="p-3 bg-white/40 dark:bg-black/20 rounded-lg border border-indigo-500/20 dark:border-indigo-500/40">
							<p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
								Missão de Hoje
							</p>
							<p className="text-sm font-medium text-foreground">
								{scenario.goal}
							</p>
						</div>
						<Textarea
							placeholder="Write your prompt here in English..."
							className="resize-none h-20 bg-background/50 border-indigo-500/30 focus-visible:ring-indigo-500"
							value={promptText}
							onChange={(e) => setPromptText(e.target.value)}
							disabled={isSubmitting}
						/>
						<Button
							className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]"
							onClick={handleSubmit}
							disabled={isSubmitting || promptText.trim().length < 10}
						>
							{isSubmitting ? (
								<span className="flex items-center gap-1.5 animate-pulse">
									<Bot className="w-4 h-4 animate-spin" /> Analisando Prompt...
								</span>
							) : (
								<>
									<Terminal className="w-4 h-4" /> Enviar Prompt (+{scenario.xp}{" "}
									XP)
								</>
							)}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
