import { Link } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { useGuidedCourse } from "@/hooks/useGuidedCourse";
import { courseLessons, courseLevels } from "@/lib/course/catalog";
import {
	isCourseLessonAvailable,
	nextCourseLesson,
} from "@/lib/course/progress";

export default function GuidedCoursePage() {
	const { progress } = useGuidedCourse();
	const next = nextCourseLesson(progress);
	const count = Object.keys(progress).length;
	return (
		<PageContainer className="max-w-4xl mx-auto space-y-8 pb-12">
			<SEO
				title="Curso guiado"
				description="Comece do zero com aulas explicadas em português e tarefas de comunicação."
			/>
			<header className="space-y-3">
				<p className="text-primary font-semibold">
					Do primeiro olá à comunicação avançada
				</p>
				<h1 className="text-3xl sm:text-4xl font-display font-bold">
					Seu curso guiado de inglês
				</h1>
				<p className="text-muted-foreground">
					Estude em quatro passos: entender e escutar → praticar com ajuda →
					lembrar sozinho → comunicar. Reserve 15–25 minutos e volte amanhã para
					revisar.
				</p>
				<p>
					{count} de {courseLessons.length} aulas concluídas
				</p>
				{next && (
					<Button asChild className="h-auto whitespace-normal text-left">
						<Link to={`/course/${next.id}`}>
							{progress[next.id] ? "Revisão de hoje" : "Continuar curso"}:{" "}
							{next.title}
						</Link>
					</Button>
				)}
				<Link to="/course/portfolio" className="block text-primary underline">
					Ver meu portfólio
				</Link>
			</header>
			<aside className="border-l-4 border-primary bg-primary/5 p-4 space-y-2">
				<h2 className="font-bold">Aulas essenciais + prática contínua</h2>
				<p>
					Estas {courseLessons.length} aulas introduzem conteúdos de Pré-A1 a
					C2. Concluí-las não comprova fluência ou domínio completo desses
					níveis. Amplie a base com o currículo, leituras, escuta, escrita e
					conversa com feedback.
				</p>
				<Link to="/checkpoints" className="text-primary underline">
					Ver objetivos e checkpoints por nível
				</Link>
			</aside>
			{courseLevels.map((level) => (
				<section
					key={level}
					aria-labelledby={`level-${level}`}
					className="space-y-3"
				>
					<h2 id={`level-${level}`} className="text-xl font-bold">
						{level}
						{level === "Pré-A1" ? " · Comece sabendo zero" : ""}
					</h2>
					<ol className="space-y-3">
						{courseLessons
							.filter((lesson) => lesson.level === level)
							.map((lesson) => {
								const available = isCourseLessonAvailable(lesson.id, progress);
								const evidence = progress[lesson.id];
								const due =
									evidence && Date.parse(evidence.reviewAt) <= Date.now();
								return (
									<li
										key={lesson.id}
										className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
									>
										<div className="min-w-0">
											<h3 className="font-semibold">{lesson.title}</h3>
											<p className="text-sm text-muted-foreground">
												{lesson.goal}
											</p>
											{evidence && (
												<p className="text-sm text-primary">
													{due
														? "Revisão disponível hoje"
														: `Concluída · revisão em ${new Date(evidence.reviewAt).toLocaleDateString("pt-BR")}`}
												</p>
											)}
										</div>
										{available ? (
											<Button asChild variant="outline">
												<Link
													to={`/course/${lesson.id}`}
													aria-label={`${evidence ? "Revisar" : "Estudar"}: ${lesson.title}`}
												>
													{evidence ? "Revisar" : "Estudar"}
													<span className="sr-only">: {lesson.title}</span>
												</Link>
											</Button>
										) : (
											<span className="text-sm text-muted-foreground">
												Conclua a aula anterior
											</span>
										)}
									</li>
								);
							})}
					</ol>
				</section>
			))}
			<section className="space-y-3">
				<h2 className="text-xl font-bold">Pratique as quatro vertentes</h2>
				<p className="text-muted-foreground">
					Distribua seu tempo entre compreender mensagens, produzir suas ideias,
					estudar formas e ganhar fluência com conteúdo conhecido.
				</p>
				<div className="flex flex-wrap gap-3">
					{[
						["/reading", "Ler e escutar"],
						["/writing", "Escrever"],
						["/rules", "Estudar a língua"],
						["/fluency", "Ganhar fluência"],
					].map(([to, title]) => (
						<Button key={to} asChild variant="outline">
							<Link to={to}>{title}</Link>
						</Button>
					))}
				</div>
			</section>
		</PageContainer>
	);
}
