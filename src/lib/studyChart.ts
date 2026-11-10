import {
	dayKey,
	STUDY_KINDS,
	type StudyKind,
	type StudyLog,
} from "./studyTime";

export interface StudyDay {
	/** Dia local, AAAA-MM-DD. */
	key: string;
	date: Date;
	minutes: Record<StudyKind, number>;
	total: number;
}

/** Minutos por vertente em cada um dos últimos `days` dias (o último é hoje). */
export function dailyStudyMinutes(
	log: StudyLog,
	now: Date,
	days = 14,
): StudyDay[] {
	return Array.from({ length: days }, (_, index) => {
		const date = new Date(now);
		date.setHours(12, 0, 0, 0);
		date.setDate(date.getDate() - (days - 1 - index));
		const key = dayKey(date);
		const seconds = log.days[key] ?? {};
		const minutes = Object.fromEntries(
			STUDY_KINDS.map((kind) => [kind, Math.round((seconds[kind] ?? 0) / 60)]),
		) as Record<StudyKind, number>;
		const total = STUDY_KINDS.reduce((sum, kind) => sum + minutes[kind], 0);
		return { key, date, minutes, total };
	});
}

const AXIS_STEPS = [10, 20, 30, 60, 90, 120, 180, 240, 360, 480, 720];

/** Topo "redondo" do eixo: o menor passo que cobre o valor (10, 20, 30, 60…). */
export function axisMax(value: number): number {
	return (
		AXIS_STEPS.find((step) => step >= value) ?? Math.ceil(value / 240) * 240
	);
}

/** `45 min`, `1h`, `1h 05min`. */
export function formatMinutes(minutes: number): string {
	if (minutes < 60) return `${minutes} min`;
	const hours = Math.floor(minutes / 60);
	const rest = minutes % 60;
	return rest ? `${hours}h ${String(rest).padStart(2, "0")}min` : `${hours}h`;
}
