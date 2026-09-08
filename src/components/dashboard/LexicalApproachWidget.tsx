import { ArrowRight, CheckCircle2, Puzzle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

export function LexicalApproachWidget() {
	const [completed, setCompleted] = useState(false);
	const { addXp } = useGamification();

	const handlePractice = () => {
		if (!completed) {
			setCompleted(true);
			addXp(15);
		}
	};

	return (
		<Card className="relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-xl hover:bg-card/40 transition-colors">
			<div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
				<Puzzle className="w-24 h-24" />
			</div>

			<CardContent className="p-6 relative z-10 flex flex-col h-full justify-between">
				<div className="space-y-4">
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-2">
							<div className="p-2 bg-purple-500/20 text-purple-500 rounded-lg">
								<Puzzle className="w-5 h-5" />
							</div>
							<Badge
								variant="secondary"
								className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
							>
								TREND 2025
							</Badge>
						</div>
					</div>

					<div>
						<h4 className="font-bold text-lg text-foreground flex items-center gap-2">
							Abordagem Lexical
						</h4>
						<p className="text-sm text-muted-foreground mt-1">
							Aprenda blocos de palavras (chunks) em vez de regras isoladas.
						</p>
					</div>

					<div className="bg-background/50 rounded-xl p-4 border border-border/50 space-y-3">
						<div className="flex flex-col gap-1">
							<span className="text-xs text-muted-foreground">
								Em vez de traduzir palavra por palavra:
							</span>
							<span className="text-sm font-medium line-through text-red-400">
								Depends of you
							</span>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-xs text-muted-foreground">
								Use o chunk (bloco) correto:
							</span>
							<span className="text-sm font-bold text-green-500">
								It depends on you
							</span>
						</div>
					</div>
				</div>

				<Button
					className="w-full mt-6 gap-2"
					variant={completed ? "secondary" : "default"}
					onClick={handlePractice}
					disabled={completed}
				>
					{completed ? (
						<>
							<CheckCircle2 className="w-4 h-4" />
							Praticado (+15 XP)
						</>
					) : (
						<>
							<ArrowRight className="w-4 h-4" />
							Praticar Chunks
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
