import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { checkForUpdate, type UpdateInfo } from "@/lib/desktop/updater";

type Phase =
	| { kind: "idle" }
	| { kind: "checking" }
	| { kind: "current" }
	| { kind: "available"; update: UpdateInfo }
	| { kind: "installing"; percent: number | null }
	| { kind: "error" };

/** Atualização do app desktop. Só instala quando o usuário pede: nunca no meio de uma sessão. */
export function DesktopUpdateCard() {
	const [phase, setPhase] = useState<Phase>({ kind: "idle" });

	const check = async () => {
		setPhase({ kind: "checking" });
		try {
			const update = await checkForUpdate();
			setPhase(update ? { kind: "available", update } : { kind: "current" });
		} catch {
			setPhase({ kind: "error" });
		}
	};

	const install = async (update: UpdateInfo) => {
		setPhase({ kind: "installing", percent: null });
		try {
			await update.install((percent) =>
				setPhase({ kind: "installing", percent }),
			);
		} catch {
			setPhase({ kind: "error" });
		}
	};

	return (
		<Card className="glass-card">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg">
					<Download className="h-5 w-5 text-primary" aria-hidden="true" />
					Atualizações do app
				</CardTitle>
				<CardDescription>
					As versões são assinadas. O app só atualiza quando você confirmar.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3" aria-live="polite">
				{phase.kind === "current" && (
					<p className="text-sm">Você está na versão mais recente.</p>
				)}
				{phase.kind === "error" && (
					<p role="alert" className="text-sm text-destructive">
						Não foi possível verificar agora. Confira a conexão e tente de novo.
					</p>
				)}
				{phase.kind === "available" && (
					<div className="space-y-2">
						<p className="text-sm font-medium">
							Versão {phase.update.version} disponível.
						</p>
						{phase.update.notes && (
							<p className="whitespace-pre-line text-xs text-muted-foreground">
								{phase.update.notes}
							</p>
						)}
						<Button onClick={() => void install(phase.update)}>
							Baixar e reiniciar
						</Button>
					</div>
				)}
				{phase.kind === "installing" && (
					<p className="text-sm">
						Baixando{phase.percent === null ? "…" : ` ${phase.percent}%`}. O app
						reinicia ao terminar.
					</p>
				)}
				{(phase.kind === "idle" ||
					phase.kind === "current" ||
					phase.kind === "error") && (
					<Button variant="outline" onClick={() => void check()}>
						Verificar atualizações
					</Button>
				)}
				{phase.kind === "checking" && <p className="text-sm">Verificando…</p>}
			</CardContent>
		</Card>
	);
}
