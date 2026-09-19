import { type RefObject, useMemo, useRef, useState } from "react";
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
} from "@/components/ui/popover";
import { useSrs } from "@/hooks/useSrs";
import type { Token, WordToken } from "@/lib/input/tokenize";
import { cn } from "@/lib/utils";
import { WordPopover } from "./WordPopover";

type InteractiveTextProps = {
	tokens: Token[];
	isKnown: (token: WordToken) => boolean;
	onToggleKnown: (key: string) => void;
	className?: string;
};

type Active = { token: WordToken; context: string };

function sentenceAround(plain: string, offset: number): string {
	const start = Math.max(
		plain.lastIndexOf(".", offset),
		plain.lastIndexOf("!", offset),
		plain.lastIndexOf("?", offset),
		plain.lastIndexOf("\n", offset),
	);
	const rest = plain.slice(offset).search(/[.!?\n]/);
	const end = rest < 0 ? plain.length : offset + rest + 1;
	return plain
		.slice(start + 1, end)
		.trim()
		.slice(0, 240);
}

/**
 * Texto em que cada palavra abre tradução, áudio e "Já sei"/"Revisar".
 * Um único popover ancorado na palavra clicada: leve até em textos longos.
 */
export function InteractiveText({
	tokens,
	isKnown,
	onToggleKnown,
	className,
}: InteractiveTextProps) {
	const { cards, addCard } = useSrs();
	const queued = useMemo(() => new Set(cards.map((c) => c.id)), [cards]);
	const anchorRef = useRef<HTMLButtonElement | null>(null);
	const [active, setActive] = useState<Active | null>(null);

	const rendered = useMemo(() => {
		const plain = tokens.map((t) => t.text).join("");
		let offset = 0;
		return tokens.map((token, index) => {
			const at = offset;
			offset += token.text.length;
			if (token.kind === "other") return token.text;
			return (
				<button
					// biome-ignore lint/suspicious/noArrayIndexKey: tokens are positional and never reorder
					key={index}
					type="button"
					data-known={isKnown(token) || undefined}
					className="rounded px-0.5 underline decoration-brand-violet/60 decoration-dotted underline-offset-4 transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 data-[known]:no-underline"
					onClick={(event) => {
						anchorRef.current = event.currentTarget;
						setActive({ token, context: sentenceAround(plain, at) });
					}}
				>
					{token.text}
				</button>
			);
		});
	}, [tokens, isKnown]);

	const cardId = active ? `lib-${active.token.key}` : "";

	return (
		<Popover open={!!active} onOpenChange={(open) => !open && setActive(null)}>
			{/* Só abre depois de um clique, quando o ref já aponta para a palavra. */}
			<PopoverAnchor virtualRef={anchorRef as RefObject<HTMLButtonElement>} />
			<p
				className={cn("whitespace-pre-line leading-relaxed", className)}
				lang="en"
			>
				{rendered}
			</p>
			<PopoverContent
				className="w-72"
				onCloseAutoFocus={(event) => {
					event.preventDefault();
					anchorRef.current?.focus();
				}}
			>
				{active && (
					<WordPopover
						key={cardId}
						word={active.token.text}
						wordKey={active.token.key}
						context={active.context}
						isKnown={isKnown(active.token)}
						isQueued={queued.has(cardId)}
						onToggleKnown={onToggleKnown}
						onReview={(card) =>
							addCard({
								id: cardId,
								source: "dictionary",
								front: card.word,
								back: card.translation,
								hint: card.context,
							})
						}
					/>
				)}
			</PopoverContent>
		</Popover>
	);
}
