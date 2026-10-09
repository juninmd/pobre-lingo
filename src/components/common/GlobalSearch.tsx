import { Search, SearchX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchResultItem } from "./SearchResultItem";
import { useGlobalSearch } from "./useGlobalSearch";

interface GlobalSearchProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}
const labels = {
	page: "Páginas",
	category: "Categorias",
	rule: "Regras Gramaticais",
};

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
	const { searchTerm, updateTerm, selectedIndex, inputRef, results, select } =
		useGlobalSearch(open, onOpenChange);
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden">
				<DialogHeader className="p-4 pb-0 space-y-0">
					<DialogTitle className="sr-only">Pesquisa Global</DialogTitle>
					<DialogDescription className="sr-only">
						Pesquise páginas e regras. Use as setas para escolher e Enter para
						abrir.
					</DialogDescription>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							ref={inputRef}
							aria-label="Pesquisar páginas e regras"
							placeholder="Pesquisar páginas, regras gramaticais..."
							value={searchTerm}
							onChange={(event) => updateTerm(event.target.value)}
							className="pl-10 pr-10 h-12 text-base border-0 bg-transparent"
						/>
						{searchTerm && (
							<Button
								variant="ghost"
								size="icon"
								className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
								aria-label="Limpar pesquisa"
								onClick={() => updateTerm("")}
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				</DialogHeader>
				<div className="border-t max-h-[60vh] overflow-y-auto p-2">
					{!results.length && (
						<div className="py-8 text-center">
							<SearchX className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
							<p>Nenhum resultado encontrado</p>
							<p className="text-sm text-muted-foreground">
								Tente pesquisar por outro termo
							</p>
						</div>
					)}
					{results.map((result, index) => (
						<div key={result.href}>
							{result.type !== results[index - 1]?.type && (
								<p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									{labels[result.type]}
								</p>
							)}
							<SearchResultItem
								result={result}
								isSelected={selectedIndex === index}
								onClick={() => select(result)}
							/>
						</div>
					))}
				</div>
				<div className="border-t p-3 text-xs text-muted-foreground bg-muted/30">
					↑↓ navegar · Enter selecionar · Esc fechar
				</div>
			</DialogContent>
		</Dialog>
	);
}

export { GlobalSearchTrigger } from "./GlobalSearchTrigger";
