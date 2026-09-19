import { CheckCircle2, MessageSquare, Mic, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const ROLEPLAY_SCENARIOS = [
	{
		title: "Atraso no Trabalho",
		context:
			"Você se atrasou 30 minutos para o trabalho porque o trânsito estava terrível. Seu chefe está na porta.",
		task: "Peça desculpas e explique o motivo usando suas próprias palavras.",
		xp: 20,
	},
	{
		title: "Reclamação no Restaurante",
		context:
			"Sua comida chegou fria e o bife está mal passado (você pediu bem passado).",
		task: "Chame o garçom e resolva a situação educadamente.",
		xp: 20,
	},
	{
		title: "Conhecendo Alguém",
		context:
			"Você está em uma conferência e sentou ao lado de uma pessoa desconhecida antes da palestra começar.",
		task: "Inicie uma conversa casual (small talk).",
		xp: 20,
	},
];

export function CommunicativeRoleplayWidget() {
	const { addXp } = useGamification();
	const [scenario, setScenario] = useState(ROLEPLAY_SCENARIOS[0]);
	const [claimed, setClaimed] = useState(false);
	const [isRecording, setIsRecording] = useState(false);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setScenario(ROLEPLAY_SCENARIOS[dayOfYear % ROLEPLAY_SCENARIOS.length]);

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(
			localStorage.getItem("daily_communicative_roleplay_claimed") === todayStr,
		);
	}, []);

	const handleRecord = () => {
		if (claimed) return;
		setIsRecording(true);
		setTimeout(() => {
			setIsRecording(false);
			setClaimed(true);
			addXp(scenario.xp);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_communicative_roleplay_claimed", todayStr);
		}, 3000); // Simulate recording for 3 seconds
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-brand-aqua/10 to-brand-aqua/10 dark:from-brand-aqua/30 dark:to-brand-aqua/30 border-brand-aqua/20 dark:border-brand-aqua/50 shadow-lg hover:shadow-brand-aqua/10 relative overflow-hidden">
			<div className="absolute -left-4 -top-4 w-24 h-24 bg-brand-aqua/10 rounded-full blur-2xl" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-brand-aqua/15 text-brand-aqua dark:bg-brand-aqua/60 border-none font-bold"
					>
						<Users className="w-3 h-3 mr-1 inline" /> CLT Method
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-brand-aqua">
						<MessageSquare className="w-5 h-5" />
						<span>Roleplay Prático</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<h4 className="font-bold text-brand-aqua text-base mb-1">
						{scenario.title}
					</h4>
					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-brand-aqua/15 dark:border-brand-aqua/50 text-sm mb-4">
						<p className="text-muted-foreground mb-3">{scenario.context}</p>
						<p className="font-semibold text-foreground flex items-start gap-2 border-t border-brand-aqua/15 dark:border-brand-aqua/50 pt-3">
							<Zap className="w-4 h-4 text-brand-aqua shrink-0 mt-0.5" />
							<span>{scenario.task}</span>
						</p>
					</div>

					<Button
						variant={claimed ? "secondary" : "gamified"}
						className={`w-full font-bold shadow-sm ${
							isRecording
								? "bg-destructive/15 text-destructive hover:bg-destructive/20 border-destructive/20"
								: ""
						}`}
						disabled={claimed || isRecording}
						onClick={handleRecord}
					>
						{isRecording ? (
							<span className="flex items-center gap-2 animate-pulse">
								<Mic className="w-4 h-4 animate-bounce" /> Gravando resposta...
							</span>
						) : claimed ? (
							<span className="flex items-center gap-1.5 text-brand-aqua">
								<CheckCircle2 className="w-4 h-4" />
								Prática Concluída! (+{scenario.xp} XP)
							</span>
						) : (
							<span className="flex items-center gap-2">
								<Mic className="w-4 h-4" /> Gravar Resposta (+{scenario.xp} XP)
							</span>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
