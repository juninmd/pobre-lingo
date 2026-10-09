import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGuidedCourse } from "@/hooks/useGuidedCourse";
import { usePersistentState } from "@/hooks/usePersistentState";
import { useStudyTimer } from "@/hooks/useStudyLog";
import { courseLessons } from "@/lib/course/catalog";
import {
	advanceLesson,
	hasPassedCheck,
	newLessonSession,
	readLessonSession,
	submitLessonAnswer,
} from "@/lib/course/session";
import type { GuidedLesson } from "@/lib/course/types";
import { LessonMission } from "./LessonMission";
import { LessonQuestion } from "./LessonQuestion";
import { LessonStudy } from "./LessonStudy";

interface LessonRunnerProps {
	lesson: GuidedLesson;
}
export function LessonRunner({ lesson }: LessonRunnerProps) {
	const [stored, save] = usePersistentState<unknown>(
		`pobrelingo_course_session_${lesson.id}`,
		newLessonSession,
	);
	const session = readLessonSession(stored, lesson);
	const { complete } = useGuidedCourse();
	useStudyTimer("study");
	const next = () => save(advanceLesson(session, lesson));
	const passed = hasPassedCheck(lesson, session);
	const following =
		courseLessons[courseLessons.findIndex((item) => item.id === lesson.id) + 1];
	if (session.phase === "study")
		return <LessonStudy lesson={lesson} onStart={next} />;
	if (session.phase === "practice" || session.phase === "check") {
		const questions = lesson[session.phase];
		const question = questions[session.cursor];
		return (
			<LessonQuestion
				key={question.id}
				question={question}
				answer={session[session.phase][session.cursor]}
				practice={session.phase === "practice"}
				position={session.cursor}
				total={questions.length}
				onSubmit={(answer) => save(submitLessonAnswer(session, answer))}
				onNext={next}
			/>
		);
	}
	if (session.phase === "result")
		return (
			<section className="space-y-4" aria-labelledby="result-title">
				<h2 id="result-title" className="text-xl font-bold">
					{passed ? "Você lembrou sem ajuda" : "Revise antes de avançar"}
				</h2>
				<p>
					{passed
						? "Agora use essas ideias em uma tarefa de comunicação."
						: "Uma ou mais respostas precisam de revisão. Releia os exemplos e faça uma nova tentativa. A próxima aula continua bloqueada."}
				</p>
				<p className="text-sm text-muted-foreground">
					Esta checagem verifica o conteúdo desta aula; não certifica um nível
					CEFR.
				</p>
				{passed ? (
					<Button onClick={next}>Ir para a missão</Button>
				) : (
					<Button onClick={() => save(newLessonSession)}>
						Estudar e tentar novamente
					</Button>
				)}
			</section>
		);
	if (session.phase === "mission")
		return (
			<LessonMission
				lesson={lesson}
				onComplete={() => {
					const saved = complete(lesson.id, session.check);
					if (saved) next();
					return saved;
				}}
			/>
		);
	return (
		<section className="space-y-4" aria-labelledby="complete-title">
			<h2 id="complete-title" className="text-xl font-bold">
				Aula concluída
			</h2>
			<p>
				Você praticou e acertou a checagem. A primeira revisão será em um dia;
				as seguintes se espaçam conforme você relembra o conteúdo.
			</p>
			{following && (
				<Button asChild className="h-auto whitespace-normal text-left">
					<Link to={`/course/${following.id}`}>
						Próxima aula: {following.title}
					</Link>
				</Button>
			)}
			<Link className="block text-primary underline" to="/course/portfolio">
				Ver meu portfólio
			</Link>
			<Button variant="outline" onClick={() => save(newLessonSession)}>
				Revisar esta aula
			</Button>
			<Link className="block text-primary underline" to="/course">
				Voltar ao plano do curso
			</Link>
		</section>
	);
}
