import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TabNav } from "@/components/shell/TabNav";
import { Toaster } from "@/components/ui/toaster";
import { useBackgroundSync } from "@/hooks/useBackgroundSync";
import { SEO } from "../components/common/SEO";
import { Header } from "../components/layout/Header";
import { OfflineIndicator } from "../components/layout/OfflineIndicator";
import { MAIN_CONTENT_ID, SkipLink } from "../components/layout/SkipLink";
import { ShellExtras } from "./ShellExtras";
import { usePageEnter } from "./usePageEnter";

/** Casca do app: abas (trilho ou barra inferior), cabeçalho e a área rolável onde cada página entra. */
export default function Layout() {
	const [searchOpen, setSearchOpen] = useState(false);
	const scrollContainer = useRef<HTMLDivElement>(null);
	const pageContent = useRef<HTMLDivElement>(null);
	const { pathname } = useLocation();
	useBackgroundSync();
	usePageEnter(scrollContainer, pageContent, pathname);

	// Atalho de teclado para abrir pesquisa (Cmd+K ou Ctrl+K)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setSearchOpen(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className="font-body antialiased h-svh overflow-hidden bg-background text-foreground flex flex-col">
			<SkipLink />
			<SEO />
			<div className="flex h-full min-h-0 w-full flex-row overflow-hidden">
				<TabNav onSearchOpen={() => setSearchOpen(true)} />

				<main className="flex h-full min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden">
					<OfflineIndicator />
					<Header onSearchOpen={() => setSearchOpen(true)} />

					<div
						ref={scrollContainer}
						id={MAIN_CONTENT_ID}
						// biome-ignore lint/a11y/noNoninteractiveTabindex: a scroller must take focus so keyboard users can scroll pages with no links (Chrome skips it with tabindex=-1)
						tabIndex={0}
						className="flex-1 overflow-y-auto smooth-scroll min-h-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
					>
						<div
							ref={pageContent}
							className="container mx-auto px-4 pt-4 pb-28 sm:px-6 sm:py-6 md:pb-8 lg:px-8 max-w-6xl"
						>
							<Outlet />
						</div>
					</div>
				</main>
			</div>
			<ShellExtras searchOpen={searchOpen} onSearchOpenChange={setSearchOpen} />
			<Toaster />
		</div>
	);
}
