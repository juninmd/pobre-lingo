import { LineChart } from "lucide-react";
import { useMemo } from "react";
import { GoalRing } from "@/components/charts/GoalRing";
import { StudyActivityChart } from "@/components/charts/StudyActivityChart";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { FourStrandsExplainer } from "@/components/progress/FourStrandsExplainer";
import { LevelProjectionCard } from "@/components/progress/LevelProjectionCard";
import { PracticeLinksRow } from "@/components/progress/PracticeLinksRow";
import { StrandMinutesBars } from "@/components/progress/StrandMinutesBars";
import { TargetStat } from "@/components/progress/TargetStat";
import { WeeklyGoalPicker } from "@/components/progress/WeeklyGoalPicker";
import { Card, CardContent } from "@/components/ui/card";
import { useKnownWords } from "@/hooks/useKnownWords";
import { usePersistentState } from "@/hooks/usePersistentState";
import { useStudyLog } from "@/hooks/useStudyLog";
import { buildJourney } from "@/lib/fluencyJourney";
import { loadProficiencyResult } from "@/lib/proficiency";
import { dailyStudyMinutes } from "@/lib/studyChart";

const CHART_DAYS = 14;

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
	const days = useMemo(
		() => dailyStudyMinutes(log, new Date(), CHART_DAYS),
		[log],
	);
	const dailyGoalMinutes = Math.round((weeklyGoalHours * 60) / 7);

	return (
		<PageContainer className="max-w-4xl mx-auto space-y-5 reveal-stagger">
			<PageHeader
				title="Seu progresso"
				description="Horas estudadas por habilidade, palavras lidas, vocabulário e previsão de fluência."
				icon={LineChart}
				iconClassName="text-brand-violet"
			/>

			<Card className="glass-card">
				<CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row gap-5 sm:items-center">
					<div className="self-center">
						<GoalRing done={journey.weeklyHours} goal={weeklyGoalHours} />
					</div>
					<div className="flex-1 min-w-0 space-y-4">
						<WeeklyGoalPicker
							goal={weeklyGoalHours}
							onChange={setWeeklyGoalHours}
						/>
						<StrandMinutesBars minutes={journey.strandMinutesThisWeek} />
					</div>
				</CardContent>
			</Card>

			<Card className="glass-card">
				<CardContent className="p-4 sm:p-5">
					<StudyActivityChart days={days} dailyGoal={dailyGoalMinutes} />
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
				<CardContent className="p-4 sm:p-5 grid grid-cols-2 gap-4">
					<TargetStat
						label="Palavras lidas"
						value={journey.wordsRead}
						target={journey.wordsReadTarget}
					/>
					<TargetStat
						label="Vocabulário conhecido"
						value={journey.vocabKnown}
						target={journey.vocabTarget}
					/>
				</CardContent>
			</Card>

			<PracticeLinksRow />

			<FourStrandsExplainer />
		</PageContainer>
	);
}
