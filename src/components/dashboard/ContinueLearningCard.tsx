import * as LucideIcons from "lucide-react";
import { ArrowRight, Clock, PartyPopper, Star } from "lucide-react";
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
		<Card className="border-2 border-primary/40 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/15 transition-shadow">
			<CardContent className="p-4 sm:p-5">
				<div className="flex items-center gap-4">
					{/* Module Icon */}
					<div
						className={cn(
							"flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shrink-0 text-white shadow-md",
							module.color,
						)}
					>
						<ModuleIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow" />
					</div>

					{/* Content */}
					<div className="flex-1 min-w-0">
						<p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
							Continuar — {module.title_pt}
						</p>
						<h3 className="text-base sm:text-lg font-bold text-foreground truncate">
							{lesson.title_pt}
						</h3>
						<div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
							<span className="flex items-center gap-1">
								<Clock className="w-3 h-3" />
								{lesson.estimatedMinutes} min
							</span>
							<span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
								<Star className="w-3 h-3 fill-current" />+{lesson.xpReward} XP
							</span>
						</div>
					</div>

					{/* CTA */}
					<Button
						asChild
						size="sm"
						className="shrink-0 gap-1.5 font-bold shadow-md shadow-primary/20"
					>
						<Link to={link}>
							<span className="hidden sm:inline">Continuar</span>
							<ArrowRight className="w-4 h-4" />
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
