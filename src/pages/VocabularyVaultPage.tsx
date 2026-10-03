// @ts-nocheck
import { BookMarked } from "lucide-react";
import { useMemo, useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CoreWordCard } from "@/components/vocabulary/CoreWordCard";
import { VocabStats } from "@/components/vocabulary/VocabStats";
import { useKnownWords } from "@/hooks/useKnownWords";
import { useSrs } from "@/hooks/useSrs";
import { useStudyTimer } from "@/hooks/useStudyLog";
import { getWordsByLevel, LEVEL_ORDER } from "@/lib/coreVocabulary";
import type { CEFRLevel } from "@/lib/curriculumData";

const PAGE_SIZE = 60;

const vocabCardId = (wordId: string) => `core-${wordId}`;

export default function VocabularyVaultPage() {
	useStudyTimer("study");
	const [level, setLevel] = useState<CEFRLevel>("A1");
	const { isKnown, toggleKnown, ids } = useKnownWords();
	const [query, setQuery] = useState("");
	const [visible, setVisible] = useState(PAGE_SIZE);
	const { cards, addCard } = useSrs();
	const reviewIds = useMemo(
		() => new Set(cards.map((card) => card.id)),
		[cards],
	);
	const words = useMemo(() => getWordsByLevel(level), [level]);
	const filtered = useMemo(() => {
		const term = query.trim().toLowerCase();
		if (!term) return words;
		return words.filter(
			(word) =>
				word.word.toLowerCase().includes(term) ||
				word.translation.toLowerCase().includes(term),
		);
	}, [words, query]);
	const knownHere = words.filter((word) => isKnown(word.id)).length;

	return (
		<PageContainer className="max-w-5xl mx-auto">
			<PageHeader
				title="Vocabulário Essencial"
				description="Palavras por frequência (top 1k–5k). Marque o que você já domina e acompanhe sua meta por nível."
				icon={BookMarked}
				iconClassName="text-brand-violet"
			/>

			<VocabStats
				level={level}
				knownTotal={ids.length}
				knownHere={knownHere}
				total={words.length}
			/>

			<div className="flex flex-wrap gap-2 mb-5">
				{LEVEL_ORDER.map((item) => (
					<Button
						key={item}
						size="sm"
						variant={item === level ? "default" : "outline"}
						aria-pressed={item === level}
						onClick={() => {
							setLevel(item);
							setVisible(PAGE_SIZE);
						}}
					>
						{item}
					</Button>
				))}
			</div>

			<Input
				type="search"
				value={query}
				onChange={(event) => {
					setQuery(event.target.value);
					setVisible(PAGE_SIZE);
				}}
				placeholder="Buscar palavra em inglês ou português"
				aria-label="Buscar palavra"
				className="mb-4"
			/>

			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.slice(0, visible).map((word) => (
					<CoreWordCard
						key={word.id}
						word={word}
						known={isKnown(word.id)}
						inReview={reviewIds.has(vocabCardId(word.id))}
						onToggleKnown={() => toggleKnown(word.id)}
						onReview={() =>
							addCard({
								id: vocabCardId(word.id),
								source: "vocabulary",
								front: word.word,
								back: word.translation,
								href: "/vocabulary",
							})
						}
					/>
				))}
			</div>
			{filtered.length === 0 && (
				<p className="text-center text-muted-foreground py-8">
					Nenhuma palavra encontrada.
				</p>
			)}
			{visible < filtered.length && (
				<div className="flex justify-center mt-6">
					<Button
						variant="outline"
						onClick={() => setVisible((v) => v + PAGE_SIZE)}
					>
						Mostrar mais ({filtered.length - visible} restantes)
					</Button>
				</div>
			)}
		</PageContainer>
	);
}
