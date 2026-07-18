import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { curriculumData, type Lesson, type Module } from "@/lib/curriculumData";

interface ActiveLessonContextType {
	moduleId: string | null;
	lessonId: string | null;
	module: Module | null;
	lesson: Lesson | null;
	setActiveLesson: (moduleId: string | null, lessonId: string | null) => void;
	clearActiveLesson: () => void;
	isFromCurriculum: boolean;
}

const ActiveLessonContext = createContext<ActiveLessonContextType | undefined>(
	undefined,
);

interface ActiveLessonProviderProps {
	children: ReactNode;
}

export function ActiveLessonProvider({ children }: ActiveLessonProviderProps) {
	const [moduleId, setModuleId] = useState<string | null>(null);
	const [lessonId, setLessonId] = useState<string | null>(null);
	const [searchParams] = useSearchParams();

	// Ler parâmetros da URL (module e lesson)
	useEffect(() => {
		const urlModuleId = searchParams.get("module");
		const urlLessonId = searchParams.get("lesson");

		if (urlModuleId && urlLessonId) {
			setModuleId(urlModuleId);
			setLessonId(urlLessonId);
		}
	}, [searchParams]);

	const module = moduleId
		? (curriculumData.modules.find((m) => m.id === moduleId) ?? null)
		: null;

	const lesson =
		module && lessonId
			? (module.lessons.find((l) => l.id === lessonId) ?? null)
			: null;

	const setActiveLesson = (
		newModuleId: string | null,
		newLessonId: string | null,
	) => {
		setModuleId(newModuleId);
		setLessonId(newLessonId);
	};

	const clearActiveLesson = () => {
		setModuleId(null);
		setLessonId(null);
	};

	const isFromCurriculum = moduleId !== null && lessonId !== null;

	return (
		<ActiveLessonContext.Provider
			value={{
				moduleId,
				lessonId,
				module,
				lesson,
				setActiveLesson,
				clearActiveLesson,
				isFromCurriculum,
			}}
		>
			{children}
		</ActiveLessonContext.Provider>
	);
}

export function useActiveLesson() {
	const context = useContext(ActiveLessonContext);
	if (context === undefined) {
		throw new Error(
			"useActiveLesson must be used within an ActiveLessonProvider",
		);
	}
	return context;
}

// Hook utilitário para pegar módulo/lição dos parâmetros de URL
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
