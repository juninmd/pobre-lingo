import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getRuleById, getCategoryById } from '@/lib/grammarRules';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { LessonProgressBar } from '@/components/curriculum/LessonProgressBar';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';

export default function RulePage() {
  const { categoryId, ruleId } = useParams<{ categoryId: string; ruleId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLessonCompleted } = useCurriculumProgress();

  // Parâmetros de currículo (se vindo da jornada de aprendizado)
  const moduleId = searchParams.get('module');
  const lessonId = searchParams.get('lesson');
  const isFromCurriculum = moduleId !== null && lessonId !== null;

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

  // Construir URL mantendo parâmetros do currículo
  const buildRuleUrl = (newRuleId: string) => {
    const baseUrl = `/rules/${categoryId}/${newRuleId}`;
    if (isFromCurriculum) {
      return `${baseUrl}?module=${moduleId}&lesson=${lessonId}`;
    }
    return baseUrl;
  };

  // Verificar se é a última regra (para habilitar marcar como dominada)
  const isLastRule = currentRuleIndex === totalRules - 1;

  return (
    <div className="space-y-6">
      {/* Barra de Progresso da Jornada (se vindo do currículo) */}
      {isFromCurriculum && moduleId && lessonId && (
        <LessonProgressBar
          moduleId={moduleId}
          lessonId={lessonId}
          showCompleteButton={isLastRule}
        />
      )}

      {/* Indicador de progresso das regras */}
      {isFromCurriculum && (
        <div className="text-center text-sm text-muted-foreground">
          Regra {currentRuleIndex + 1} de {totalRules}
          {isLastRule && (
            <span className="ml-2 text-green-600 font-medium">✓ Última regra! Você pode marcar como dominada.</span>
          )}
        </div>
      )}

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

      <div className="flex justify-between items-center mt-6">
        {previousRuleId ? (
          <Button onClick={() => navigate(buildRuleUrl(previousRuleId))} variant="outline">
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
          <Button onClick={() => navigate(buildRuleUrl(nextRuleId))} variant="outline">
            Próxima Regra <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
