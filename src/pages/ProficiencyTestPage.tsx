import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { proficiencyQuestions, ProficiencyQuestion } from '@/lib/proficiencyQuestions';
import { CheckCircle2, AlertCircle, RefreshCw, Trophy, ArrowRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AchievementsList } from '@/components/gamification/AchievementsList';
import { useGamification } from '@/contexts/GamificationContext';

export default function ProficiencyTestPage() {
  const { level: userLevelNum, xp, streak, gems } = useGamification();
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState('');

  const totalQuestions = proficiencyQuestions.length;
  const currentQuestion = proficiencyQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let correctCount = 0;
    proficiencyQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);

    // Determine level
    let userLevel = 'Básico';
    if (correctCount > 70) {
      userLevel = 'Avançado';
    } else if (correctCount > 30) {
      userLevel = 'Intermediário';
    }
    setLevel(userLevel);
    setShowResult(true);
  };

  if (!started) {
    return (
      <PageContainer>
        <div className="max-w-2xl mx-auto space-y-8">

          {/* Profile Header */}
          <div className="flex items-center gap-4 bg-card p-6 rounded-xl border shadow-sm">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Aprendiz PobreLingo</h2>
              <p className="text-muted-foreground">Nível {userLevelNum}</p>
              <div className="flex gap-4 mt-2 text-sm font-medium">
                <div className="flex items-center gap-1 text-yellow-600">
                  <Trophy className="w-4 h-4" /> {xp} XP
                </div>
                <div className="flex items-center gap-1 text-orange-600">
                  <span className="w-4 h-4 flex items-center justify-center font-bold">🔥</span> {streak} dias
                </div>
              </div>
            </div>
          </div>

          <AchievementsList />

          <Card className="text-center p-8">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                <Trophy className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Teste de Proficiência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Faça este teste para avaliar seu nível real de inglês (Básico, Intermediário ou Avançado).
              </p>
              <div className="flex justify-center gap-8 text-sm font-medium text-muted-foreground">
                <div className="flex flex-col items-center">
                  <span className="text-foreground text-lg">100</span>
                  <span>Questões</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-foreground text-lg">~15min</span>
                  <span>Duração</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center pt-4">
              <Button size="lg" onClick={handleStart} className="w-full sm:w-auto px-8">
                Começar Teste
              </Button>
            </CardFooter>
          </Card>
        </div>
      </PageContainer>
    );
  }

  if (showResult) {
    return (
      <PageContainer>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="text-center p-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">Seu Nível: {level}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative pt-4 pb-2">
                <div className="text-5xl font-bold mb-2">{score}<span className="text-2xl text-muted-foreground">/100</span></div>
                <p className="text-muted-foreground">Questões corretas</p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-left max-w-sm mx-auto bg-background p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Básico</span>
                  <span className="text-sm text-muted-foreground">0-30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Intermediário</span>
                  <span className="text-sm text-muted-foreground">31-70</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Avançado</span>
                  <span className="text-sm text-muted-foreground">71-100</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center gap-4 pt-4">
              <Button variant="outline" onClick={handleStart}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refazer Teste
              </Button>
              <Button asChild>
                <a href="/">Ir para o Curso</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">Teste de Proficiência</h1>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            <span>Questão {currentQuestionIndex + 1} de {totalQuestions}</span>
            <span>{Math.round(progress)}% Concluído</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="min-h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className={cn(
                  "flex items-center space-x-2 border rounded-lg p-4 transition-colors hover:bg-accent cursor-pointer",
                  answers[currentQuestion.id] === option ? "border-primary bg-primary/5" : "border-border"
                )}>
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-normal text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="border-t p-6 flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              size="lg"
              className="w-full sm:w-auto"
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Finalizar' : 'Próxima'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
}
