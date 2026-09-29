import re

with open('src/components/dashboard/LearningTimeline.tsx', 'r') as f:
    content = f.read()

replacement = """
export function LearningTimeline() {
	const { getModuleProgress, isModuleUnlocked, isLessonCompleted } =
		useCurriculumProgress();

	// Encontra a primeira lição não concluída globalmente para o bookmark
	const firstIncompleteLesson = useMemo(() => {
		for (const unit of curriculumData.units) {
			const modules = curriculumData.modules.filter(m => m.unitId === unit.id);
			for (const module of modules) {
				if (!isModuleUnlocked(module)) continue;
				const lesson = module.lessons.find(l => !isLessonCompleted(module.id, l.id));
				if (lesson) {
					return { moduleId: module.id, lessonId: lesson.id };
				}
			}
		}
		return null;
	}, [isModuleUnlocked, isLessonCompleted]);
"""

content = content.replace("""
export function LearningTimeline() {
	const { getModuleProgress, isModuleUnlocked, isLessonCompleted } =
		useCurriculumProgress();
""", replacement)

content = content.replace("""
												completionPercentage={moduleProgress.completionPercentage}
												isLessonCompleted={isLessonCompleted}
											/>
""", """
												completionPercentage={moduleProgress.completionPercentage}
												isLessonCompleted={isLessonCompleted}
												isFirstActiveModule={firstIncompleteLesson?.moduleId === module.id}
												firstActiveLessonId={firstIncompleteLesson?.moduleId === module.id ? firstIncompleteLesson.lessonId : undefined}
											/>
""")

with open('src/components/dashboard/LearningTimeline.tsx', 'w') as f:
    f.write(content)

with open('src/components/dashboard/TimelineModule.tsx', 'r') as f:
    content2 = f.read()

content2 = content2.replace("""
interface TimelineModuleProps {
	module: Module;
	isLocked: boolean;
	isCompleted: boolean;
	completionPercentage: number;
	isLessonCompleted: (moduleId: string, lessonId: string) => boolean;
}
""", """
interface TimelineModuleProps {
	module: Module;
	isLocked: boolean;
	isCompleted: boolean;
	completionPercentage: number;
	isLessonCompleted: (moduleId: string, lessonId: string) => boolean;
	isFirstActiveModule?: boolean;
	firstActiveLessonId?: string;
}
""")

content2 = content2.replace("""
export default function TimelineModule({
	module,
	isLocked,
	isCompleted,
	completionPercentage,
	isLessonCompleted,
}: TimelineModuleProps) {
""", """
export default function TimelineModule({
	module,
	isLocked,
	isCompleted,
	completionPercentage,
	isLessonCompleted,
	isFirstActiveModule,
	firstActiveLessonId,
}: TimelineModuleProps) {
""")

content2 = content2.replace("""
	// Find the first active (uncompleted) lesson to scroll to
	const firstIncompleteLessonIndex = module.lessons.findIndex(
		(l) => !isLessonCompleted(module.id, l.id),
	);

	const activeLessonRef = useRef<HTMLAnchorElement>(null);
	const hasScrolled = useRef(false);

	useEffect(() => {
		// Only scroll if it's the first incomplete lesson in an unlocked module, and we haven't scrolled yet
		if (!isLocked && !hasScrolled.current && activeLessonRef.current) {
			// Small delay to allow render
			const timer = setTimeout(() => {
				activeLessonRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
				hasScrolled.current = true;
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [isLocked]);
""", """
	const activeLessonRef = useRef<HTMLAnchorElement>(null);
	const hasScrolled = useRef(false);

	useEffect(() => {
		// Only scroll if it's the global first active module/lesson, and we haven't scrolled yet
		if (isFirstActiveModule && !hasScrolled.current && activeLessonRef.current) {
			// Small delay to allow render
			const timer = setTimeout(() => {
				activeLessonRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
				hasScrolled.current = true;
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [isFirstActiveModule]);
""")

content2 = content2.replace("""
						const isFirstActive = !isLessonLocked && !isLessonDone && index === firstIncompleteLessonIndex;
""", """
						const isFirstActive = !isLessonLocked && !isLessonDone && lesson.id === firstActiveLessonId;
""")

with open('src/components/dashboard/TimelineModule.tsx', 'w') as f:
    f.write(content2)
