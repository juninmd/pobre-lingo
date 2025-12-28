import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { curriculumData, getCurriculumStats, DifficultyLevel } from '@/lib/curriculumData';
import {
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  Award,
  TrendingUp,
  BookOpen,
  Play,
  Star,
  Trophy,
  Zap,
  Target,
  Flame,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

const difficultyConfig = {
  basico: {
    label: 'Básico',
    color: 'bg-green-500',
    textColor: 'text-green-600',
    borderColor: 'border-green-500',
  },
  intermediario: {
    label: 'Intermediário',
    color: 'bg-orange-500',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-500',
  },
  avancado: {
    label: 'Avançado',
    color: 'bg-red-500',
    textColor: 'text-red-600',
    borderColor: 'border-red-500',
  },
};

const lessonTypeConfig = {
  grammar: { label: 'Gramática', icon: BookOpen, color: 'text-blue-600' },
  vocabulary: { label: 'Vocabulário', icon: Star, color: 'text-purple-600' },
  exercise: { label: 'Exercício', icon: Target, color: 'text-green-600' },
  reading: { label: 'Leitura', icon: BookOpen, color: 'text-cyan-600' },
  quiz: { label: 'Quiz', icon: Trophy, color: 'text-yellow-600' },
};

export default function CurriculumPage() {
  const {
    totalXP,
    userLevel,
    isModuleUnlocked,
    getModuleProgress,
    getOverallProgress,
    isLessonCompleted,
  } = useCurriculumProgress();

  const stats = getCurriculumStats();
  const overallProgress = getOverallProgress();
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<DifficultyLevel | 'all'>('all');

  const filteredModules = selectedDifficulty === 'all'
    ? curriculumData.modules
    : curriculumData.modules.filter(m => m.difficulty === selectedDifficulty);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Jornada de Aprendizado</h1>
        <p className="text-muted-foreground">Sua trilha personalizada do básico ao avançado</p>
      </div>

      {/* Estatísticas do Usuário */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nível Atual</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Nível {userLevel}</div>
            <p className="text-xs text-muted-foreground">
              {overallProgress.xpToNextLevel} XP para o próximo nível
            </p>
            <Progress value={(totalXP % 100)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Total</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalXP} XP</div>
            <p className="text-xs text-muted-foreground">
              De {stats.totalXP} XP possíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.overallPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {overallProgress.completedLessons} de {overallProgress.totalLessons} lições
            </p>
            <Progress value={overallProgress.overallPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Módulos Completos</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.completedModules}</div>
            <p className="text-xs text-muted-foreground">
              De {stats.totalModules} módulos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Informações do Currículo */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sobre Esta Jornada</CardTitle>
          <CardDescription>{curriculumData.description_pt}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">{stats.totalLessons} Lições</p>
                <p className="text-xs text-muted-foreground">Conteúdo estruturado</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">~{stats.totalHours} Horas</p>
                <p className="text-xs text-muted-foreground">Tempo estimado</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">{stats.totalModules} Módulos</p>
                <p className="text-xs text-muted-foreground">3 níveis de dificuldade</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Tabs value={selectedDifficulty} onValueChange={(v) => setSelectedDifficulty(v as DifficultyLevel | 'all')} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="basico">Básico ({stats.basicModules})</TabsTrigger>
          <TabsTrigger value="intermediario">Intermediário ({stats.intermediateModules})</TabsTrigger>
          <TabsTrigger value="avancado">Avançado ({stats.advancedModules})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Timeline de Módulos */}
      <div className="space-y-8">
        {filteredModules.map((module, moduleIndex) => {
          const progress = getModuleProgress(module.id);
          const isUnlocked = isModuleUnlocked(module);
          const isCompleted = progress.completionPercentage === 100;
          const diffConfig = difficultyConfig[module.difficulty];
          const IconComponent = (LucideIcons as any)[module.icon] || BookOpen;

          return (
            <div key={module.id} className="relative">
              {/* Timeline Line */}
              {moduleIndex < filteredModules.length - 1 && (
                <div
                  className={cn(
                    "absolute left-6 top-20 bottom-0 w-0.5 -mb-8",
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  )}
                />
              )}

              {/* Module Card */}
              <Card className={cn(
                "relative",
                !isUnlocked && "opacity-60",
                isCompleted && "border-green-500 border-2"
              )}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* Icon Circle */}
                    <div className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10",
                      isCompleted ? "bg-green-500 text-white" : isUnlocked ? diffConfig.color + " text-white" : "bg-gray-300 text-gray-600"
                    )}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : isUnlocked ? (
                        <IconComponent className="h-6 w-6" />
                      ) : (
                        <Lock className="h-6 w-6" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{module.title_pt}</CardTitle>
                        <Badge variant="outline" className={diffConfig.textColor}>
                          {diffConfig.label}
                        </Badge>
                        {isCompleted && (
                          <Badge className="bg-green-500">
                            <Trophy className="h-3 w-3 mr-1" />
                            Completo
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{module.description_pt}</CardDescription>

                      {/* Progress Bar */}
                      {isUnlocked && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">
                              {progress.lessonsCompleted} de {progress.totalLessons} lições
                            </span>
                            <span className="font-medium">{progress.completionPercentage}%</span>
                          </div>
                          <Progress value={progress.completionPercentage} className="h-2" />
                        </div>
                      )}

                      {/* Prerequisites */}
                      {!isUnlocked && module.prerequisites && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <Lock className="h-4 w-4" />
                          <span>
                            Complete os módulos anteriores para desbloquear
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {/* Lessons */}
                {isUnlocked && (
                  <CardContent>
                    <div className="space-y-3">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const lessonCompleted = isLessonCompleted(module.id, lesson.id);
                        const lessonConfig = lessonTypeConfig[lesson.type];
                        const LessonIcon = lessonConfig.icon;

                        return (
                          <div
                            key={lesson.id}
                            className={cn(
                              "flex items-center gap-4 p-4 rounded-lg border transition-colors",
                              lessonCompleted ? "bg-green-50 border-green-200" : "bg-gray-50 hover:bg-gray-100"
                            )}
                          >
                            <div className="flex-shrink-0">
                              {lessonCompleted ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                              ) : (
                                <Circle className="h-6 w-6 text-gray-400" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <LessonIcon className={cn("h-4 w-4", lessonConfig.color)} />
                                <h4 className="font-medium text-sm">{lesson.title_pt}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {lessonConfig.label}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {lesson.description_pt}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {lesson.estimatedMinutes} min
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  {lesson.xpReward} XP
                                </span>
                              </div>
                            </div>

                            <div className="flex-shrink-0">
                              {lesson.exerciseType ? (
                                <Link to={`/exercises/${lesson.exerciseType}`}>
                                  <Button size="sm" variant={lessonCompleted ? "outline" : "default"}>
                                    {lessonCompleted ? (
                                      <>
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        Revisar
                                      </>
                                    ) : (
                                      <>
                                        <Play className="h-4 w-4 mr-1" />
                                        Iniciar
                                      </>
                                    )}
                                  </Button>
                                </Link>
                              ) : lesson.type === 'vocabulary' ? (
                                <Link to={`/vocabulary/${module.id}/${lesson.id}`}>
                                  <Button size="sm" variant={lessonCompleted ? "outline" : "default"}>
                                    {lessonCompleted ? (
                                      <>
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        Revisar
                                      </>
                                    ) : (
                                      <>
                                        <Play className="h-4 w-4 mr-1" />
                                        Estudar
                                      </>
                                    )}
                                  </Button>
                                </Link>
                              ) : lesson.type === 'quiz' ? (
                                <Link to={`/quiz/${module.id}/${lesson.id}`}>
                                  <Button size="sm" variant={lessonCompleted ? "outline" : "default"}>
                                    {lessonCompleted ? (
                                      <>
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        Refazer
                                      </>
                                    ) : (
                                      <>
                                        <Play className="h-4 w-4 mr-1" />
                                        Fazer Quiz
                                      </>
                                    )}
                                  </Button>
                                </Link>
                              ) : lesson.grammarRuleIds && lesson.grammarRuleIds.length > 0 ? (
                                <Link to="/rules">
                                  <Button size="sm" variant={lessonCompleted ? "outline" : "default"}>
                                    {lessonCompleted ? "Revisar" : "Estudar"}
                                  </Button>
                                </Link>
                              ) : lesson.type === 'reading' ? (
                                <Link to="/exercises/news-comprehension">
                                  <Button size="sm" variant={lessonCompleted ? "outline" : "default"}>
                                    {lessonCompleted ? (
                                      <>
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        Revisar
                                      </>
                                    ) : (
                                      <>
                                        <Play className="h-4 w-4 mr-1" />
                                        Ler
                                      </>
                                    )}
                                  </Button>
                                </Link>
                              ) : (
                                <Link to="/rules">
                                  <Button size="sm" variant={lessonCompleted ? "outline" : "default"}>
                                    {lessonCompleted ? "Revisar" : "Estudar"}
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
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

      {/* Mensagem de Motivação */}
      {overallProgress.overallPercentage === 100 ? (
        <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-600" />
              Parabéns! Você completou toda a jornada!
            </CardTitle>
            <CardDescription>
              Você dominou todos os módulos do PobreLingo. Continue praticando para manter suas habilidades afiadas!
            </CardDescription>
          </CardHeader>
        </Card>
      ) : overallProgress.completedLessons === 0 ? (
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-blue-600" />
              Comece Sua Jornada Agora!
            </CardTitle>
            <CardDescription>
              Dê o primeiro passo na sua jornada de aprendizado. Comece pelo módulo "Fundamentos do Inglês" e desbloqueie novos conteúdos progressivamente!
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Continue Assim!
            </CardTitle>
            <CardDescription>
              Você está fazendo um ótimo progresso! Continue estudando para desbloquear novos módulos e alcançar a fluência.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </PageContainer>
  );
}
