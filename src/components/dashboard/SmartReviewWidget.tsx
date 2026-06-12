import { Brain, ChevronDown, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWrongAnswers, type WrongAnswer } from "@/hooks/useWrongAnswers";
import { cn } from "@/lib/utils";

export function SmartReviewWidget() {
	const { getTopWrong, markReviewed } = useWrongAnswers();
	const topItems = getTopWrong(5);

	if (topItems.length === 0) return null;

	return (
		<Card className="w-full border-2 border-amber-300/60 dark:border-amber-700/40 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm">
			<CardHeader className="pb-3">
				<CardTitle className="text-base font-bold flex items-center gap-2 text-amber-700 dark:text-amber-400">
					<Brain className="w-4 h-4" />
					Revisar Erros
					<span className="ml-auto text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
						{topItems.length} item{topItems.length !== 1 ? "s" : ""}
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				{topItems.map((item) => (
					<ReviewItem key={item.id} item={item} onDismiss={markReviewed} />
				))}
			</CardContent>
		</Card>
	);
}

function ReviewItem({
	item,
	onDismiss,
}: {
	item: WrongAnswer;
	onDismiss: (id: string) => void;
}) {
	const [revealed, setRevealed] = useState(false);

	return (
		<div className="rounded-lg border border-amber-200/60 dark:border-amber-800/40 bg-background/70 p-3 space-y-2">
			<div className="flex items-start justify-between gap-2">
				<p className="text-sm font-medium text-foreground line-clamp-2 flex-1">
					{item.question}
				</p>
				<button
					onClick={() => onDismiss(item.id)}
					className="shrink-0 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
					aria-label="Marcar como revisado"
				>
					<X className="w-4 h-4" />
				</button>
			</div>

			{!revealed ? (
				<button
					onClick={() => setRevealed(true)}
					className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
				>
					<ChevronDown className="w-3 h-3" />
					Ver resposta correta
				</button>
			) : (
				<div className="space-y-2">
					<p className="text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 rounded p-2 border border-green-200/50 dark:border-green-800/40">
						<span className="font-semibold">Correto: </span>
						{item.correctAnswer}
					</p>
					<div className="flex items-center justify-between">
						<span className="text-[10px] text-muted-foreground">
							Errado {item.wrongCount}×
						</span>
						<Button
							size="sm"
							variant="outline"
							className="h-6 text-xs px-2 border-green-400/50 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20"
							onClick={() => onDismiss(item.id)}
						>
							Entendi ✓
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
