import * as LucideIcons from "lucide-react";
import { ArrowRight, Clock, PartyPopper, Play, Star } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { curriculumData, type Lesson, type Module } from "@/lib/curriculumData";
import { getLessonLink } from "@/lib/lessonLink";
import { cn } from "@/lib/utils";

const getIcon = (name: string) => {
	const icons = LucideIcons as unknown as Record<string, React.ElementType>;
	return icons[name] || LucideIcons.BookOpen;
};

interface NextLesson {
	module: Module;
	lesson: Lesson;
	link: string;
}

export function ContinueLearningCard() {
	const { isLessonCompleted } = useCurriculumProgress();

	const next = useMemo((): NextLesson | null => {
		for (const module of [...curriculumData.modules].sort(
			(a, b) => a.order - b.order,
		)) {
			for (const lesson of [...module.lessons].sort(
				(a, b) => a.order - b.order,
			)) {
				if (!isLessonCompleted(module.id, lesson.id)) {
					return { module, lesson, link: getLessonLink(module, lesson) };
				}
			}
		}
		return null;
	}, [isLessonCompleted]);

	if (!next) {
		return (
			<Card className="border-2 border-green-400/50 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30">
				<CardContent className="p-4 sm:p-5 flex items-center gap-4">
					<div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400">
						<PartyPopper className="w-7 h-7" />
					</div>
					<div>
						<p className="font-bold text-green-700 dark:text-green-300 text-base">
							Curso completo!
						</p>
						<p className="text-sm text-green-600/80 dark:text-green-400/70">
							Você completou toda a jornada. Parabéns!
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	const { module, lesson, link } = next;
	const ModuleIcon = getIcon(module.icon);

	return (
		<Card className="border-[3px] border-primary/30 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98]">
			{/* Shimmer effect */}
			<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

			<CardContent className="p-4 sm:p-5 md:p-6 relative z-10">
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
					<div className="flex items-center gap-4 flex-1 w-full">
						{/* Module Icon */}
						<div
							className={cn(
								"flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0 text-white shadow-lg ring-4 ring-background",
								module.color,
							)}
						>
							<ModuleIcon className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md" />
						</div>

						{/* Content */}
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-1">
								<span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
									A SEGUIR
								</span>
								<p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground truncate">
									{module.title_pt}
								</p>
							</div>
							<h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-foreground truncate group-hover:text-primary transition-colors">
								{lesson.title_pt}
							</h3>
							<div className="flex items-center gap-3 mt-1.5 text-xs sm:text-sm font-semibold text-muted-foreground">
								<span className="flex items-center gap-1.5 bg-background/50 px-2 py-1 rounded-md">
									<Clock className="w-3.5 h-3.5" />
									{lesson.estimatedMinutes} min
								</span>
								<span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md">
									<Star className="w-3.5 h-3.5 fill-current" />+
									{lesson.xpReward} XP
								</span>
							</div>
						</div>
					</div>

					{/* CTA */}
					<Button
						asChild
						variant="gamified"
						size="lg"
						className="w-full sm:w-auto shrink-0 gap-2 font-black text-base rounded-xl group/btn"
					>
						<Link
							to={link}
							aria-label={`Continuar aprendendo: ${lesson.title_pt}`}
						>
							<Play className="w-5 h-5 fill-current animate-pulse group-hover/btn:scale-125 transition-transform" />
							<span>Começar Agora</span>
							<ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
