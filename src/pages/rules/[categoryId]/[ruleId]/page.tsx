import { useParams } from 'react-router-dom';
import { getRuleById } from '@/lib/grammarRules';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RulePage() {
  const { ruleId } = useParams<{ ruleId: string }>();
  const rule = getRuleById(ruleId!);

  if (!rule) {
    return <div>Regra não encontrada</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{rule.title_pt}</CardTitle>
        <CardDescription>{rule.title_en}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: rule.explanation_pt }} />

        {rule.structure_format_pt && (
          <div className="mt-4">
            <h3 className="font-semibold">Estrutura</h3>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: rule.structure_format_pt }} />
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-semibold">Exemplos</h3>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            {rule.examples.map((example, index) => (
              <li key={index}>
                <p className="font-semibold">{example.sentence_en}</p>
                {example.translation_pt && <p className="text-sm text-muted-foreground">{example.translation_pt}</p>}
                {example.notes_pt && <p className="text-xs text-muted-foreground italic">{example.notes_pt}</p>}
              </li>
            ))}
          </ul>
        </div>

        {rule.common_mistakes_pt && (
          <div className="mt-4">
            <h3 className="font-semibold">Erros Comuns</h3>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: rule.common_mistakes_pt }} />
          </div>
        )}

        {rule.tags && (
          <div className="mt-4 flex gap-2">
            {rule.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}