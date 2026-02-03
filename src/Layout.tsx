import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import {
  Menu,
  Search as SearchIcon,
  Sun,
  Moon,
  Sparkles,
  GraduationCap,
  X,
  Coins,
} from 'lucide-react';

import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt';
import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarInput,
  useSidebar
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LearningStreakDisplay } from '@/components/streaks/LearningStreakDisplay';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useTheme } from './contexts/ThemeContext';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { GlobalSearch, GlobalSearchTrigger } from '@/components/common/GlobalSearch';
import { MobileNav } from './components/layout/MobileNav';
import { useGamification } from './contexts/GamificationContext';
import { SEO } from './components/common/SEO';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { navigationConfig } from '@/lib/navigation';

// Agrupamento de navegação por categorias
const navGroups = navigationConfig.desktop;

// Flatten para busca
const allNavItems = navGroups.flatMap(group => group.items);

function NavMenu() {
  const { pathname } = useLocation();
  const { setOpenMobile, state } = useSidebar();
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState('');
  const isCollapsed = state === 'collapsed';

  const filteredGroups = sidebarSearchTerm
    ? [{
      title: 'Resultados',
      items: allNavItems.filter(item =>
        item.label.toLowerCase().includes(sidebarSearchTerm.toLowerCase())
      )
    }]
    : navGroups;

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  return (
    <>
      <SidebarHeader className="p-3 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-base text-sidebar-foreground truncate tracking-tight [data-theme=pobre-lingo]:text-gold">PobreLingo</span>
              <span className="text-[10px] text-sidebar-foreground/70 uppercase tracking-wider">Aprenda Grátis</span>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className="mt-4 relative">
            <SearchIcon className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sidebar-foreground/50" />
            <SidebarInput
              type="search"
              placeholder="Buscar..."
              value={sidebarSearchTerm}
              onChange={(e) => setSidebarSearchTerm(e.target.value)}
              className="w-full pl-8 h-8 text-xs bg-sidebar-accent/30 border-sidebar-border/50 placeholder:text-sidebar-foreground/50 text-sidebar-foreground rounded-lg"
            />
            {sidebarSearchTerm && (
              <button
                onClick={() => setSidebarSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sidebar-foreground/50 hover:text-sidebar-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </SidebarHeader>

      <ScrollArea className="flex-1">
        <SidebarContent className="p-2">
          {filteredGroups.map((group, groupIndex) => (
            <div key={group.title} className={groupIndex > 0 ? 'mt-4' : ''}>
              {!isCollapsed && (
                <h3 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/40">
                  {group.title}
                </h3>
              )}
              <SidebarMenu>
                {group.items.length > 0 ? group.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={{ children: item.label }}
                        className={cn(
                          "justify-start h-10 transition-all duration-300 rounded-lg group",
                          isActive
                            ? "bg-primary/10 text-primary font-bold shadow-sm [data-theme=pobre-lingo]:sidebar-active"
                            : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:translate-x-1"
                        )}
                        onClick={handleLinkClick}
                      >
                        <Link to={item.href} className="flex items-center gap-3">
                          <item.icon className={cn("h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                          {!isCollapsed && (
                            <span className="truncate text-sm">{item.label}</span>
                          )}
                          {!isCollapsed && item.badge && (
                            <Badge variant="secondary" className="ml-auto text-[9px] px-1.5 py-0 h-4 bg-accent/20 text-accent-foreground border-0">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }) : (
                  !isCollapsed && (
                    <p className="px-3 py-2 text-xs text-sidebar-foreground/50">
                      Nenhum item encontrado
                    </p>
                  )
                )}
              </SidebarMenu>
            </div>
          ))}
        </SidebarContent>
      </ScrollArea>

      <SidebarFooter className="p-3 border-t border-sidebar-border/50">
        {!isCollapsed ? (
          <LearningStreakDisplay variant="compact" />
        ) : (
          <div className="flex justify-center py-2">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
          </div>
        )}
      </SidebarFooter>
    </>
  );
}

export default function Layout() {
  const { setTheme } = useTheme();
  const { gems } = useGamification();
  const { userLevel } = useCurriculumProgress();
  const location = useLocation();
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

  // Determinar título da página atual
  const getCurrentPageTitle = () => {
    const currentItem = allNavItems.find(item =>
      location.pathname === item.href ||
      (item.href !== '/' && location.pathname.startsWith(item.href))
    );
    return currentItem?.label || 'PobreLingo';
  };

  return (
    <div className="font-body antialiased min-h-screen bg-background text-foreground">
      <SEO />
      <SidebarProvider defaultOpen>
        {/* Sidebar only visible on lg and up */}
        <Sidebar collapsible="icon" variant="sidebar" side="left" className="hidden lg:flex border-r border-border/40">
          <NavMenu />
        </Sidebar>

        <SidebarInset className="flex flex-col min-h-screen pb-32 sm:pb-28 lg:pb-0">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 md:gap-4 border-b bg-background/80 backdrop-blur-xl px-3 sm:px-4 md:px-6 glass supports-[backdrop-filter]:bg-background/70">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="hidden lg:block">
                <SidebarTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground transition-colors">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SidebarTrigger>
              </div>

              <div className="lg:hidden flex-shrink-0 flex items-center gap-2">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 shadow-sm">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-base tracking-tight [data-theme=pobre-lingo]:text-gold">PobreLingo</span>
              </div>

              <Separator orientation="vertical" className="h-6 hidden lg:block bg-border/60" />

              <div className="hidden sm:flex items-center gap-2 min-w-0">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <h1 className="font-semibold text-base md:text-lg truncate">
                  {getCurrentPageTitle()}
                </h1>
              </div>
            </div>

            <div className="flex-1 flex justify-center max-w-md mx-auto">
              {/* Barra de Pesquisa Global */}
              <GlobalSearchTrigger onClick={() => setSearchOpen(true)} />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              {/* Gamification Stats */}
              <div className="flex items-center gap-2 sm:gap-3 text-sm font-semibold">
                {/* Level Badge */}
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 backdrop-blur-md shadow-sm ring-1 ring-blue-500/10 hover:ring-blue-500/30 transition-all" title="Nível">
                  <GraduationCap className="h-4 w-4" />
                  <span className="font-bold tracking-tight">Nível {userLevel}</span>
                </div>

                {/* Gems / PobreCoins */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 backdrop-blur-md shadow-sm ring-1 ring-amber-500/10 hover:ring-amber-500/30 transition-all active:scale-95 group cursor-default" title="PobreCoins">
                  <Coins className="h-4 w-4 fill-current group-hover:animate-bounce" />
                  <span className="font-bold tabular-nums tracking-tight">{gems}</span>
                </div>
              </div>

              <Separator orientation="vertical" className="h-6 bg-border/60 hidden sm:block" />

              {/* Theme Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground transition-all hover:bg-muted/50 active:scale-95">
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Alternar tema</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2 cursor-pointer">
                    <Sun className="h-4 w-4" />
                    <span>Claro</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2 cursor-pointer">
                    <Moon className="h-4 w-4" />
                    <span>Escuro</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme("pobre-lingo")} className="gap-2 cursor-pointer">
                    <Sparkles className="h-4 w-4" />
                    <span>PobreLingo</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-muted/5 dark:bg-background">
            <div className="container mx-auto px-3 pt-4 pb-4 sm:px-6 sm:py-6 lg:px-8 max-w-7xl animate-in fade-in duration-500">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <PWAInstallPrompt />
      <Toaster />
    </div>
  );
}
