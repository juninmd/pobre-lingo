import { AlertTriangle, BookOpen, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRuleById } from "@/lib/grammarRules";

interface GrammarLessonViewProps {
	ruleIds: string[];
	onComplete: () => void;
	isCompleted: boolean;
}

export function GrammarLessonView({
	ruleIds,
	onComplete,
	isCompleted,
}: GrammarLessonViewProps) {
	const _navigate = useNavigate();
	const rules = ruleIds.map((id) => getRuleById(id)).filter(Boolean);

	if (rules.length === 0) {
		return (
			<div className="text-center p-8">
				<p>Nenhuma regra gramatical encontrada para esta lição.</p>
				<Button onClick={onComplete} className="mt-4">
					Continuar
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-8 max-w-4xl mx-auto pb-10">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold flex items-center gap-2">
					<BookOpen className="h-6 w-6 text-primary" />
					Regras Gramaticais
				</h2>
				{isCompleted && (
					<Badge className="bg-brand-aqua">
						<CheckCircle2 className="h-3 w-3 mr-1" /> Dominado
					</Badge>
				)}
			</div>

			{rules.map((rule, index) => (
				<Card
					key={rule?.id || index}
					className="overflow-hidden border-l-4 border-l-primary shadow-md"
				>
					<CardHeader className="bg-muted/30 pb-4">
						<div className="flex justify-between items-start">
							<div>
								<CardTitle className="text-xl text-primary mb-1">
									{rule?.title_pt}
								</CardTitle>
								<p className="text-sm text-muted-foreground">
									{rule?.title_en}
								</p>
							</div>
							<div className="flex gap-2">
								{rule?.tags?.map((tag) => (
									<Badge
										key={tag}
										variant="outline"
										className="text-xs uppercase tracking-wider"
									>
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-6 space-y-6">
						<div className="bg-primary/5 border border-primary/10 p-4 rounded-lg text-lg leading-relaxed">
							{rule?.explanation_pt}
						</div>

						{rule?.structure_format_pt && (
							<div className="bg-card border rounded-lg p-4 shadow-sm">
								<h3 className="font-semibold text-sm uppercase text-muted-foreground mb-3 tracking-wide">
									Estrutura
								</h3>
								<div
									className="font-mono text-sm md:text-base space-y-2"
									dangerouslySetInnerHTML={{ __html: rule.structure_format_pt }}
								/>
							</div>
						)}

						<div>
							<h3 className="font-semibold text-sm uppercase text-muted-foreground mb-3 tracking-wide">
								Exemplos
							</h3>
							<div className="grid gap-3">
								{rule?.examples.map((ex, i) => (
									<div
										key={i}
										className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors"
									>
										<span className="font-medium text-lg">
											{ex.sentence_en}
										</span>
										<span className="text-muted-foreground italic text-sm mt-1 sm:mt-0">
											{ex.translation_pt}
										</span>
									</div>
								))}
							</div>
						</div>

						{rule?.common_mistakes_pt && (
							<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
								<h3 className="font-semibold text-destructive flex items-center gap-2 mb-2">
									<AlertTriangle className="h-4 w-4" /> Erros Comuns
								</h3>
								<div
									className="text-sm text-destructive"
									dangerouslySetInnerHTML={{ __html: rule.common_mistakes_pt }}
								/>
							</div>
						)}
					</CardContent>
				</Card>
			))}

			<div className="flex justify-center pt-6">
				<Button
					size="lg"
					onClick={onComplete}
					className="w-full sm:w-auto min-w-[200px]"
				>
					{isCompleted ? "Voltar ao Currículo" : "Marcar como Lido & Concluir"}
				</Button>
			</div>
		</div>
	);
}
