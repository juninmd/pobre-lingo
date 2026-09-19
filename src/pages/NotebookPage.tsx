import {
	BookMarked,
	Brain,
	Check,
	ChevronLeft,
	ChevronRight,
	Eye,
	RotateCcw,
	Trash2,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSrs } from "@/hooks/useSrs";
import { useVocabularyNotebook } from "@/hooks/useVocabularyNotebook";
import { type DictionaryEntry, dictionaryEntries } from "@/lib/dictionaryData";
import { tts } from "@/lib/tts";

function shuffleArray<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

export default function NotebookPage() {
	const { savedWords, removeWord } = useVocabularyNotebook();
	const { cards, addCard } = useSrs();
	const srsIds = useMemo(() => new Set(cards.map((c) => c.id)), [cards]);

	/** Manda a palavra para a fila de repetição espaçada em /review. */
	const sendToSrs = useCallback(
		(entry: DictionaryEntry) => {
			addCard({
				id: `dictionary-${entry.id}`,
				source: "dictionary",
				front: entry.word,
				back: entry.translation_pt,
				hint: entry.example_sentence_en || entry.meaning_en,
				href: "/notebook",
			});
		},
		[addCard],
	);

	const entries = useMemo<DictionaryEntry[]>(() => {
		const map = new Map(dictionaryEntries.map((e) => [e.id, e]));
		return savedWords.flatMap((id) => {
			const e = map.get(id);
			return e ? [e] : [];
		});
	}, [savedWords]);

	return (
		<PageContainer>
			<SEO
				title="Caderninho"
				description="Suas palavras salvas para revisar."
			/>
			<PageHeader
				title="Caderninho"
				description="Palavras que você salvou para revisar."
				icon={BookMarked}
				iconClassName="text-primary"
			/>

			{entries.length === 0 ? (
				<div className="text-center py-20 text-muted-foreground space-y-3">
					<BookMarked className="w-12 h-12 mx-auto opacity-30" />
					<p className="text-lg font-medium">Nenhuma palavra salva ainda.</p>
					<p className="text-sm">
						No Dicionário, clique no ícone de marcador para salvar uma palavra.
					</p>
				</div>
			) : (
				<Tabs defaultValue="lista">
					<TabsList className="mb-6">
						<TabsTrigger value="lista">Lista ({entries.length})</TabsTrigger>
						<TabsTrigger value="revisar">Revisar</TabsTrigger>
					</TabsList>

					<TabsContent value="lista">
						<WordList
							entries={entries}
							onRemove={removeWord}
							onSendToSrs={sendToSrs}
							srsIds={srsIds}
						/>
					</TabsContent>

					<TabsContent value="revisar">
						<FlashcardReview entries={entries} />
					</TabsContent>
				</Tabs>
			)}
		</PageContainer>
	);
}

