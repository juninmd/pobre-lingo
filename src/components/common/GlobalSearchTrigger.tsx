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
			className="relative h-9 w-9 justify-center px-2 text-sm text-muted-foreground sm:w-full sm:justify-start sm:pr-12 md:w-40 lg:w-64"
		>
			<Search className="h-4 w-4 shrink-0 sm:mr-2" aria-hidden="true" />
			<span className="hidden lg:inline-flex">Pesquisar...</span>
			<span className="hidden sm:inline-flex lg:hidden">Pesquisar</span>
			<kbd className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[11px] font-medium opacity-100 sm:flex">
				<span className="text-xs">⌘</span>K
			</kbd>
		</Button>
	);
}
