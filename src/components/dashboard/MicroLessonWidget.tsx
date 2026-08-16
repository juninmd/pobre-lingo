import { Zap, CheckCircle2 } from "lucide-react";
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
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200/50 dark:border-indigo-800/50 shadow-lg hover:shadow-indigo-500/10">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
					<Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
					<span>Micro Lição do Dia</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm font-medium text-muted-foreground">
					Complete a frase (Second Conditional):
				</div>
				<div className="p-3 bg-white/50 dark:bg-black/20 rounded-lg border border-indigo-100 dark:border-indigo-900 text-center font-medium text-lg">
					"If I <span className="text-indigo-600 dark:text-indigo-400 font-bold underline decoration-2 underline-offset-4 mx-1">{showAnswer ? "were" : "___"}</span> you, I would study harder."
				</div>

				{!showAnswer ? (
					<div className="grid grid-cols-2 gap-3">
						<Button variant="outline" className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200" onClick={handleReveal}>
							was
						</Button>
						<Button variant="outline" className="w-full hover:bg-green-50 hover:text-green-600 hover:border-green-200" onClick={handleReveal}>
							were
						</Button>
					</div>
				) : (
					<div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
						<div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg text-sm text-green-800 dark:text-green-300">
							<p className="font-bold mb-1">Resposta correta: were</p>
							<p>Na segunda condicional (situações hipotéticas), usamos "were" para todas as pessoas, incluindo I, he, she, it.</p>
						</div>
						<Button
							variant={completed ? "secondary" : "gamified"}
							className="w-full font-bold"
							disabled={completed}
							onClick={handleComplete}
						>
							{completed ? (
								<span className="flex items-center gap-2">
									<CheckCircle2 className="w-4 h-4 text-green-500" />
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
