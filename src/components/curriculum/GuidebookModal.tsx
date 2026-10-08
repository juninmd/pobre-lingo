import {
	AlertTriangle,
	BookOpen,
	CheckCircle2,
	Lightbulb,
	Puzzle,
} from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { curriculumData, type Unit } from "@/lib/curriculumData";
import { getRuleById } from "@/lib/grammarRules";

interface GuidebookModalProps {
	unit: Unit;
	trigger?: React.ReactNode;
}

export function GuidebookModal({ unit, trigger }: GuidebookModalProps) {
	// Find all modules for this unit
	const unitModules = curriculumData.modules.filter(
		(m) => m.unitId === unit.id,
	);

	// Collect all grammar rule IDs from lessons in these modules
	const grammarRuleIds = new Set<string>();
	unitModules.forEach((module) => {
		module.lessons.forEach((lesson) => {
			if (lesson.grammarRuleIds) {
				for (const id of lesson.grammarRuleIds) grammarRuleIds.add(id);
			}
		});
	});

	const unitRules = Array.from(grammarRuleIds)
		.map((id) => getRuleById(id))
		.filter(Boolean);

	// Simple markdown parser
	const renderContent = (content: string) => {
		return content.split("\n").map((line, index) => {
			// Headers
			if (line.startsWith("# ")) {
				return (
					<h2 key={index} className="text-xl font-bold mt-4 mb-2 text-primary">
						{line.replace("# ", "")}
					</h2>
				);
			}
			if (line.startsWith("### ")) {
				return (
					<h3 key={index} className="text-lg font-semibold mt-3 mb-1">
						{line.replace("### ", "")}
					</h3>
				);
			}

			// List items
			if (line.trim().startsWith("* ")) {
				const text = line.trim().replace("* ", "");
				return (
					<div key={index} className="flex items-start gap-2 mb-1 ml-1">
						<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
						<span className="text-muted-foreground">{parseBold(text)}</span>
					</div>
				);
			}

			// Empty lines
			if (line.trim() === "") {
				return <div key={index} className="h-2" />;
			}

			// Paragraphs
			return (
				<p key={index} className="mb-2 text-muted-foreground leading-relaxed">
					{parseBold(line)}
				</p>
			);
		});
	};

	const parseBold = (text: string) => {
		const parts = text.split(/(\*\*.*?\*\*)/g);
		return parts.map((part, i) => {
			if (part.startsWith("**") && part.endsWith("**")) {
				return (
					<strong key={i} className="font-bold text-foreground">
						{part.slice(2, -2)}
					</strong>
				);
			}
			return part;
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				{trigger || (
					<Button
						variant="outline"
						size="sm"
						className="gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary uppercase tracking-wide font-bold text-xs h-9"
					>
						<BookOpen className="h-4 w-4" />
						<span className="hidden sm:inline">Guia da Unidade</span>
						<span className="sm:hidden">Guia</span>
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="max-w-3xl max-h-[85vh] flex flex-col bg-card">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-2xl text-primary">
						<BookOpen className="h-6 w-6" />
						{unit.title}
					</DialogTitle>
					<DialogDescription>{unit.description}</DialogDescription>
				</DialogHeader>

				<ScrollArea className="flex-1 pr-4 mt-4">
					<div className="pb-8 space-y-8">
						{/* Guidebook Content */}
						<section>{renderContent(unit.guidebookContent)}</section>

						{/* Grammar Rules Section */}
						{unitRules.length > 0 && (
							<section className="space-y-6">
								<Separator />
								<div className="flex items-center gap-2">
									<h2 className="text-2xl font-bold text-primary">
										Gramática Detalhada
									</h2>
									<Badge variant="outline">{unitRules.length} regras</Badge>
								</div>

								<div className="grid gap-6">
									{unitRules.map(
										(rule, idx) =>
											rule && (
												<Card
													key={idx}
													className="overflow-hidden border-primary/20 shadow-sm"
												>
													<div className="bg-primary/5 p-4 border-b border-primary/10">
														<h3 className="text-lg font-bold text-primary flex items-center gap-2">
															{rule.title_pt}
															{rule.tags?.map((t) => (
																<Badge
																	key={t}
																	variant="secondary"
																	className="text-[11px] h-5"
																>
																	{t}
																</Badge>
															))}
														</h3>
														<p className="text-sm text-muted-foreground">
															{rule.title_en}
														</p>
													</div>
													<CardContent className="p-4 space-y-4">
														{/* Explanation */}
														<div className="flex gap-3">
															<Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
															<div
																className="text-sm text-muted-foreground leading-relaxed"
																dangerouslySetInnerHTML={{
																	__html: rule.explanation_pt,
																}}
															/>
														</div>

														{/* Structure */}
														{rule.structure_format_pt && (
															<div className="bg-muted/50 rounded-lg p-3 text-sm border border-muted">
																<div className="flex items-center gap-2 mb-2 font-semibold text-foreground">
																	<Puzzle className="h-4 w-4 text-blue-500" />
																	Estrutura
																</div>
																<div
																	dangerouslySetInnerHTML={{
																		__html: rule.structure_format_pt,
																	}}
																/>
															</div>
														)}

														{/* Examples */}
														<div>
															<div className="flex items-center gap-2 mb-2 font-semibold text-foreground text-sm">
																<CheckCircle2 className="h-4 w-4 text-green-500" />
																Exemplos
															</div>
															<div className="space-y-2">
																{rule.examples.slice(0, 3).map((ex, i) => (
																	<div
																		key={i}
																		className="text-sm bg-green-50/50 dark:bg-green-950/10 p-2 rounded border border-green-100 dark:border-green-900/30"
																	>
																		<p className="font-medium">
																			{ex.sentence_en}
																		</p>
																		<p className="text-muted-foreground text-xs">
																			{ex.translation_pt}
																		</p>
																	</div>
																))}
															</div>
														</div>

														{/* Common Mistakes */}
														{rule.common_mistakes_pt && (
															<div className="bg-red-50/50 dark:bg-red-950/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
																<div className="flex items-center gap-2 mb-2 font-semibold text-red-700 dark:text-red-400 text-sm">
																	<AlertTriangle className="h-4 w-4" />
																	Atenção aos Erros
																</div>
																<div
																	className="text-sm text-muted-foreground"
																	dangerouslySetInnerHTML={{
																		__html: rule.common_mistakes_pt,
																	}}
																/>
															</div>
														)}
													</CardContent>
												</Card>
											),
									)}
								</div>
							</section>
						)}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
