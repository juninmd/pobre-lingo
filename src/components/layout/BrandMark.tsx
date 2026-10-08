import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
	compact?: boolean;
	/** Visual context: the sidebar sits on a dark surface. */
	variant?: "sidebar" | "header";
	className?: string;
};

export function BrandMark({
	compact = false,
	variant = "header",
	className,
}: BrandMarkProps) {
	const subtitleClass =
		variant === "sidebar"
			? "text-sidebar-foreground/70"
			: "text-muted-foreground";

	return (
		<div className={cn("flex items-center gap-3 min-w-0", className)}>
			<div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet via-brand-violet to-brand-aqua shadow-lg shadow-primary/30">
				<GraduationCap className="h-5 w-5 text-white" strokeWidth={2.4} />
				<span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
			</div>
			{!compact && (
				<div className="hidden md:flex min-w-0 flex-col">
					<span className="font-headline text-base font-extrabold tracking-tight text-gradient-primary truncate">
						PobreLingo
					</span>
					<span
						className={cn(
							"text-[11px] font-semibold uppercase tracking-[0.14em]",
							subtitleClass,
						)}
					>
						Aprenda Grátis
					</span>
				</div>
			)}
		</div>
	);
}
