import { useSearchParams } from "react-router-dom";
import { curriculumData } from "@/lib/curriculumData";

/** Módulo e lição indicados por `?module=…&lesson=…` (quem chega pela trilha do currículo). */
export function useLessonFromUrl() {
	const [searchParams] = useSearchParams();
	const moduleId = searchParams.get("module");
	const lessonId = searchParams.get("lesson");

	const module = moduleId
		? (curriculumData.modules.find((m) => m.id === moduleId) ?? null)
		: null;

	const lesson =
		module && lessonId
			? (module.lessons.find((l) => l.id === lessonId) ?? null)
			: null;

	return {
		moduleId,
		lessonId,
		module,
		lesson,
		isFromCurriculum: moduleId !== null && lessonId !== null,
	};
}
