import { useNavigate, useParams } from 'react-router-dom';
import { getRuleById, getCategoryById } from '@/lib/grammarRules';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

export default function RulePage() {
  const { categoryId, ruleId } = useParams<{ categoryId: string; ruleId: string }>();
  const navigate = useNavigate();

  const category = getCategoryById(categoryId!);
  const rule = getRuleById(ruleId!);

  if (!category || !rule) {
    return <div>Regra ou Categoria não encontrada</div>;
  }

  const rulesInThisCategory = category.rules;
  const currentRuleIndex = rulesInThisCategory.findIndex(r => r.id === ruleId);
  const totalRules = rulesInThisCategory.length;

  const previousRuleId = currentRuleIndex > 0 ? rulesInThisCategory[currentRuleIndex - 1].id : undefined;
  const nextRuleId = currentRuleIndex < totalRules - 1 ? rulesInThisCategory[currentRuleIndex + 1].id : undefined;

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

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-3">Exemplos</h3>
            <ul className="space-y-4">
              {rule.examples.map((example, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm bg-card-foreground/5">
                  <p className="font-mono text-base bg-muted p-2 rounded-md">{example.sentence_en}</p>
                  {example.translation_pt && <p className="text-sm text-muted-foreground mt-2">{example.translation_pt}</p>}
                  {example.notes_pt && <p className="text-xs text-muted-foreground italic mt-1">{example.notes_pt}</p>}
                </li>
              ))}
            </ul>
          </div>

          {rule.common_mistakes_pt && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-3">Erros Comuns</h3>
              <div 
                className="prose max-w-none p-4 bg-destructive/10 text-destructive-foreground rounded-lg border border-destructive/30"
                dangerouslySetInnerHTML={{ 
                  __html: rule.common_mistakes_pt
                    .replace(/->\s*<em class="text-green-600"><em>(.*?)<\/em><\/em>/g, '-> <em class="text-green-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle inline-block h-4 w-4 mr-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><em>$1</em></em>')
                    .replace(/<em class="text-red-600"><em>(.*?)<\/em><\/em>/g, '<em class="text-red-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle inline-block h-4 w-4 mr-1"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><em>$1</em></em>')
                }} 
              />
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

      <div className="flex justify-between items-center mt-6">
        {previousRuleId ? (
          <Button onClick={() => navigate(`/rules/${categoryId}/${previousRuleId}`)} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Regra Anterior
          </Button>
        ) : (
          <div />
        )}
        {currentRuleIndex !== undefined && totalRules !== undefined && (
          <span className="text-sm text-muted-foreground">
            Regra {currentRuleIndex + 1} de {totalRules}
          </span>
        )}
        {nextRuleId ? (
          <Button onClick={() => navigate(`/rules/${categoryId}/${nextRuleId}`)} variant="outline">
            Próxima Regra <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
