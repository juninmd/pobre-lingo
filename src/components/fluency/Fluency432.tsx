import { Play, RotateCcw, Square, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CEFRLevel } from "@/lib/curriculumData";
import { fluencyPrompts } from "@/lib/fluencyData";
import { cn } from "@/lib/utils";

const ROUNDS = [4, 3, 2];

export function Fluency432({ level }: { level: CEFRLevel }) {
	const prompts = fluencyPrompts.filter((item) => item.level === level);
	const [promptIndex, setPromptIndex] = useState(0);
	const [round, setRound] = useState(0);
	const [remaining, setRemaining] = useState(ROUNDS[0] * 60);
	const [running, setRunning] = useState(false);

	useEffect(() => {
		if (!running) return;
		const id = window.setInterval(() => {
			setRemaining((value) => {
				if (value <= 1) {
					setRunning(false);
					return 0;
				}
				return value - 1;
			});
		}, 1000);
		return () => window.clearInterval(id);
	}, [running]);

	const prompt = prompts[promptIndex] ?? prompts[0];
	const total = ROUNDS[round] * 60;
	const percent = total ? Math.round(((total - remaining) / total) * 100) : 0;
	const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
	const ss = String(remaining % 60).padStart(2, "0");

	const startRound = (index: number) => {
		setRound(index);
		setRemaining(ROUNDS[index] * 60);
		setRunning(true);
	};

	return (
		<Card className="glass-card">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Timer className="h-5 w-5 text-primary" />
					Tarefa: {prompt?.promptPt}
				</CardTitle>
				<p className="text-sm text-muted-foreground">{prompt?.prompt}</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between gap-3 flex-wrap">
					<div className="flex items-center gap-2 flex-wrap">
						{prompt?.tips.map((tip) => (
							<Badge key={tip} variant="outline">
								{tip}
							</Badge>
						))}
					</div>
					{prompts.length > 1 && (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setPromptIndex((value) => (value + 1) % prompts.length)}
						>
							Outro tema
						</Button>
					)}
				</div>

				<div className="text-center">
					<p className="text-5xl font-headline font-black tabular-nums">
						{mm}:{ss}
					</p>
					<p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
						Rodada {round + 1} de 3 · {ROUNDS[round]} minutos
					</p>
				</div>
				<Progress value={percent} className="h-2" />

				<div className="flex flex-wrap justify-center gap-2">
					<Button onClick={() => setRunning((value) => !value)} className="gap-2">
						{running ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
						{running ? "Pausar" : "Iniciar"}
					</Button>
					{ROUNDS.map((minutes, index) => (
						<Button
							key={minutes}
							variant="outline"
							onClick={() => startRound(index)}
							className={cn(index === round && "border-primary/40")}
						>
							{minutes} min
						</Button>
					))}
					<Button variant="ghost" onClick={() => startRound(0)} className="gap-2">
						<RotateCcw className="h-4 w-4" />
						Reiniciar
					</Button>
				</div>
				<p className="text-xs text-muted-foreground text-center">
					Fale sem parar até o tempo acabar. Reduza o tempo a cada rodada, mantendo o conteúdo.
				</p>
			</CardContent>
		</Card>
	);
}
