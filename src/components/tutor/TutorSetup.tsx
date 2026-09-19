import { Cpu, Download, Loader2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TutorPhase } from "@/hooks/useTutor";
import type { ProviderStatus } from "@/lib/ai/types";

type TutorSetupProps = {
	phase: TutorPhase;
	status: ProviderStatus;
	progress: { value: number; label?: string };
	providerLabel: string | null;
	error: string | null;
	onStart: () => void;
};

export function TutorSetup({
	phase,
	status,
	progress,
	providerLabel,
	error,
	onStart,
}: TutorSetupProps) {
	if (phase === "detecting") {
		return (
			<p
				role="status"
				className="flex items-center gap-2 text-muted-foreground"
			>
				<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
				Verificando se o seu aparelho roda IA…
			</p>
		);
	}

	if (phase === "unavailable") {
		return (
			<Card className="glass-card">
				<CardContent className="p-5 space-y-2">
					<h2 className="font-bold text-lg">
						Seu navegador ainda não roda IA local
					</h2>
					<p className="text-sm text-muted-foreground">
						O tutor precisa do Chrome ou Edge atualizados no computador (IA
						embutida) ou de um navegador com WebGPU. Enquanto isso, pratique com
						as conversas guiadas em{" "}
						<Link className="underline" to="/exercises/conversation">
							Exercícios
						</Link>
						.
					</p>
				</CardContent>
			</Card>
		);
	}

	const needsDownload = status !== "available";
	const loading = phase === "loading";

	return (
		<Card className="glass-card">
			<CardContent className="p-5 space-y-4">
				<p className="flex items-center gap-2 text-sm text-muted-foreground">
					<Cpu className="h-4 w-4 text-primary" aria-hidden="true" />
					Motor: {providerLabel}
				</p>
				<p className="flex items-start gap-2 text-sm text-muted-foreground">
					<ShieldCheck
						className="h-4 w-4 mt-0.5 text-brand-aqua"
						aria-hidden="true"
					/>
					Grátis e privado: o modelo roda no seu aparelho, sem conta e sem
					chave.
				</p>
				{needsDownload && !loading && (
					<p className="text-sm">
						Na primeira vez o modelo é baixado (cerca de 1 GB). Prefira Wi-Fi;
						depois ele fica salvo no navegador.
					</p>
				)}
				{loading && (
					<div role="status" aria-live="polite" className="space-y-2">
						<Progress
							value={Math.round(progress.value * 100)}
							aria-label="Carregando o modelo"
						/>
						<p className="text-xs text-muted-foreground">
							{progress.label ?? "Preparando o modelo…"}
						</p>
					</div>
				)}
				{error && (
					<p role="alert" className="text-sm text-destructive">
						Não deu para iniciar: {error}
					</p>
				)}
				<Button onClick={onStart} disabled={loading} className="gap-2">
					{loading ? (
						<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
					) : (
						<Download className="h-4 w-4" aria-hidden="true" />
					)}
					{needsDownload ? "Baixar e começar" : "Começar conversa"}
				</Button>
			</CardContent>
		</Card>
	);
}
