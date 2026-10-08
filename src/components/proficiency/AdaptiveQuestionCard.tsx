import { Volume2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MAX_ITEMS } from "@/lib/placement/adaptive";
import type { PlacementItem } from "@/lib/placement/types";
import { tts } from "@/lib/tts";
import { cn } from "@/lib/utils";

interface AdaptiveQuestionCardProps {
	item: PlacementItem;
	index: number;
	onAnswer: (optionIndex: number) => void;
}

export function AdaptiveQuestionCard({
	item,
	index,
	onAnswer,
}: AdaptiveQuestionCardProps) {
	const [selected, setSelected] = useState<string | null>(null);
	const progress = Math.round((index / MAX_ITEMS) * 100);

	const submit = () => {
		if (selected === null) return;
		const optionIndex = Number(selected);
		setSelected(null);
		onAnswer(optionIndex);
	};

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
					<span>
						Questão {index + 1} (até {MAX_ITEMS})
					</span>
					<span aria-live="polite">Nível {item.level}</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>
			<Card>
				<CardHeader>
					<p className="text-xs font-bold uppercase text-primary">
						{item.level} - {item.skill}
					</p>
					<CardTitle className="flex items-center gap-2 text-xl leading-relaxed">
						{item.prompt}
						{item.audioText && (
							<Button
								type="button"
								variant="outline"
								size="icon"
								aria-label="Ouvir áudio da questão"
								onClick={() => tts.speak(item.audioText ?? "")}
							>
								<Volume2 className="h-4 w-4" />
							</Button>
						)}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<RadioGroup
						value={selected ?? ""}
						onValueChange={setSelected}
						className="space-y-3"
					>
						{item.options.map((option, optionIndex) => (
							<div
								key={option}
								className={cn(
									"flex items-center gap-3 rounded-lg border p-4 transition-colors",
									selected === String(optionIndex)
										? "border-primary bg-primary/5"
										: "hover:bg-accent",
								)}
							>
								<RadioGroupItem
									value={String(optionIndex)}
									id={`item-option-${optionIndex}`}
								/>
								<Label
									htmlFor={`item-option-${optionIndex}`}
									className="flex-1 cursor-pointer"
								>
									{option}
								</Label>
							</div>
						))}
					</RadioGroup>
					<Button
						onClick={submit}
						disabled={selected === null}
						className="w-full"
					>
						{index === MAX_ITEMS - 1 ? "Finalizar" : "Próxima"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
