import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen } from 'lucide-react';
import { Unit } from '@/lib/curriculumData';

interface GuidebookModalProps {
  unit: Unit;
}

export function GuidebookModal({ unit }: GuidebookModalProps) {
  // Simple markdown parser
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-xl font-bold mt-4 mb-2 text-primary">{line.replace('# ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold mt-3 mb-1">{line.replace('### ', '')}</h3>;
      }

      // List items
      if (line.trim().startsWith('* ')) {
        const text = line.trim().replace('* ', '');
        return (
            <div key={index} className="flex items-start gap-2 mb-1 ml-1">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{parseBold(text)}</span>
            </div>
        );
      }

      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }

      // Paragraphs
      return <p key={index} className="mb-2 text-muted-foreground leading-relaxed">{parseBold(line)}</p>;
    });
  };

  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary uppercase tracking-wide font-bold text-xs h-9">
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Guia da Unidade</span>
          <span className="sm:hidden">Guia</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-primary">
            <BookOpen className="h-6 w-6" />
            {unit.title}
          </DialogTitle>
          <DialogDescription>
            {unit.description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 mt-4">
          <div className="pb-6">
            {renderContent(unit.guidebookContent)}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
