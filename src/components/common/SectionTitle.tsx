import type { ReactNode } from "react";

interface SectionTitleProps {
	children: ReactNode;
	className?: string;
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function SectionTitle({
	children,
	className,
	as: Component = "h2",
}: SectionTitleProps) {
	return (
		<Component
			className={`font-headline text-2xl font-bold text-primary mb-6 ${className}`}
		>
			{children}
		</Component>
	);
}
