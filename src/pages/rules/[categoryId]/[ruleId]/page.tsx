import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getRuleById, getCategoryById } from '@/lib/grammarRules';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Volume2,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Languages,
  Puzzle,
  ChevronLeft,
  ChevronRight,
  Tag,
  BookMarked,
  Circle
} from 'lucide-react';
import { LessonProgressBar } from '@/components/curriculum/LessonProgressBar';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { useStudiedRules } from '@/hooks/useStudiedRules';
import { PageContainer } from '@/components/common/PageContainer';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function RulePage() {
  const { categoryId, ruleId } = useParams<{ categoryId: string; ruleId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLessonCompleted } = useCurriculumProgress();
  const { isStudied, toggleStudied } = useStudiedRules();
  const [showTranslations, setShowTranslations] = useState(true);

  // Parâmetros de currículo (se vindo da jornada de aprendizado)
  const moduleId = searchParams.get('module');
  const lessonId = searchParams.get('lesson');
  const isFromCurriculum = moduleId !== null && lessonId !== null;

  const category = getCategoryById(categoryId!);
  const rule = getRuleById(ruleId!);

  // Função para falar o texto em inglês
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  if (!category || !rule) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">Regra ou Categoria não encontrada</p>
          <Button variant="outline" onClick={() => navigate('/rules')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Regras
          </Button>
        </div>
      </PageContainer>
    );
  }

  const rulesInThisCategory = category.rules;
  const currentRuleIndex = rulesInThisCategory.findIndex(r => r.id === ruleId);
  const totalRules = rulesInThisCategory.length;
  const progressPercentage = ((currentRuleIndex + 1) / totalRules) * 100;

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
    <PageContainer>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Barra de Progresso da Jornada (se vindo do currículo) */}
        {isFromCurriculum && moduleId && lessonId && (
          <LessonProgressBar
            moduleId={moduleId}
            lessonId={lessonId}
            showCompleteButton={isLastRule}
          />
        )}

        {/* Header com navegação e progresso */}
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/rules/${categoryId}`)} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>

          <div className="flex-1 max-w-xs">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>{category.name_pt}</span>
              <span>{currentRuleIndex + 1}/{totalRules}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isStudied(ruleId!) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleStudied(ruleId!)}
              className={cn(
                "flex items-center gap-2 transition-all",
                isStudied(ruleId!) && "bg-green-600 hover:bg-green-700 text-white"
              )}
            >
              {isStudied(ruleId!) ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Estudado</span>
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4" />
                  <span className="hidden sm:inline">Marcar</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTranslations(!showTranslations)}
              className="flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">{showTranslations ? 'Ocultar' : 'Mostrar'}</span>
            </Button>
          </div>
        </div>

        {/* Card Principal da Regra */}
        <Card className="overflow-hidden border-0 shadow-lg">
          {/* Header com gradiente */}
          <div className="relative p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
            <div className="absolute top-0 right-0 opacity-10">
              <BookOpen className="h-32 w-32 text-primary" />
            </div>
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">{rule.title_pt}</h1>
                  <p className="text-muted-foreground">{rule.title_en}</p>
                  {rule.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {rule.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-8">
            {/* Explicação */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="font-semibold text-lg">Explicação</h2>
              </div>
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: rule.explanation_pt }}
              />
            </section>

            {/* Estrutura */}
            {rule.structure_format_pt && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Puzzle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="font-semibold text-lg">Estrutura</h2>
                </div>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-4">
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none [&_code]:bg-purple-200/50 [&_code]:dark:bg-purple-800/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-purple-800 [&_code]:dark:text-purple-200"
                      dangerouslySetInnerHTML={{ __html: rule.structure_format_pt }}
                    />
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Exemplos */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="font-semibold text-lg">Exemplos</h2>
                <Badge variant="outline" className="ml-auto">
                  {rule.examples.length} {rule.examples.length === 1 ? 'exemplo' : 'exemplos'}
                </Badge>
              </div>
              <div className="grid gap-3">
                {rule.examples.map((example, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-md transition-all bg-gradient-to-r from-green-50/50 to-background dark:from-green-950/20 dark:to-background border-green-200/50 dark:border-green-800/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{example.sentence_en}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => speak(example.sentence_en)}
                            >
                              <Volume2 className="h-4 w-4 text-primary" />
                            </Button>
                          </div>
                          {showTranslations && example.translation_pt && (
                            <p className="text-sm text-muted-foreground mt-1">
                              → {example.translation_pt}
                            </p>
                          )}
                          {example.notes_pt && (
                            <p className="text-xs text-muted-foreground/80 italic mt-2 pl-3 border-l-2 border-muted">
                              {example.notes_pt}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Erros Comuns */}
            {rule.common_mistakes_pt && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="font-semibold text-lg">Erros Comuns</h2>
                </div>
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-4">
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none text-amber-900 dark:text-amber-100 [&_code]:bg-amber-200/50 [&_code]:dark:bg-amber-800/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono"
                      dangerouslySetInnerHTML={{ __html: rule.common_mistakes_pt }}
                    />
                  </CardContent>
                </Card>
              </section>
            )}
          </CardContent>
        </Card>

        {/* Navegação entre regras */}
        <Card className="p-4">
          <div className="flex items-center justify-between gap-4">
            {previousRuleId ? (
              <Button
                onClick={() => navigate(buildRuleUrl(previousRuleId))}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Anterior</span>
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              {rulesInThisCategory.map((r, idx) => (
                <button
                  key={r.id}
                  onClick={() => navigate(buildRuleUrl(r.id))}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    idx === currentRuleIndex
                      ? "bg-primary scale-125"
                      : "bg-muted hover:bg-muted-foreground/30"
                  )}
                  title={r.title_pt}
                />
              ))}
            </div>

            {nextRuleId ? (
              <Button
                onClick={() => navigate(buildRuleUrl(nextRuleId))}
                variant="default"
                className="flex items-center gap-2"
              >
                <span className="hidden sm:inline">Próxima</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => navigate(`/rules/${categoryId}`)}
                variant="default"
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Concluir</span>
              </Button>
            )}
          </div>
        </Card>

        {/* Indicador de última regra */}
        {isFromCurriculum && isLastRule && (
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-green-700 dark:text-green-300 font-medium">
              Última regra! Você pode marcar esta lição como dominada.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
