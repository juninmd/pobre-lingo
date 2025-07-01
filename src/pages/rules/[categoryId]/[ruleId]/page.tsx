import { useNavigate, useParams } from 'react-router-dom';
import { getRuleById } from '@/lib/grammarRules';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function RulePage() {
  const { ruleId } = useParams<{ ruleId: string }>();
  const navigate = useNavigate();
  const rule = getRuleById(ruleId!);

  if (!rule) {
    return <div>Regra não encontrada</div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{rule.title_pt}</CardTitle>
          <CardDescription>{rule.title_en}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: rule.explanation_pt }} />

          {rule.structure_format_pt && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Estrutura</h3>
              <div className="prose max-w-none p-4 bg-muted rounded-md" dangerouslySetInnerHTML={{ __html: rule.structure_format_pt }} />
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Exemplos</h3>
            <ul className="list-disc pl-5 mt-2 space-y-4">
              {rule.examples.map((example, index) => (
                <li key={index} className="p-3 border rounded-md bg-card-foreground/5">
                  <p className="font-semibold text-foreground">{example.sentence_en}</p>
                  {example.translation_pt && <p className="text-sm text-muted-foreground">{example.translation_pt}</p>}
                  {example.notes_pt && <p className="text-xs text-muted-foreground italic mt-1">{example.notes_pt}</p>}
                </li>
              ))}
            </ul>
          </div>

          {rule.common_mistakes_pt && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Erros Comuns</h3>
              <div className="prose max-w-none p-4 bg-destructive/60 text-destructive-foreground rounded-md" dangerouslySetInnerHTML={{ __html: rule.common_mistakes_pt }} />
            </div>
          )}

          {rule.tags && (
            <div className="mt-6 flex flex-wrap gap-2">
              {rule.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm rounded-full">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