function WordList({
	entries,
	onRemove,
	onSendToSrs,
	srsIds,
}: {
	entries: DictionaryEntry[];
	onRemove: (id: string) => void;
	onSendToSrs: (entry: DictionaryEntry) => void;
	srsIds: Set<string>;
}) {
	return (
		<div className="grid gap-3 sm:grid-cols-2">
			{entries.map((entry) => (
				<Card key={entry.id} className="glass-card">
					<CardContent className="p-4 flex items-start justify-between gap-3">
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-2 mb-1">
								<button
									onClick={() => tts.speak(entry.word)}
									className="font-bold text-base hover:text-primary transition-colors"
									title="Ouvir"
								>
									{entry.word}
								</button>
								{entry.phonetic_transcription_en && (
									<span className="text-xs text-muted-foreground">
										{entry.phonetic_transcription_en}
									</span>
								)}
							</div>
							<Badge variant="outline" className="text-primary text-xs mb-1">
								{entry.translation_pt}
							</Badge>
							<p className="text-xs text-muted-foreground line-clamp-2">
								{entry.meaning_en}
							</p>
						</div>
						<div className="shrink-0 flex flex-col gap-1">
							<button
								onClick={() => onSendToSrs(entry)}
								disabled={srsIds.has(`dictionary-${entry.id}`)}
								className="p-1.5 text-muted-foreground/50 hover:text-brand-gold disabled:text-brand-gold disabled:cursor-default transition-colors rounded"
								title={
									srsIds.has(`dictionary-${entry.id}`)
										? "Já está na revisão espaçada"
										: "Enviar para a revisão espaçada"
								}
								aria-label="Enviar para a revisão espaçada"
							>
								<Brain className="w-4 h-4" />
							</button>
							<button
								onClick={() => onRemove(entry.id)}
								className="p-1.5 text-muted-foreground/50 hover:text-destructive transition-colors rounded"
								aria-label="Remover"
							>
								<Trash2 className="w-4 h-4" />
							</button>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function FlashcardReview({ entries }: { entries: DictionaryEntry[] }) {
	const [deck, setDeck] = useState(() => shuffleArray(entries));
	const [index, setIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const [done, setDone] = useState(false);

	const reset = useCallback(() => {
		setDeck(shuffleArray(entries));
		setIndex(0);
		setFlipped(false);
		setDone(false);
	}, [entries]);

	const next = useCallback(() => {
		if (index >= deck.length - 1) {
			setDone(true);
		} else {
			setIndex((i) => i + 1);
			setFlipped(false);
		}
	}, [index, deck.length]);

	const prev = useCallback(() => {
		if (index > 0) {
			setIndex((i) => i - 1);
			setFlipped(false);
		}
	}, [index]);

	if (done) {
		return (
			<div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
				<Check className="w-16 h-16 text-brand-aqua" />
				<div>
					<p className="text-2xl font-bold">Revisão concluída!</p>
					<p className="text-muted-foreground mt-1">
						Você revisou {deck.length} palavra{deck.length !== 1 ? "s" : ""}.
					</p>
				</div>
				<Button onClick={reset} variant="outline" className="gap-2">
					<RotateCcw className="w-4 h-4" />
					Revisar novamente
				</Button>
			</div>
		);
	}

	const card = deck[index];

	return (
		<div className="max-w-md mx-auto flex flex-col items-center gap-6 py-8">
			<p className="text-sm text-muted-foreground">
				{index + 1} / {deck.length}
			</p>

			{/* Card */}
			<div
				onClick={() => setFlipped((f) => !f)}
				className="w-full min-h-[220px] cursor-pointer rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col items-center justify-center p-8 gap-4 select-none active:scale-[0.98] transition-transform shadow-lg"
			>
				{!flipped ? (
					<div className="text-center">
						<p className="text-3xl font-bold mb-2">{card.word}</p>
						{card.phonetic_transcription_en && (
							<p className="text-sm text-muted-foreground">
								{card.phonetic_transcription_en}
							</p>
						)}
						<div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground/70">
							<Eye className="w-3 h-3" />
							<span>Toque para ver a tradução</span>
						</div>
					</div>
				) : (
					<div className="text-center space-y-3">
						<p className="text-2xl font-bold text-primary">
							{card.translation_pt}
						</p>
						<p className="text-sm text-muted-foreground">{card.meaning_en}</p>
						{card.example_sentence_en && (
							<p className="text-xs italic text-muted-foreground/80 border-t border-border/50 pt-2">
								"{card.example_sentence_en}"
							</p>
						)}
					</div>
				)}
			</div>

			{/* Navigation */}
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					size="icon"
					onClick={prev}
					disabled={index === 0}
				>
					<ChevronLeft className="w-5 h-5" />
				</Button>
				<Button onClick={next} className="gap-2 px-6">
					{index >= deck.length - 1 ? "Concluir" : "Próxima"}
					<ChevronRight className="w-4 h-4" />
				</Button>
			</div>

			<Button
				variant="ghost"
				size="sm"
				onClick={reset}
				className="gap-1.5 text-muted-foreground"
			>
				<RotateCcw className="w-3 h-3" />
				Reiniciar
			</Button>
		</div>
	);
}
