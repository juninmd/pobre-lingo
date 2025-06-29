import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  ScanLine,
  Wand2,
  ListChecks,
  CheckSquare,
  TrendingUp,
  Menu,
  Settings,
  SearchX,
  Sigma,
  BookText,
  BookA,
  FileText,
  Search as SearchIcon,
} from 'lucide-react';
import PobreLingoLogo from '@/components/icons/PobreLingoLogo';
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
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LearningStreakDisplay } from '@/components/streaks/LearningStreakDisplay';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialNavItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/rules', label: 'Regras Gramaticais', icon: BookOpen },
  { href: '/glossary', label: 'Glossário', icon: BookText },
  { href: '/dictionary', label: 'Dicionário', icon: BookA },
  { href: '/sentence-checker', label: 'Verificador de Frases', icon: ScanLine },
  { href: '/quiz-generator', label: 'Quiz Personalizado', icon: Wand2 },
  { href: '/exercises/sentence-ordering', label: 'Ordenar Frases', icon: ListChecks },
  { href: '/exercises/sentence-identification', label: 'Identificar Frases', icon: CheckSquare },
  { href: '/exercises/find-incorrect-words', label: 'Procurar Palavras Erradas', icon: SearchX },
  { href: '/exercises/news-comprehension', label: 'Interpretação de Artigos', icon: FileText },
  { href: '/progress', label: 'Meu Progresso', icon: TrendingUp },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState('');
  const [filteredNavItems, setFilteredNavItems] = useState(initialNavItems);

  useEffect(() => {
    if (sidebarSearchTerm === '') {
      setFilteredNavItems(initialNavItems);
    } else {
      const lowercasedFilter = sidebarSearchTerm.toLowerCase();
      const filtered = initialNavItems.filter(item =>
        item.label.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredNavItems(filtered);
    }
  }, [sidebarSearchTerm]);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" variant="sidebar" side="left">
        <SidebarHeader className="p-4 flex flex-col items-center border-b border-sidebar-border">
          <PobreLingoLogo className="mb-2" />
          <div className="w-full px-2 group-data-[state=expanded]:block group-data-[state=collapsed]:hidden">
            <div className="relative">
               <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
               <SidebarInput
                type="search"
                placeholder="Pesquisar no menu..."
                value={sidebarSearchTerm}
                onChange={(e) => setSidebarSearchTerm(e.target.value)}
                className="w-full pl-8 text-sm"
              />
            </div>
          </div>
        </SidebarHeader>
        <ScrollArea className="flex-grow">
          <SidebarContent className="p-2">
            <SidebarMenu>
              {filteredNavItems.length > 0 ? filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                    tooltip={{content: item.label, side: 'right', align: 'center' }}
                    className="justify-start"
                  >
                    <Link to={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span className="group-data-[state=expanded]:inline group-data-[state=collapsed]:hidden">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )) : (
                <p className="p-4 text-sm text-muted-foreground text-center group-data-[state=expanded]:block group-data-[state=collapsed]:hidden">
                  Nenhum item encontrado.
                </p>
              )}
            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>
        <SidebarFooter className="p-4 group-data-[state=expanded]:block group-data-[state=collapsed]:hidden border-t border-sidebar-border">
          <LearningStreakDisplay />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
          <div className="md:hidden">
             <SidebarTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SidebarTrigger>
          </div>
          <div className="flex-1 text-center md:text-left">
            {/* Placeholder for page title or search */}
          </div>
          <div className="hidden md:block">
            <LearningStreakDisplay />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
          {children}
        </main>
         <footer className="border-t p-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PobreLingo. Todos os direitos reservados. Feito com ajuda do Firebase Studio da Google.
          </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
