import { Calendar, CheckCircle2, Users, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

export function LiveTutorWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isConnecting, setIsConnecting] = useState(false);

	useEffect(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_live_tutor_claimed") === todayStr);
	}, []);

	const handleJoin = () => {
		if (claimed) return;
		setIsConnecting(true);

		// Simulate joining a session
		setTimeout(() => {
			setIsConnecting(false);
			setClaimed(true);
			addXp(30);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_live_tutor_claimed", todayStr);
		}, 2000);
	};

	return (
		<Card
			className="glass-card hover:animate-float group bg-gradient-to-br from-red-50/70 to-rose-50/70 dark:from-red-950/30 dark:to-rose-950/30 border-red-200/50 dark:border-red-800/50 shadow-lg hover:shadow-red-500/10 relative overflow-hidden"
			style={{ animationDelay: "0.3s" }}
		>
			<div className="absolute -left-4 -bottom-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-none font-bold"
					>
						<Users className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-sm font-bold flex items-center gap-2 text-red-700 dark:text-red-400">
						<Video className="w-4 h-4" />
						Tutoria ao Vivo
					</CardTitle>
				</div>
				<span className="text-[10px] uppercase font-bold tracking-widest text-red-500/70 bg-red-500/10 px-2 py-0.5 rounded-full">
					Conexão Humana
				</span>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="flex justify-between items-center mb-1">
						<h4 className="font-bold text-red-900 dark:text-red-300 text-base">
							Conversação 1-a-1
						</h4>
						<span className="text-xs font-semibold text-red-600/70 dark:text-red-400/70 flex items-center gap-1">
							<Calendar className="w-3 h-3" /> Hoje, 19:00
						</span>
					</div>

					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-red-100 dark:border-red-900/50 text-sm mb-3">
						<p className="text-muted-foreground">
							Pratique inglês com professores nativos e alunos do mundo todo em
							tempo real.
						</p>
					</div>

					<Button
						variant={claimed ? "secondary" : "gamified"}
						size="sm"
						className={`w-full font-bold shadow-sm ${!claimed ? "bg-red-600 hover:bg-red-700 text-white" : ""}`}
						disabled={claimed || isConnecting}
						onClick={handleJoin}
					>
						{isConnecting ? (
							<span className="flex items-center gap-1.5 animate-pulse">
								Conectando...
							</span>
						) : claimed ? (
							<span className="flex items-center gap-1.5 text-red-700 dark:text-red-400">
								<CheckCircle2 className="w-4 h-4" />
								Sessão Concluída!
							</span>
						) : (
							<span className="flex items-center gap-1.5">
								Entrar na Sala (+30 XP)
							</span>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
