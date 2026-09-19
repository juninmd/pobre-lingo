import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWordKnowledge } from "@/hooks/useWordKnowledge";
import type { CEFRLevel } from "@/lib/curriculumData";
import {
	fetchNativeSentences,
	type NativeSentence,
} from "@/lib/sources/tatoeba";
import { DictationMode } from "./DictationMode";
import { SentenceAudioPlayer } from "./SentenceAudioPlayer";
import { SentenceSearchControls } from "./SentenceSearchControls";
import { ShadowingMode } from "./ShadowingMode";
import { UnderstandMode } from "./UnderstandMode";

type Mode = "understand" | "dictation" | "shadowing";

export function NativeSentencesTab({
	onPlayingChange,
}: {
	onPlayingChange: (playing: boolean) => void;
}) {
	const { level: knownLevel } = useWordKnowledge();
	const [level, setLevel] = useState<CEFRLevel>(knownLevel ?? "A2");
	const [topic, setTopic] = useState("");
	const [sentences, setSentences] = useState<NativeSentence[]>([]);
	const [index, setIndex] = useState(0);
	const [mode, setMode] = useState<Mode>("understand");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const controllerRef = useRef<AbortController | null>(null);

	const search = () => {
		controllerRef.current?.abort();
		const controller = new AbortController();
		controllerRef.current = controller;
		setLoading(true);
		setError(null);
		fetchNativeSentences({ level, query: topic, limit: 10 }, controller.signal)
			.then((result) => {
				setSentences(result);
				setIndex(0);
			})
			.catch((err) => {
				if (err instanceof DOMException && err.name === "AbortError") return;
				setError("Não foi possível buscar frases. Verifique sua conexão.");
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => () => controllerRef.current?.abort(), []);

	const current = sentences[index];
	const offline = typeof navigator !== "undefined" && !navigator.onLine;

	return (
		<div className="space-y-4">
			<SentenceSearchControls
				level={level}
				onLevelChange={setLevel}
				topic={topic}
				onTopicChange={setTopic}
				onSearch={search}
				loading={loading}
				hasResults={sentences.length > 0}
			/>

			{offline && (
				<p className="text-sm text-muted-foreground">
					Você está offline: conecte-se para buscar novas frases.
				</p>
			)}

			{loading && (
				<div className="space-y-2">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-24 w-full" />
				</div>
			)}

			{error && (
				<div className="space-y-2" role="alert">
					<p className="text-sm text-destructive">{error}</p>
					<Button size="sm" variant="outline" onClick={search}>
						Tentar de novo
					</Button>
				</div>
			)}

			{!loading && !error && current && (
				<div className="space-y-4 rounded-lg border p-4">
					<p className="text-sm text-muted-foreground">
						Frase {index + 1} de {sentences.length}
					</p>
					<SentenceAudioPlayer
						key={current.id}
						sentence={current}
						onPlayingChange={onPlayingChange}
					/>
					<Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
						<TabsList>
							<TabsTrigger value="understand">Entender</TabsTrigger>
							<TabsTrigger value="dictation">Ditado</TabsTrigger>
							<TabsTrigger value="shadowing">Shadowing</TabsTrigger>
						</TabsList>
					</Tabs>
					{mode === "understand" && <UnderstandMode sentence={current} />}
					{mode === "dictation" && (
						<DictationMode sentence={current} level={level} />
					)}
					{mode === "shadowing" && <ShadowingMode sentence={current} />}
					<div className="flex justify-between">
						<Button
							variant="ghost"
							disabled={index === 0}
							onClick={() => setIndex((i) => i - 1)}
						>
							Anterior
						</Button>
						<Button
							variant="ghost"
							disabled={index === sentences.length - 1}
							onClick={() => setIndex((i) => i + 1)}
						>
							Próxima
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
