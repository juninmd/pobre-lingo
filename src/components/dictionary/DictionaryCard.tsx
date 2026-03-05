import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volume2 } from 'lucide-react';
import { tts } from '@/lib/tts';
import { type DictionaryEntry } from '@/lib/dictionaryData';

export interface DictionaryCardProps {
  entry: DictionaryEntry;
}

export function DictionaryCard({ entry }: DictionaryCardProps) {
  const speak = (text: string) => {
    tts.speak(text);
  };

  return (
    <Card className="glass-card hover:shadow-lg transition-all active:scale-[0.99] touch-manipulation">
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
  );
}
