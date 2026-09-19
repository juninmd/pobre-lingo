import { CheckCircle2, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

export function MicroLessonWidget() {
	const [showAnswer, setShowAnswer] = useState(false);
	const [completed, setCompleted] = useState(false);
	const { addXp } = useGamification();

	const handleReveal = () => {
		setShowAnswer(true);
	};

	const handleComplete = () => {
		if (!completed) {
			addXp(10);
			setCompleted(true);
		}
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-primary/10 to-brand-violet/10 dark:from-primary/30 dark:to-brand-violet/30 border-primary/20 dark:border-primary/50 shadow-lg hover:shadow-primary/10">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg flex items-center gap-2 text-primary">
					<Zap className="w-5 h-5 text-brand-gold fill-brand-gold" />
					<span>Micro Lição do Dia</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm font-medium text-muted-foreground">
					Complete a frase (Second Conditional):
				</div>
				<div className="p-3 bg-white/50 dark:bg-black/20 rounded-lg border border-primary/15 dark:border-primary/60 text-center font-medium text-lg">
					"If I{" "}
					<span className="text-primary font-bold underline decoration-2 underline-offset-4 mx-1">
						{showAnswer ? "were" : "___"}
					</span>{" "}
					you, I would study harder."
				</div>

				{!showAnswer ? (
					<div className="grid grid-cols-2 gap-3">
						<Button
							variant="outline"
							className="w-full hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
							onClick={handleReveal}
						>
							was
						</Button>
						<Button
							variant="outline"
							className="w-full hover:bg-brand-aqua/10 hover:text-brand-aqua hover:border-brand-aqua/20"
							onClick={handleReveal}
						>
							were
						</Button>
					</div>
				) : (
					<div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
						<div className="p-3 bg-brand-aqua/10 dark:bg-brand-aqua/30 border border-brand-aqua/20 dark:border-brand-aqua/60 rounded-lg text-sm text-brand-aqua">
							<p className="font-bold mb-1">Resposta correta: were</p>
							<p>
								Na segunda condicional (situações hipotéticas), usamos "were"
								para todas as pessoas, incluindo I, he, she, it.
							</p>
						</div>
						<Button
							variant={completed ? "secondary" : "gamified"}
							className="w-full font-bold"
							disabled={completed}
							onClick={handleComplete}
						>
							{completed ? (
								<span className="flex items-center gap-2">
									<CheckCircle2 className="w-4 h-4 text-brand-aqua" />
									Lição Concluída
								</span>
							) : (
								"Entendi! (+10 XP)"
							)}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
