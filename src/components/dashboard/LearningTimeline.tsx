import * as LucideIcons from "lucide-react";
import {
	Bookmark,
	BookOpen,
	Check,
	ChevronRight,
	Lock,
	Medal,
	Play,
	Star,
	Trophy,
	Zap,
} from "lucide-react";
import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GuidebookModal } from "@/components/curriculum/GuidebookModal";
import { LessonStartModal } from "@/components/curriculum/LessonStartModal";
import { Button } from "@/components/ui/button";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import {
	curriculumData,
	type Lesson,
	Module,
	Unit,
} from "@/lib/curriculumData";
import { getLessonLink } from "@/lib/routes";
import { cn } from "@/lib/utils";

// Helper to get icon component dynamically
const getIcon = (name: string) => {
	const icons = LucideIcons as unknown as Record<string, React.ElementType>;
	return icons[name] || LucideIcons.HelpCircle;
};

export function LearningTimeline() {
	const { getModuleProgress, isModuleUnlocked, isLessonCompleted } =
		useCurriculumProgress();
	const navigate = useNavigate();
	const [selectedLesson, setSelectedLesson] = React.useState<Lesson | null>(
		null,
	);
	const [startLink, setStartLink] = React.useState<string>("");
	const [isStartModalOpen, setIsStartModalOpen] = React.useState(false);

	const handleLessonStart = (lesson: Lesson, link: string) => {
		setSelectedLesson(lesson);
		setStartLink(link);
		setIsStartModalOpen(true);
	};

	// Find the first unfinished lesson to bookmark
	const nextUp = useMemo(() => {
		for (const unit of curriculumData.units) {
			const modules = curriculumData.modules.filter(
				(m) => m.unitId === unit.id,
			);
			for (const module of modules) {
				if (!isModuleUnlocked(module)) continue;
				const progress = getModuleProgress(module.id);
				if (progress.completionPercentage < 100) {
					const firstIncomplete = module.lessons.find(
						(l) => !isLessonCompleted(module.id, l.id),
					);
					if (firstIncomplete) {
						return {
							module,
							lesson: firstIncomplete,
							link: getLessonLink(module, firstIncomplete),
						};
					}
				}
			}
		}
		return null;
	}, [getModuleProgress, isLessonCompleted, isModuleUnlocked]);

	return (
		<div className="w-full max-w-2xl mx-auto pb-32">
			<LessonStartModal
				isOpen={isStartModalOpen}
				onClose={() => setIsStartModalOpen(false)}
				onStart={() => {
					setIsStartModalOpen(false);
					navigate(startLink);
				}}
				lesson={selectedLesson}
			/>

			<div className="mb-10 px-4">
				<h1 className="text-3xl font-bold tracking-tight mb-2">My Journey</h1>
				<p className="text-muted-foreground">
					Keep moving forward, chapter by chapter.
				</p>

				{/* Bookmark / Resume Action */}
				{nextUp && (
					<div className="mt-6 p-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl animate-in slide-in-from-top-4 duration-700">
						<div className="bg-background/80 backdrop-blur-md rounded-xl p-4 flex items-center justify-between shadow-sm border border-white/10">
							<div className="flex items-center gap-4">
								<div className="bg-primary/10 p-3 rounded-full">
									<Bookmark className="w-6 h-6 text-primary fill-current" />
								</div>
								<div>
									<p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
										Continue where you left off
									</p>
									<p className="font-bold text-lg leading-tight">
										{nextUp.lesson.title_pt}
									</p>
								</div>
							</div>
							<Button
								onClick={() => handleLessonStart(nextUp.lesson, nextUp.link)}
								className="rounded-full px-6 shadow-lg shadow-primary/20"
							>
								Resume <ChevronRight className="w-4 h-4 ml-1" />
							</Button>
						</div>
					</div>
				)}
			</div>

			<div className="relative ml-4 md:ml-10 space-y-12">
				{/* The robust, wider gradient spine */}
				<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary/80 via-primary/40 to-border/20 -ml-[3px] rounded-full" />

				{curriculumData.units.map((unit, unitIndex) => {
					const modules = curriculumData.modules.filter(
						(m) => m.unitId === unit.id,
					);
					const isUnitLocked = modules.every((m) => !isModuleUnlocked(m));

					return (
						<div
							key={unit.id}
							className={cn(
								"relative pl-8 md:pl-12 py-2",
								isUnitLocked && "opacity-60 grayscale",
							)}
						>
							{/* Timeline Dot for Unit */}
							<div
								className={cn(
									"absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 border-background",
									isUnitLocked
										? "bg-muted-foreground/30"
										: "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]",
								)}
							/>

							<div className="mb-6 flex items-center justify-between">
								<div>
									<h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
										{unit.title}
									</h2>
									<p className="text-lg md:text-xl font-bold">
										{unit.description}
									</p>
								</div>
								<GuidebookModal
									unit={unit}
									trigger={
										<Button
											variant="outline"
											size="sm"
											className="gap-2 rounded-full border-primary/20 hover:bg-primary/5"
										>
											<BookOpen className="w-4 h-4" /> Guide
										</Button>
									}
								/>
							</div>

							<div className="grid gap-6">
								{modules.map((module) => {
									const moduleProgress = getModuleProgress(module.id);
									const isLocked = !isModuleUnlocked(module);
									const isCompleted =
										moduleProgress.completionPercentage >= 100;
									const Icon = getIcon(module.icon);

									const firstIncompleteLesson = module.lessons.find(
										(l) => !isLessonCompleted(module.id, l.id),
									);
									const targetLesson =
										firstIncompleteLesson ||
										module.lessons[module.lessons.length - 1];
									const lessonLink = isLocked
										? "#"
										: getLessonLink(module, targetLesson);

									const isActiveNext = !isLocked && !isCompleted;

									return (
										<div key={module.id} className="group relative">
											<Link
												to={lessonLink}
												onClick={(e) => {
													if (!isLocked && targetLesson) {
														e.preventDefault();
														handleLessonStart(targetLesson, lessonLink);
													}
												}}
												className={cn(
													"block rounded-2xl border transition-all duration-300 overflow-hidden",
													isLocked
														? "bg-muted/50 border-transparent cursor-not-allowed"
														: "bg-card border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
													isActiveNext &&
														"ring-2 ring-primary/50 ring-offset-2 ring-offset-background",
												)}
											>
												<div className="p-5 flex items-start gap-4">
													<div
														className={cn(
															"w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner",
															isLocked
																? "bg-muted text-muted-foreground/50"
																: `${module.color} text-white shadow-${module.color.replace("bg-", "")}/30`,
														)}
													>
														{isCompleted ? (
															<Check className="w-7 h-7 stroke-[3]" />
														) : (
															<Icon className="w-6 h-6" />
														)}
													</div>

													<div className="flex-1 min-w-0">
														<div className="flex items-center justify-between mb-1">
															<h3
																className={cn(
																	"font-bold truncate text-base",
																	isLocked
																		? "text-muted-foreground"
																		: "text-foreground",
																)}
															>
																{module.title_pt}
															</h3>
															{isCompleted && <BadgeIcon type="check" />}
														</div>
														<p className="text-sm text-muted-foreground line-clamp-2">
															{module.description_pt}
														</p>

														{/* Progress Bar inside Card */}
														{!isLocked && (
															<div className="mt-4 h-1.5 w-full bg-muted rounded-full overflow-hidden">
																<div
																	className={cn(
																		"h-full transition-all duration-1000",
																		module.color,
																	)}
																	style={{
																		width: `${moduleProgress.completionPercentage}%`,
																	}}
																/>
															</div>
														)}
													</div>

													{/* Action Icon */}
													<div className="self-center">
														{isLocked ? (
															<Lock className="w-5 h-5 text-muted-foreground/30" />
														) : isCompleted ? (
															<div className="bg-yellow-500/10 p-2 rounded-full">
																<Star className="w-5 h-5 text-yellow-500 fill-current" />
															</div>
														) : (
															<div className="bg-primary/10 p-2 rounded-full group-hover:scale-110 transition-transform animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.3)]">
																<Play className="w-5 h-5 text-primary fill-current pl-0.5" />
															</div>
														)}
													</div>
												</div>
											</Link>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function BadgeIcon({ type }: { type: "check" | "trophy" }) {
	if (type === "check") return null; // Simplified
	return <Trophy className="w-4 h-4 text-yellow-500" />;
}
