import { useSyncExternalStore } from "react";
import {
	getCourseProgress,
	getServerCourseProgress,
	saveCourseCompletion,
	subscribeCourseProgress,
} from "@/lib/course/store";

export function useGuidedCourse() {
	const progress = useSyncExternalStore(
		subscribeCourseProgress,
		getCourseProgress,
		getServerCourseProgress,
	);
	return { progress, complete: saveCourseCompletion };
}
