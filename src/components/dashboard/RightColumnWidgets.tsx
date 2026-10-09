import { CalmPracticeCard } from "./CalmPracticeCard";
import { CertificationPlanCard } from "./CertificationPlanCard";
import { DailyQuestsWidget } from "./DailyQuestsWidget";
import { SmartReviewWidget } from "./SmartReviewWidget";
import { TipOfDayCard } from "./TipOfDayCard";
import { WeeklyGoalWidget } from "./WeeklyGoalWidget";
import { WordOfTheDayWidget } from "./WordOfTheDayWidget";

export function RightColumnWidgets() {
	return (
		<div className="space-y-4 md:space-y-6">
			<SmartReviewWidget />
			<DailyQuestsWidget />
			<WeeklyGoalWidget />
			<WordOfTheDayWidget />
			<CalmPracticeCard />
			<CertificationPlanCard />
			<TipOfDayCard />
		</div>
	);
}
