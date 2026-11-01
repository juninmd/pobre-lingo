import { useCallback, useRef, useState } from "react";
import { type BuddyMessage, chatWithBuddy } from "@/lib/buddy/api";

export type BuddyStatus = "idle" | "thinking" | "ended" | "error";

/** Conversa curta: a Mika abre o assunto e se despede com "Bye!". */
export function useBuddyChat(level: string, onReply?: (text: string) => void) {
	const [messages, setMessages] = useState<BuddyMessage[]>([]);
	const [status, setStatus] = useState<BuddyStatus>("idle");
	const abortRef = useRef<AbortController | null>(null);

	const run = useCallback(
		async (history: BuddyMessage[]) => {
			abortRef.current?.abort();
			const controller = new AbortController();
			abortRef.current = controller;
			setStatus("thinking");
			try {
				const { reply, done } = await chatWithBuddy(
					history,
					level,
					controller.signal,
				);
				setMessages([...history, { role: "assistant", content: reply }]);
				setStatus(done ? "ended" : "idle");
				onReply?.(reply);
			} catch {
				if (!controller.signal.aborted) setStatus("error");
			}
		},
		[level, onReply],
	);

	const start = useCallback(() => {
		setMessages([]);
		void run([]);
	}, [run]);

	const send = useCallback(
		(text: string) => {
			const content = text.trim();
			if (!content || status === "thinking" || status === "ended") return;
			const history = [...messages, { role: "user" as const, content }];
			setMessages(history);
			void run(history);
		},
		[messages, run, status],
	);

	const stop = useCallback(() => abortRef.current?.abort(), []);

	return { messages, status, start, send, stop };
}
