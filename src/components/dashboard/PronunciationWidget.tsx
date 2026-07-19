import { Mic, MicOff, Star, Trophy, AlertCircle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { useToast } from "@/hooks/use-toast";

const PRACTICE_PHRASES = [
	{ text: "I love learning English", translation: "Eu amo aprender inglês" },
	{ text: "How are you today?", translation: "Como você está hoje?" },
	{ text: "The weather is beautiful", translation: "O tempo está lindo" },
	{
		text: "Could you repeat that please?",
		translation: "Você poderia repetir isso por favor?",
	},
];

// Add type definitions for Web Speech API
interface SpeechRecognitionErrorEvent extends Event {
	error: string;
	message?: string;
}

interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
	readonly length: number;
	item(index: number): SpeechRecognitionResult;
	[index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
	readonly length: number;
	readonly isFinal: boolean;
	item(index: number): SpeechRecognitionAlternative;
	[index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
	readonly transcript: string;
	readonly confidence: number;
}

interface SpeechRecognition extends EventTarget {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	start(): void;
	stop(): void;
	abort(): void;
	onerror:
		| ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any)
		| null;
	onresult:
		| ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
		| null;
	onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionConstructor {
	new (): SpeechRecognition;
}

declare global {
	interface Window {
		SpeechRecognition?: SpeechRecognitionConstructor;
		webkitSpeechRecognition?: SpeechRecognitionConstructor;
	}
}

export function PronunciationWidget() {
	const { addXp } = useGamification();
	const { toast } = useToast();
	const [isRecording, setIsRecording] = useState(false);
	const [transcript, setTranscript] = useState("");
	const [score, setScore] = useState<number | null>(null);
	const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
	const [isSupported, setIsSupported] = useState(true);

	useEffect(() => {
		if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
			setIsSupported(false);
		}

		// Set random phrase on load
		setCurrentPhraseIdx(Math.floor(Math.random() * PRACTICE_PHRASES.length));
	}, []);

	const currentPhrase = PRACTICE_PHRASES[currentPhraseIdx];

	const handleResult = useCallback(
		(resultTranscript: string) => {
			setTranscript(resultTranscript);
			setIsRecording(false);

			// Simple scoring: check word overlap
			const targetWords = currentPhrase.text
				.toLowerCase()
				.replace(/[?,.!]/g, "")
				.split(" ");
			const spokenWords = resultTranscript
				.toLowerCase()
				.replace(/[?,.!]/g, "")
				.split(" ");

			let matchCount = 0;
			for (const word of targetWords) {
				if (spokenWords.includes(word)) {
					matchCount++;
				}
			}

			const calculatedScore = Math.round(
				(matchCount / targetWords.length) * 100,
			);
			setScore(calculatedScore);

			if (calculatedScore > 70) {
				const earnedXp = Math.round(calculatedScore / 10);
				addXp(earnedXp);
				toast({
					title: "Ótima pronúncia!",
					description: `Você ganhou ${earnedXp} XP`,
					variant: "default",
				});
			} else {
				toast({
					title: "Continue praticando!",
					description: "Tente falar um pouco mais devagar.",
					variant: "destructive",
				});
			}
		},
		[currentPhrase, addXp, toast],
	);

	const toggleRecording = () => {
		if (isRecording) {
			setIsRecording(false);
			// Actual stopping is handled by the API's continuous=false
			return;
		}

		const SpeechRecognitionAPI =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognitionAPI) {
			setIsSupported(false);
			return;
		}

		const recognition = new SpeechRecognitionAPI();
		recognition.lang = "en-US";
		recognition.interimResults = false;
		recognition.continuous = false;

		recognition.onresult = (event: SpeechRecognitionEvent) => {
			const text = event.results[0][0].transcript;
			handleResult(text);
		};

		recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
			console.error("Speech recognition error", event.error);
			setIsRecording(false);
			if (event.error === "not-allowed") {
				toast({
					title: "Erro de microfone",
					description:
						"Por favor, permita o acesso ao microfone no seu navegador.",
					variant: "destructive",
				});
			}
		};

		recognition.onend = () => {
			setIsRecording(false);
		};

		try {
			recognition.start();
			setIsRecording(true);
			setScore(null);
			setTranscript("");
		} catch (e) {
			console.error(e);
			setIsRecording(false);
		}
	};

	const nextPhrase = () => {
		setCurrentPhraseIdx((prev) => (prev + 1) % PRACTICE_PHRASES.length);
		setScore(null);
		setTranscript("");
	};

	if (!isSupported) {
		return (
			<Card className="glass-card bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/50">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-bold flex items-center gap-2 text-rose-700">
						<AlertCircle className="w-4 h-4" />
						Reconhecimento de Voz Indisponível
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Seu navegador não suporta esta funcionalidade.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="glass-card bg-gradient-to-br from-sky-50/50 to-blue-50/50 dark:from-sky-950/20 dark:to-blue-950/20 border-sky-200/50 dark:border-sky-800/50 relative overflow-hidden group">
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-sky-700 dark:text-sky-400">
					<Mic className="w-4 h-4" />
					Prática de Pronúncia
				</CardTitle>
				<span className="text-[10px] uppercase font-bold tracking-widest text-sky-500/70 bg-sky-500/10 px-2 py-0.5 rounded-full">
					IA Interativa
				</span>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="bg-white/60 dark:bg-black/30 p-4 rounded-xl border border-sky-100 dark:border-sky-900/50 text-center relative shadow-inner">
					<p className="text-xl font-black text-sky-900 dark:text-sky-300 tracking-tight">
						"{currentPhrase.text}"
					</p>
					<p className="text-xs text-sky-600/70 dark:text-sky-400/70 mt-1 font-medium">
						{currentPhrase.translation}
					</p>

					{score !== null && (
						<div className="absolute -top-3 -right-3 bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-lg border border-sky-100 flex items-center justify-center min-w-10 animate-in zoom-in">
							<span
								className={`text-xs font-bold ${score > 70 ? "text-green-500" : "text-amber-500"}`}
							>
								{score}%
							</span>
						</div>
					)}
				</div>

				{transcript && (
					<div className="text-center animate-in fade-in slide-in-from-bottom-2">
						<p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
							Você disse:
						</p>
						<p className="text-sm font-medium italic text-foreground">
							"{transcript}"
						</p>
					</div>
				)}

				<div className="flex gap-2">
					<Button
						variant={isRecording ? "destructive" : "gamified"}
						className={`flex-1 font-bold shadow-sm transition-all ${isRecording ? "animate-pulse" : ""}`}
						onClick={toggleRecording}
					>
						{isRecording ? (
							<span className="flex items-center gap-2">
								<MicOff className="w-4 h-4" />
								Parar
							</span>
						) : (
							<span className="flex items-center gap-2">
								<Mic className="w-4 h-4" />
								Falar
							</span>
						)}
					</Button>
					<Button
						variant="outline"
						onClick={nextPhrase}
						className="px-3"
						title="Próxima frase"
					>
						<Trophy className="w-4 h-4 text-sky-600" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
