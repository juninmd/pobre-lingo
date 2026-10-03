// @ts-nocheck
import { BookOpenText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { type Imported, ImportPanel } from "@/components/library/ImportPanel";
import { LibraryList } from "@/components/library/LibraryList";
import { Card, CardContent } from "@/components/ui/card";
import { usePersistentState } from "@/hooks/usePersistentState";
import { useWordKnowledge } from "@/hooks/useWordKnowledge";
import {
	addText,
	LIBRARY_KEY,
	type LibraryText,
	removeText,
} from "@/lib/input/library";

export default function LibraryPage() {
	const [library, setLibrary] = usePersistentState<LibraryText[]>(
		LIBRARY_KEY,
		[],
	);
	const { isKnown } = useWordKnowledge();
	const navigate = useNavigate();

	function handleImport(item: Imported) {
		const { list, item: saved } = addText(library, item, new Date());
		setLibrary(list);
		navigate(`/library/${saved.id}`);
	}

	return (
		<PageContainer className="max-w-5xl mx-auto">
			<PageHeader
				title="Leitor livre"
				description="Ler muito texto fácil é o que mais leva à fluência. Traga qualquer texto em inglês e mire em 98% de palavras conhecidas para uma leitura confortável."
				icon={BookOpenText}
				iconClassName="text-brand-violet"
			/>

			<Card className="glass-card mb-6">
				<CardContent className="p-5">
					<ImportPanel onImport={handleImport} />
				</CardContent>
			</Card>

			{library.length === 0 ? (
				<Card className="glass-card">
					<CardContent className="p-6 text-center">
						<p className="text-muted-foreground">
							Sua biblioteca está vazia. Comece pela aba "Wikipedia" acima:
							artigos em inglês simples, ótimos para ler do B1 ao B2.
						</p>
					</CardContent>
				</Card>
			) : (
				<LibraryList
					items={library}
					isKnown={isKnown}
					onRemove={(id) => setLibrary(removeText(library, id))}
				/>
			)}
		</PageContainer>
	);
}
