import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface QuizViewProps {
  lesson: any;
  onComplete: () => void;
  isCompleted: boolean;
}

export function QuizView({ lesson, onComplete, isCompleted }: QuizViewProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-10">
      <div className="mb-8">
        <div className="bg-yellow-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-600" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lesson.title_pt}</h2>
        <p className="text-muted-foreground text-lg">{lesson.description_pt}</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Quiz de Avaliação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>Este quiz irá testar os conhecimentos adquiridos neste módulo.</p>
            {isCompleted && (
                <div className="flex justify-center">
                    <Badge className="bg-green-500">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Aprovado
                    </Badge>
                </div>
            )}

            <div className="pt-4">
                <Button size="lg" onClick={onComplete} className="w-full">
                    {isCompleted ? 'Refazer Quiz (Simulado)' : 'Iniciar Quiz (Simulado)'}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                    *Para esta demonstração, clicar em iniciar concluirá a lição automaticamente.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
