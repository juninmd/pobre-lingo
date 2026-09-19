import * as LucideIcons from "lucide-react";
import {
	ArrowRight,
	Award,
	BookOpen,
	Clock,
	Flame,
	Mic,
	Play,
	Star,
	Target,
	Trophy,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { curriculumData, type Lesson, type Module } from "@/lib/curriculumData";
import { cn } from "@/lib/utils";

const lessonTypeConfig = {
	grammar: {
		label: "Gramática",
		icon: BookOpen,
		color: "text-primary",
		bgColor: "bg-primary/10",
	},
	vocabulary: {
		label: "Vocabulário",
		icon: Star,
		color: "text-brand-violet",
		bgColor: "bg-brand-violet/10",
	},
	exercise: {
		label: "Exercício",
		icon: Target,
		color: "text-brand-aqua",
		bgColor: "bg-brand-aqua/10",
	},
	reading: {
		label: "Leitura",
		icon: BookOpen,
		color: "text-primary",
		bgColor: "bg-primary/10",
	},
	quiz: {
		label: "Quiz",
		icon: Trophy,
		color: "text-brand-gold",
		bgColor: "bg-brand-gold/10",
	},
	culture: {
		label: "Cultura",
		icon: LucideIcons.Globe,
		color: "text-brand-aqua",
		bgColor: "bg-brand-aqua/10",
	},
	speaking: {
		label: "Fala",
		icon: Mic,
		color: "text-destructive",
		bgColor: "bg-destructive/10",
	},
};

function getLessonLink(module: Module, lesson: Lesson): string {
	if (lesson.exerciseType) {
		return `/exercises/${lesson.exerciseType}?module=${module.id}&lesson=${lesson.id}`;
	}
	if (lesson.type === "vocabulary" || lesson.type === "speaking") {
		return `/vocabulary/${module.id}/${lesson.id}`;
	}
	if (lesson.type === "quiz") {
		return `/quiz/${module.id}/${lesson.id}`;
	}
	if (lesson.type === "grammar" && lesson.grammarRuleIds?.length) {
		return `/rules?module=${module.id}&lesson=${lesson.id}&ruleIds=${lesson.grammarRuleIds.join(",")}`;
	}
	if (lesson.type === "reading") {
		return `/exercises/news-comprehension?module=${module.id}&lesson=${lesson.id}`;
	}
	return `/rules?module=${module.id}&lesson=${lesson.id}`;
}

export function CurriculumProgressCard() {
	const {
		isModuleUnlocked,
		getModuleProgress,
		overallProgress,
		totalXP,
		userLevel,
		isLessonCompleted,
	} = useCurriculumProgress();

	// Encontrar a próxima lição não completada
	const findNextLesson = (): {
		module: Module;
		lesson: Lesson;
		lessonIndex: number;
	} | null => {
		for (const module of curriculumData.modules) {
			if (!isModuleUnlocked(module)) continue;
			for (let i = 0; i < module.lessons.length; i++) {
				const lesson = module.lessons[i];
				if (!isLessonCompleted(module.id, lesson.id)) {
					return { module, lesson, lessonIndex: i };
				}
			}
		}
		return null;
	};

	const nextLesson = findNextLesson();

	// Módulos por dificuldade
	const basicModules = curriculumData.modules.filter(
		(m) => m.difficulty === "basico",
	);
	const intermediateModules = curriculumData.modules.filter(
		(m) => m.difficulty === "intermediario",
	);
	const advancedModules = curriculumData.modules.filter(
		(m) => m.difficulty === "avancado",
	);

	const basicCompleted = basicModules.filter(
		(m) => getModuleProgress(m.id).completionPercentage === 100,
	).length;
	const intermediateCompleted = intermediateModules.filter(
		(m) => getModuleProgress(m.id).completionPercentage === 100,
	).length;
	const advancedCompleted = advancedModules.filter(
		(m) => getModuleProgress(m.id).completionPercentage === 100,
	).length;

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>Sua Jornada de Aprendizado</CardTitle>
						<CardDescription>
							Progresso estruturado do básico ao avançado
						</CardDescription>
					</div>
					<Link to="/">
						<Button variant="outline" size="sm">
							Ver Tudo
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Estatísticas Rápidas */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="space-y-1">
						<p className="text-sm text-muted-foreground">Nível</p>
						<p className="text-2xl font-bold flex items-center gap-1">
							<Star className="h-5 w-5 text-brand-gold" />
							{userLevel}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-sm text-muted-foreground">XP Total</p>
						<p className="text-2xl font-bold">{totalXP}</p>
					</div>
					<div className="space-y-1">
						<p className="text-sm text-muted-foreground">Progresso</p>
						<p className="text-2xl font-bold">
							{overallProgress.overallPercentage}%
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-sm text-muted-foreground">Módulos</p>
						<p className="text-2xl font-bold">
							{overallProgress.completedModules}/{overallProgress.totalModules}
						</p>
					</div>
				</div>

				{/* Barra de Progresso Geral */}
				<div>
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm font-medium">Progresso Geral</span>
						<span className="text-sm text-muted-foreground">
							{overallProgress.completedLessons} de{" "}
							{overallProgress.totalLessons} lições
						</span>
					</div>
					<Progress value={overallProgress.overallPercentage} className="h-3" />
				</div>

				{/* Progresso por Nível */}
				<div className="space-y-3">
					<h4 className="text-sm font-semibold">Progresso por Nível</h4>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-brand-aqua" />
								<span className="text-sm">Básico</span>
							</div>
							<span className="text-sm font-medium">
								{basicCompleted}/{basicModules.length}
							</span>
						</div>
						<Progress
							value={(basicCompleted / basicModules.length) * 100}
							className="h-2"
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-brand-gold" />
								<span className="text-sm">Intermediário</span>
							</div>
							<span className="text-sm font-medium">
								{intermediateCompleted}/{intermediateModules.length}
							</span>
						</div>
						<Progress
							value={(intermediateCompleted / intermediateModules.length) * 100}
							className="h-2"
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-destructive" />
								<span className="text-sm">Avançado</span>
							</div>
							<span className="text-sm font-medium">
								{advancedCompleted}/{advancedModules.length}
							</span>
						</div>
						<Progress
							value={(advancedCompleted / advancedModules.length) * 100}
							className="h-2"
						/>
					</div>
				</div>

				{/* Próxima Lição */}
				{nextLesson && (
					<div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
						<div className="flex items-start gap-3">
							<div
								className={cn(
									"w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
									lessonTypeConfig[nextLesson.lesson.type].bgColor,
								)}
							>
								{React.createElement(
									lessonTypeConfig[nextLesson.lesson.type].icon,
									{
										className: cn(
											"h-5 w-5",
											lessonTypeConfig[nextLesson.lesson.type].color,
										),
									},
								)}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<h4 className="font-semibold text-sm flex items-center gap-1">
										<Flame className="h-4 w-4 text-brand-gold" />
										Continue Aprendendo
									</h4>
								</div>
								<p className="font-medium text-sm mb-1">
									{nextLesson.lesson.title_pt}
								</p>
								<p className="text-xs text-muted-foreground mb-2">
									{nextLesson.module.title_pt} • Lição{" "}
									{nextLesson.lessonIndex + 1} de{" "}
									{nextLesson.module.lessons.length}
								</p>
								<div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
									<span className="flex items-center gap-1">
										<Clock className="h-3 w-3" />
										{nextLesson.lesson.estimatedMinutes} min
									</span>
									<span className="flex items-center gap-1">
										<Star className="h-3 w-3 text-brand-gold" />+
										{nextLesson.lesson.xpReward} XP
									</span>
									<Badge variant="outline" className="text-[10px]">
										{lessonTypeConfig[nextLesson.lesson.type].label}
									</Badge>
								</div>
								<Link to={getLessonLink(nextLesson.module, nextLesson.lesson)}>
									<Button size="sm" className="w-full">
										<Play className="h-4 w-4 mr-2" />
										Começar Lição
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				)}

				{/* Mensagem de Motivação */}
				{overallProgress.completedLessons === 0 && (
					<div className="text-center p-4 bg-gradient-to-r from-brand-aqua/10 to-primary/10 rounded-lg border border-brand-aqua/30">
						<Award className="h-8 w-8 text-brand-aqua mx-auto mb-2" />
						<h4 className="font-semibold mb-1">Comece Sua Jornada!</h4>
						<p className="text-sm text-muted-foreground mb-3">
							Aprenda inglês do básico ao avançado com um currículo estruturado
						</p>
						<Link to="/">
							<Button size="sm" className="w-full">
								Iniciar Agora
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</div>
				)}

				{/* Jornada Completa */}
				{!nextLesson && overallProgress.completedLessons > 0 && (
					<div className="text-center p-4 bg-gradient-to-r from-brand-gold/15 to-brand-gold/5 rounded-lg border border-brand-gold/30">
						<Trophy className="h-8 w-8 text-brand-gold mx-auto mb-2" />
						<h4 className="font-semibold mb-1">🎉 Parabéns!</h4>
						<p className="text-sm text-muted-foreground mb-3">
							Você completou toda a jornada de aprendizado!
						</p>
						<Link to="/">
							<Button size="sm" variant="outline" className="w-full">
								Ver Conquistas
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
