import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Sun,
  Moon,
  Sparkles,
  GraduationCap,
  Coins,
} from 'lucide-react';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';
import { Separator } from '@/components/ui/separator';
import { GlobalSearchTrigger } from '@/components/common/GlobalSearch';
import { useGamification } from '@/contexts/GamificationContext';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { allNavItems } from '@/lib/navigation';

export interface HeaderProps {
  onSearchClick: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  const { setTheme } = useTheme();
  const { gems } = useGamification();
  const { userLevel } = useCurriculumProgress();
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
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 md:gap-4 border-b bg-background/80 backdrop-blur-xl px-3 sm:px-4 md:px-6 glass supports-[backdrop-filter]:bg-background/70">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div>
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground transition-colors">
              <Menu className="h-5 w-5" strokeWidth={1.5} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SidebarTrigger>
        </div>

        <div className="lg:hidden flex-shrink-0 flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 shadow-sm">
            <GraduationCap className="h-5 w-5 text-primary" strokeWidth={1.5} />
          </div>
          <span className="font-bold text-base tracking-tight [data-theme=pobre-lingo]:text-gold">PobreLingo</span>
        </div>

        <Separator orientation="vertical" className="h-6 hidden lg:block bg-border/60" />

        <div className="hidden sm:flex items-center gap-2 min-w-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
            <GraduationCap className="h-4 w-4 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="font-semibold text-base md:text-lg truncate">
            {getCurrentPageTitle()}
          </h1>
        </div>
      </div>

      <div className="flex-1 flex justify-center max-w-md mx-auto">
        <GlobalSearchTrigger onClick={onSearchClick} />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
        {/* Gamification Stats */}
        <div className="flex items-center gap-3 sm:gap-6 text-sm font-medium">
          <div className="flex items-center gap-2 group cursor-default" title="Nível Atual">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-4 w-4" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold font-inter">Nível</span>
              <span className="font-headline font-black text-sm text-foreground">{userLevel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 group cursor-default" title="PobreCoins">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:rotate-12 transition-transform duration-300">
                <Coins className="h-4 w-4 fill-current/20" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold font-inter">Moedas</span>
              <span className="font-headline font-black text-sm text-foreground">{gems}</span>
            </div>
          </div>
        </div>

        <Separator orientation="vertical" className="h-5 bg-border/40 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground transition-all hover:bg-muted/50 active:scale-95">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" strokeWidth={1.5} />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" strokeWidth={1.5} />
              <span className="sr-only">Alternar tema</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2 cursor-pointer">
              <Sun className="h-4 w-4" strokeWidth={1.5} />
              <span>Claro</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2 cursor-pointer">
              <Moon className="h-4 w-4" strokeWidth={1.5} />
              <span>Escuro</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme("pobre-lingo")} className="gap-2 cursor-pointer">
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
              <span>PobreLingo</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
