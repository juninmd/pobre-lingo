import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SearchResult } from "./searchData";

export function SearchResultItem({
	result,
	isSelected,
	onClick,
}: {
	result: SearchResult;
	isSelected: boolean;
	onClick: () => void;
}) {
	const Icon = result.icon;

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
				isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted",
			)}
		>
			<div
				className={cn(
					"p-2 rounded-lg",
					isSelected ? "bg-primary-foreground/20" : "bg-muted",
				)}
			>
				<Icon className="h-4 w-4" />
			</div>
			<div className="flex-1 min-w-0">
				<p className="font-medium truncate">{result.title}</p>
				{result.subtitle && (
					<p
						className={cn(
							"text-xs truncate",
							isSelected
								? "text-primary-foreground/70"
								: "text-muted-foreground",
						)}
					>
						{result.categoryName && <span>{result.categoryName} • </span>}
						{result.subtitle}
					</p>
				)}
				{result.tags && result.tags.length > 0 && (
					<div className="flex gap-1 mt-1">
						{result.tags.slice(0, 3).map((tag) => (
							<Badge
								key={tag}
								variant="secondary"
								className={cn(
									"text-[10px] px-1.5 py-0 h-4",
									isSelected &&
										"bg-primary-foreground/20 text-primary-foreground",
								)}
							>
								{tag}
							</Badge>
						))}
					</div>
				)}
			</div>
			<ArrowRight
				className={cn(
					"h-4 w-4 flex-shrink-0",
					isSelected ? "text-primary-foreground/70" : "text-muted-foreground",
				)}
			/>
		</button>
	);
}
