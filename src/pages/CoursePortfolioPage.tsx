import { Link } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { findCourseLesson } from "@/lib/course/catalog";
import { getPortfolio } from "@/lib/course/portfolio";
import { downloadPortfolio } from "@/lib/course/portfolioExport";

export default function CoursePortfolioPage() {
	const entries = getPortfolio().reverse();
	return (
		<PageContainer className="max-w-4xl mx-auto space-y-6 pb-12">
			<h1 className="text-3xl font-bold">Meu portfólio de comunicação</h1>
			<p>
				Compare suas produções e dúvidas. São amostras feitas por você, sem
				avaliação automática de domínio. Copie o texto para pedir feedback a um
				professor ou parceiro.
			</p>
			<p className="text-sm text-muted-foreground">
				Até 200 registros ficam neste navegador. Limpar os dados do site apaga o
				portfólio; mantenha uma cópia dos textos importantes.
			</p>
			<Link to="/course" className="text-primary underline">
				Voltar ao plano do curso
			</Link>
			<Button
				className="block"
				disabled={!entries.length}
				onClick={() => downloadPortfolio(entries)}
			>
				Baixar minhas produções (.txt)
			</Button>
			{!entries.length && (
				<p role="status">
					Ainda não há produções. Conclua a missão de uma aula para começar.
				</p>
			)}
			{entries.map((entry) => {
				const lesson = findCourseLesson(entry.lessonId);
				return (
					<article
						key={entry.id}
						className="rounded-xl border border-border p-4 space-y-3"
					>
						<h2 className="text-xl font-bold">{lesson?.title}</h2>
						<p className="text-sm text-muted-foreground">
							{new Date(entry.createdAt).toLocaleString("pt-BR")} ·{" "}
							{lesson?.level}
						</p>
						<p>{lesson?.goal}</p>
						<p lang="en" className="whitespace-pre-wrap break-words">
							{entry.text}
						</p>
						{entry.reflection && (
							<p className="whitespace-pre-wrap break-words">
								Pontos para melhorar: {entry.reflection}
							</p>
						)}
						<Link
							to={`/course/${entry.lessonId}`}
							className="text-primary underline"
						>
							Revisar esta aula
						</Link>
					</article>
				);
			})}
		</PageContainer>
	);
}
