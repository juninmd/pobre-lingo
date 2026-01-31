
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tips = [
  {
    title: "Consistência é a chave",
    content: "É melhor estudar 15 minutos todos os dias do que 2 horas uma vez por semana."
  },
  {
    title: "Pense em inglês",
    content: "Tente nomear objetos ao seu redor em inglês mentalmente para reforçar o vocabulário."
  },
  {
    title: "Mude seus dispositivos",
    content: "Altere o idioma do seu celular e computador para inglês. Você aprenderá muito passivamente!"
  },
  {
    title: "Errar faz parte",
    content: "Não tenha medo de cometer erros. Eles são essenciais para o aprendizado. Fale, mesmo errado!"
  },
  {
    title: "Shadowing",
    content: "Tente repetir exatamente o que você ouve em filmes ou músicas, imitando a entonação."
  },
  {
    title: "False Friends",
    content: "Cuidado com 'Pretend' (fingir) e 'Intend' (pretender). São falsos cognatos!"
  }
];

export function DailyTipCard() {
  const [tip] = useState(() => {
    // Pick a tip based on the day of the year so it's consistent for the day
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const tipIndex = dayOfYear % tips.length;
    return tips[tipIndex];
  });
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2">
        <Button variant="ghost" size="icon" className="h-6 w-6 text-amber-700/50 hover:text-amber-700" onClick={() => setIsVisible(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader className="pb-2 flex flex-row items-center gap-2 space-y-0">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        <CardTitle className="text-base font-medium text-amber-800 dark:text-amber-200">
          Dica do Dia: {tip.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-amber-900/80 dark:text-amber-100/80">
          {tip.content}
        </p>
      </CardContent>
    </Card>
  );
}
