import { Award, CheckCircle2, ListChecks, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { CheckpointQuiz } from "@/components/curriculum/CheckpointQuiz";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCanDo } from "@/hooks/useCanDo";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { cefrConfig, type CEFRLevel } from "@/lib/curriculumData";
import { canDoStatements, checkpointQuestions } from "@/lib/levelCheckpoints";
import { CEFR_ORDER, getLevelStages } from "@/lib/levels";
import { cn } from "@/lib/utils";

export default function CheckpointsPage() {
	const { completedLessons } = useCurriculumProgress();
	const { isChecked, toggleChecked, isPassed, markPassed } = useCanDo();
	const [quizLevel, setQuizLevel] = useState<CEFRLevel | null>(null);

	const stages = useMemo(() => {
		const set = new Set(
			completedLessons.map((item) => `${item.moduleId}:${item.lessonId}`),
		);
		return getLevelStages(set);
	}, [completedLessons]);

	return (
		<PageContainer className="max-w-4xl mx-auto">
			<PageHeader
				title="Checkpoints & Can-do"
				description="Provas por nível e checklist 'consigo fazer' — como os exames de uma escola de idiomas."
				icon={Award}
				iconClassName="text-brand-gold"
			/>

			<div className="space-y-4">
				{CEFR_ORDER.map((level) => {
					const stage = stages.find((item) => item.level === level);
					const statements = canDoStatements[level];
					const checkedCount = statements.filter((item) => isChecked(item.id)).length;
					const passed = isPassed(level);
					const unlocked = level === "A1" || (stage?.percent ?? 0) > 0;

					return (
						<Card key={level} className="glass-card">
							<CardContent className="p-5 space-y-4">
								<div className="flex flex-wrap items-center justify-between gap-3">
									<div className="flex items-center gap-3">
										<Badge
											className={cn(
												"text-xs font-black px-2 py-0.5",
												cefrConfig[level].badgeClass,
											)}
										>
											{level}
										</Badge>
										<div>
											<p className="font-headline font-bold">
												{cefrConfig[level].label}
											</p>
											<p className="text-xs text-muted-foreground">
												Lições do nível: {stage?.percent ?? 0}% · Can-do:{" "}
												{checkedCount}/{statements.length}
											</p>
										</div>
									</div>
									{passed ? (
										<Badge className="bg-brand-aqua/15 text-brand-aqua border border-brand-aqua/30 gap-1">
											<CheckCircle2 className="h-3 w-3" />
											Aprovado
										</Badge>
									) : unlocked ? (
										<Button
											size="sm"
											variant="outline"
											onClick={() =>
												setQuizLevel(quizLevel === level ? null : level)
											}
										>
											{quizLevel === level ? "Fechar" : "Fazer checkpoint"}
										</Button>
									) : (
										<Badge variant="outline" className="gap-1">
											<Lock className="h-3 w-3" />
											Bloqueado
										</Badge>
									)}
								</div>

								<Progress value={stage?.percent ?? 0} className="h-1.5" />

								<div className="space-y-1.5">
									<p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
										<ListChecks className="h-3.5 w-3.5" />
										Consigo fazer
									</p>
									{statements.map((statement) => (
										<button
											key={statement.id}
											type="button"
											onClick={() => toggleChecked(statement.id)}
											className={cn(
												"flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted/60",
												isChecked(statement.id) && "text-brand-aqua",
											)}
										>
											<CheckCircle2
												className={cn(
													"h-4 w-4 shrink-0",
													isChecked(statement.id)
														? "text-brand-aqua"
														: "text-muted-foreground/50",
												)}
											/>
											{statement.text}
										</button>
									))}
								</div>

								{quizLevel === level && (
									<CheckpointQuiz
										level={level}
										questions={checkpointQuestions[level]}
										onPass={() => {
											markPassed(level);
											setQuizLevel(null);
										}}
									/>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</PageContainer>
	);
}
