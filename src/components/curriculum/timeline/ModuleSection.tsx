import * as LucideIcons from "lucide-react";
import type React from "react";
import { CefrBadge } from "@/components/common/CefrBadge";
import type { Module } from "@/lib/curriculumData";
import { getCEFRLevel } from "@/lib/curriculumData";
import { cn } from "@/lib/utils";
import { LessonCard } from "./LessonCard";

const getIcon = (name: string) => {
	const icons = LucideIcons as unknown as Record<string, React.ElementType>;
	return icons[name] || LucideIcons.HelpCircle;
};

interface ModuleSectionProps {
	module: Module;
	completedLessonsSet: Set<string>;
	firstIncompleteLessonId: string | null;
}

export function ModuleSection({
	module,
	completedLessonsSet,
	firstIncompleteLessonId,
}: ModuleSectionProps) {
	const Icon = getIcon(module.icon);

	return (
		<div className="relative ml-4 md:ml-8 pb-8 last:pb-0 flex flex-col gap-6">
			{/* Chapter Header (Module) */}
			<div className="flex items-center gap-4 mb-4 -ml-10 md:-ml-14 group">
				<div
					className={cn(
						"flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-lg border-4 border-background z-10 transition-transform hover:scale-110 duration-300",
						module.color,
						"text-white",
					)}
				>
					<Icon className="w-7 h-7 md:w-8 md:h-8 drop-shadow-md" />
				</div>
				<div className="flex flex-col pt-1">
					<div className="flex items-center gap-2 mb-0.5">
						<span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
							Capítulo {module.order}
						</span>
						<CefrBadge
							level={getCEFRLevel(module.unitId)}
							showDescriptionOnHover={false}
							className="px-1.5 py-0 text-[8px] sm:text-[9px]"
						/>
					</div>
					<h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
						{module.title_pt}
					</h3>
					<p className="text-sm text-muted-foreground hidden md:block">
						{module.description_pt}
					</p>
				</div>
			</div>

			{/* Lessons List */}
			<div className="flex flex-col gap-6">
				{module.lessons.map((lesson, _idx) => {
					const isCompleted = completedLessonsSet.has(
						`${module.id}:${lesson.id}`,
					);

					let status: "locked" | "active" | "completed" = "locked";
					let isFirstActive = false;

					if (isCompleted) {
						status = "completed";
					} else if (`${module.id}:${lesson.id}` === firstIncompleteLessonId) {
						status = "active";
						isFirstActive = true;
					}

					return (
						<LessonCard
							key={lesson.id}
							module={module}
							lesson={lesson}
							status={status}
							isFirstActive={isFirstActive}
						/>
					);
				})}
			</div>
		</div>
	);
}
