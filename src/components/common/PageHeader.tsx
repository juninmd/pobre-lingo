import { ArrowLeft, type LucideIcon } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";
import { CefrBadge } from "@/components/common/CefrBadge";
import { Button } from "@/components/ui/button";
import { useLessonFromUrl } from "@/contexts/ActiveLessonContext";
import { type CEFRLevel, getCEFRLevel } from "@/lib/curriculumData";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
	title: string;
	description?: string;
	icon?: LucideIcon;
	iconClassName?: string;
	children?: React.ReactNode;
	className?: string;
	backLink?: string;
	backLabel?: string;
	cefrLevel?: CEFRLevel;
}

export function PageHeader({
	title,
	description,
	icon: Icon,
	iconClassName,
	children,
	className,
	backLink,
	backLabel = "Voltar",
	cefrLevel,
}: PageHeaderProps) {
	const { module } = useLessonFromUrl();
	const activeCefr =
		cefrLevel || (module ? getCEFRLevel(module.unitId) : undefined);

	return (
		<div
			className={cn(
				"relative mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border overflow-hidden",
				className,
			)}
		>
			{/* Ícone decorativo de fundo */}
			{Icon && (
				<div className="absolute top-0 right-0 opacity-10">
					<Icon
						className={cn(
							"h-32 w-32 md:h-40 md:w-40 text-primary",
							iconClassName,
						)}
					/>
				</div>
			)}

			<div className="relative">
				{backLink && (
					<Button
						variant="ghost"
						size="sm"
						className="mb-4 pl-0 hover:pl-2 transition-all"
						asChild
					>
						<Link to={backLink}>
							<ArrowLeft className="h-4 w-4 mr-2" />
							{backLabel}
						</Link>
					</Button>
				)}

				<h1 className="text-2xl md:text-4xl font-bold mb-2 flex items-center flex-wrap gap-3">
					{Icon && (
						<Icon className={cn("h-8 w-8 md:h-10 md:w-10", iconClassName)} />
					)}
					<span>{title}</span>
					{activeCefr && <CefrBadge level={activeCefr} />}
				</h1>
				{description && (
					<p className="text-muted-foreground text-base md:text-lg max-w-2xl">
						{description}
					</p>
				)}
				{children && <div className="mt-4">{children}</div>}
			</div>
		</div>
	);
}
