import { Link } from "react-router-dom";
import { TrackStepRow } from "@/components/tracks/TrackStepRow";
import { useTrackProgress } from "@/components/tracks/useTrackProgress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Track } from "@/lib/tracks";

export function TrackPanel({ track }: { track: Track }) {
	const { isStepDone, toggleManualStep, doneCount, percentage, nextStep } =
		useTrackProgress(track);

	return (
		<div>
			<p className="mb-3 text-sm text-muted-foreground">{track.description}</p>

			<div className="mb-4">
				<div className="mb-1 flex items-center justify-between text-sm">
					<span className="text-foreground">
						{doneCount}/{track.steps.length} passos concluídos
					</span>
					<span className="font-medium text-primary">{percentage}%</span>
				</div>
				<Progress
					value={percentage}
					role="progressbar"
					aria-valuenow={percentage}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label={`Progresso da trilha ${track.title}`}
				/>
			</div>

			{nextStep && (
				<div className="mb-4 rounded-lg border border-brand-aqua/40 bg-brand-aqua/10 p-3">
					<p className="text-xs text-muted-foreground">Próximo passo</p>
					<Button asChild variant="link" className="h-auto p-0 text-sm">
						<Link to={nextStep.href}>{nextStep.title}</Link>
					</Button>
				</div>
			)}

			<ol className="space-y-2" aria-label={`Passos da trilha ${track.title}`}>
				{track.steps.map((step) => (
					<TrackStepRow
						key={step.id}
						step={step}
						done={isStepDone(step)}
						isNext={nextStep?.id === step.id}
						onToggleManual={toggleManualStep}
					/>
				))}
			</ol>
		</div>
	);
}
