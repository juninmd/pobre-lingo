import {
	ArrowLeft,
	CheckCircle2,
	Eye,
	EyeOff,
	Pause,
	Play,
	Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CefrBadge } from "@/components/common/CefrBadge";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useStudyTimer } from "@/hooks/useStudyLog";
import { getReaderById } from "@/lib/gradedReaders";
import { recordWordsRead } from "@/lib/studyLogStore";
import { tts } from "@/lib/tts";
import { cn } from "@/lib/utils";

export default function ReadingViewPage() {
	useStudyTimer("reading");
	const { readerId } = useParams<{ readerId: string }>();
	const reader = getReaderById(readerId ?? "");
	const { isRead, markRead } = useReadingProgress();
	const navigate = useNavigate();
	const [active, setActive] = useState(-1);
	const [showPt, setShowPt] = useState(true);
	const [playing, setPlaying] = useState(false);
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) window.clearTimeout(timerRef.current);
			tts.cancel();
		};
	}, []);

	if (!reader) {
		return (
			<PageContainer className="max-w-3xl mx-auto text-center py-16">
				<p className="text-muted-foreground mb-4">Texto não encontrado.</p>
				<Button asChild variant="outline">
					<Link to="/reading">Voltar para a leitura</Link>
				</Button>
			</PageContainer>
		);
	}

	const playFrom = (index: number) => {
		if (index >= reader.lines.length) {
			setPlaying(false);
			setActive(-1);
			return;
		}
		setActive(index);
		const line = reader.lines[index];
		tts.speak(line.en, "en-US", 0.92);
		const delay = line.en.split(/\s+/).length * 380 + 650;
		timerRef.current = window.setTimeout(() => playFrom(index + 1), delay);
	};

	const togglePlay = () => {
		if (playing) {
			setPlaying(false);
			tts.cancel();
			if (timerRef.current) window.clearTimeout(timerRef.current);
		} else {
			setPlaying(true);
			playFrom(0);
		}
	};

	const finish = () => {
		if (!isRead(reader.id)) {
			recordWordsRead(
				reader.lines.reduce(
					(sum, line) => sum + line.en.split(/\s+/).length,
					0,
				),
			);
		}
		markRead(reader.id);
		navigate("/reading");
	};

	return (
		<PageContainer className="max-w-3xl mx-auto">
			<PageHeader
				title={reader.title}
				description={reader.titlePt}
				icon={Volume2}
				iconClassName="text-brand-aqua"
				backLink="/reading"
				backLabel="Leitura"
			>
				<div className="flex flex-wrap items-center gap-2">
					<CefrBadge level={reader.level} showDescriptionOnHover={false} />
					<Badge variant="outline">{reader.topic}</Badge>
					<Badge variant="secondary">{reader.minutes} min</Badge>
				</div>
			</PageHeader>

			<div className="flex flex-wrap items-center gap-2 mb-4">
				<Button onClick={togglePlay} className="gap-2">
					{playing ? (
						<Pause className="h-4 w-4" />
					) : (
						<Play className="h-4 w-4" />
					)}
					{playing ? "Pausar" : "Ouvir tudo"}
				</Button>
				<Button
					variant="outline"
					onClick={() => setShowPt((value) => !value)}
					className="gap-2"
				>
					{showPt ? (
						<EyeOff className="h-4 w-4" />
					) : (
						<Eye className="h-4 w-4" />
					)}
					{showPt ? "Ocultar tradução" : "Mostrar tradução"}
				</Button>
			</div>

			<Card className="glass-card mb-4">
				<CardContent className="p-2 sm:p-4 space-y-1">
					{reader.lines.map((line, index) => (
						<button
							key={line.en}
							type="button"
							onClick={() => {
								tts.speak(line.en, "en-US", 0.92);
								setActive(index);
							}}
							className={cn(
								"w-full text-left rounded-xl px-3 py-3 transition-colors hover:bg-primary/5",
								active === index && "bg-primary/10 ring-1 ring-primary/30",
							)}
						>
							<span className="block font-medium text-foreground">
								{line.en}
							</span>
							{showPt && (
								<span className="block text-sm text-muted-foreground mt-0.5">
									{line.pt}
								</span>
							)}
						</button>
					))}
				</CardContent>
			</Card>

			<div className="flex justify-between gap-3">
				<Button variant="ghost" asChild className="gap-2">
					<Link to="/reading">
						<ArrowLeft className="h-4 w-4" />
						Voltar
					</Link>
				</Button>
				<Button
					onClick={finish}
					variant={isRead(reader.id) ? "outline" : "default"}
					className="gap-2"
				>
					<CheckCircle2 className="h-4 w-4" />
					{isRead(reader.id) ? "Marcado como lido" : "Marcar como lido"}
				</Button>
			</div>
		</PageContainer>
	);
}
