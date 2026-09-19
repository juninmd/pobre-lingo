import { Dices, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	fetchArticle,
	fetchRandomArticle,
	searchArticles,
	type WikiArticle,
	type WikiSearchHit,
} from "@/lib/sources/wikipedia";

type WikipediaPickerProps = {
	onImport: (article: WikiArticle) => void;
};

/** Busca ou sorteia um artigo da Simple English Wikipedia para importar. */
export function WikipediaPicker({ onImport }: WikipediaPickerProps) {
	const [query, setQuery] = useState("");
	const [hits, setHits] = useState<WikiSearchHit[]>([]);
	const [loading, setLoading] = useState<"random" | "search" | "open" | null>(
		null,
	);
	const [error, setError] = useState("");
	const controllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		return () => controllerRef.current?.abort();
	}, []);

	function withController(): AbortController {
		controllerRef.current?.abort();
		const controller = new AbortController();
		controllerRef.current = controller;
		return controller;
	}

	async function runRandom() {
		setError("");
		setLoading("random");
		const controller = withController();
		try {
			const article = await fetchRandomArticle(controller.signal);
			onImport(article);
		} catch {
			if (!controller.signal.aborted)
				setError("Não deu para buscar um artigo aleatório. Tente de novo.");
		} finally {
			setLoading(null);
		}
	}

	async function runSearch() {
		if (!query.trim()) return;
		setError("");
		setLoading("search");
		const controller = withController();
		try {
			setHits(await searchArticles(query, controller.signal));
		} catch {
			if (!controller.signal.aborted)
				setError("Busca falhou. Verifique a conexão e tente de novo.");
		} finally {
			setLoading(null);
		}
	}

	async function openHit(title: string) {
		setError("");
		setLoading("open");
		const controller = withController();
		try {
			onImport(await fetchArticle(title, controller.signal));
		} catch {
			if (!controller.signal.aborted)
				setError("Não deu para abrir esse artigo. Tente outro.");
		} finally {
			setLoading(null);
		}
	}

	return (
		<div className="space-y-3">
			<Button
				onClick={runRandom}
				disabled={loading !== null}
				className="gap-2 w-full sm:w-auto"
			>
				<Dices className="h-4 w-4" />
				{loading === "random" ? "Buscando..." : "Artigo aleatório"}
			</Button>

			<div className="flex flex-wrap gap-2">
				<Input
					aria-label="Buscar artigo na Wikipedia"
					placeholder="Buscar um tema..."
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					onKeyDown={(event) => event.key === "Enter" && runSearch()}
					className="flex-1 min-w-[200px]"
				/>
				<Button
					variant="outline"
					onClick={runSearch}
					disabled={loading !== null || !query.trim()}
					className="gap-2"
				>
					<Search className="h-4 w-4" />
					Buscar
				</Button>
			</div>

			{error && (
				<Alert variant="destructive" role="alert">
					<AlertDescription className="flex items-center justify-between gap-3">
						{error}
						<Button size="sm" variant="outline" onClick={runSearch}>
							Tentar de novo
						</Button>
					</AlertDescription>
				</Alert>
			)}

			{hits.length > 0 && (
				<ul className="space-y-1.5">
					{hits.map((hit) => (
						<li key={hit.title}>
							<button
								type="button"
								onClick={() => openHit(hit.title)}
								disabled={loading !== null}
								className="w-full text-left rounded-lg border p-3 hover:bg-primary/5 transition-colors"
							>
								<span className="block font-medium">{hit.title}</span>
								<span className="block text-sm text-muted-foreground truncate">
									{hit.snippet}
								</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
