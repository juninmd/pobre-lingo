import { lazy, Suspense, useEffect, useState } from "react";
import { useIdleReady } from "@/hooks/useIdleReady";
import { IS_DESKTOP } from "@/lib/platform";

const GlobalSearch = lazy(() =>
	import("@/components/common/GlobalSearch").then((module) => ({
		default: module.GlobalSearch,
	})),
);
const PobrelingoAssistant = lazy(() =>
	import("@/components/mascot/PobrelingoAssistant").then((module) => ({
		default: module.PobrelingoAssistant,
	})),
);
const DesktopBridge = lazy(() =>
	import("@/components/desktop/DesktopBridge").then((module) => ({
		default: module.DesktopBridge,
	})),
);
const PWAInstallPrompt = lazy(
	() => import("@/components/pwa/PWAInstallPrompt"),
);

interface ShellExtrasProps {
	searchOpen: boolean;
	onSearchOpenChange: (open: boolean) => void;
}

/**
 * Partes da casca que não entram na primeira pintura: a busca só carrega
 * (com o índice de regras de gramática) quando é aberta pela primeira vez;
 * mascote e convite de instalação montam quando o navegador fica ocioso.
 */
export function ShellExtras({
	searchOpen,
	onSearchOpenChange,
}: ShellExtrasProps) {
	const idle = useIdleReady();
	const [searchLoaded, setSearchLoaded] = useState(false);

	useEffect(() => {
		if (searchOpen) setSearchLoaded(true);
	}, [searchOpen]);

	return (
		<Suspense fallback={null}>
			{(searchLoaded || searchOpen) && (
				<GlobalSearch open={searchOpen} onOpenChange={onSearchOpenChange} />
			)}
			{IS_DESKTOP && <DesktopBridge />}
			{idle && <PWAInstallPrompt />}
			{idle && <PobrelingoAssistant />}
		</Suspense>
	);
}
