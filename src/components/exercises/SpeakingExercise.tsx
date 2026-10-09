import { CheckCircle2, Mic, RotateCcw, Volume2, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { tts } from "@/lib/tts";

interface SpeakingPhrase {
	phrase: string;
	translation: string;
}

interface SpeakingExerciseProps {
	phrases: SpeakingPhrase[];
	onComplete: () => void;
	onProgress?: (progress: number) => void;
}

export function SpeakingExercise({
	phrases,
	onComplete,
	onProgress,
}: SpeakingExerciseProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isListening, setIsListening] = useState(false);
	const [spokenText, setSpokenText] = useState("");
	const [feedback, setFeedback] = useState<"idle" | "correct" | "incorrect">(
		"idle",
	);
	const [supported] = useState(
		() =>
			!!(
				(window as any).SpeechRecognition ||
				(window as any).webkitSpeechRecognition
			),
	);

	// Use a ref to hold the recognition instance
	const recognitionRef = useRef<any>(null);

	const currentPhrase = phrases[currentIndex];
	const progress = (currentIndex / phrases.length) * 100;

	useEffect(() => {
		if (onProgress) {
			onProgress(progress);
		}
	}, [progress, onProgress]);

	useEffect(() => {
		const verifySpeech = (transcript: string) => {
			// Normalize texts for comparison
			const normalize = (text: string) =>
				text
					.toLowerCase()
					.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
					.trim();

			const target = normalize(currentPhrase.phrase);
			const spoken = normalize(transcript);

			// Simple fuzzy match check (exact match or contains the phrase)
			if (
				spoken === target ||
				spoken.includes(target) ||
				target.includes(spoken)
			) {
				setFeedback("correct");
			} else {
				setFeedback("incorrect");
			}
		};

		if (supported) {
			const SpeechRecognition =
				(window as any).SpeechRecognition ||
				(window as any).webkitSpeechRecognition;
			const recognition = new SpeechRecognition();
			recognition.continuous = false;
			recognition.lang = "en-US";
			recognition.interimResults = false;
			recognition.maxAlternatives = 1;

			recognition.onresult = (event: any) => {
				const transcript = event.results[0][0].transcript;
				setSpokenText(transcript);
				verifySpeech(transcript);
				setIsListening(false);
			};

			recognition.onerror = (event: any) => {
				console.error("Speech recognition error", event.error);
				setIsListening(false);
			};

			recognition.onend = () => {
				setIsListening(false);
			};

			recognitionRef.current = recognition;
		}

		return () => {
			if (recognitionRef.current) {
				recognitionRef.current.abort();
			}
		};
	}, [currentPhrase.phrase, supported]);

	const playAudio = () => {
		tts.speak(currentPhrase.phrase);
	};

	const startListening = () => {
		if (recognitionRef.current && feedback !== "correct") {
			setFeedback("idle");
			setSpokenText("");
			setIsListening(true);
			try {
				recognitionRef.current.start();
			} catch (e) {
				console.error("Error starting recognition:", e);
				setIsListening(false);
			}
		}
	};

	const handleNext = () => {
		if (currentIndex < phrases.length - 1) {
			setCurrentIndex((prev) => prev + 1);
			setFeedback("idle");
			setSpokenText("");
		} else {
			onComplete();
		}
	};

	const handleManualPass = () => {
		// Fallback for when API fails or is not supported
		setFeedback("correct");
		setSpokenText("(Manual verification)");
	};

	if (!supported) {
		return (
			<Card className="max-w-2xl mx-auto mt-8">
				<CardContent className="p-6 flex flex-col items-center text-center space-y-6">
					<h3 className="text-xl font-bold">Speaking Practice</h3>
					<p className="text-muted-foreground">
						Your browser does not support speech recognition. Use "Listen and
						Self-Check".
					</p>

					<div className="p-8 bg-blue-50 rounded-xl w-full">
						<h2 className="text-3xl font-bold mb-2">{currentPhrase.phrase}</h2>
						<p className="text-muted-foreground italic">
							{currentPhrase.translation}
						</p>
					</div>

					<Button
						onClick={playAudio}
						variant="outline"
						size="lg"
						className="w-full"
					>
						<Volume2 className="mr-2 h-5 w-5" /> Listen
					</Button>

					<Button
						type="button"
						onClick={handleNext}
						size="lg"
						className="w-full"
					>
						Eu disse corretamente{" "}
						<CheckCircle2 className="ml-2 h-5 w-5" aria-hidden="true" />
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6 max-w-2xl mx-auto">
			<div className="flex justify-between text-sm text-muted-foreground mb-2">
				<span>
					Phrase {currentIndex + 1} of {phrases.length}
				</span>
				<span>{Math.round(progress)}% Complete</span>
			</div>
			<Progress value={progress} className="h-2" />

			<Card>
				<CardContent className="p-8 flex flex-col items-center space-y-8">
					{/* Target Phrase */}
					<div className="text-center space-y-2 w-full">
						<h2 className="text-3xl font-bold text-primary">
							{currentPhrase.phrase}
						</h2>
						<p className="text-xl text-muted-foreground">
							{currentPhrase.translation}
						</p>
					</div>

					{/* Controls */}
					<div className="flex gap-4 w-full justify-center">
						<Button
							onClick={playAudio}
							variant="secondary"
							size="lg"
							aria-label="Ouvir a frase"
							className="rounded-full w-16 h-16 p-0"
						>
							<Volume2 className="h-8 w-8" aria-hidden="true" />
						</Button>

						<Button
							onClick={startListening}
							disabled={isListening || feedback === "correct"}
							variant={isListening ? "destructive" : "default"}
							size="lg"
							aria-label={isListening ? "Ouvindo…" : "Falar no microfone"}
							className={`rounded-full w-24 h-24 p-0 shadow-lg transition-all ${isListening ? "animate-pulse" : ""}`}
						>
							<Mic className="h-10 w-10" aria-hidden="true" />
						</Button>
					</div>

					<p className="text-sm text-muted-foreground h-4">
						{isListening ? "Listening..." : "Tap the mic and speak"}
					</p>

					{/* Feedback Area */}
					{(spokenText || feedback !== "idle") && (
						<div
							className={`w-full p-4 rounded-lg border-2 ${
								feedback === "correct"
									? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/50"
									: feedback === "incorrect"
										? "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50"
										: "bg-muted/50 border-border"
							} transition-all duration-300`}
						>
							<p className="text-center font-medium text-lg mb-2">
								"{spokenText}"
							</p>

							{feedback === "correct" && (
								<div className="flex flex-col items-center text-green-600 gap-2">
									<span className="flex items-center font-bold">
										<CheckCircle2 className="mr-2" aria-hidden="true" />{" "}
										Perfeito!
									</span>
									<Button onClick={handleNext} className="w-full mt-2">
										Next Phrase
									</Button>
								</div>
							)}

							{feedback === "incorrect" && (
								<div className="flex flex-col items-center text-red-600 gap-2">
									<span className="flex items-center font-bold">
										<XCircle className="mr-2" /> Try Again
									</span>
									<div className="flex gap-2 w-full mt-2">
										<Button
											variant="outline"
											onClick={() => setFeedback("idle")}
											className="flex-1"
										>
											<RotateCcw className="mr-2 h-4 w-4" /> Retry
										</Button>
										<Button
											variant="ghost"
											onClick={handleManualPass}
											className="flex-1 text-xs text-muted-foreground"
										>
											Skip
										</Button>
									</div>
								</div>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
