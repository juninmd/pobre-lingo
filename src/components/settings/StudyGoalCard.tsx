import { Target } from "lucide-react";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	clampGoal,
	loadGoalMinutes,
	MAX_GOAL_MIN,
	MIN_GOAL_MIN,
	saveGoalMinutes,
} from "@/lib/dailySession";
import { IS_DESKTOP } from "@/lib/platform";
import { loadStudyFirst, saveStudyFirst } from "@/lib/studyFirst";

/** Meta diária em minutos e, no desktop, o modo "estudar primeiro". */
export function StudyGoalCard() {
	const [goal, setGoal] = useState(loadGoalMinutes);
	const [first, setFirst] = useState(() => loadStudyFirst().enabled);

	const changeGoal = (raw: string) => {
		const next = clampGoal(Number(raw));
		setGoal(next);
		saveGoalMinutes(next);
	};
	const changeFirst = (enabled: boolean) => {
		saveStudyFirst({ ...loadStudyFirst(), enabled });
		setFirst(enabled);
	};

	return (
		<Card className="glass-card">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg">
					<Target className="h-5 w-5 text-primary" aria-hidden="true" />
					Meta de estudo
				</CardTitle>
				<CardDescription>
					Quanto tempo de inglês por dia você quer garantir.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="daily-goal" className="font-semibold">
						Minutos por dia
					</Label>
					<Input
						id="daily-goal"
						type="number"
						min={MIN_GOAL_MIN}
						max={MAX_GOAL_MIN}
						value={goal}
						onChange={(e) => changeGoal(e.target.value)}
						className="w-28"
					/>
				</div>
				{IS_DESKTOP && (
					<div className="flex items-start justify-between gap-4">
						<div className="min-w-0">
							<Label htmlFor="study-first" className="font-semibold">
								Estudar primeiro
							</Label>
							<p className="mt-1 text-xs text-muted-foreground">
								Mostra a meta do dia ao abrir o app, até você cumpri-la. Dá para
								adiar 30 min, no máximo 2 vezes por dia.
							</p>
						</div>
						<Switch
							id="study-first"
							checked={first}
							onCheckedChange={changeFirst}
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
