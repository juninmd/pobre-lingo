import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGuidedCourse } from "@/hooks/useGuidedCourse";
import { nextCourseLesson } from "@/lib/course/progress";

export function GuidedCourseCard() {
	const { progress } = useGuidedCourse();
	const next = nextCourseLesson(progress);
	return (
		<Card className="border-primary/40 bg-primary/5">
			<CardContent className="p-5 space-y-3">
				<p className="flex items-center gap-2 text-primary font-semibold">
					<BookOpen className="h-5 w-5" /> Sua aula guiada
				</p>
				<h2 className="text-xl font-display font-bold">
					{next ? next.title : "Continue praticando no mundo real"}
				</h2>
				<p className="text-sm text-muted-foreground">
					{next
						? next.goal
						: "Você concluiu as aulas introdutórias. Use as leituras e as práticas para aprofundar cada nível."}
				</p>
				<p className="text-sm">
					Comece do zero, com explicação em português, exemplos e correção.
					Nenhum teste de nível é necessário.
				</p>
				<Button asChild className="w-full sm:w-auto">
					<Link to={next ? `/course/${next.id}` : "/course"}>
						{next
							? progress[next.id]
								? "Revisar aula"
								: "Começar aula"
							: "Ver curso"}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</Button>
				<Link
					to="/course"
					className="block text-sm text-primary underline underline-offset-4"
				>
					Ver plano do zero ao avançado
				</Link>
			</CardContent>
		</Card>
	);
}
