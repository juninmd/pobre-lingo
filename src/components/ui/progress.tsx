"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

interface ProgressProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
	value?: number;
	max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
	({ className, value, max = 100, ...props }, ref) => {
		// Out-of-range or NaN values would make Radix report an indeterminate bar.
		const safeValue = Math.min(
			Math.max(Number.isFinite(value) ? (value as number) : 0, 0),
			max,
		);
		return (
			<ProgressPrimitive.Root
				ref={ref}
				value={safeValue}
				max={max}
				// A named bar is required by assistive tech; callers narrow it with their own label.
				aria-label={props["aria-labelledby"] ? undefined : "Progresso"}
				className={cn(
					"relative h-4 w-full overflow-hidden rounded-full bg-secondary",
					className,
				)}
				{...props}
			>
				<ProgressPrimitive.Indicator
					className="h-full w-full flex-1 bg-primary transition-all"
					style={{
						transform: `translateX(-${100 - (safeValue / max) * 100}%)`,
					}}
				/>
			</ProgressPrimitive.Root>
		);
	},
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
