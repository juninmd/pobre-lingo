import { CheckCircle2, ChevronRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { GuidebookModal } from "@/components/curriculum/GuidebookModal";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { curriculumData } from "@/lib/curriculumData";
import { getIcon } from "@/lib/iconMap";
import { cn } from "@/lib/utils";

export function CurriculumList() {
	const { getModuleProgress } = useCurriculumProgress();

	const getStatus = (moduleId: string) => {
		const progress = getModuleProgress(moduleId);
		if (progress.completionPercentage === 100) return "completed";
		return "active";
	};

	const getProgressVal = (moduleId: string) => {
		return getModuleProgress(moduleId).completionPercentage;
	};

	return (
		<div className="space-y-12 max-w-4xl mx-auto pb-12">
			{curriculumData.units.map((unit) => {
				const unitModules = curriculumData.modules.filter(
					(m) => m.unitId === unit.id,
				);

				return (
					<div key={unit.id} className="space-y-4">
						{/* Unit Header */}
						<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-xl border shadow-sm relative overflow-hidden">
							{/* Decorative Background */}
							<div
								className={cn(
									"absolute top-0 left-0 w-2 h-full",
									unit.difficulty === "basico"
										? "bg-green-500"
										: unit.difficulty === "intermediario"
											? "bg-blue-500"
											: "bg-purple-500",
								)}
							/>

							<div className="space-y-1 z-10">
								<div className="flex items-center gap-2">
									<Badge
										variant="outline"
										className={cn(
											"uppercase text-[11px] tracking-wider font-bold",
											unit.difficulty === "basico"
												? "text-green-600 border-green-200 bg-green-50"
												: unit.difficulty === "intermediario"
													? "text-blue-600 border-blue-200 bg-blue-50"
													: "text-purple-600 border-purple-200 bg-purple-50",
										)}
									>
										Nível {unit.difficulty}
									</Badge>
									{unit.id === "unit-10" && (
										<Trophy className="w-4 h-4 text-yellow-500" />
									)}
								</div>
								<h2 className="text-2xl font-bold tracking-tight">
									{unit.title}
								</h2>
								<p className="text-muted-foreground max-w-xl">
									{unit.description}
								</p>
							</div>

							<div className="flex items-center gap-2 z-10">
								<GuidebookModal unit={unit} />
							</div>
						</div>

						{/* Modules Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{unitModules.map((module) => {
								const status = getStatus(module.id);
								const progress = getProgressVal(module.id);
								const Icon = getIcon(module.icon);

								// Construct link to first uncompleted lesson or first lesson if done
								const firstLesson = module.lessons[0];
								const link = `/vocabulary/${module.id}/${firstLesson.id}`; // Simplified for demo, ideally finds next lesson

								return (
									<Link
										key={module.id}
										to={link}
										className={cn(
											"group relative flex flex-col justify-between p-5 h-full rounded-xl border bg-card transition-all duration-200",
											"hover:border-primary/50 hover:shadow-md cursor-pointer",
										)}
									>
										<div className="flex justify-between items-start mb-4">
											<div
												className={cn(
													"p-3 rounded-lg transition-colors",
													status === "completed"
														? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
														: "bg-primary/10 text-primary",
												)}
											>
												<Icon className="w-6 h-6" />
											</div>

											{status === "completed" && (
												<div className="bg-green-500 text-white rounded-full p-1">
													<CheckCircle2 className="w-4 h-4" />
												</div>
											)}
										</div>

										<div className="space-y-3">
											<div>
												<h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
													{module.title_pt}
												</h3>
												<p className="text-sm text-muted-foreground line-clamp-2 mt-1">
													{module.description_pt}
												</p>
											</div>

											<div className="space-y-1.5">
												<div className="flex justify-between text-xs font-medium text-muted-foreground">
													<span>Progresso</span>
													<span>{Math.round(progress)}%</span>
												</div>
												<Progress value={progress} className="h-2" />
											</div>

											{status === "active" && progress === 0 && (
												<div className="inline-flex items-center text-xs font-bold text-primary uppercase tracking-wider">
													Começar <ChevronRight className="w-3 h-3 ml-1" />
												</div>
											)}
										</div>
									</Link>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
