import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { curriculumData, getCurriculumStats, DifficultyLevel, Lesson, Module } from '@/lib/curriculumData';
import { NextLessonCard } from '@/components/curriculum/NextLessonCard';
import {
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  TrendingUp,
  BookOpen,
  Play,
  Star,
  Trophy,
  Zap,
  Target,
  Flame,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Mic,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

const difficultyConfig = {
  basico: {
    label: 'Básico',
    color: 'bg-green-500',
    textColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-500',
    bgLight: 'bg-green-50 dark:bg-green-950/20',
  },
  intermediario: {
    label: 'Intermediário',
    color: 'bg-orange-500',
    textColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-500',
    bgLight: 'bg-orange-50 dark:bg-orange-950/20',
  },
  avancado: {
    label: 'Avançado',
    color: 'bg-red-500',
    textColor: 'text-red-600 dark:text-red-400',
    borderColor: 'border-red-500',
    bgLight: 'bg-red-50 dark:bg-red-950/20',
  },
};

const lessonTypeConfig = {
  grammar: { label: 'Gramática', icon: BookOpen, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  vocabulary: { label: 'Vocabulário', icon: Star, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
  exercise: { label: 'Exercício', icon: Target, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  reading: { label: 'Leitura', icon: BookOpen, color: 'text-cyan-600 dark:text-cyan-400', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
  quiz: { label: 'Quiz', icon: Trophy, color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  culture: { label: 'Cultura', icon: LucideIcons.Globe, color: 'text-teal-600 dark:text-teal-400', bgColor: 'bg-teal-100 dark:bg-teal-900/30' },
  listening: { label: 'Escuta', icon: LucideIcons.Headphones, color: 'text-indigo-600 dark:text-indigo-400', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' },
  speaking: { label: 'Fala', icon: Mic, color: 'text-rose-600 dark:text-rose-400', bgColor: 'bg-rose-100 dark:bg-rose-900/30' },
};

// Função para construir link de lição
function getLessonLink(module: Module, lesson: Lesson): string {
  if (lesson.exerciseType) {
    return `/exercises/${lesson.exerciseType}?module=${module.id}&lesson=${lesson.id}`;
  }
  if (lesson.type === 'vocabulary' || lesson.type === 'speaking') {
    return `/vocabulary/${module.id}/${lesson.id}`;
  }
  if (lesson.type === 'quiz') {
    return `/quiz/${module.id}/${lesson.id}`;
  }
  if (lesson.type === 'grammar' && lesson.grammarRuleIds?.length) {
    return `/rules?module=${module.id}&lesson=${lesson.id}&ruleIds=${lesson.grammarRuleIds.join(',')}`;
  }
  if (lesson.type === 'reading') {
    return `/exercises/news-comprehension?module=${module.id}&lesson=${lesson.id}`;
  }
  return `/rules?module=${module.id}&lesson=${lesson.id}`;
}

export default function CurriculumPage() {
  const {
    totalXP,
    userLevel,
    isModuleUnlocked,
    getModuleProgress,
    overallProgress,
    isLessonCompleted,
  } = useCurriculumProgress();

  const stats = React.useMemo(() => getCurriculumStats(), []);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<DifficultyLevel | 'all'>('all');
  const [expandedModule, setExpandedModule] = React.useState<string | null>(null);

  const filteredModules = selectedDifficulty === 'all'
    ? curriculumData.modules
    : curriculumData.modules.filter(m => m.difficulty === selectedDifficulty);

  // Auto-expandir o módulo em progresso
  React.useEffect(() => {
    for (const module of curriculumData.modules) {
      if (!isModuleUnlocked(module)) continue;
      const progress = getModuleProgress(module.id);
      if (progress.completionPercentage > 0 && progress.completionPercentage < 100) {
        setExpandedModule(module.id);
        break;
      }
    }
  }, []);

  return (
    <PageContainer>
      {/* Header com gradiente */}
      <div className="relative mb-8 p-4 md:p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <GraduationCap className="h-24 w-24 md:h-40 md:w-40 text-primary" />
        </div>
        <div className="relative">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Flame className="h-8 w-8 md:h-10 md:w-10 text-orange-500" />
            Jornada de Aprendizado
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Sua trilha personalizada para dominar o inglês, passo a passo.
          </p>
        </div>
      </div>

      {/* Card de Próxima Lição - DESTAQUE PRINCIPAL */}
      <div className="mb-8">
        <NextLessonCard />
      </div>

      {/* Estatísticas compactas */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-8">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200 dark:from-yellow-950/30 dark:to-yellow-900/20 dark:border-yellow-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-200 dark:bg-yellow-800">
              <Zap className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userLevel}</p>
              <p className="text-xs text-muted-foreground">Nível</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200 dark:from-purple-950/30 dark:to-purple-900/20 dark:border-purple-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-200 dark:bg-purple-800">
              <Star className="h-5 w-5 text-purple-700 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalXP}</p>
              <p className="text-xs text-muted-foreground">XP Total</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 dark:from-green-950/30 dark:to-green-900/20 dark:border-green-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-200 dark:bg-green-800">
              <TrendingUp className="h-5 w-5 text-green-700 dark:text-green-300" />
            </div>
            <div>
              <p className="text-2xl font-bold">{overallProgress.overallPercentage}%</p>
              <p className="text-xs text-muted-foreground">Progresso</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 dark:from-blue-950/30 dark:to-blue-900/20 dark:border-blue-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-200 dark:bg-blue-800">
              <Trophy className="h-5 w-5 text-blue-700 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-2xl font-bold">{overallProgress.completedLessons}/{overallProgress.totalLessons}</p>
              <p className="text-xs text-muted-foreground">Lições</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de progresso geral */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Progresso Total da Jornada
            </span>
            <span className="text-sm text-muted-foreground">
              {overallProgress.completedModules} de {stats.totalModules} módulos completos
            </span>
          </div>
          <Progress value={overallProgress.overallPercentage} className="h-3" />
        </CardContent>
      </Card>

      {/* Filtros por dificuldade */}
      <Tabs value={selectedDifficulty} onValueChange={(v) => setSelectedDifficulty(v as DifficultyLevel | 'all')} className="mb-6">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="all" className="text-sm">
            Todos ({stats.totalModules})
          </TabsTrigger>
          <TabsTrigger value="basico" className="text-sm">
            🌱 Básico ({stats.basicModules})
          </TabsTrigger>
          <TabsTrigger value="intermediario" className="text-sm">
            📚 Intermed. ({stats.intermediateModules})
          </TabsTrigger>
          <TabsTrigger value="avancado" className="text-sm">
            🎓 Avançado ({stats.advancedModules})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Lista de Módulos - Design de Timeline */}
      <div className="space-y-4">
        {filteredModules.map((module, moduleIndex) => {
          const progress = getModuleProgress(module.id);
          const isUnlocked = isModuleUnlocked(module);
          const isCompleted = progress.completionPercentage === 100;
          const isInProgress = progress.completionPercentage > 0 && !isCompleted;
          const diffConfig = difficultyConfig[module.difficulty];
          const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[module.icon] || BookOpen;
          const isExpanded = expandedModule === module.id;

          return (
            <div key={module.id} className="relative">
              {/* Linha de conexão */}
              {moduleIndex < filteredModules.length - 1 && (
                <div
                  className={cn(
                    "absolute left-6 top-[4.5rem] h-[calc(100%-1rem)] w-0.5 z-0",
                    isCompleted ? "bg-green-400" : "bg-gray-200 dark:bg-gray-700"
                  )}
                />
              )}

              {/* Card do Módulo */}
              <Card
                className={cn(
                  "relative transition-all duration-300 cursor-pointer hover:shadow-md",
                  !isUnlocked && "opacity-50 cursor-not-allowed",
                  isCompleted && "border-green-400 bg-green-50/50 dark:bg-green-950/20",
                  isInProgress && "border-primary ring-2 ring-primary/20",
                  isExpanded && "shadow-lg"
                )}
                onClick={() => isUnlocked && setExpandedModule(isExpanded ? null : module.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    {/* Ícone do módulo */}
                    <div
                      className={cn(
                        "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-transform",
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isUnlocked
                            ? `${diffConfig.color} text-white`
                            : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400",
                        isInProgress && "animate-pulse"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : isUnlocked ? (
                        <IconComponent className="h-6 w-6" />
                      ) : (
                        <Lock className="h-5 w-5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <CardTitle className="text-lg">{module.title_pt}</CardTitle>
                        <Badge variant="outline" className={cn("text-xs", diffConfig.textColor)}>
                          {diffConfig.label}
                        </Badge>
                        {isCompleted && (
                          <Badge className="bg-green-500 text-xs">
                            <Trophy className="h-3 w-3 mr-1" />
                            Completo
                          </Badge>
                        )}
                        {isInProgress && (
                          <Badge variant="secondary" className="text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Em progresso
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="line-clamp-1">{module.description_pt}</CardDescription>

                      {/* Barra de progresso inline */}
                      {isUnlocked && (
                        <div className="mt-3 flex items-center gap-3">
                          <Progress value={progress.completionPercentage} className="h-2 flex-1" />
                          <span className="text-sm font-medium w-16 text-right">
                            {progress.lessonsCompleted}/{progress.totalLessons}
                          </span>
                        </div>
                      )}

                      {!isUnlocked && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <Lock className="h-4 w-4" />
                          Complete os módulos anteriores
                        </div>
                      )}
                    </div>

                    {/* Seta de expansão */}
                    {isUnlocked && (
                      <ChevronRight
                        className={cn(
                          "h-5 w-5 text-muted-foreground transition-transform",
                          isExpanded && "rotate-90"
                        )}
                      />
                    )}
                  </div>
                </CardHeader>

                {/* Lições expandidas */}
                {isUnlocked && isExpanded && (
                  <CardContent className="pt-0">
                    <div className="space-y-2 pl-16">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const lessonCompleted = isLessonCompleted(module.id, lesson.id);
                        const config = lessonTypeConfig[lesson.type];
                        const LessonIcon = config.icon;
                        const lessonLink = getLessonLink(module, lesson);

                        // Verificar se é a próxima lição a ser feita
                        const previousLessonCompleted = lessonIndex === 0 || isLessonCompleted(module.id, module.lessons[lessonIndex - 1].id);
                        const isNextLesson = !lessonCompleted && previousLessonCompleted;

                        return (
                          <Link
                            key={lesson.id}
                            to={lessonLink}
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border transition-all",
                              lessonCompleted
                                ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                                : isNextLesson
                                  ? "bg-primary/5 dark:bg-primary/10 border-primary hover:bg-primary/10 dark:hover:bg-primary/20 ring-1 ring-primary/30"
                                  : "bg-background dark:bg-card hover:bg-muted/50 dark:hover:bg-muted/20 border-border"
                            )}
                          >
                            {/* Status icon */}
                            <div
                              className={cn(
                                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                                lessonCompleted
                                  ? "bg-green-500 text-white"
                                  : isNextLesson
                                    ? "bg-primary text-white"
                                    : "bg-muted"
                              )}
                            >
                              {lessonCompleted ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : isNextLesson ? (
                                <Play className="h-4 w-4" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>

                            {/* Info da lição */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <LessonIcon className={cn("h-4 w-4", config.color)} />
                                <span className="font-medium text-sm truncate">{lesson.title_pt}</span>
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {lesson.estimatedMinutes}min
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  {lesson.xpReward}XP
                                </span>
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                  {config.label}
                                </Badge>
                              </div>
                            </div>

                            {/* Botão de ação */}
                            <Button
                              size="sm"
                              variant={lessonCompleted ? "ghost" : isNextLesson ? "default" : "outline"}
                              className="flex-shrink-0"
                            >
                              {lessonCompleted ? (
                                "Revisar"
                              ) : isNextLesson ? (
                                <>
                                  <Play className="h-3 w-3 mr-1" />
                                  Começar
                                </>
                              ) : (
                                "Ver"
                              )}
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          );
        })}
      </div>

      {/* Mensagem motivacional */}
      {overallProgress.overallPercentage === 100 ? (
        <Card className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-950/50 dark:to-orange-950/50 border-yellow-300 dark:border-yellow-700">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">🎉 Parabéns! Você é um Mestre!</h3>
            <p className="text-muted-foreground">
              Você completou toda a jornada de aprendizado! Continue praticando para manter suas habilidades.
            </p>
          </CardContent>
        </Card>
      ) : overallProgress.completedLessons === 0 ? (
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-700">
          <CardContent className="p-6 text-center">
            <Flame className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">🚀 Comece Sua Jornada!</h3>
            <p className="text-muted-foreground mb-4">
              Clique no botão acima para iniciar sua primeira lição e começar a dominar o inglês!
            </p>
          </CardContent>
        </Card>
      ) : null}
    </PageContainer>
  );
}
