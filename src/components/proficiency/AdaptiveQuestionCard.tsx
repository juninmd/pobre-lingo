import { Volume2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuestionAudio } from "@/hooks/useQuestionAudio";
import { MAX_ITEMS } from "@/lib/placement/adaptive";
import type { PlacementItem } from "@/lib/placement/types";
import { cn } from "@/lib/utils";

interface AdaptiveQuestionCardProps {
	item: PlacementItem;
	index: number;
	onAnswer: (optionIndex: number | null) => void;
}

export function AdaptiveQuestionCard({
	item,
	index,
	onAnswer,
}: AdaptiveQuestionCardProps) {
	const [selected, setSelected] = useState<string | null>(null);
	const audio = useQuestionAudio();
	const progress = Math.round((index / MAX_ITEMS) * 100);

	const submit = () => {
		if (selected === null || (item.audioText && !audio.heard)) return;
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
					<span aria-live="polite">Conteúdo {item.level}</span>
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
								disabled={!audio.supported || audio.status === "playing"}
								onClick={() => audio.play(item.audioText ?? "")}
							>
								<Volume2 className="h-4 w-4" />
							</Button>
						)}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{item.audioText && (
						<p role="status" className="text-sm text-muted-foreground">
							{audio.status === "playing"
								? "Ouça até o final antes de responder."
								: audio.status === "error" || !audio.supported
									? "Não foi possível tocar uma voz em inglês. Pule esta questão sem avaliar a escuta."
									: "Ouça o áudio em inglês. Se não conseguir ouvir, pule sem avaliar."}
						</p>
					)}
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
						disabled={selected === null || (!!item.audioText && !audio.heard)}
						className="w-full"
					>
						{index === MAX_ITEMS - 1 ? "Finalizar" : "Próxima"}
					</Button>
					{item.audioText && (
						<Button
							variant="outline"
							className="w-full h-auto whitespace-normal"
							onClick={() => onAnswer(null)}
						>
							Não consegui ouvir — pular sem avaliar
						</Button>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
