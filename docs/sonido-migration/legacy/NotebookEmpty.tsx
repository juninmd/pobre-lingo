import { BookMarked } from "lucide-react";

/**
 * O estado vazio do Caderninho em `origin/master` (`src/pages/NotebookPage.tsx`),
 * extraído para a comparação. Só o contexto mudou: aqui ele é um componente.
 */
export function NotebookEmpty() {
	return (
		<div className="text-center py-20 text-muted-foreground space-y-3">
			<BookMarked className="w-12 h-12 mx-auto opacity-30" />
			<p className="text-lg font-medium">Nenhuma palavra salva ainda.</p>
			<p className="text-sm">
				No Dicionário, clique no ícone de marcador para salvar uma palavra.
			</p>
		</div>
	);
}
