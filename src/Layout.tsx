import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import {
  Home,
  BookOpen,
  ListChecks,
  CheckSquare,
  TrendingUp,
  Menu,
  SearchX,
  BookText,
  BookA,
  FileText,
  Search as SearchIcon,
  Sun,
  Moon,
  Map,
  Sparkles,
  GraduationCap,
  X,
  Gamepad2,
} from 'lucide-react';
import { Pobrelingo } from '@/components/mascot/Pobrelingo';
import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt';
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
import { MobileNav } from './components/layout/MobileNav';
import { useGamification } from './contexts/GamificationContext';
import { Heart, Diamond } from 'lucide-react';

// Agrupamento de navegação por categorias
const navGroups = [
  {
    title: 'Principal',
    items: [
      { href: '/', label: 'Início', icon: Home },
      { href: '/curriculum', label: 'Jornada de Aprendizado', icon: Map, badge: 'Novo' },
      { href: '/arcade', label: 'Arcade', icon: Gamepad2, badge: 'Fun' },
    ]
  },
  {
    title: 'Referência',
    items: [
      { href: '/rules', label: 'Regras Gramaticais', icon: BookOpen },
      { href: '/glossary', label: 'Glossário', icon: BookText },
      { href: '/dictionary', label: 'Dicionário', icon: BookA },
    ]
  },
  {
    title: 'Exercícios',
    items: [
      { href: '/exercises/sentence-ordering', label: 'Ordenar Frases', icon: ListChecks },
      { href: '/exercises/sentence-identification', label: 'Identificar Frases', icon: CheckSquare },
      { href: '/exercises/find-incorrect-words', label: 'Encontrar Erros', icon: SearchX },
      { href: '/exercises/news-comprehension', label: 'Interpretação', icon: FileText },
    ]
  },
  {
    title: 'Progresso',
    items: [
      { href: '/progress', label: 'Meu Progresso', icon: TrendingUp },
      { href: '/proficiency', label: 'Teste de Proficiência', icon: GraduationCap },
    ]
  },
];

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
          <div className="relative">
            <Pobrelingo width={32} height={32} className="flex-shrink-0" emotion="winking" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm text-sidebar-foreground truncate">PobreLingo</span>
              <span className="text-[10px] text-sidebar-foreground/70">Aprenda Português</span>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className="mt-3 relative">
            <SearchIcon className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sidebar-foreground/50" />
            <SidebarInput
              type="search"
              placeholder="Pesquisar..."
              value={sidebarSearchTerm}
              onChange={(e) => setSidebarSearchTerm(e.target.value)}
              className="w-full pl-8 h-8 text-xs bg-sidebar-accent/30 border-sidebar-border/50 placeholder:text-sidebar-foreground/50 text-sidebar-foreground"
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
                <h3 className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
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
                        tooltip={{ content: item.label, side: 'right', align: 'center' }}
                        className={`justify-start h-9 transition-all duration-200 ${
                          isActive
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm'
                            : 'hover:bg-sidebar-accent/50'
                        }`}
                        onClick={handleLinkClick}
                      >
                        <Link to={item.href} className="flex items-center gap-3">
                          <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? '' : 'opacity-80'}`} />
                          {!isCollapsed && (
                            <span className="truncate text-sm">{item.label}</span>
                          )}
                          {!isCollapsed && item.badge && (
                            <Badge variant="secondary" className="ml-auto text-[9px] px-1.5 py-0 h-4 bg-accent text-accent-foreground">
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
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
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
  const { hearts, gems } = useGamification();
  const location = useLocation();

  // Determinar título da página atual
  const getCurrentPageTitle = () => {
    const currentItem = allNavItems.find(item =>
      location.pathname === item.href ||
      (item.href !== '/' && location.pathname.startsWith(item.href))
    );
    return currentItem?.label || 'PobreLingo';
  };

  return (
    <div className="font-body antialiased min-h-screen">
      <SidebarProvider defaultOpen>
        {/* Sidebar only visible on lg and up */}
        <Sidebar collapsible="icon" variant="sidebar" side="left" className="hidden lg:flex border-r border-sidebar-border">
          <NavMenu />
        </Sidebar>

        <SidebarInset className="flex flex-col min-h-screen pb-32 lg:pb-0">
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 md:gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="hidden lg:block">
                <SidebarTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SidebarTrigger>
              </div>

              <div className="lg:hidden flex-shrink-0">
                 <Pobrelingo width={32} height={32} />
              </div>

              <Separator orientation="vertical" className="h-5 hidden lg:block" />

              <div className="flex items-center gap-2 min-w-0">
                <GraduationCap className="h-4 w-4 text-primary hidden sm:block flex-shrink-0" />
                <h1 className="font-semibold text-sm md:text-base truncate">
                  {getCurrentPageTitle()}
                </h1>
              </div>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-2 md:gap-4 mr-2">
              {/* Gamification Stats */}
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1.5 text-red-500">
                   <Heart className="h-4 w-4 fill-current" />
                   <span>{hearts}</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-500">
                   <Diamond className="h-4 w-4 fill-current" />
                   <span>{gems}</span>
                </div>
              </div>

              <Separator orientation="vertical" className="h-5" />

              {/* Theme Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Alternar tema</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2">
                    <Sun className="h-4 w-4" />
                    <span>Claro</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2">
                    <Moon className="h-4 w-4" />
                    <span>Escuro</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme("pobre-lingo")} className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>PobreLingo</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl">
              <Outlet />
            </div>
          </main>

          <footer className="border-t py-3 px-4 text-center text-xs text-muted-foreground bg-background shrink-0 hidden lg:block">
            <span>© {new Date().getFullYear()} PobreLingo</span>
            <span className="mx-2">•</span>
            <span className="hidden sm:inline">Feito com ❤️ para aprendizes de português</span>
          </footer>
        </SidebarInset>
      </SidebarProvider>

      <MobileNav />
      <PWAInstallPrompt />
      <Toaster />
    </div>
  );
}
