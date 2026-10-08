import { CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AiWritingFeedback } from "@/components/writing/AiWritingFeedback";
import type { WritingPrompt } from "@/lib/dictationData";

type Feedback = { ok: boolean; text: string };

export function WritingPromptEditor({ prompt }: { prompt: WritingPrompt }) {
	const [text, setText] = useState("");
	const [feedback, setFeedback] = useState<Feedback[] | null>(null);

	const evaluate = () => {
		const words = text.trim().split(/\s+/).filter(Boolean);
		const lower = text.toLowerCase();
		const sentences = text.split(/[.!?]/).filter((s) => s.trim().length > 0);
		const results: Feedback[] = [
			{
				ok: words.length >= prompt.minWords,
				text: `Tamanho: ${words.length} palavras (meta: ${prompt.minWords}+)`,
			},
			{
				ok: sentences.length >= 3,
				text: `Frases: ${sentences.length} (busque 3+)`,
			},
			{ ok: /^[A-Z]/.test(text.trim()), text: "Comece com letra maiúscula" },
			{ ok: /[.!?]\s*$/.test(text.trim()), text: "Termine com . ! ou ?" },
		];
		for (const keyword of prompt.keywords) {
			results.push({
				ok: lower.includes(keyword.toLowerCase()),
				text: `Use a estrutura: "${keyword}"`,
			});
		}
		setFeedback(results);
	};

	return (
		<Card className="glass-card">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Lightbulb className="h-5 w-5 text-primary" />
					{prompt.promptPt}
				</CardTitle>
				<p className="text-sm text-muted-foreground">{prompt.prompt}</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-wrap gap-2">
					{prompt.keywords.map((keyword) => (
						<Badge key={keyword} variant="outline">
							{keyword}
						</Badge>
					))}
					<Badge variant="secondary">meta: {prompt.minWords}+ palavras</Badge>
				</div>

				<textarea
					value={text}
					onChange={(event) => setText(event.target.value)}
					rows={8}
					placeholder="Escreva seu texto em inglês aqui..."
					aria-label="Escreva seu texto em inglês"
					className="w-full rounded-xl border border-border bg-background/60 p-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
				/>

				<div className="flex flex-wrap justify-end gap-2">
					<AiWritingFeedback
						topic={prompt.prompt}
						text={text}
						level={prompt.level}
					/>
					<Button
						type="button"
						onClick={evaluate}
						disabled={text.trim().length < 5}
					>
						Avaliar texto
					</Button>
				</div>

				{feedback && (
					<ul className="space-y-1.5" role="status" aria-live="polite">
						{feedback.map((item) => (
							<li
								key={item.text}
								className={`flex items-center gap-2 text-sm ${
									item.ok ? "text-brand-aqua" : "text-muted-foreground"
								}`}
							>
								{item.ok ? (
									<CheckCircle2 className="h-4 w-4" aria-hidden="true" />
								) : (
									<XCircle
										className="h-4 w-4 text-destructive"
										aria-hidden="true"
									/>
								)}
								{item.text}
							</li>
						))}
					</ul>
				)}
			</CardContent>
		</Card>
	);
}
