import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Puzzle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { GrammarRule } from '@/lib/grammarRules';

export interface GrammarRuleCardProps {
  rule: GrammarRule;
}

export function GrammarRuleCard({ rule }: GrammarRuleCardProps) {
  return (
    <Card className="overflow-hidden border-primary/20 shadow-sm">
      <div className="bg-primary/5 p-4 border-b border-primary/10">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          {rule.title_pt}
          {rule.tags && rule.tags.map((t) => (
            <Badge key={t} variant="secondary" className="text-[10px] h-5">{t}</Badge>
          ))}
        </h3>
        <p className="text-sm text-muted-foreground">{rule.title_en}</p>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: rule.explanation_pt }} />
        </div>

        {rule.structure_format_pt && (
          <div className="bg-muted/50 rounded-lg p-3 text-sm border border-muted">
            <div className="flex items-center gap-2 mb-2 font-semibold text-foreground">
              <Puzzle className="h-4 w-4 text-blue-500" />
              Estrutura
            </div>
            <div dangerouslySetInnerHTML={{ __html: rule.structure_format_pt }} />
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-2 font-semibold text-foreground text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Exemplos
          </div>
          <div className="space-y-2">
            {rule.examples.slice(0, 3).map((ex, i) => (
              <div key={i} className="text-sm bg-green-50/50 dark:bg-green-950/10 p-2 rounded border border-green-100 dark:border-green-900/30">
                <p className="font-medium">{ex.sentence_en}</p>
                <p className="text-muted-foreground text-xs">{ex.translation_pt}</p>
              </div>
            ))}
          </div>
        </div>

        {rule.common_mistakes_pt && (
          <div className="bg-red-50/50 dark:bg-red-950/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
            <div className="flex items-center gap-2 mb-2 font-semibold text-red-700 dark:text-red-400 text-sm">
              <AlertTriangle className="h-4 w-4" />
              Atenção aos Erros
            </div>
            <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: rule.common_mistakes_pt }} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
