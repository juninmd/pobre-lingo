import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GlobalSearch } from "@/components/common/GlobalSearch";
import { PobrelingoAssistant } from "@/components/mascot/PobrelingoAssistant";
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt";
import {
	Sidebar,
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { SEO } from "./components/common/SEO";
import { Header } from "./components/layout/Header";
import { MobileNav } from "./components/layout/MobileNav";
import { NavMenu } from "./components/layout/NavMenu";
import { OfflineIndicator } from "./components/layout/OfflineIndicator";

// Agrupamento de navegação por categorias
export default function Layout() {
	const [searchOpen, setSearchOpen] = useState(false);

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
			<SEO />
			<SidebarProvider
				defaultOpen
				className="h-full overflow-hidden flex flex-row w-full"
			>
				{/* Ensure sidebar is used as primary nav on mobile properly by using standard responsive classes or using a sheet trigger for mobile which Shadcn sidebar natively supports. For simplicity we hide it visually when standard sidebar is collapsed on mobile, but rely on shadcn's internal mobile drawer support via <SidebarTrigger> inside Header */}
				<Sidebar
					collapsible="none"
					variant="sidebar"
					side="left"
					className="border-r border-border/40"
				>
					<NavMenu />
				</Sidebar>

				<SidebarInset className="flex flex-col h-full overflow-hidden min-h-0 flex-1 w-full">
					<OfflineIndicator />
					<Header onSearchOpen={() => setSearchOpen(true)} />

					<div className="flex-1 overflow-y-auto bg-muted/5 dark:bg-background smooth-scroll min-h-0">
						<div className="container mx-auto px-3 pt-4 pb-32 sm:pb-28 lg:pb-8 sm:px-6 sm:py-6 lg:px-8 max-w-7xl animate-in fade-in duration-500">
							<Outlet />
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
			<MobileNav />
			<GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
			<PWAInstallPrompt />
			<PobrelingoAssistant />
			<Toaster />
		</div>
	);
}
