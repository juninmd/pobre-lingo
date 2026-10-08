import { useCallback, useMemo } from "react";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { usePersistentState } from "@/hooks/usePersistentState";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import type { Track, TrackStep } from "@/lib/tracks";

const MANUAL_DONE_KEY = "pobrelingo_tracks_done";

/** Progresso de uma trilha, combinando as 3 fontes de conclusão existentes. */
export function useTrackProgress(track: Track) {
	const { isLessonCompleted } = useCurriculumProgress();
	const { isRead } = useReadingProgress();
	const [manualDone, setManualDone] = usePersistentState<string[]>(
		MANUAL_DONE_KEY,
		[],
	);
	const manualDoneSet = useMemo(() => new Set(manualDone), [manualDone]);

	const isStepDone = useCallback(
		(step: TrackStep) => {
			if (step.kind === "lesson") {
				return isLessonCompleted(
					step.moduleId as string,
					step.lessonId as string,
				);
			}
			if (step.kind === "reader") {
				return isRead(step.readerId as string);
			}
			return manualDoneSet.has(step.id);
		},
		[isLessonCompleted, isRead, manualDoneSet],
	);

	const toggleManualStep = useCallback(
		(stepId: string) => {
			setManualDone((prev) =>
				prev.includes(stepId)
					? prev.filter((id) => id !== stepId)
					: [...prev, stepId],
			);
		},
		[setManualDone],
	);

	const doneCount = track.steps.filter(isStepDone).length;
	const percentage =
		track.steps.length > 0
			? Math.round((doneCount / track.steps.length) * 100)
			: 0;
	const nextStep = track.steps.find((step) => !isStepDone(step));

	return { isStepDone, toggleManualStep, doneCount, percentage, nextStep };
}
