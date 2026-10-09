import { Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CEFRLevel } from "@/lib/curriculumData";
import type { CheckpointQuestion } from "@/lib/levelCheckpoints";
import { cn } from "@/lib/utils";

interface CheckpointQuizProps {
	level: CEFRLevel;
	questions: CheckpointQuestion[];
	onPass: () => boolean;
}

export function CheckpointQuiz({
	level,
	questions,
	onPass,
}: CheckpointQuizProps) {
	const [answers, setAnswers] = useState<Record<string, number>>({});
	const answered = Object.keys(answers).length;
	const correct = questions.filter(
		(question) => answers[question.id] === question.answerIndex,
	).length;
	const finished = answered === questions.length;
	const passed = questions.length > 0 && correct === questions.length;

	return (
		<Card className="glass-card">
			<CardContent className="p-5 space-y-5">
				<div className="flex items-center justify-between">
					<h3 className="font-headline text-lg font-bold">
						Checagem de conteúdo {level}
					</h3>
					<span className="text-sm text-muted-foreground">
						{correct}/{questions.length} corretas
					</span>
				</div>
				<Progress
					value={(answered / questions.length) * 100}
					className="h-1.5"
				/>

				{questions.map((question) => {
					const chosen = answers[question.id];
					const isAnswered = chosen !== undefined;
					return (
						<div key={question.id} className="space-y-2">
							<p className="font-medium text-sm">{question.question}</p>
							<div className="grid gap-2">
								{question.options.map((option, index) => {
									const isRight = index === question.answerIndex;
									const state = !isAnswered
										? "idle"
										: isRight
											? "right"
											: chosen === index
												? "wrong"
												: "idle";
									return (
										<button
											key={option}
											type="button"
											disabled={isAnswered}
											onClick={() =>
												setAnswers((prev) => ({
													...prev,
													[question.id]: index,
												}))
											}
											className={cn(
												"flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-colors",
												state === "idle" &&
													"border-border/60 hover:border-primary/40 hover:bg-primary/5",
												state === "right" &&
													"border-brand-aqua/50 bg-brand-aqua/10 text-brand-aqua",
												state === "wrong" &&
													"border-destructive/50 bg-destructive/10 text-destructive",
											)}
										>
											<span>{option}</span>
											{state === "right" && <Check className="h-4 w-4" />}
											{state === "wrong" && <X className="h-4 w-4" />}
										</button>
									);
								})}
							</div>
						</div>
					);
				})}

				{finished && !passed && (
					<div className="space-y-2" role="status">
						<p>
							Há respostas para revisar. Compare as opções destacadas antes de
							tentar novamente.
						</p>
						<Button variant="outline" onClick={() => setAnswers({})}>
							Revisar e tentar novamente
						</Button>
					</div>
				)}
				<div className="flex justify-end">
					<Button
						onClick={() => onPass()}
						disabled={!finished || !passed}
						className="gap-2"
					>
						<Check className="h-4 w-4" />
						{passed
							? "Salvar checagem de conteúdo"
							: "Acerte tudo para concluir"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
