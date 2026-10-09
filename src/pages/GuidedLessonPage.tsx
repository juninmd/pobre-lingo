import { Link, useParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { LessonRunner } from "@/components/course/LessonRunner";
import { useGuidedCourse } from "@/hooks/useGuidedCourse";
import { findCourseLesson } from "@/lib/course/catalog";
import { isCourseLessonAvailable } from "@/lib/course/progress";

export default function GuidedLessonPage() {
	const { lessonId } = useParams();
	const lesson = findCourseLesson(lessonId ?? "");
	const { progress } = useGuidedCourse();
	if (!lesson || !isCourseLessonAvailable(lesson.id, progress))
		return (
			<PageContainer className="space-y-4">
				<h1 className="text-2xl font-bold">
					{lesson ? "Prepare-se para esta aula" : "Aula não encontrada"}
				</h1>
				<p>
					{lesson
						? "Conclua as aulas anteriores e suas checagens para construir a base necessária."
						: "Escolha uma aula no plano do curso."}
				</p>
				<Link className="text-primary underline" to="/course">
					Ver plano do curso
				</Link>
			</PageContainer>
		);
	return (
		<PageContainer className="max-w-3xl mx-auto space-y-6 pb-12">
			<SEO title={lesson.title} description={lesson.goal} />
			<Link to="/course" className="text-primary underline">
				← Plano do curso
			</Link>
			<header className="space-y-2">
				<p className="text-sm font-semibold text-primary">
					{lesson.level} · Aula guiada
				</p>
				<h1 className="text-3xl font-display font-bold">{lesson.title}</h1>
				<p className="text-muted-foreground">Ao final: {lesson.goal}</p>
			</header>
			<div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
				<LessonRunner key={lesson.id} lesson={lesson} />
			</div>
		</PageContainer>
	);
}
