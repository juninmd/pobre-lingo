import React, { useState, useMemo } from 'react';
import { dictionaryEntries, DictionaryEntry } from '@/lib/dictionaryData';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';

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
    <div className="grid md:grid-cols-3 gap-8 h-[calc(100vh-10rem)]">
      <div className="md:col-span-1 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Glossário</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Pesquisar palavra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ScrollArea className="h-[calc(100vh-18rem)] mt-4">
              <div className="flex flex-col gap-2 pr-4">
                {filteredEntries.map(entry => (
                  <button
                    key={entry.id}
                    onClick={() => handleSelectEntry(entry)}
                    className={`text-left p-2 rounded-md transition-colors ${
                      selectedEntry?.id === entry.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}>
                    {entry.word}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            {selectedEntry ? (
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold flex items-center gap-2">
                    {selectedEntry.word}
                    <button onClick={() => speak(selectedEntry.word)} className="text-primary">
                      <SpeakerWaveIcon className="h-6 w-6" />
                    </button>
                  </CardTitle>
                  {selectedEntry.phonetic_transcription_en && (
                    <p className="text-muted-foreground text-lg">
                      {selectedEntry.phonetic_transcription_en}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-primary">{selectedEntry.translation_pt}</p>
                </div>
              </div>
            ) : (
              <CardTitle>Selecione uma palavra</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            {selectedEntry ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Significado em Inglês</h3>
                  <p className="text-lg">{selectedEntry.meaning_en}</p>
                </div>
                {selectedEntry.example_sentence_en && (
                  <div>
                    <h4 className="font-semibold">Exemplo (EN):</h4>
                    <p className="italic">{selectedEntry.example_sentence_en}</p>
                  </div>
                )}
                {selectedEntry.example_sentence_pt && (
                  <div>
                    <h4 className="font-semibold">Tradução do Exemplo (PT):</h4>
                    <p className="italic">{selectedEntry.example_sentence_pt}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Selecione uma palavra da lista para ver os detalhes.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
