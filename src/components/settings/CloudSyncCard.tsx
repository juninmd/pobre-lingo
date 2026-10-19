import { Cloud, CloudOff, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type CloudSyncStatus, useCloudSync } from "@/hooks/useCloudSync";
import { CLOUD_SYNC_AVAILABLE } from "@/lib/cloudSync/config";

const STATUS_TEXT: Record<CloudSyncStatus, string> = {
	off: "Desligada",
	syncing: "Sincronizando…",
	synced: "Progresso salvo na nuvem",
	conflict: "Os dados deste aparelho e da nuvem são diferentes",
	offline: "Sem conexão com o servidor. Tentaremos de novo.",
	error: "Não foi possível sincronizar agora.",
};

export function CloudSyncCard() {
	const { syncKey, status, sync, enable, connect, disconnect, resolve } =
		useCloudSync();
	const [code, setCode] = useState("");
	const [codeError, setCodeError] = useState(false);
	const [copied, setCopied] = useState(false);

	if (!CLOUD_SYNC_AVAILABLE) return null;

	const handleConnect = () => {
		const ok = connect(code.trim());
		setCodeError(!ok);
		if (ok) setCode("");
	};

	const handleCopy = async () => {
		if (!syncKey) return;
		await navigator.clipboard?.writeText(syncKey);
		setCopied(true);
	};

	return (
		<Card className="glass-card">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg">
					<Cloud className="h-5 w-5 text-primary" aria-hidden="true" />
					Sincronização na nuvem
				</CardTitle>
				<CardDescription>
					Guarda seu progresso de estudos no servidor para você continuar de
					onde parou em outro aparelho. Sem conta: um código secreto identifica
					seus dados.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<p role="status" className="text-sm text-muted-foreground">
					{STATUS_TEXT[status]}
				</p>
				{status === "conflict" && (
					<div className="flex flex-col sm:flex-row gap-3">
						<Button variant="outline" onClick={() => resolve("remote")}>
							Usar dados da nuvem
						</Button>
						<Button variant="outline" onClick={() => resolve("local")}>
							Manter dados deste aparelho
						</Button>
					</div>
				)}
				{syncKey ? (
					<>
						<div className="space-y-1.5">
							<label htmlFor="sync-code" className="text-sm font-semibold">
								Seu código de sincronização
							</label>
							<div className="flex gap-2">
								<Input id="sync-code" readOnly value={syncKey} />
								<Button
									variant="outline"
									size="icon"
									onClick={handleCopy}
									aria-label="Copiar código"
								>
									<Copy className="h-4 w-4" aria-hidden="true" />
								</Button>
							</div>
							<p className="text-xs text-muted-foreground">
								{copied ? "Código copiado. " : ""}
								Guarde-o: quem tem o código acessa o progresso. Cole-o em outro
								aparelho para conectá-lo.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-3">
							<Button variant="outline" className="gap-2" onClick={sync}>
								<RefreshCw className="h-4 w-4" aria-hidden="true" />
								Sincronizar agora
							</Button>
							<Button variant="outline" className="gap-2" onClick={disconnect}>
								<CloudOff className="h-4 w-4" aria-hidden="true" />
								Desconectar este aparelho
							</Button>
						</div>
					</>
				) : (
					<div className="space-y-3">
						<Button className="gap-2" onClick={enable}>
							<Cloud className="h-4 w-4" aria-hidden="true" />
							Ativar sincronização
						</Button>
						<div className="space-y-1.5">
							<label htmlFor="connect-code" className="text-sm font-semibold">
								Já tem um código?
							</label>
							<div className="flex gap-2">
								<Input
									id="connect-code"
									value={code}
									onChange={(e) => setCode(e.target.value)}
									placeholder="Cole o código de outro aparelho"
								/>
								<Button variant="outline" onClick={handleConnect}>
									Conectar
								</Button>
							</div>
							{codeError && (
								<p role="alert" className="text-sm text-destructive">
									Código inválido.
								</p>
							)}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
