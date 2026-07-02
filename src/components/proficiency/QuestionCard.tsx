import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ProficiencyQuestion } from "@/lib/proficiencyQuestions";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
	question: ProficiencyQuestion;
	index: number;
	total: number;
	value: string;
	onAnswer: (value: string) => void;
	onNext: () => void;
}

export function QuestionCard({
	question,
	index,
	total,
	value,
	onAnswer,
	onNext,
}: QuestionCardProps) {
	const progress = Math.round((index / total) * 100);

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
					<span>
						Questão {index + 1} de {total}
					</span>
					<span>{progress}%</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>
			<Card>
				<CardHeader>
					<p className="text-xs font-bold uppercase text-primary">
						{question.cefr} - {question.skill}
					</p>
					<CardTitle className="text-xl leading-relaxed">
						{question.question}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<RadioGroup
						value={value}
						onValueChange={onAnswer}
						className="space-y-3"
					>
						{question.options.map((option, optionIndex) => (
							<div
								key={option}
								className={cn(
									"flex items-center gap-3 rounded-lg border p-4 transition-colors",
									value === option
										? "border-primary bg-primary/5"
										: "hover:bg-accent",
								)}
							>
								<RadioGroupItem value={option} id={`option-${optionIndex}`} />
								<Label
									htmlFor={`option-${optionIndex}`}
									className="flex-1 cursor-pointer"
								>
									{option}
								</Label>
							</div>
						))}
					</RadioGroup>
				</CardContent>
				<CardFooter className="justify-end border-t p-4">
					<Button onClick={onNext} disabled={!value}>
						{index === total - 1 ? "Finalizar" : "Próxima"}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
