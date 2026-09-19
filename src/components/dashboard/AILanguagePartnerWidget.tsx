import { Bot, CheckCircle2, MessageSquare, Mic, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

export function AILanguagePartnerWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isChatting, setIsChatting] = useState(false);

	useEffect(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_ai_partner_claimed") === todayStr);
	}, []);

	const handleRespond = () => {
		if (claimed) return;
		setIsChatting(true);
		setTimeout(() => {
			setIsChatting(false);
			setClaimed(true);
			addXp(15);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_ai_partner_claimed", todayStr);
		}, 1500); // Simulate network request/typing
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-primary/10 to-primary/10 dark:from-primary/30 dark:to-primary/30 border-primary/20 dark:border-primary/50 shadow-lg hover:shadow-primary/10">
			<CardHeader className="pb-2 flex flex-row items-start justify-between">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-primary/15 text-primary dark:bg-primary/60 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-primary">
						<Bot className="w-5 h-5" />
						<span>AI Language Partner</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm font-medium text-muted-foreground">
					Pratique conversação em tempo real com nosso assistente de IA. Cenário
					de hoje:
				</div>

				<div className="p-3 bg-white/60 dark:bg-black/30 rounded-lg border border-primary/15 dark:border-primary/60">
					<div className="flex gap-3 items-start">
						<div className="bg-primary/15 dark:bg-primary/60 p-2 rounded-full mt-1">
							<Bot className="w-4 h-4 text-primary" />
						</div>
						<div>
							<p className="font-semibold text-sm mb-1">
								Cenário: Pedindo café
							</p>
							<p className="text-sm italic text-muted-foreground">
								"Hi there! What can I get for you today?"
							</p>
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					<Button
						className="w-full gap-2"
						variant={claimed ? "secondary" : "default"}
						onClick={handleRespond}
						disabled={claimed || isChatting}
					>
						{isChatting ? (
							<span className="flex items-center gap-1.5 animate-pulse">
								Enviando...
							</span>
						) : claimed ? (
							<span className="flex items-center gap-1.5 text-primary">
								<CheckCircle2 className="w-4 h-4" />
								Prática Concluída!
							</span>
						) : (
							<>
								<MessageSquare className="w-4 h-4" /> Responder
							</>
						)}
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="shrink-0 rounded-full border-primary/20 dark:border-primary/70 text-primary hover:bg-primary/10 dark:hover:bg-primary/60"
						onClick={handleRespond}
						disabled={claimed || isChatting}
					>
						<Mic className="w-4 h-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
