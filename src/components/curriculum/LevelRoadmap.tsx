import { Check, Lock, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cefrConfig } from "@/lib/curriculumData";
import { getLevelStages } from "@/lib/levels";
import { cn } from "@/lib/utils";

interface LevelRoadmapProps {
	completedLessons: Set<string>;
}

export function LevelRoadmap({ completedLessons }: LevelRoadmapProps) {
	const stages = getLevelStages(completedLessons);
	const current = stages.find((stage) => stage.status === "current");

	return (
		<section className="rounded-3xl border border-border/60 bg-card/50 backdrop-blur-xl p-4 sm:p-6 shadow-sm">
			<header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
				<div className="min-w-0">
					<div className="inline-flex items-center gap-2 text-primary text-[11px] font-bold uppercase tracking-[0.16em] mb-1">
						<Target className="h-3.5 w-3.5" />
						Trilha da Fluência
					</div>
					<h2 className="font-headline text-lg sm:text-xl font-bold tracking-tight">
						Do zero ao C2, como numa escola de idiomas
					</h2>
					<p className="text-sm text-muted-foreground mt-1">
						{current
							? `Você está no nível ${current.level} · ${current.name}. Conclua as lições para liberar o próximo nível.`
							: "Você concluiu todos os níveis. Excelente jornada!"}
					</p>
				</div>
				<Button asChild size="sm" variant="outline" className="shrink-0">
					<Link to="/proficiency">Fazer teste de nível</Link>
				</Button>
			</header>

			<div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
				{stages.map((stage) => {
					const config = cefrConfig[stage.level];
					return (
						<div
							key={stage.level}
							className={cn(
								"relative rounded-2xl border p-3 transition-all duration-300",
								stage.status === "current" &&
									"border-primary/50 bg-primary/5 ring-2 ring-primary/20",
								stage.status === "completed" &&
									"border-brand-aqua/40 bg-brand-aqua/5",
								stage.status === "locked" &&
									"border-border/50 bg-muted/20 opacity-70",
							)}
							title={config.description}
						>
							<div className="flex items-center justify-between mb-2">
								<Badge
									className={cn(
										"text-[10px] font-black px-1.5 py-0 shadow-sm",
										config.badgeClass,
									)}
								>
									{stage.level}
								</Badge>
								{stage.status === "completed" && (
									<Check className="h-4 w-4 text-brand-aqua" />
								)}
								{stage.status === "current" && (
									<Sparkles className="h-4 w-4 text-primary animate-pulse" />
								)}
								{stage.status === "locked" && (
									<Lock className="h-3.5 w-3.5 text-muted-foreground" />
								)}
							</div>
							<p className="text-xs font-bold leading-tight">{stage.name}</p>
							<p className="text-[10px] text-muted-foreground mb-2">
								{stage.completedCount}/{stage.lessonCount} lições
							</p>
							<Progress value={stage.percent} className="h-1.5" />
							{stage.status === "current" && (
								<span className="mt-1.5 block text-[10px] font-bold text-primary">
									Você está aqui
								</span>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}
