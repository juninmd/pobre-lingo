import { LearningStreakDisplay } from '@/components/streaks/LearningStreakDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Lightbulb, TrendingUp, CheckSquare, ListChecks, Wand2 } from 'lucide-react';

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
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* Seção de Boas-vindas */}
      <Card className="shadow-lg border-none bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Bem-vindo(a), {userName}!</h2>
            <p className="text-lg opacity-90">Continue sua jornada de aprendizado e alcance a fluência.</p>
          </div>
          <Award className="h-16 w-16 md:h-20 md:w-20 mt-4 md:mt-0 opacity-80" />
        </CardContent>
      </Card>

      {/* Grid de Estatísticas Principais */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LearningStreakDisplay className="shadow-md" />

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Exercícios Concluídos
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exercisesCompleted} / {totalExercises}</div>
            <p className="text-xs text-muted-foreground">
              {totalExercises - exercisesCompleted} exercícios restantes
            </p>
            <Progress value={learningProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Progresso Geral
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
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

      {/* Seções Adicionais */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Atividade Recente */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
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
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recomendações para Você</CardTitle>
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
    </div>
  );
}
