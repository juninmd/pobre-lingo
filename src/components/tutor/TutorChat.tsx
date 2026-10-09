import { Lightbulb, Mic, MicOff, Send, Volume2 } from "lucide-react";
import {
	type FormEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSpeechInput } from "@/hooks/useSpeechInput";
import type { TutorTurn } from "@/hooks/useTutor";
import { tts } from "@/lib/tts";
import { cn } from "@/lib/utils";

const MAX_DRAFT_CHARS = 500;

type TutorChatProps = {
	turns: TutorTurn[];
	thinking: boolean;
	error: string | null;
	onSend: (text: string) => void;
};

export function TutorChat({ turns, thinking, error, onSend }: TutorChatProps) {
	const [draft, setDraft] = useState("");
	const endRef = useRef<HTMLDivElement>(null);
	const appendSpeech = useCallback(
		(text: string) =>
			setDraft((prev) =>
				(prev ? `${prev} ${text}` : text).slice(0, MAX_DRAFT_CHARS),
			),
		[],
	);
	const speech = useSpeechInput(appendSpeech);

	const lastContent = turns.at(-1)?.content;
	useEffect(() => {
		if (lastContent !== undefined) {
			endRef.current?.scrollIntoView({ block: "end" });
		}
	}, [lastContent]);

	const submit = (event: FormEvent) => {
		event.preventDefault();
		if (!draft.trim() || thinking) return;
		onSend(draft);
		setDraft("");
	};

	return (
		<div className="space-y-4">
			<ol aria-live="polite" className="space-y-3" data-private>
				{turns.map((turn, index) => (
					<li
						// biome-ignore lint/suspicious/noArrayIndexKey: turns are append-only
						key={index}
						className={cn(
							"flex flex-col gap-1",
							turn.role === "user" && "items-end",
						)}
					>
						<div
							lang="en"
							className={cn(
								"max-w-[85%] rounded-2xl px-4 py-2 text-sm",
								turn.role === "user"
									? "bg-primary text-primary-foreground"
									: "bg-card border border-border",
							)}
						>
							{turn.content || "…"}
							{turn.role === "assistant" && turn.content && (
								<Button
									variant="ghost"
									size="icon"
									className="ml-1 h-6 w-6 align-middle"
									aria-label="Ouvir resposta"
									onClick={() => tts.speak(turn.content, "en-US", 0.95)}
								>
									<Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
								</Button>
							)}
						</div>
						{turn.tip && (
							<p className="max-w-[85%] flex gap-2 rounded-xl bg-brand-gold/10 px-3 py-2 text-xs">
								<Lightbulb
									className="h-4 w-4 shrink-0 text-brand-gold"
									aria-hidden="true"
								/>
								<span>{turn.tip}</span>
							</p>
						)}
					</li>
				))}
			</ol>
			<div ref={endRef} />
			{error && (
				<p role="alert" className="text-sm text-destructive">
					A IA falhou nesta resposta: {error}. Tente enviar de novo.
				</p>
			)}
			<form onSubmit={submit} className="flex gap-2">
				<Input
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					placeholder="Responda em inglês…"
					aria-label="Sua resposta em inglês"
					lang="en"
					maxLength={MAX_DRAFT_CHARS}
				/>
				{speech.supported && (
					<Button
						type="button"
						variant="outline"
						size="icon"
						aria-label={
							speech.listening ? "Parar de ouvir" : "Falar a resposta"
						}
						aria-pressed={speech.listening}
						onClick={speech.toggle}
					>
						{speech.listening ? (
							<MicOff className="h-4 w-4" aria-hidden="true" />
						) : (
							<Mic className="h-4 w-4" aria-hidden="true" />
						)}
					</Button>
				)}
				<Button
					type="submit"
					size="icon"
					aria-label="Enviar"
					disabled={thinking}
				>
					<Send className="h-4 w-4" aria-hidden="true" />
				</Button>
			</form>
		</div>
	);
}
