import { BookOpen, CheckCircle2, Clock, Globe2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CefrBadge } from "@/components/common/CefrBadge";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import type { CEFRLevel } from "@/lib/curriculumData";
import { getWordCount, gradedReaders } from "@/lib/gradedReaders";
import { cn } from "@/lib/utils";

export default function ReadingPage() {
	const [level, setLevel] = useState<CEFRLevel | "todos">("todos");
	const { isRead } = useReadingProgress();

	const list =
		level === "todos"
			? gradedReaders
			: gradedReaders.filter((reader) => reader.level === level);
	const doneCount = gradedReaders.filter((reader) => isRead(reader.id)).length;

	return (
		<PageContainer className="max-w-5xl mx-auto">
			<PageHeader
				title="Leitura Extensiva"
				description="Textos graduados A1→C1 com áudio sincronizado. Leia e ouça no seu nível — o jeito mais natural de adquirir vocabulário em contexto."
				icon={BookOpen}
				iconClassName="text-brand-aqua"
			>
				<Badge variant="secondary" className="gap-1">
					<CheckCircle2 className="h-3 w-3" />
					{doneCount}/{gradedReaders.length} lidos
				</Badge>
			</PageHeader>

			<div className="flex flex-wrap gap-2 mb-5">
				{(["todos", "A1", "A2", "B1", "B2", "C1"] as const).map((item) => (
					<Button
						key={item}
						size="sm"
						variant={item === level ? "default" : "outline"}
						onClick={() => setLevel(item)}
					>
						{item === "todos" ? "Todos" : item}
					</Button>
				))}
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				{list.map((reader) => (
					<Card
						key={reader.id}
						className={cn(
							"glass-card transition-all hover:-translate-y-0.5",
							isRead(reader.id) && "border-brand-aqua/40",
						)}
					>
						<CardContent className="p-5 flex flex-col gap-3">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0">
									<h3 className="font-headline text-lg font-bold truncate">
										{reader.title}
									</h3>
									<p className="text-sm text-muted-foreground">
										{reader.titlePt}
									</p>
								</div>
								<CefrBadge
									level={reader.level}
									showDescriptionOnHover={false}
								/>
							</div>
							<div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
								<Badge variant="outline" className="gap-1">
									<Globe2 className="h-3 w-3" />
									{reader.topic}
								</Badge>
								<span className="inline-flex items-center gap-1">
									<Clock className="h-3 w-3" />
									{reader.minutes} min
								</span>
								<span>{getWordCount(reader)} palavras</span>
								{isRead(reader.id) && (
									<span className="inline-flex items-center gap-1 text-brand-aqua font-semibold">
										<CheckCircle2 className="h-3 w-3" />
										Lido
									</span>
								)}
							</div>
							<Button asChild className="w-full">
								<Link to={`/reading/${reader.id}`}>
									{isRead(reader.id) ? "Ler de novo" : "Começar a ler"}
								</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</PageContainer>
	);
}
