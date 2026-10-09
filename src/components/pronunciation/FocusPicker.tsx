import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { pronunciationFocuses } from "@/lib/pronunciation/focuses";
import type { PronunciationFocus } from "@/lib/pronunciation/types";
import { cn } from "@/lib/utils";

interface FocusPickerProps {
	bestScores: Partial<Record<PronunciationFocus, number>>;
	onSelect: (focus: PronunciationFocus) => void;
}

export function FocusPicker({ bestScores, onSelect }: FocusPickerProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{pronunciationFocuses.map((focus) => {
				const best = bestScores[focus.id];
				return (
					<button
						key={focus.id}
						type="button"
						onClick={() => onSelect(focus.id)}
						className="text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<Card className="h-full transition-colors hover:border-primary">
							<CardContent className="p-5 space-y-2">
								<div className="flex items-start justify-between gap-2">
									<h2 className="font-semibold text-foreground">
										{focus.title}
									</h2>
									{best !== undefined && (
										<span
											className={cn(
												"flex items-center gap-1 text-xs shrink-0 text-brand-gold",
											)}
										>
											<Star className="h-3.5 w-3.5" />
											{best}%
										</span>
									)}
								</div>
								<p className="text-sm text-muted-foreground">{focus.whyPt}</p>
							</CardContent>
						</Card>
					</button>
				);
			})}
		</div>
	);
}
