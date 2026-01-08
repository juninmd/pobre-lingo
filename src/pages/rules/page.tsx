import { grammarCategories, getCategoryById, getRuleById } from '@/lib/grammarRules';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LessonProgressBar } from '@/components/curriculum/LessonProgressBar';
import { useEffect } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

export default function RulesPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Parâmetros de currículo
  const moduleId = searchParams.get('module');
  const lessonId = searchParams.get('lesson');
  const ruleIds = searchParams.get('ruleIds')?.split(',') || [];
  const isFromCurriculum = moduleId !== null && lessonId !== null;

  // Se vindo do currículo com regras específicas, redirecionar para a primeira regra
  useEffect(() => {
    if (isFromCurriculum && ruleIds.length > 0) {
      const firstRuleId = ruleIds[0];
      // Encontrar a categoria da regra
      for (const category of grammarCategories) {
        const rule = category.rules.find(r => r.id === firstRuleId);
        if (rule) {
          navigate(`/rules/${category.id}/${rule.id}?module=${moduleId}&lesson=${lessonId}`, { replace: true });
          return;
        }
      }
    }
  }, [isFromCurriculum, ruleIds, moduleId, lessonId, navigate]);

  // Filtrar categorias baseado nas regras do currículo (se aplicável)
  const displayCategories = isFromCurriculum && ruleIds.length > 0
    ? grammarCategories.filter(category =>
        category.rules.some(rule => ruleIds.includes(rule.id))
      )
    : grammarCategories;

  return (
    <div className="space-y-6">
      {/* Barra de Progresso da Jornada (se vindo do currículo) */}
      {isFromCurriculum && moduleId && lessonId && (
        <LessonProgressBar
          moduleId={moduleId}
          lessonId={lessonId}
          showCompleteButton={false}
        />
      )}

      <div>
        <h1 className="text-3xl font-bold mb-2">Regras Gramaticais</h1>
        <p className="text-muted-foreground mb-6">
          {isFromCurriculum
            ? 'Estude as regras abaixo para completar esta lição.'
            : 'Explore todas as regras gramaticais do inglês organizadas por categorias.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {displayCategories.map((category) => {
          // Filtrar regras específicas se vindo do currículo
          const rulesToShow = isFromCurriculum && ruleIds.length > 0
            ? category.rules.filter(rule => ruleIds.includes(rule.id))
            : category.rules;

          return (
            <Card key={category.id} className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {category.name_pt}
                </CardTitle>
                <CardDescription>{category.description_pt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {rulesToShow.slice(0, 5).map((rule) => (
                    <Link
                      key={rule.id}
                      to={`/rules/${category.id}/${rule.id}${isFromCurriculum ? `?module=${moduleId}&lesson=${lessonId}` : ''}`}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <span className="text-sm">{rule.title_pt}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                  {rulesToShow.length > 5 && (
                    <Link
                      to={`/rules/${category.id}${isFromCurriculum ? `?module=${moduleId}&lesson=${lessonId}` : ''}`}
                      className="text-sm text-primary hover:underline block mt-2"
                    >
                      Ver todas as {rulesToShow.length} regras →
                    </Link>
                  )}
                  {rulesToShow.length === 0 && (
                    <Link
                      to={`/rules/${category.id}`}
                      className="text-sm text-muted-foreground"
                    >
                      Ver categoria →
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}