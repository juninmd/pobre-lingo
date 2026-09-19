import { LineChart } from "lucide-react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { FourStrandsExplainer } from "@/components/progress/FourStrandsExplainer";
import { LevelProjectionCard } from "@/components/progress/LevelProjectionCard";
import { PracticeLinksRow } from "@/components/progress/PracticeLinksRow";
import { StrandMinutesBars } from "@/components/progress/StrandMinutesBars";
import { WeeklyGoalPicker } from "@/components/progress/WeeklyGoalPicker";
import { Card, CardContent } from "@/components/ui/card";
import { useKnownWords } from "@/hooks/useKnownWords";
import { usePersistentState } from "@/hooks/usePersistentState";
import { useStudyLog } from "@/hooks/useStudyLog";
import { buildJourney } from "@/lib/fluencyJourney";
import { loadProficiencyResult } from "@/lib/proficiency";

export default function ProgressPage() {
	const log = useStudyLog();
	const { ids } = useKnownWords();
	const level = loadProficiencyResult()?.level ?? null;
	const [weeklyGoalHours, setWeeklyGoalHours] = usePersistentState(
		"pobrelingo_weekly_goal",
		5,
	);

	const journey = buildJourney({
		level,
		log,
		knownWords: ids.length,
		now: new Date(),
		weeklyGoalHours,
	});

	return (
		<PageContainer className="max-w-4xl mx-auto space-y-5">
			<PageHeader
				title="Seu progresso"
				description="Horas estudadas por habilidade, palavras lidas, vocabulário e previsão de fluência."
				icon={LineChart}
				iconClassName="text-brand-violet"
			/>

			<Card className="glass-card">
				<CardContent className="p-4 sm:p-5 space-y-4">
					<WeeklyGoalPicker
						goal={weeklyGoalHours}
						onChange={setWeeklyGoalHours}
					/>
					<StrandMinutesBars minutes={journey.strandMinutesThisWeek} />
				</CardContent>
			</Card>

			<div className="grid gap-4 sm:grid-cols-2">
				<LevelProjectionCard
					title={`Rumo a ${journey.target}`}
					projection={journey.projectionToTarget}
					projectionAtGoal={journey.projectionToTargetAtGoal}
				/>
				<LevelProjectionCard
					title={`Rumo à fluência (${journey.fluencyTarget})`}
					projection={journey.projectionToFluency}
					projectionAtGoal={journey.projectionToFluencyAtGoal}
				/>
			</div>

			<Card className="glass-card">
				<CardContent className="p-4 sm:p-5 grid grid-cols-2 gap-3 text-sm">
					<div>
						<p className="text-muted-foreground text-xs">Palavras lidas</p>
						<p className="font-bold text-lg">
							{journey.wordsRead.toLocaleString("pt-BR")} /{" "}
							{journey.wordsReadTarget.toLocaleString("pt-BR")}
						</p>
					</div>
					<div>
						<p className="text-muted-foreground text-xs">
							Vocabulário conhecido
						</p>
						<p className="font-bold text-lg">
							{journey.vocabKnown.toLocaleString("pt-BR")} /{" "}
							{journey.vocabTarget.toLocaleString("pt-BR")}
						</p>
					</div>
				</CardContent>
			</Card>

			<PracticeLinksRow />

			<FourStrandsExplainer />
		</PageContainer>
	);
}
