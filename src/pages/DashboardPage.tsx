import { LearningStreakDisplay } from '@/components/streaks/LearningStreakDisplay';
import { CurriculumProgressCard } from '@/components/curriculum/CurriculumProgressCard';
import { AchievementsCard } from '@/components/curriculum/AchievementsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { PageContainer } from '@/components/common/PageContainer';
import { Home, BookOpen, Lightbulb, TrendingUp, CheckSquare, ListChecks, Wand2, Sparkles, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  // Dados mock para demonstração
  const userName = "Usuário PobreLingo";
  const exercisesCompleted = 15;
  const totalExercises = 50;
  const learningProgress = (exercisesCompleted / totalExercises) * 100;

  const recentActivities = [
    { id: 1, type: "Exercício", description: "Completou 'Ordenar Frases'", date: "2 horas atrás" },
    { id: 2, type: "Regra", description: "Revisou 'Concordância Verbal'", date: "1 dia atrás" },
    { id: 3, type: "Quiz", description: "Fez um Quiz Personalizado", date: "3 dias atrás" },
  ];

  const recommendedExercises = [
    { id: 1, title: "Identificar Frases Complexas", link: "/exercises/sentence-identification" },
    { id: 2, title: "Compreensão de Notícias Avançada", link: "/exercises/news-comprehension" },
  ];

  return (
    <PageContainer>
      {/* Header padronizado */}
      <PageHeader
        title="Bem-vindo(a)!"
        description="Continue sua jornada de aprendizado e alcance a fluência no inglês."
        icon={Home}
        iconClassName="text-primary"
      />

      {/* Grid de Estatísticas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <LearningStreakDisplay className="border" />

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 dark:from-blue-950/30 dark:to-blue-900/20 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Exercícios Concluídos
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-200 dark:bg-blue-800">
              <CheckSquare className="h-4 w-4 text-blue-700 dark:text-blue-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exercisesCompleted} / {totalExercises}</div>
            <p className="text-xs text-muted-foreground">
              {totalExercises - exercisesCompleted} exercícios restantes
            </p>
            <Progress value={learningProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 dark:from-green-950/30 dark:to-green-900/20 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Progresso Geral
            </CardTitle>
            <div className="p-2 rounded-lg bg-green-200 dark:bg-green-800">
              <TrendingUp className="h-4 w-4 text-green-700 dark:text-green-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningProgress.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              Seu avanço no PobreLingo
            </p>
            <Progress value={learningProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Card de Currículo/Jornada */}
      <div className="mb-8">
        <CurriculumProgressCard />
      </div>

      {/* Conquistas */}
      <div className="mb-8">
        <AchievementsCard />
      </div>

      {/* Seções Adicionais */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Atividade Recente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <ul className="space-y-3">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="flex items-center space-x-3">
                    {activity.type === "Exercício" && <ListChecks className="h-5 w-5 text-primary" />}
                    {activity.type === "Regra" && <BookOpen className="h-5 w-5 text-primary" />}
                    {activity.type === "Quiz" && <Wand2 className="h-5 w-5 text-primary" />}
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Nenhuma atividade recente.</p>
            )}
          </CardContent>
        </Card>

        {/* Recomendações de Exercícios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Recomendações para Você
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recommendedExercises.length > 0 ? (
              <ul className="space-y-3">
                {recommendedExercises.map((exercise) => (
                  <li key={exercise.id} className="flex items-center space-x-3">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">{exercise.title}</p>
                      <Button asChild variant="link" className="p-0 h-auto text-sm">
                        <Link to={exercise.link}>Começar agora</Link>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Nenhuma recomendação no momento.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
