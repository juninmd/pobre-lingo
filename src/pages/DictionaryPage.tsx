import { dictionaryEntries } from '@/lib/dictionaryData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = dictionaryEntries.filter(entry =>
    entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.translation_pt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dicionário</h1>
      <Input
        type="text"
        placeholder="Buscar palavra ou tradução..."
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ScrollArea className="h-[70vh] w-full pr-4">
        <div className="grid gap-4">
          {filteredEntries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{entry.word}</span>
                  {entry.phonetic_transcription_en && (
                    <span className="text-sm text-muted-foreground font-normal">{entry.phonetic_transcription_en}</span>
                  )}
                </CardTitle>
                <CardDescription>{entry.translation_pt}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{entry.meaning_en}</p>
                {entry.example_sentence_en && (
                  <p className="text-xs text-muted-foreground mt-2 italic">Ex: {entry.example_sentence_en}</p>
                )}
                {entry.example_sentence_pt && (
                  <p className="text-xs text-muted-foreground italic">Tradução: {entry.example_sentence_pt}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
