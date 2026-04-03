import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CompletedCurriculumCard() {
  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-yellow-100">
            <Trophy className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Parabéns! 🎉</CardTitle>
            <CardDescription>Você completou toda a jornada!</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Continue praticando para manter suas habilidades afiadas.
        </p>
        <div className="flex gap-2">
          <Link to="/exercises/sentence-ordering">
            <Button variant="outline">Praticar Exercícios</Button>
          </Link>
          <Link to="/rules">
            <Button variant="outline">Revisar Gramática</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
