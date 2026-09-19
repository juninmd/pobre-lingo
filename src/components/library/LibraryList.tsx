import { CheckCircle2, Globe2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { textCoverage } from "@/lib/input/coverage";
import type { LibraryText } from "@/lib/input/library";
import type { WordToken } from "@/lib/input/tokenize";
import { countWords, tokenizeText } from "@/lib/input/tokenize";
import { cn } from "@/lib/utils";

const SOURCE_LABEL: Record<LibraryText["source"], string> = {
	paste: "Colado",
	file: "Arquivo",
	wikipedia: "Wikipedia",
};

const BAND_LABEL = {
	comfortable: "confortável",
	challenging: "desafiador",
	hard: "difícil",
} as const;

const BAND_CLASS = {
	comfortable: "text-brand-aqua border-brand-aqua/40",
	challenging: "text-brand-gold border-brand-gold/40",
	hard: "text-destructive border-destructive/40",
} as const;

type LibraryListProps = {
	items: LibraryText[];
	isKnown: (token: WordToken) => boolean;
	onRemove: (id: string) => void;
};

/** Textos salvos, com cobertura lexical calculada contra o vocabulário conhecido. */
export function LibraryList({ items, isKnown, onRemove }: LibraryListProps) {
	return (
		<div className="grid gap-4 sm:grid-cols-2">
			{items.map((item) => {
				const coverage = textCoverage(tokenizeText(item.text), isKnown);
				const percent = Math.round(coverage.ratio * 100);
				return (
					<Card key={item.id} className="glass-card">
						<CardContent className="p-5 flex flex-col gap-3">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0">
									<h3 className="font-headline text-lg font-bold truncate">
										{item.title}
									</h3>
									<div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
										<Badge variant="outline" className="gap-1">
											<Globe2 className="h-3 w-3" />
											{SOURCE_LABEL[item.source]}
										</Badge>
										<span>{countWords(item.text)} palavras</span>
									</div>
								</div>
								<Button
									variant="ghost"
									size="icon"
									aria-label={`Remover "${item.title}"`}
									onClick={() => onRemove(item.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>

							<div className="flex flex-wrap items-center gap-2">
								<Badge
									variant="outline"
									className={cn("font-semibold", BAND_CLASS[coverage.band])}
								>
									{percent}% conhecido · {BAND_LABEL[coverage.band]}
								</Badge>
								{item.finishedAt && (
									<span className="inline-flex items-center gap-1 text-brand-aqua text-xs font-semibold">
										<CheckCircle2 className="h-3 w-3" />
										Lido
									</span>
								)}
							</div>

							<Button asChild className="w-full">
								<Link to={`/library/${item.id}`}>
									{item.finishedAt ? "Ler de novo" : "Continuar lendo"}
								</Link>
							</Button>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
