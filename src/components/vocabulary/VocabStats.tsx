import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LEVEL_VOCAB_TARGETS } from "@/lib/coreVocabulary";
import type { CEFRLevel } from "@/lib/curriculumData";

type VocabStatsProps = {
	level: CEFRLevel;
	knownTotal: number;
	knownHere: number;
	total: number;
};

export function VocabStats({
	level,
	knownTotal,
	knownHere,
	total,
}: VocabStatsProps) {
	const percent = total ? Math.round((knownHere / total) * 100) : 0;
	return (
		<div className="grid gap-3 sm:grid-cols-3 mb-6">
			<Card className="glass-card">
				<CardContent className="p-4">
					<p className="text-xs uppercase tracking-widest text-muted-foreground">
						Palavras conhecidas
					</p>
					<p className="text-3xl font-headline font-extrabold text-brand-violet">
						{knownTotal}
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
						{knownHere}/{total}
					</p>
					<Progress value={percent} className="h-1.5 mt-2" />
				</CardContent>
			</Card>
		</div>
	);
}
