import { dictionaryEntries, type DictionaryEntry } from '@/lib/dictionaryData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo, useDeferredValue, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { PageContainer } from '@/components/common/PageContainer';
import { BookText, Search, Volume2 } from 'lucide-react';
import { tts } from '@/lib/tts';

const ITEMS_PER_PAGE = 20;

type PreparedEntry = DictionaryEntry & {
  wordLower: string;
  translationLower: string;
};

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [prevSearchTerm, setPrevSearchTerm] = useState(deferredSearchTerm);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Pre-compute lowercase values for faster filtering
  // This is memoized so it's only calculated once (since dictionaryEntries is static)
  const preparedEntries = useMemo(() => {
    return dictionaryEntries
      .map(entry => ({
        ...entry,
        wordLower: entry.word.toLowerCase(),
        translationLower: entry.translation_pt.toLowerCase()
      }))
      .sort((a, b) => a.wordLower.localeCompare(b.wordLower));
  }, []);

  const [filteredEntries, setFilteredEntries] = useState<PreparedEntry[]>([]);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize worker
    workerRef.current = new Worker(new URL('../workers/searchWorker.ts', import.meta.url), {
      type: 'module'
    });

    workerRef.current.onmessage = (e: MessageEvent) => {
      const { type, payload } = e.data;
      if (type === 'RESULTS') {
        setFilteredEntries(payload);
      }
    };

    // Send initial data
    workerRef.current.postMessage({ type: 'INIT', payload: preparedEntries });
    setFilteredEntries(preparedEntries);

    return () => {
      workerRef.current?.terminate();
    };
  }, [preparedEntries]);

  useEffect(() => {
    const term = deferredSearchTerm.trim();
    if (!term) {
      setFilteredEntries(preparedEntries);
      return;
    }

    workerRef.current?.postMessage({
      type: 'SEARCH',
      payload: { searchTerm: term }
    });
  }, [deferredSearchTerm, preparedEntries]);

  // Reset visible count when search term changes (Render-time update pattern)
  if (deferredSearchTerm !== prevSearchTerm) {
    setPrevSearchTerm(deferredSearchTerm);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  const visibleEntries = useMemo(() => {
    return filteredEntries.slice(0, visibleCount);
  }, [filteredEntries, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredEntries.length) {
          setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredEntries.length));
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [visibleCount, filteredEntries.length]);

  const speak = (text: string) => {
    tts.speak(text);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Dicionário"
        description="Consulte palavras em inglês com tradução, pronúncia e exemplos."
        icon={BookText}
        iconClassName="text-blue-500"
      >
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Buscar palavra ou tradução..."
            className="pl-10 h-11 sm:h-10 bg-background touch-target"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </PageHeader>

      {/* Contador de resultados */}
      <div className="mb-3 sm:mb-4 flex items-center gap-2">
        <Badge variant="secondary" className="text-xs sm:text-sm">
          {filteredEntries.length} {filteredEntries.length === 1 ? 'palavra encontrada' : 'palavras encontradas'}
        </Badge>
      </div>

      <ScrollArea className="h-[calc(100vh-20rem)] smooth-scroll">
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 pr-2 sm:pr-4">
          {visibleEntries.map((entry) => (
            <Card key={entry.id} className="glass-card hover:shadow-lg transition-all active:scale-[0.99] touch-manipulation">
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <span className="truncate">{entry.word}</span>
                      <button
                        onClick={() => speak(entry.word)}
                        className="text-primary hover:text-primary/80 transition-colors active:scale-95 flex-shrink-0 p-1.5 -m-1.5 rounded-lg hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 touch-target"
                        title="Ouvir pronúncia"
                        aria-label="Ouvir pronúncia"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </CardTitle>
                    {entry.phonetic_transcription_en && (
                      <span className="text-xs sm:text-sm text-muted-foreground">{entry.phonetic_transcription_en}</span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-primary text-xs flex-shrink-0">
                    {entry.translation_pt}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-2 leading-relaxed">{entry.meaning_en}</p>
                {entry.example_sentence_en && (
                  <div className="bg-muted/50 dark:bg-muted/30 p-2.5 sm:p-3 rounded-lg space-y-1">
                    <p className="text-xs text-foreground italic leading-relaxed">“{entry.example_sentence_en}”</p>
                    {entry.example_sentence_pt && (
                      <p className="text-xs text-muted-foreground leading-relaxed">“{entry.example_sentence_pt}”</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Sentinel for IntersectionObserver */}
          {visibleCount < filteredEntries.length && (
            <div ref={observerTarget} className="h-4 w-full col-span-full" />
          )}
        </div>
      </ScrollArea>
    </PageContainer>
  );
}
