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

      

      {/* Botão de Ação Principal */}
      <div className="text-center pt-4">
        <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
          <Link to="/exercises/quiz-generator">Começar um Novo Exercício</Link>
        </Button>
      </div>
    </div>
  );
}
