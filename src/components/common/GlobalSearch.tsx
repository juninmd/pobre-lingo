import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  BookOpen,
  Home,
  ListChecks,
  CheckSquare,
  FileText,
  BookText,
  BookA,
  TrendingUp,
  Map,
  SearchX,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { grammarCategories } from '@/lib/grammarRules';
import { cn } from '@/lib/utils';

// Tipo para resultados de pesquisa
interface SearchResult {
  type: 'page' | 'rule' | 'category';
  title: string;
  subtitle?: string;
  href: string;
  icon: React.ElementType;
  tags?: string[];
  categoryName?: string;
}

// Páginas de navegação
const navPages: SearchResult[] = [
  { type: 'page', title: 'Início', href: '/', icon: Home },
  { type: 'page', title: 'Jornada de Aprendizado', subtitle: 'Trilha de estudo personalizada', href: '/curriculum', icon: Map },
  { type: 'page', title: 'Regras Gramaticais', subtitle: 'Todas as regras de gramática', href: '/rules', icon: BookOpen },
  { type: 'page', title: 'Glossário', subtitle: 'Vocabulário essencial', href: '/glossary', icon: BookText },
  { type: 'page', title: 'Dicionário', subtitle: 'Traduções e significados', href: '/dictionary', icon: BookA },
  { type: 'page', title: 'Ordenar Frases', subtitle: 'Exercício de ordenação', href: '/exercises/sentence-ordering', icon: ListChecks },
  { type: 'page', title: 'Identificar Frases', subtitle: 'Exercício de identificação', href: '/exercises/sentence-identification', icon: CheckSquare },
  { type: 'page', title: 'Encontrar Erros', subtitle: 'Exercício de correção', href: '/exercises/find-incorrect-words', icon: SearchX },
  { type: 'page', title: 'Interpretação', subtitle: 'Exercício de compreensão', href: '/exercises/news-comprehension', icon: FileText },
  { type: 'page', title: 'Meu Progresso', subtitle: 'Acompanhe sua evolução', href: '/progress', icon: TrendingUp },
];

