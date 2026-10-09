import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GlobalSearchTriggerProps {
	onClick: () => void;
}
export function GlobalSearchTrigger({ onClick }: GlobalSearchTriggerProps) {
	return (
		<Button
			variant="outline"
			onClick={onClick}
			aria-label="Pesquisar"
			aria-keyshortcuts="Control+K Meta+K"
			className="relative h-9 w-9 justify-center px-2 text-sm text-muted-foreground sm:w-full sm:justify-start sm:pr-12 md:w-40 lg:w-64"
		>
			<Search className="h-4 w-4 shrink-0 sm:mr-2" aria-hidden="true" />
			<span className="hidden lg:inline-flex">Pesquisar...</span>
			<span className="hidden sm:inline-flex lg:hidden">Pesquisar</span>
			{/* The shortcut hint is drawn with CSS so the visible text stays "Pesquisar" (WCAG 2.5.3); aria-keyshortcuts announces it. */}
			<span
				aria-hidden="true"
				data-hint="⌘K"
				className="pointer-events-none absolute right-1.5 top-1/2 hidden h-5 -translate-y-1/2 select-none items-center rounded border bg-muted px-1.5 font-mono text-[11px] font-medium after:content-[attr(data-hint)] sm:flex"
			/>
		</Button>
	);
}
