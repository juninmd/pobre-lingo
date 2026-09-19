import { Button } from "@/components/ui/button";

const GOAL_OPTIONS = [3, 5, 7, 10] as const;

export function WeeklyGoalPicker({
	goal,
	onChange,
}: {
	goal: number;
	onChange: (value: number) => void;
}) {
	return (
		<fieldset className="flex flex-wrap items-center gap-2">
			<legend className="text-xs font-semibold text-muted-foreground mb-1 w-full">
				Meta semanal de estudo
			</legend>
			{GOAL_OPTIONS.map((hours) => (
				<Button
					key={hours}
					type="button"
					size="sm"
					variant={goal === hours ? "default" : "outline"}
					aria-pressed={goal === hours}
					onClick={() => onChange(hours)}
				>
					{hours}h/sem
				</Button>
			))}
		</fieldset>
	);
}
