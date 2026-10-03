// @ts-nocheck
import { ArrowLeft, BookOpenText, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { CoverageBar } from "@/components/library/CoverageBar";
import { LibraryParagraph } from "@/components/library/LibraryParagraph";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePersistentState } from "@/hooks/usePersistentState";
import { useStudyTimer } from "@/hooks/useStudyLog";
import { useWordKnowledge } from "@/hooks/useWordKnowledge";
import { textCoverage } from "@/lib/input/coverage";
import {
	LIBRARY_KEY,
	type LibraryText,
	markFinished,
} from "@/lib/input/library";
import { countWords, tokenizeText } from "@/lib/input/tokenize";
import { recordWordsRead } from "@/lib/studyLogStore";

export default function LibraryReaderPage() {
	const { id } = useParams<{ id: string }>();
	const [library, setLibrary] = usePersistentState<LibraryText[]>(
		LIBRARY_KEY,
		[],
	);
	const { isKnown, toggleKnown } = useWordKnowledge();
	const [done, setDone] = useState<number | null>(null);
	useStudyTimer("reading");

	const item = library.find((t) => t.id === id);

	const coverage = useMemo(
		() => (item ? textCoverage(tokenizeText(item.text), isKnown) : null),
		[item, isKnown],
	);

	const paragraphs = useMemo(
		() => (item ? item.text.split(/\n{2,}/).filter((p) => p.trim()) : []),
		[item],
	);

	if (!item) {
		return (
			<PageContainer className="max-w-3xl mx-auto text-center py-16">
				<p className="text-muted-foreground mb-4">Texto não encontrado.</p>
				<Button asChild variant="outline">
					<Link to="/library">Voltar para o leitor livre</Link>
				</Button>
			</PageContainer>
		);
	}

	function finish() {
		if (!item) return;
		if (!item.finishedAt) {
			recordWordsRead(countWords(item.text));
			setDone(countWords(item.text));
		}
		setLibrary(markFinished(library, item.id, new Date()));
	}

	return (
		<PageContainer className="max-w-3xl mx-auto">
			<PageHeader
				title={item.title}
				icon={BookOpenText}
				iconClassName="text-brand-violet"
				backLink="/library"
				backLabel="Leitor livre"
			>
				{item.source === "wikipedia" && item.url && (
					<p className="text-sm text-muted-foreground">
						Texto: Simple English Wikipedia · CC BY-SA 4.0 ·{" "}
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							ver original
						</a>
					</p>
				)}
			</PageHeader>

			{coverage && (
				<Card className="glass-card mb-4">
					<CardContent className="p-4">
						<CoverageBar coverage={coverage} />
					</CardContent>
				</Card>
			)}

			<Card className="glass-card mb-4">
				<CardContent className="p-4 sm:p-6 space-y-6">
					{paragraphs.map((paragraph, index) => (
						<LibraryParagraph
							// biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are positional and never reorder
							key={index}
							text={paragraph}
							isKnown={isKnown}
							onToggleKnown={toggleKnown}
						/>
					))}
				</CardContent>
			</Card>

			{done !== null ? (
				<Card className="glass-card border-brand-aqua/40">
					<CardContent className="p-4 flex items-center gap-2 text-brand-aqua font-semibold">
						<CheckCircle2 className="h-5 w-5" />
						Leitura concluída! {done} palavras lidas.
					</CardContent>
				</Card>
			) : (
				<div className="flex justify-between gap-3">
					<Button variant="ghost" asChild className="gap-2">
						<Link to="/library">
							<ArrowLeft className="h-4 w-4" />
							Voltar
						</Link>
					</Button>
					<Button onClick={finish} className="gap-2">
						<CheckCircle2 className="h-4 w-4" />
						Terminei a leitura
					</Button>
				</div>
			)}
		</PageContainer>
	);
}
