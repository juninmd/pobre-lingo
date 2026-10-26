import { CheckCircle2, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Since we don't have a dedicated culture data file, we'll mock some content or reuse description
// In a real app, this would fetch from a cultureData.ts
// For now, we will display a generic culture placeholder or use the lesson description as a prompt

interface CultureLessonViewProps {
	lesson: unknown; // Using any for simplicity here to accept the Lesson object
	onComplete: () => void;
	isCompleted: boolean;
}

export function CultureLessonView({
	lesson,
	onComplete,
	isCompleted,
}: CultureLessonViewProps) {
	return (
		<div className="max-w-3xl mx-auto space-y-6">
			<Card className="border-t-4 border-t-teal-500 shadow-lg">
				<CardHeader className="text-center pb-2">
					<Globe className="w-12 h-12 mx-auto text-teal-500 mb-4" />
					<CardTitle className="text-3xl font-bold">
						{lesson.title_pt}
					</CardTitle>
					<p className="text-xl text-muted-foreground mt-2">
						{lesson.title_en}
					</p>
				</CardHeader>
				<CardContent className="space-y-6 pt-6 text-center">
					{isCompleted && (
						<Badge className="bg-green-500 mb-4 mx-auto">
							<CheckCircle2 className="h-3 w-3 mr-1" /> Leitura Concluída
						</Badge>
					)}

					<div className="bg-teal-50 dark:bg-teal-950/20 p-8 rounded-xl text-lg leading-relaxed text-left">
						<p className="mb-4">
							<strong>Nota Cultural:</strong> {lesson.description_pt}
						</p>
						<p className="mb-4">
							Esta lição foca em aspectos culturais importantes para quem está
							aprendendo inglês. Entender a cultura é tão importante quanto
							entender a gramática.
						</p>
						<p>
							<em>
								(Conteúdo detalhado da lição cultural seria carregado aqui de um
								arquivo de dados específico.)
							</em>
						</p>
					</div>

					<Button
						size="lg"
						onClick={onComplete}
						className="w-full sm:w-auto min-w-[200px] mt-8"
					>
						{isCompleted ? "Voltar ao Currículo" : "Concluir Leitura"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
