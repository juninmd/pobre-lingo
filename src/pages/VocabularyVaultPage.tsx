import { BookMarked, Check, Layers, Volume2 } from "lucide-react";
import { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useKnownWords } from "@/hooks/useKnownWords";
import {
	BAND_LABELS,
	getWordsByLevel,
	LEVEL_ORDER,
	LEVEL_VOCAB_TARGETS,
} from "@/lib/coreVocabulary";
import type { CEFRLevel } from "@/lib/curriculumData";
import { tts } from "@/lib/tts";
import { cn } from "@/lib/utils";

export default function VocabularyVaultPage() {
	const [level, setLevel] = useState<CEFRLevel>("A1");
	const { isKnown, toggleKnown, ids } = useKnownWords();
	const words = getWordsByLevel(level);
	const knownHere = words.filter((word) => isKnown(word.id)).length;
	const percent = words.length
		? Math.round((knownHere / words.length) * 100)
		: 0;

	return (
		<PageContainer className="max-w-5xl mx-auto">
			<PageHeader
				title="Vocabulário Essencial"
				description="Palavras por frequência (top 1k–5k). Marque o que você já domina e acompanhe sua meta por nível."
				icon={BookMarked}
				iconClassName="text-brand-violet"
			/>

			<div className="grid gap-3 sm:grid-cols-3 mb-6">
				<Card className="glass-card">
					<CardContent className="p-4">
						<p className="text-xs uppercase tracking-widest text-muted-foreground">
							Palavras conhecidas
						</p>
						<p className="text-3xl font-headline font-extrabold text-brand-violet">
							{ids.length}
						</p>
					</CardContent>
				</Card>
				<Card className="glass-card">
					<CardContent className="p-4">
						<p className="text-xs uppercase tracking-widest text-muted-foreground">
							Meta do nível {level}
						</p>
						<p className="text-3xl font-headline font-extrabold text-brand-gold">
							{LEVEL_VOCAB_TARGETS[level].toLocaleString("pt-BR")}
						</p>
						<p className="text-[11px] text-muted-foreground">
							vocabulário receptivo de referência
						</p>
					</CardContent>
				</Card>
				<Card className="glass-card">
					<CardContent className="p-4">
						<p className="text-xs uppercase tracking-widest text-muted-foreground">
							Deck {level}
						</p>
						<p className="text-3xl font-headline font-extrabold text-brand-aqua">
							{knownHere}/{words.length}
						</p>
						<Progress value={percent} className="h-1.5 mt-2" />
					</CardContent>
				</Card>
			</div>

			<div className="flex flex-wrap gap-2 mb-5">
				{LEVEL_ORDER.map((item) => (
					<Button
						key={item}
						size="sm"
						variant={item === level ? "default" : "outline"}
						onClick={() => setLevel(item)}
					>
						{item}
					</Button>
				))}
			</div>

			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{words.map((word) => {
					const known = isKnown(word.id);
					return (
						<Card
							key={word.id}
							className={cn(
								"glass-card transition-all",
								known && "border-brand-aqua/40 bg-brand-aqua/5",
							)}
						>
							<CardContent className="p-4 flex items-start justify-between gap-3">
								<div className="min-w-0">
									<div className="flex items-center gap-2">
										<h3 className="font-headline text-lg font-bold truncate">
											{word.word}
										</h3>
										<Button
											variant="ghost"
											size="icon"
											className="h-7 w-7"
											onClick={() => tts.speak(word.word, "en-US", 0.9)}
										>
											<Volume2 className="h-4 w-4 text-primary" />
										</Button>
									</div>
									<p className="text-sm text-muted-foreground">
										{word.translation}
									</p>
									<Badge variant="outline" className="mt-2 text-[10px] gap-1">
										<Layers className="h-3 w-3" />
										{BAND_LABELS[word.band]}
									</Badge>
								</div>
								<Button
									variant={known ? "default" : "outline"}
									size="sm"
									onClick={() => toggleKnown(word.id)}
									className={cn(known && "bg-brand-aqua text-white")}
								>
									{known ? <Check className="h-4 w-4" /> : "Sei"}
								</Button>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</PageContainer>
	);
}
