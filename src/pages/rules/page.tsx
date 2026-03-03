import { grammarCategories, getCategoryById, getRuleById } from '@/lib/grammarRules';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LessonProgressBar } from '@/components/curriculum/LessonProgressBar';
import { PageHeader } from '@/components/common/PageHeader';
import { PageContainer } from '@/components/common/PageContainer';
import { useEffect, useMemo } from 'react';
import { BookOpen, ChevronRight, GraduationCap, Sparkles } from 'lucide-react';

export default function RulesPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Parâmetros de currículo
  const moduleId = searchParams.get('module');
  const lessonId = searchParams.get('lesson');
  const ruleIdsParam = searchParams.get('ruleIds');
  const ruleIds = useMemo(() => (ruleIdsParam ? ruleIdsParam.split(',') : []), [ruleIdsParam]);
  const ruleIdsSet = useMemo(() => new Set(ruleIds), [ruleIds]);
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
        category.rules.some(rule => ruleIdsSet.has(rule.id))
      )
    : grammarCategories;

  return (
    <PageContainer>
      {/* Barra de Progresso da Jornada (se vindo do currículo) */}
      {isFromCurriculum && moduleId && lessonId && (
        <div className="mb-6">
          <LessonProgressBar
            moduleId={moduleId}
            lessonId={lessonId}
            showCompleteButton={false}
          />
        </div>
      )}

      <PageHeader
        title="Regras Gramaticais"
        description={
          isFromCurriculum
            ? 'Estude as regras abaixo para completar esta lição.'
            : 'Explore todas as regras gramaticais do inglês organizadas por categorias.'
        }
        icon={GraduationCap}
        iconClassName="text-blue-500"
        backLink="/"
        backLabel="Voltar ao Início"
      >
        {!isFromCurriculum && (
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {grammarCategories.length} categorias
            </Badge>
            <Badge variant="outline">
              {grammarCategories.reduce((acc, cat) => acc + cat.rules.length, 0)} regras
            </Badge>
          </div>
        )}
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2">
        {displayCategories.map((category) => {
          // Filtrar regras específicas se vindo do currículo
          const rulesToShow = isFromCurriculum && ruleIds.length > 0
            ? category.rules.filter(rule => ruleIdsSet.has(rule.id))
            : category.rules;

          return (
            <Card key={category.id} className="hover:shadow-md transition-all hover:border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  {category.name_pt}
                </CardTitle>
                <CardDescription>{category.description_pt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {rulesToShow.slice(0, 5).map((rule) => (
                    <Link
                      key={rule.id}
                      to={`/rules/${category.id}/${rule.id}${isFromCurriculum ? `?module=${moduleId}&lesson=${lessonId}` : ''}`}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <span className="text-sm group-hover:text-primary transition-colors">{rule.title_pt}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                  {rulesToShow.length > 5 && (
                    <Link
                      to={`/rules/${category.id}${isFromCurriculum ? `?module=${moduleId}&lesson=${lessonId}` : ''}`}
                      className="flex items-center gap-1 text-sm text-primary hover:underline pt-2"
                    >
                      <Sparkles className="h-3 w-3" />
                      Ver todas as {rulesToShow.length} regras
                    </Link>
                  )}
                  {rulesToShow.length === 0 && (
                    <Link
                      to={`/rules/${category.id}`}
                      className="text-sm text-muted-foreground hover:text-primary"
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
    </PageContainer>
  );
}
