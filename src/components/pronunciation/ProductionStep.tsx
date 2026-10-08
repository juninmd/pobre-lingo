import { CheckCircle2, Mic, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getRecognitionCtor, type Recognition } from "@/hooks/useSpeechInput";
import type { MinimalPair } from "@/lib/pronunciation/types";
import { PASS_THRESHOLD, scoreSpeech } from "@/lib/speechMatch";
import { tts } from "@/lib/tts";

const PRODUCTION_COUNT = 5;

interface ProductionStepProps {
	pairs: MinimalPair[];
	onComplete: (attempted: number, passed: number) => void;
}

export function ProductionStep({ pairs, onComplete }: ProductionStepProps) {
	const items = pairs.slice(0, PRODUCTION_COUNT);
	const [index, setIndex] = useState(0);
	const [passedCount, setPassedCount] = useState(0);
	const [heardText, setHeardText] = useState("");
	const [status, setStatus] = useState<"idle" | "listening" | "pass" | "fail">(
		"idle",
	);
	const [supported] = useState(() => !!getRecognitionCtor());
	const recognitionRef = useRef<Recognition | null>(null);

	const current = items[index];

	useEffect(() => {
		const SpeechRecognition = getRecognitionCtor();
		if (!SpeechRecognition || !current) return;
		const recognition = new SpeechRecognition();
		recognition.continuous = false;
		recognition.lang = "en-US";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;
		recognition.onresult = (event) => {
			const transcript = event.results[0]?.[0]?.transcript ?? "";
			setHeardText(transcript);
			const { passed } = scoreSpeech(current.a, transcript);
			setStatus(passed ? "pass" : "fail");
			if (passed) setPassedCount((c) => c + 1);
		};
		recognition.onerror = () => setStatus("idle");
		recognition.onend = () =>
			setStatus((prev) => (prev === "listening" ? "idle" : prev));
		recognitionRef.current = recognition;
		return () => recognition.abort();
	}, [current]);

	const advance = (didPass: boolean) => {
		const nextPassed = didPass ? passedCount + 1 : passedCount;
		if (index + 1 >= items.length) {
			onComplete(items.length, nextPassed);
		} else {
			setIndex((i) => i + 1);
			setStatus("idle");
			setHeardText("");
		}
	};

	const listen = () => {
		if (!recognitionRef.current) return;
		setStatus("listening");
		setHeardText("");
		try {
			recognitionRef.current.start();
		} catch {
			setStatus("idle");
		}
	};

	if (!current) return null;

	return (
		<div className="space-y-6 max-w-xl mx-auto">
			<div className="flex justify-between text-sm text-muted-foreground">
				<span>
					Palavra {index + 1} de {items.length}
				</span>
				<span>{passedCount} certas</span>
			</div>
			<Progress value={(index / items.length) * 100} className="h-2" />

			<Card>
				<CardContent className="p-8 flex flex-col items-center gap-6">
					<h2 className="text-3xl font-bold text-primary">{current.a}</h2>
					<Button
						type="button"
						onClick={() => tts.speak(current.a)}
						variant="secondary"
						size="lg"
						className="rounded-full w-14 h-14 p-0"
						aria-label="Ouvir palavra"
					>
						<Volume2 className="h-7 w-7" />
					</Button>

					{!supported ? (
						<p className="text-sm text-muted-foreground text-center">
							Seu navegador não suporta reconhecimento de voz (use Chrome ou
							Edge). Ouça e compare mentalmente, depois avance.
						</p>
					) : (
						<Button
							type="button"
							onClick={listen}
							disabled={status === "listening"}
							size="lg"
							className="rounded-full w-20 h-20 p-0"
							aria-label="Falar a palavra"
						>
							<Mic className="h-8 w-8" />
						</Button>
					)}

					<div aria-live="polite" className="w-full text-center space-y-2">
						{heardText && (
							<p className="text-muted-foreground">Ouvi: "{heardText}"</p>
						)}
						{status === "pass" && (
							<p className="text-primary font-semibold flex items-center justify-center gap-2">
								<CheckCircle2 className="h-5 w-5" /> Muito bem!
							</p>
						)}
						{status === "fail" && (
							<p className="text-sm text-muted-foreground">
								Tente de novo, faltou passar de {PASS_THRESHOLD}%.
							</p>
						)}
					</div>

					<div className="flex gap-3 w-full">
						{status === "fail" && (
							<Button variant="outline" className="flex-1" onClick={listen}>
								Tentar de novo
							</Button>
						)}
						<Button
							variant={status === "pass" ? "default" : "ghost"}
							className="flex-1"
							onClick={() => advance(status === "pass")}
						>
							{status === "pass" ? "Próxima" : "Pular"}
							<SkipForward className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
