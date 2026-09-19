import type React from "react";
import { useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { MAX_TEXT_CHARS } from "@/lib/input/library";
import { parseSubtitles } from "@/lib/input/subtitles";
import type { WikiArticle } from "@/lib/sources/wikipedia";
import { WikipediaPicker } from "./WikipediaPicker";

const MAX_FILE_BYTES = 1_000_000;

export type Imported = {
	title: string;
	text: string;
	source: "paste" | "file" | "wikipedia";
	url?: string;
};

type ImportPanelProps = { onImport: (item: Imported) => void };

/** Três formas de trazer texto para a biblioteca: colar, arquivo, Wikipedia. */
export function ImportPanel({ onImport }: ImportPanelProps) {
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [fileError, setFileError] = useState("");
	const fileRef = useRef<HTMLInputElement>(null);

	function submitPaste() {
		if (!text.trim()) return;
		onImport({ title, text, source: "paste" });
		setTitle("");
		setText("");
	}

	async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;
		setFileError("");
		if (file.size > MAX_FILE_BYTES) {
			setFileError("Arquivo maior que 1MB. Escolha um arquivo menor.");
			return;
		}
		try {
			const raw = await file.text();
			const isSubtitle = /\.(srt|vtt)$/i.test(file.name);
			const content = isSubtitle
				? parseSubtitles(raw)
						.map((cue) => cue.text)
						.join("\n")
				: raw;
			if (!content.trim()) {
				setFileError("Não encontrei texto legível nesse arquivo.");
				return;
			}
			onImport({
				title: file.name.replace(/\.[^.]+$/, ""),
				text: content,
				source: "file",
			});
		} catch {
			setFileError("Não deu para ler o arquivo. Tente outro.");
		}
	}

	function handleWiki(article: WikiArticle) {
		onImport({
			title: article.title,
			text: article.text,
			source: "wikipedia",
			url: article.url,
		});
	}

	return (
		<Tabs defaultValue="paste">
			<TabsList>
				<TabsTrigger value="paste">Colar texto</TabsTrigger>
				<TabsTrigger value="file">Arquivo</TabsTrigger>
				<TabsTrigger value="wikipedia">Wikipedia</TabsTrigger>
			</TabsList>

			<TabsContent value="paste" className="space-y-3">
				<Input
					aria-label="Título do texto"
					placeholder="Título (opcional)"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<Textarea
					aria-label="Texto para importar"
					placeholder="Cole aqui qualquer texto em inglês..."
					value={text}
					onChange={(event) =>
						setText(event.target.value.slice(0, MAX_TEXT_CHARS))
					}
					rows={8}
				/>
				<div className="flex items-center justify-between">
					<span className="text-xs text-muted-foreground">
						{text.length}/{MAX_TEXT_CHARS}
					</span>
					<Button onClick={submitPaste} disabled={!text.trim()}>
						Importar
					</Button>
				</div>
			</TabsContent>

			<TabsContent value="file" className="space-y-3">
				<Input
					ref={fileRef}
					type="file"
					accept=".txt,.srt,.vtt"
					aria-label="Escolher arquivo de texto"
					onChange={handleFile}
				/>
				{fileError && (
					<Alert variant="destructive" role="alert">
						<AlertDescription>{fileError}</AlertDescription>
					</Alert>
				)}
			</TabsContent>

			<TabsContent value="wikipedia">
				<WikipediaPicker onImport={handleWiki} />
			</TabsContent>
		</Tabs>
	);
}
