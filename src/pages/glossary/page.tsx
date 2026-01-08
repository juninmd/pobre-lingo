import React, { useState, useMemo } from 'react';
import { dictionaryEntries, DictionaryEntry } from '@/lib/dictionaryData';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/common/PageHeader';
import { PageContainer } from '@/components/common/PageContainer';
import { BookOpen, Search, Volume2 } from 'lucide-react';

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  const filteredEntries = useMemo(() => {
    return dictionaryEntries
      .filter(entry =>
        entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.translation_pt.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.word.localeCompare(b.word));
  }, [searchTerm]);

  const handleSelectEntry = (entry: DictionaryEntry) => {
    setSelectedEntry(entry);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Glossário"
        description="Explore o vocabulário essencial para seu aprendizado de inglês."
        icon={BookOpen}
        iconClassName="text-purple-500"
      />

      <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
        {/* Lista de palavras */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="h-4 w-4" />
                Buscar Palavra
              </CardTitle>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Badge variant="secondary" className="w-fit mt-2">
                {filteredEntries.length} palavras
              </Badge>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-[calc(100vh-26rem)]">
                <div className="flex flex-col gap-1 pr-4">
                  {filteredEntries.map(entry => (
                    <button
                      key={entry.id}
                      onClick={() => handleSelectEntry(entry)}
                      className={`text-left p-3 rounded-lg transition-all ${
                        selectedEntry?.id === entry.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <span className="font-medium">{entry.word}</span>
                      <span className="text-xs block opacity-70">{entry.translation_pt}</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Detalhes da palavra */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              {selectedEntry ? (
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold flex items-center gap-3">
                      {selectedEntry.word}
                      <button
                        onClick={() => speak(selectedEntry.word)}
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="Ouvir pronúncia"
                      >
                        <Volume2 className="h-6 w-6" />
                      </button>
                    </CardTitle>
                    {selectedEntry.phonetic_transcription_en && (
                      <p className="text-muted-foreground text-lg mt-1">
                        {selectedEntry.phonetic_transcription_en}
                      </p>
                    )}
                  </div>
                  <Badge className="text-lg px-3 py-1">
                    {selectedEntry.translation_pt}
                  </Badge>
                </div>
              ) : (
                <CardTitle className="text-muted-foreground">Selecione uma palavra</CardTitle>
              )}
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              {selectedEntry ? (
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Significado em Inglês
                    </h3>
                    <p className="text-lg">{selectedEntry.meaning_en}</p>
                  </div>
                  {selectedEntry.example_sentence_en && (
                    <div className="border-l-4 border-primary/50 pl-4 space-y-2">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Exemplo (EN):</h4>
                        <p className="italic text-foreground">"{selectedEntry.example_sentence_en}"</p>
                      </div>
                      {selectedEntry.example_sentence_pt && (
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">Tradução:</h4>
                          <p className="italic text-muted-foreground">"{selectedEntry.example_sentence_pt}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                  <BookOpen className="h-16 w-16 mb-4 opacity-20" />
                  <p>Selecione uma palavra da lista para ver os detalhes.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
