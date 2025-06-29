import { LearningStreakDisplay } from '@/components/streaks/LearningStreakDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProgressPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Meu Progresso</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LearningStreakDisplay />
        {/* Adicione outros componentes de progresso aqui, se houver */}
        <Card>
          <CardHeader>
            <CardTitle>Exercícios Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">Nenhum exercício concluído ainda.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
