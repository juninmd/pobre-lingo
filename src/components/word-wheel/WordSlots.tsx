import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface WordSlotsProps {
	targets: string[];
	found: string[];
	reveals: Record<string, number>;
	translations: Record<string, string>;
	/** Última palavra achada: ganha o brilho de entrada. */
	fresh?: string;
}

/** Grade das palavras do nível: casas vazias, letras de dica e palavras achadas. */
export function WordSlots(props: WordSlotsProps) {
	const { targets, found, reveals, translations, fresh } = props;
	return (
		<ul className="ww-slots" aria-label="Palavras do nível">
			{targets.map((word) => {
				const done = found.includes(word);
				const shown = done ? word.length : (reveals[word] ?? 0);
				return (
					<li
						key={word}
						className={cn(
							"ww-word",
							done && "is-done",
							fresh === word && "is-fresh",
						)}
						aria-label={
							done
								? `${word}: ${translations[word]}`
								: `Palavra de ${word.length} letras ainda escondida`
						}
					>
						<span className="flex gap-1" aria-hidden="true">
							{[...word].map((ch, i) => (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: posição fixa da letra na palavra
									key={i}
									className={cn("ww-tile", i < shown && "is-filled")}
									style={{ "--i": i } as CSSProperties}
								>
									{i < shown ? ch.toUpperCase() : ""}
								</span>
							))}
						</span>
						{done && (
							<span className="ww-translation" aria-hidden="true">
								{translations[word]}
							</span>
						)}
					</li>
				);
			})}
		</ul>
	);
}
