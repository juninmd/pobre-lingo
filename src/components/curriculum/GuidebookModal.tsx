import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen } from 'lucide-react';
import { Unit, curriculumData } from '@/lib/curriculumData';
import { getRuleById } from '@/lib/grammarRules';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { renderMarkdownContent } from './guidebook/renderMarkdownContent';
import { GrammarRuleCard } from './guidebook/GrammarRuleCard';

interface GuidebookModalProps {
  unit: Unit;
  trigger?: React.ReactNode;
}

export function GuidebookModal({ unit, trigger }: GuidebookModalProps) {
  const unitRules = useMemo(() => {
    const unitModules = curriculumData.modules.filter(m => m.unitId === unit.id);
    const grammarRuleIds = new Set<string>();
    unitModules.forEach(module => {
      module.lessons.forEach(lesson => {
        lesson.grammarRuleIds?.forEach(id => grammarRuleIds.add(id));
      });
    });
    return Array.from(grammarRuleIds).map(id => getRuleById(id)).filter(Boolean);
  }, [unit.id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary uppercase tracking-wide font-bold text-xs h-9">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Guia do Capítulo</span>
            <span className="sm:hidden">Guia</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-primary">
            <BookOpen className="h-6 w-6" />{unit.title}
          </DialogTitle>
          <DialogDescription>{unit.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4 mt-4">
          <div className="pb-8 space-y-8">
            <section>{renderMarkdownContent(unit.guidebookContent)}</section>
            {unitRules.length > 0 && (
              <section className="space-y-6">
                <Separator />
                <div className="flex items-center gap-2">
                   <h2 className="text-2xl font-bold text-primary">Gramática Detalhada</h2>
                   <Badge variant="outline">{unitRules.length} regras</Badge>
                </div>
                <div className="grid gap-6">
                  {unitRules.map((rule, idx) => rule && <GrammarRuleCard key={idx} rule={rule} />)}
                </div>
              </section>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
