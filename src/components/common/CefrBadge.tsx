import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { type CEFRLevel, cefrConfig } from "@/lib/curriculumData";
import { cn } from "@/lib/utils";

interface CefrBadgeProps {
	level: CEFRLevel;
	className?: string;
	showDescriptionOnHover?: boolean;
}

export function CefrBadge({
	level,
	className,
	showDescriptionOnHover = true,
}: CefrBadgeProps) {
	const config = cefrConfig[level];
	if (!config) return null;

	const badge = (
		<Badge
			className={cn(
				"font-black tracking-wide text-[11px] sm:text-xs px-2 py-0.5 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 border cursor-help select-none",
				config.badgeClass,
				config.borderColor,
				className,
			)}
		>
			{level}
		</Badge>
	);

	if (!showDescriptionOnHover) {
		return badge;
	}

	return (
		<TooltipProvider>
			<Tooltip delayDuration={200}>
				<TooltipTrigger asChild>{badge}</TooltipTrigger>
				<TooltipContent className="max-w-xs p-3 space-y-1 bg-popover/95 backdrop-blur-sm border shadow-lg">
					<p className="font-bold text-sm text-foreground flex items-center gap-2">
						<span
							className={cn(
								"w-2.5 h-2.5 rounded-full inline-block",
								config.color,
							)}
						/>
						{config.label}
					</p>
					<p className="text-xs text-muted-foreground leading-relaxed">
						{config.description}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