// Converter categorias e regras em resultados de pesquisa
function getRuleSearchResults(): SearchResult[] {
  const results: SearchResult[] = [];

  // Adicionar categorias
  grammarCategories.forEach(category => {
    results.push({
      type: 'category',
      title: category.name_pt,
      subtitle: category.description_pt,
      href: `/rules/${category.id}`,
      icon: BookOpen,
    });

    // Adicionar regras de cada categoria
    category.rules.forEach(rule => {
      results.push({
        type: 'rule',
        title: rule.title_pt,
        subtitle: rule.title_en,
        href: `/rules/${category.id}/${rule.id}`,
        icon: BookOpen,
        tags: rule.tags,
        categoryName: category.name_pt,
      });
    });
  });

  return results;
}

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Combinar todos os resultados de pesquisa
  const allResults = useMemo(() => {
    return [...navPages, ...getRuleSearchResults()];
  }, []);

  // Filtrar resultados baseado no termo de pesquisa
  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) {
      // Mostrar sugestões quando não há pesquisa
      return navPages.slice(0, 5);
    }

    const term = searchTerm.toLowerCase();
    return allResults.filter(result => {
      const matchTitle = result.title.toLowerCase().includes(term);
      const matchSubtitle = result.subtitle?.toLowerCase().includes(term);
      const matchTags = result.tags?.some(tag => tag.toLowerCase().includes(term));
      const matchCategory = result.categoryName?.toLowerCase().includes(term);
      return matchTitle || matchSubtitle || matchTags || matchCategory;
    }).slice(0, 10); // Limitar a 10 resultados
  }, [searchTerm, allResults]);

  // Reset ao abrir
  useEffect(() => {
    if (open) {
      setSearchTerm('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Selecionar resultado
  const handleSelect = (result: SearchResult) => {
    navigate(result.href);
    onOpenChange(false);
    setSearchTerm('');
  };

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : filteredResults.length - 1
        );
      } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredResults[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredResults, selectedIndex]);

  // Agrupar resultados por tipo
  const groupedResults = useMemo(() => {
    const groups: { [key: string]: SearchResult[] } = {
      page: [],
      category: [],
      rule: [],
    };

    filteredResults.forEach(result => {
      groups[result.type].push(result);
    });

    return groups;
  }, [filteredResults]);

  const getResultIndex = (type: string, index: number): number => {
    let offset = 0;
    if (type === 'category') offset = groupedResults.page.length;
    if (type === 'rule') offset = groupedResults.page.length + groupedResults.category.length;
    return offset + index;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0 space-y-0">
          <DialogTitle className="sr-only">Pesquisa Global</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Pesquisar páginas, regras gramaticais..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedIndex(0);
              }}
              className="pl-10 pr-10 h-12 text-base border-0 focus-visible:ring-0 bg-transparent"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                aria-label="Limpar pesquisa"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="border-t">
          <ScrollArea className="max-h-[400px]">
            <div className="p-2">
              {filteredResults.length === 0 ? (
                <div className="py-8 text-center">
                  <SearchX className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Nenhum resultado encontrado</p>
                  <p className="text-sm text-muted-foreground/70">Tente pesquisar por outro termo</p>
                </div>
              ) : (
                <>
                  {/* Páginas */}
                  {groupedResults.page.length > 0 && (
                    <div className="mb-2">
                      <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Páginas
                      </p>
                      {groupedResults.page.map((result, index) => (
                        <SearchResultItem
                          key={result.href}
                          result={result}
                          isSelected={selectedIndex === getResultIndex('page', index)}
                          onClick={() => handleSelect(result)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Categorias */}
                  {groupedResults.category.length > 0 && (
                    <div className="mb-2">
                      <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Categorias
                      </p>
                      {groupedResults.category.map((result, index) => (
                        <SearchResultItem
                          key={result.href}
                          result={result}
                          isSelected={selectedIndex === getResultIndex('category', index)}
                          onClick={() => handleSelect(result)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Regras */}
                  {groupedResults.rule.length > 0 && (
                    <div className="mb-2">
                      <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Regras Gramaticais
                      </p>
                      {groupedResults.rule.map((result, index) => (
                        <SearchResultItem
                          key={result.href}
                          result={result}
                          isSelected={selectedIndex === getResultIndex('rule', index)}
                          onClick={() => handleSelect(result)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </ScrollArea>

          {/* Footer com atalhos */}
          <div className="border-t p-2 flex items-center justify-between text-xs text-muted-foreground bg-muted/30">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑↓</kbd>
                navegar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Enter</kbd>
                selecionar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Esc</kbd>
                fechar
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Componente de item de resultado
function SearchResultItem({
  result,
  isSelected,
  onClick
}: {
  result: SearchResult;
  isSelected: boolean;
  onClick: () => void;
}) {
  const Icon = result.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
        isSelected
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted"
      )}
    >
      <div className={cn(
        "p-2 rounded-lg",
        isSelected
          ? "bg-primary-foreground/20"
          : "bg-muted"
      )}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{result.title}</p>
        {result.subtitle && (
          <p className={cn(
            "text-xs truncate",
            isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            {result.categoryName && (
              <span>{result.categoryName} • </span>
            )}
            {result.subtitle}
          </p>
        )}
        {result.tags && result.tags.length > 0 && (
          <div className="flex gap-1 mt-1">
            {result.tags.slice(0, 3).map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className={cn(
                  "text-[10px] px-1.5 py-0 h-4",
                  isSelected && "bg-primary-foreground/20 text-primary-foreground"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <ArrowRight className={cn(
        "h-4 w-4 flex-shrink-0",
        isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
      )} />
    </button>
  );
}

// Botão de gatilho para pesquisa global
export function GlobalSearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
    >
      <Search className="mr-2 h-4 w-4" />
      <span className="hidden lg:inline-flex">Pesquisar...</span>
      <span className="inline-flex lg:hidden">Pesquisar</span>
      <kbd className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
