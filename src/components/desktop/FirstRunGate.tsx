import { type ChangeEvent, type ReactNode, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { parseBackup, restoreBackup } from "@/lib/backup";
import { desktopInvoke } from "@/lib/desktop/invoke";

/** Primeira execução do app desktop: traz o progresso da versão web ou começa do zero. */
export function FirstRunGate({ children }: { children: ReactNode }) {
	const [done, setDone] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const input = useRef<HTMLInputElement>(null);

	const finish = async () => {
		await desktopInvoke<void>("mark_first_run_done").catch(() => undefined);
		setDone(true);
	};

	const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;
		const parsed = parseBackup(await file.text().catch(() => ""));
		if (!parsed.ok) return setError(parsed.error);
		const restored = restoreBackup(
			parsed.entries,
			localStorage,
			parsed.skipped,
		);
		if (!restored.ok) return setError(restored.error);
		await finish();
	};

	if (done) return <>{children}</>;
	return (
		<main className="flex min-h-screen items-center justify-center p-4">
			<Card className="glass-card w-full max-w-md">
				<CardHeader>
					<CardTitle>Traga seu progresso</CardTitle>
					<CardDescription>
						O app desktop guarda seus dados em arquivo. O progresso do site não
						vem sozinho: exporte um backup em Ajustes &gt; Seus dados e importe
						aqui.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-3">
					<input
						ref={input}
						type="file"
						accept="application/json,.json"
						className="hidden"
						onChange={onFile}
						aria-label="Arquivo de backup"
					/>
					<Button onClick={() => input.current?.click()}>
						Importar backup (.json)
					</Button>
					<Button variant="outline" onClick={() => void finish()}>
						Começar do zero
					</Button>
					{error && (
						<p role="alert" className="text-sm text-destructive">
							{error}
						</p>
					)}
				</CardContent>
			</Card>
		</main>
	);
}
