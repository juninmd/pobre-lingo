import type { NativeSentence } from "@/lib/sources/tatoeba";

export function SentenceAttribution({
	sentence,
}: {
	sentence: NativeSentence;
}) {
	const label = `Áudio: ${sentence.audioAuthor} · ${sentence.audioLicense} · Tatoeba`;
	return (
		<p className="text-xs text-muted-foreground">
			{sentence.attributionUrl ? (
				<a
					href={sentence.attributionUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="underline hover:text-foreground"
				>
					{label}
				</a>
			) : (
				label
			)}
		</p>
	);
}
