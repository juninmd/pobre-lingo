import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";

import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { GlobalSearch } from '@/components/common/GlobalSearch';
import { MobileNav } from './components/layout/MobileNav';
import { SidebarNav } from './components/layout/SidebarNav';
import { Header } from './components/layout/Header';
import { SEO } from './components/common/SEO';

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Atalho de teclado para abrir pesquisa (Cmd+K ou Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="font-body antialiased min-h-screen bg-background text-foreground">
      <SEO />
      <SidebarProvider defaultOpen>
        {/* Sidebar only visible on lg and up */}
        <Sidebar collapsible="icon" variant="sidebar" side="left" className="hidden lg:flex border-r border-border/40">
          <SidebarNav />
        </Sidebar>

        <SidebarInset className="flex flex-col min-h-screen pb-32 sm:pb-28 lg:pb-0">
          <Header onSearchClick={() => setSearchOpen(true)} />

          <main className="flex-1 overflow-auto bg-muted/5 dark:bg-background">
            <div className="container mx-auto px-3 pt-4 pb-4 sm:px-6 sm:py-6 lg:px-8 max-w-7xl animate-in fade-in duration-500">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
      {/* Mobile Navigation - Hidden on Desktop */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <PWAInstallPrompt />
      <Toaster />
    </div>
  );
}
