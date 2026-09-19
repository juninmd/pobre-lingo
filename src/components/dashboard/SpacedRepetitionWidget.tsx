import { BrainCircuit, PlayCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

export function SpacedRepetitionWidget() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [completed, setCompleted] = useState(false);
	const { addXp } = useGamification();

	const handleReview = () => {
		setIsPlaying(true);
		setTimeout(() => {
			setIsPlaying(false);
			if (!completed) {
				setCompleted(true);
				addXp(15);
			}
		}, 2000);
	};

	return (
		<Card className="relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-xl hover:bg-card/40 transition-colors">
			<div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
				<BrainCircuit className="w-24 h-24" />
			</div>

			<CardContent className="p-6 relative z-10 flex flex-col h-full justify-between">
				<div className="space-y-4">
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-2">
							<div className="p-2 bg-brand-violet/20 text-brand-violet rounded-lg">
								<BrainCircuit className="w-5 h-5" />
							</div>
							<Badge
								variant="secondary"
								className="bg-brand-violet/10 text-brand-violet hover:bg-brand-violet/20"
							>
								TREND 2025
							</Badge>
						</div>
					</div>

					<div>
						<h4 className="font-bold text-lg text-foreground flex items-center gap-2">
							Repetição Espaçada (SRS)
						</h4>
						<p className="text-sm text-muted-foreground mt-1">
							Revise vocabulário no momento ideal para não esquecer.
						</p>
					</div>

					<div className="bg-background/50 rounded-xl p-4 border border-border/50">
						<div className="flex items-center justify-between text-sm">
							<span className="font-medium">Hoje: 15 Cards</span>
							<span className="text-muted-foreground flex items-center gap-1">
								<RefreshCw className="w-4 h-4" /> Revisão
							</span>
						</div>
						<p className="text-xs text-muted-foreground mt-2 italic">
							"Phrasal verbs com 'get'"
						</p>
					</div>
				</div>

				<Button
					className="w-full mt-6 gap-2"
					variant={completed ? "secondary" : "default"}
					onClick={handleReview}
					disabled={isPlaying || completed}
				>
					{isPlaying ? (
						<>
							<RefreshCw className="w-4 h-4 animate-spin" />
							Revisando...
						</>
					) : completed ? (
						"Concluído (+15 XP)"
					) : (
						<>
							<PlayCircle className="w-4 h-4" />
							Iniciar Revisão
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
