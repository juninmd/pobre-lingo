import { dictionaryEntries } from '@/lib/dictionaryData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { PageContainer } from '@/components/common/PageContainer';
import { BookText, Search, Volume2 } from 'lucide-react';

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = dictionaryEntries.filter(entry =>
    entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.translation_pt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Dicionário"
        description="Consulte palavras em inglês com tradução, pronúncia e exemplos."
        icon={BookText}
        iconClassName="text-blue-500"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar palavra ou tradução..."
            className="pl-10 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </PageHeader>

      {/* Contador de resultados */}
      <div className="mb-4 flex items-center gap-2">
        <Badge variant="secondary">
          {filteredEntries.length} {filteredEntries.length === 1 ? 'palavra encontrada' : 'palavras encontradas'}
        </Badge>
      </div>

      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="grid gap-4 md:grid-cols-2 pr-4">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {entry.word}
                      <button
                        onClick={() => speak(entry.word)}
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="Ouvir pronúncia"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </CardTitle>
                    {entry.phonetic_transcription_en && (
                      <span className="text-sm text-muted-foreground">{entry.phonetic_transcription_en}</span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-primary">
                    {entry.translation_pt}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-2">{entry.meaning_en}</p>
                {entry.example_sentence_en && (
                  <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                    <p className="text-xs text-foreground italic">“{entry.example_sentence_en}”</p>
                    {entry.example_sentence_pt && (
                      <p className="text-xs text-muted-foreground">“{entry.example_sentence_pt}”</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </PageContainer>
  );
}
