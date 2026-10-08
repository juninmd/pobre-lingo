import { Check, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { TrackStepIcon } from "@/components/tracks/TrackStepIcon";
import { Button } from "@/components/ui/button";
import type { TrackStep } from "@/lib/tracks";
import { cn } from "@/lib/utils";

interface TrackStepRowProps {
	step: TrackStep;
	done: boolean;
	isNext: boolean;
	onToggleManual: (stepId: string) => void;
}

const MANUAL_KINDS = new Set([
	"rule",
	"pronunciation",
	"conversation",
	"tutor",
]);

export function TrackStepRow({
	step,
	done,
	isNext,
	onToggleManual,
}: TrackStepRowProps) {
	const isManual = MANUAL_KINDS.has(step.kind);

	return (
		<li
			className={cn(
				"flex items-center gap-3 rounded-lg border border-border bg-card p-3",
				isNext && "ring-2 ring-primary",
			)}
		>
			<TrackStepIcon kind={step.kind} />
			<Link
				to={step.href}
				className="min-w-0 flex-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
				aria-label={`${step.title}${done ? " (concluído)" : ""}`}
			>
				<p className="truncate text-sm font-medium text-foreground">
					{step.title}
				</p>
				<p className="text-xs text-muted-foreground">{step.minutes} min</p>
			</Link>
			{isManual ? (
				<Button
					type="button"
					size="sm"
					variant={done ? "secondary" : "outline"}
					onClick={() => onToggleManual(step.id)}
					aria-pressed={done}
					aria-label={
						done ? "Marcar como não concluído" : "Marcar como concluído"
					}
				>
					{done ? <Check className="h-4 w-4" /> : "Concluí"}
				</Button>
			) : done ? (
				<Check
					className="h-5 w-5 shrink-0 text-brand-gold"
					aria-label="Concluído"
				/>
			) : (
				<Circle
					className="h-5 w-5 shrink-0 text-muted-foreground"
					aria-hidden="true"
				/>
			)}
		</li>
	);
}
