import { Mic, Send, Volume2, VolumeX } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BuddyStatus } from "@/hooks/useBuddyChat";
import { useLiveCorrection } from "@/hooks/useLiveCorrection";
import { useSpeechInput } from "@/hooks/useSpeechInput";
import type { BuddyMessage } from "@/lib/buddy/api";
import { cn } from "@/lib/utils";
import { CorrectionHint } from "./CorrectionHint";

type Props = {
	messages: BuddyMessage[];
	status: BuddyStatus;
	muted: boolean;
	onToggleMute: () => void;
	onSend: (text: string) => void;
	onRestart: () => void;
};

export function BuddyChat({
	messages,
	status,
	muted,
	onToggleMute,
	onSend,
	onRestart,
}: Props) {
	const [draft, setDraft] = useState("");
	const endRef = useRef<HTMLDivElement>(null);
	const locked = status === "thinking" || status === "ended";
	const live = useLiveCorrection(draft, !locked);
	const mic = useSpeechInput(setDraft);

	useEffect(() => {
		endRef.current?.scrollIntoView?.({ block: "end" });
	}, [messages.length, status]);

	const submit = (event: FormEvent) => {
		event.preventDefault();
		if (!draft.trim() || locked) return;
		onSend(draft);
		setDraft("");
	};

	return (
		<div className="flex min-h-[22rem] flex-col gap-3">
			<div
				className="flex-1 space-y-2 overflow-y-auto"
				role="log"
				aria-label="Conversa"
			>
				{messages.map((message, index) => (
					<p
						key={`${message.role}-${index}`}
						className={cn(
							"max-w-[85%] rounded-2xl px-3 py-2 text-sm",
							message.role === "user"
								? "ml-auto bg-primary text-primary-foreground"
								: "bg-muted",
						)}
					>
						{message.content}
					</p>
				))}
				{status === "thinking" && (
					<p className="text-sm text-muted-foreground">Lia está digitando…</p>
				)}
				{status === "error" && (
					<p role="alert" className="text-sm text-destructive">
						Não consegui falar com a Lia agora. Tente de novo em instantes.
					</p>
				)}
				<div ref={endRef} />
			</div>
			{status === "ended" ? (
				<Button onClick={onRestart}>Conversar de novo</Button>
			) : (
				<form onSubmit={submit} className="space-y-1">
					<CorrectionHint live={live} onApply={setDraft} />
					<div className="flex gap-2">
						<Input
							value={draft}
							onChange={(event) => setDraft(event.target.value)}
							placeholder="Write in English…"
							aria-label="Sua mensagem em inglês"
							autoComplete="off"
							spellCheck={false}
							disabled={locked}
						/>
						{mic.supported && (
							<Button
								type="button"
								variant={mic.listening ? "default" : "outline"}
								size="icon"
								onClick={mic.toggle}
								aria-label="Ditar por voz"
							>
								<Mic className="size-4" aria-hidden="true" />
							</Button>
						)}
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={onToggleMute}
							aria-label={muted ? "Ligar a voz da Lia" : "Silenciar a Lia"}
						>
							{muted ? (
								<VolumeX className="size-4" aria-hidden="true" />
							) : (
								<Volume2 className="size-4" aria-hidden="true" />
							)}
						</Button>
						<Button
							type="submit"
							size="icon"
							disabled={locked || !draft.trim()}
							aria-label="Enviar"
						>
							<Send className="size-4" aria-hidden="true" />
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}
