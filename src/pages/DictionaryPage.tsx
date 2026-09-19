import {
	BookmarkCheck,
	BookmarkPlus,
	BookText,
	Search,
	Volume2,
} from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useVocabularyNotebook } from "@/hooks/useVocabularyNotebook";
import { dictionaryEntries } from "@/lib/dictionaryData";
import { tts } from "@/lib/tts";

const ITEMS_PER_PAGE = 20;

export default function DictionaryPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const deferredSearchTerm = useDeferredValue(searchTerm);
	const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
	const [prevSearchTerm, setPrevSearchTerm] = useState(deferredSearchTerm);
	const observerTarget = useRef<HTMLDivElement>(null);

	// Pre-compute lowercase values for faster filtering
	// This is memoized so it's only calculated once (since dictionaryEntries is static)
	const preparedEntries = useMemo(() => {
		return dictionaryEntries
			.map((entry) => ({
				...entry,
				wordLower: entry.word.toLowerCase(),
				translationLower: entry.translation_pt.toLowerCase(),
			}))
			.sort((a, b) => a.wordLower.localeCompare(b.wordLower));
	}, []);

	const filteredEntries = useMemo(() => {
		const termLower = deferredSearchTerm.toLowerCase();
		return preparedEntries.filter(
			(entry) =>
				entry.wordLower.includes(termLower) ||
				entry.translationLower.includes(termLower),
		);
	}, [deferredSearchTerm, preparedEntries]);

	// Reset visible count when search term changes (Render-time update pattern)
	if (deferredSearchTerm !== prevSearchTerm) {
		setPrevSearchTerm(deferredSearchTerm);
		setVisibleCount(ITEMS_PER_PAGE);
	}

	const visibleEntries = useMemo(() => {
		return filteredEntries.slice(0, visibleCount);
	}, [filteredEntries, visibleCount]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (
					entries[0].isIntersecting &&
					visibleCount < filteredEntries.length
				) {
					setVisibleCount((prev) =>
						Math.min(prev + ITEMS_PER_PAGE, filteredEntries.length),
					);
				}
			},
			{ threshold: 0.1 },
		);

		const currentTarget = observerTarget.current;
		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [visibleCount, filteredEntries.length]);

	const { saveWord, removeWord, isWordSaved } = useVocabularyNotebook();

	const speak = (text: string) => {
		tts.speak(text);
	};

	return (
		<PageContainer>
			<PageHeader
				title="Dicionário"
				description="Consulte palavras em inglês com tradução, pronúncia e exemplos."
				icon={BookText}
				iconClassName="text-primary"
			>
				<div className="relative w-full sm:max-w-md">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
					<Input
						type="search"
						placeholder="Buscar palavra ou tradução..."
						className="pl-10 h-11 sm:h-10 bg-background touch-target"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</PageHeader>

			{/* Contador de resultados */}
			<div className="mb-3 sm:mb-4 flex items-center gap-2">
				<Badge variant="secondary" className="text-xs sm:text-sm">
					{filteredEntries.length}{" "}
					{filteredEntries.length === 1
						? "palavra encontrada"
						: "palavras encontradas"}
				</Badge>
			</div>

			<div className="grid gap-3 sm:gap-4 sm:grid-cols-2 pr-2 sm:pr-4">
				{visibleEntries.map((entry) => (
					<Card
						key={entry.id}
						className="glass-card hover:shadow-lg transition-all active:scale-[0.99] touch-manipulation"
					>
						<CardHeader className="pb-2 sm:pb-3">
							<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
								<div className="min-w-0 flex-1">
									<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
										<span className="truncate">{entry.word}</span>
										<button
											type="button"
											onClick={() => speak(entry.word)}
											className="text-primary hover:text-primary/80 transition-colors active:scale-95 flex-shrink-0 p-1.5 -m-1.5 rounded-lg hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 touch-target"
											title="Ouvir pronúncia"
											aria-label="Ouvir pronúncia"
										>
											<Volume2 className="h-4 w-4" />
										</button>
									</CardTitle>
									{entry.phonetic_transcription_en && (
										<span className="text-xs sm:text-sm text-muted-foreground">
											{entry.phonetic_transcription_en}
										</span>
									)}
								</div>
								<div className="flex items-center gap-1.5 flex-shrink-0">
									<button
										type="button"
										onClick={() =>
											isWordSaved(entry.id)
												? removeWord(entry.id)
												: saveWord(entry.id)
										}
										className={`p-1.5 -m-1.5 rounded-lg transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 touch-target ${isWordSaved(entry.id) ? "text-primary hover:text-primary/80 hover:bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}
										title={
											isWordSaved(entry.id)
												? "Remover do caderninho"
												: "Salvar no caderninho"
										}
										aria-label={
											isWordSaved(entry.id)
												? "Remover do caderninho"
												: "Salvar no caderninho"
										}
									>
										{isWordSaved(entry.id) ? (
											<BookmarkCheck className="h-4 w-4" />
										) : (
											<BookmarkPlus className="h-4 w-4" />
										)}
									</button>
									<Badge variant="outline" className="text-primary text-xs">
										{entry.translation_pt}
									</Badge>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-foreground mb-2 leading-relaxed">
								{entry.meaning_en}
							</p>
							{entry.example_sentence_en && (
								<div className="bg-muted/50 p-2.5 sm:p-3 rounded-lg space-y-1">
									<p className="text-xs text-foreground italic leading-relaxed">
										“{entry.example_sentence_en}”
									</p>
									{entry.example_sentence_pt && (
										<p className="text-xs text-muted-foreground leading-relaxed">
											“{entry.example_sentence_pt}”
										</p>
									)}
								</div>
							)}
						</CardContent>
					</Card>
				))}

				{/* Sentinel for IntersectionObserver */}
				{visibleCount < filteredEntries.length && (
					<div ref={observerTarget} className="h-4 w-full col-span-full" />
				)}
			</div>
		</PageContainer>
	);
}
