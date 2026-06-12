import {
	ArrowRight,
	BookOpen,
	CheckCircle2,
	Lock,
	Star,
	Trophy,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { curriculumData, Lesson, Module } from "@/lib/curriculumData";
import { getLessonLink } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface LessonProgressBarProps {
	moduleId?: string;
	lessonId?: string;
	onComplete?: () => void;
	showCompleteButton?: boolean;
	xpReward?: number;
	className?: string;
}

export function LessonProgressBar({
	moduleId,
	lessonId,
	onComplete,
	showCompleteButton = true,
	xpReward,
	className,
}: LessonProgressBarProps) {
	const {
		completeLesson,
		isLessonCompleted,
		getModuleProgress,
		totalXP,
		userLevel,
	} = useCurriculumProgress();

	// Se não houver moduleId/lessonId, não mostrar nada
	if (!moduleId || !lessonId) {
		return null;
	}

	const module = curriculumData.modules.find((m) => m.id === moduleId);
	const lesson = module?.lessons.find((l) => l.id === lessonId);
	const isCompleted = isLessonCompleted(moduleId, lessonId);
	const moduleProgress = getModuleProgress(moduleId);

	// Encontrar a próxima lição
	const currentLessonIndex =
		module?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
	const nextLesson = module?.lessons[currentLessonIndex + 1];

	// Encontrar próximo módulo se não houver próxima lição
	const currentModuleIndex = curriculumData.modules.findIndex(
		(m) => m.id === moduleId,
	);
	const nextModule = curriculumData.modules[currentModuleIndex + 1];

	const handleComplete = () => {
		if (!isCompleted && moduleId && lessonId) {
			const reward = xpReward ?? lesson?.xpReward ?? 50;
			completeLesson(moduleId, lessonId, reward);
			onComplete?.();
		}
	};

	const getNextLink = (): string | null => {
		if (!module) return null;

		if (nextLesson) {
			return getLessonLink(module, nextLesson);
		}

		// Se módulo completo, ir para próximo módulo (ou dashboard)
		return "/";
	};

	if (!module || !lesson) {
		return null;
	}

	const nextLink = getNextLink();

	return (
		<Card
			className={cn(
				"bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20",
				className,
			)}
		>
			<CardContent className="p-4">
				<div className="flex flex-col gap-4">
					{/* Header com informações do módulo/lição */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Badge variant="outline" className="bg-background">
								<BookOpen className="h-3 w-3 mr-1" />
								{module.title_pt}
							</Badge>
							<span className="text-muted-foreground">›</span>
							<span className="text-sm font-medium">{lesson.title_pt}</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="flex items-center gap-1">
								<Star className="h-3 w-3 text-yellow-500" />
								{lesson.xpReward} XP
							</Badge>
							{isCompleted && (
								<Badge className="bg-green-500 flex items-center gap-1">
									<CheckCircle2 className="h-3 w-3" />
									Dominada
								</Badge>
							)}
						</div>
					</div>

					{/* Barra de progresso do módulo */}
					<div className="space-y-1">
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Progresso do Módulo</span>
							<span>
								{moduleProgress.lessonsCompleted}/{moduleProgress.totalLessons}{" "}
								lições
							</span>
						</div>
						<Progress
							value={moduleProgress.completionPercentage}
							className="h-2"
						/>
					</div>

					{/* Botões de ação */}
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-2 text-sm">
							<Trophy className="h-4 w-4 text-yellow-600" />
							<span>Nível {userLevel}</span>
							<span className="text-muted-foreground">•</span>
							<span>{totalXP} XP total</span>
						</div>

						<div className="flex items-center gap-2">
							{showCompleteButton && !isCompleted && (
								<Button
									onClick={handleComplete}
									className="bg-green-600 hover:bg-green-700"
								>
									<CheckCircle2 className="h-4 w-4 mr-2" />
									Marcar como Dominada
								</Button>
							)}

							{isCompleted && (
								<>
									{nextLink && nextLink !== "/" ? (
										<Link to={nextLink}>
											<Button variant="default">
												Próxima Lição
												<ArrowRight className="h-4 w-4 ml-2" />
											</Button>
										</Link>
									) : moduleProgress.completionPercentage === 100 ? (
										<Link to="/">
											<Button
												variant="default"
												className="bg-yellow-600 hover:bg-yellow-700"
											>
												<Trophy className="h-4 w-4 mr-2" />
												Módulo Completo!
											</Button>
										</Link>
									) : (
										<Link to="/">
											<Button variant="outline">
												Ver Jornada
												<ArrowRight className="h-4 w-4 ml-2" />
											</Button>
										</Link>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

// Componente simplificado para uso em cards menores
interface QuickCompleteButtonProps {
	moduleId: string;
	lessonId: string;
	xpReward?: number;
	onComplete?: () => void;
	size?: "sm" | "default";
}

export function QuickCompleteButton({
	moduleId,
	lessonId,
	xpReward,
	onComplete,
	size = "default",
}: QuickCompleteButtonProps) {
	const { completeLesson, isLessonCompleted } = useCurriculumProgress();
	const isCompleted = isLessonCompleted(moduleId, lessonId);

	const module = curriculumData.modules.find((m) => m.id === moduleId);
	const lesson = module?.lessons.find((l) => l.id === lessonId);

	const handleComplete = () => {
		if (!isCompleted) {
			const reward = xpReward ?? lesson?.xpReward ?? 50;
			completeLesson(moduleId, lessonId, reward);
			onComplete?.();
		}
	};

	if (isCompleted) {
		return (
			<Badge className="bg-green-500 flex items-center gap-1">
				<CheckCircle2 className={cn("h-3 w-3", size === "sm" && "h-2 w-2")} />
				{size === "default" && "Dominada"}
			</Badge>
		);
	}

	return (
		<Button
			onClick={handleComplete}
			size={size}
			className="bg-green-600 hover:bg-green-700"
		>
			<CheckCircle2
				className={cn("mr-1", size === "sm" ? "h-3 w-3" : "h-4 w-4")}
			/>
			{size === "default" ? "Marcar como Dominada" : "Dominar"}
		</Button>
	);
}
