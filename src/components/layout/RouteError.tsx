import { RefreshCw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { isChunkLoadError, reloadOnceForChunkError } from "@/lib/chunkError";
import { clearAppData } from "@/lib/clearAppData";
import { reloadPage } from "@/lib/pageReload";

const CONFIRM_CLEAR =
	"Isso apaga o progresso e as configurações salvos neste aparelho. Se puder, exporte um backup antes. Continuar?";

/** Route-level error screen: `fullPage` when the whole shell failed to render. */
export function RouteError({ fullPage = false }: { fullPage?: boolean }) {
	const error = useRouteError();
	const stale = isChunkLoadError(error);

	// A stale chunk after a PWA update is fixed by one reload of the new build.
	useEffect(() => {
		if (stale) reloadOnceForChunkError();
	}, [stale]);

	const handleClear = () => {
		if (!window.confirm(CONFIRM_CLEAR)) return;
		try {
			clearAppData();
		} catch {
			// Storage is unavailable, so there is nothing left to clear.
		}
		reloadPage();
	};

	const Heading = fullPage ? "h1" : "h2";
	const content = (
		<div role="alert" className="mx-auto max-w-md space-y-4 py-16 text-center">
			<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
				<TriangleAlert
					className="h-8 w-8 text-destructive"
					aria-hidden="true"
				/>
			</div>
			<Heading className="text-2xl font-extrabold">
				{stale ? "Há uma nova versão do app" : "Algo deu errado"}
			</Heading>
			<p className="leading-relaxed text-muted-foreground">
				{stale
					? "Esta página mudou desde a sua última visita. Recarregue para continuar de onde parou."
					: "Não conseguimos mostrar esta página. Tente de novo; seu progresso continua salvo."}
			</p>
			<div className="flex flex-col justify-center gap-2 pt-2 sm:flex-row">
				<Button onClick={reloadPage} className="gap-2 font-bold">
					<RefreshCw className="h-4 w-4" aria-hidden="true" />
					Tentar de novo
				</Button>
				<Button variant="outline" onClick={handleClear}>
					Limpar dados locais e recarregar
				</Button>
			</div>
		</div>
	);

	return fullPage ? (
		<main className="flex min-h-svh items-center justify-center bg-background px-4 text-foreground">
			{content}
		</main>
	) : (
		content
	);
}
