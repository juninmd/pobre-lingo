import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptureDialog } from "@/components/desktop/CaptureDialog";
import { StudyFirstGate } from "@/components/desktop/StudyFirstGate";
import { desktopInvoke } from "@/lib/desktop/invoke";
import { listenDesktop } from "@/lib/desktop/events";
import { normalizeCapture } from "@/lib/desktop/capture";
import { isSafeInternalHref } from "@/lib/safeHref";
import { getDueCards, loadCards } from "@/lib/srsCards";

const DUE_TICK_MS = 60_000;

async function readClipboard(): Promise<string> {
	try {
		const { readText } = await import("@tauri-apps/plugin-clipboard-manager");
		return normalizeCapture((await readText()) ?? "") ?? "";
	} catch {
		return "";
	}
}

/** Liga os eventos nativos (bandeja, atalho global) ao app e mantém a contagem da bandeja. */
export function DesktopBridge() {
	const navigate = useNavigate();
	const [captured, setCaptured] = useState<string | null>(null);

	useEffect(() => {
		let active = true;
		const unlisten: Array<() => void> = [];
		const keep = (off: () => void) => (active ? unlisten.push(off) : off());
		void listenDesktop<string>("desktop://navigate", (route) => {
			if (isSafeInternalHref(route)) navigate(route);
		}).then(keep);
		void listenDesktop<null>("desktop://capture", async () => {
			setCaptured(await readClipboard());
		}).then(keep);
		return () => {
			active = false;
			for (const off of unlisten) off();
		};
	}, [navigate]);

	useEffect(() => {
		const push = () => {
			const count = getDueCards(loadCards()).length;
			void desktopInvoke<void>("set_due_count", { count }).catch(() => undefined);
		};
		push();
		const id = setInterval(push, DUE_TICK_MS);
		return () => clearInterval(id);
	}, []);

	return (
		<>
			<StudyFirstGate />
			{captured !== null && (
				<CaptureDialog initialText={captured} onClose={() => setCaptured(null)} />
			)}
		</>
	);
}
