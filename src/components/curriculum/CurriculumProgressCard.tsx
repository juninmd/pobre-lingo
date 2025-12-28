import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { curriculumData } from '@/lib/curriculumData';
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Star,
  TrendingUp,
  Clock,
  Award,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

export function CurriculumProgressCard() {
  const { isModuleUnlocked, getModuleProgress, getOverallProgress, totalXP, userLevel } = useCurriculumProgress();
  const overallProgress = getOverallProgress();

  // Encontrar o próximo módulo não completo
  const nextModule = curriculumData.modules.find(module => {
    const progress = getModuleProgress(module.id);
    return isModuleUnlocked(module) && progress.completionPercentage < 100;
  });

  // Módulos por dificuldade
  const basicModules = curriculumData.modules.filter(m => m.difficulty === 'basico');
  const intermediateModules = curriculumData.modules.filter(m => m.difficulty === 'intermediario');
  const advancedModules = curriculumData.modules.filter(m => m.difficulty === 'avancado');

  const basicCompleted = basicModules.filter(m => getModuleProgress(m.id).completionPercentage === 100).length;
  const intermediateCompleted = intermediateModules.filter(m => getModuleProgress(m.id).completionPercentage === 100).length;
  const advancedCompleted = advancedModules.filter(m => getModuleProgress(m.id).completionPercentage === 100).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sua Jornada de Aprendizado</CardTitle>
            <CardDescription>
              Progresso estruturado do básico ao avançado
            </CardDescription>
          </div>
          <Link to="/curriculum">
            <Button variant="outline" size="sm">
              Ver Tudo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Nível</p>
            <p className="text-2xl font-bold flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-600" />
              {userLevel}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">XP Total</p>
            <p className="text-2xl font-bold">{totalXP}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Progresso</p>
            <p className="text-2xl font-bold">{overallProgress.overallPercentage}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Módulos</p>
            <p className="text-2xl font-bold">
              {overallProgress.completedModules}/{overallProgress.totalModules}
            </p>
          </div>
        </div>

        {/* Barra de Progresso Geral */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progresso Geral</span>
            <span className="text-sm text-muted-foreground">
              {overallProgress.completedLessons} de {overallProgress.totalLessons} lições
            </span>
          </div>
          <Progress value={overallProgress.overallPercentage} className="h-3" />
        </div>

        {/* Progresso por Nível */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Progresso por Nível</h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm">Básico</span>
              </div>
              <span className="text-sm font-medium">
                {basicCompleted}/{basicModules.length}
              </span>
            </div>
            <Progress
              value={(basicCompleted / basicModules.length) * 100}
              className="h-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-sm">Intermediário</span>
              </div>
              <span className="text-sm font-medium">
                {intermediateCompleted}/{intermediateModules.length}
              </span>
            </div>
            <Progress
              value={(intermediateCompleted / intermediateModules.length) * 100}
              className="h-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm">Avançado</span>
              </div>
              <span className="text-sm font-medium">
                {advancedCompleted}/{advancedModules.length}
              </span>
            </div>
            <Progress
              value={(advancedCompleted / advancedModules.length) * 100}
              className="h-2"
            />
          </div>
        </div>

        {/* Próximo Módulo */}
        {nextModule && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                nextModule.color,
                "text-white"
              )}>
                {React.createElement(
                  (LucideIcons as any)[nextModule.icon] || Award,
                  { className: "h-5 w-5" }
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">Continue Aprendendo</h4>
                  <Badge variant="outline" className="text-xs">
                    {nextModule.difficulty === 'basico' ? 'Básico' :
                     nextModule.difficulty === 'intermediario' ? 'Intermediário' : 'Avançado'}
                  </Badge>
                </div>
                <p className="text-sm mb-2">{nextModule.title_pt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {getModuleProgress(nextModule.id).lessonsCompleted}/{getModuleProgress(nextModule.id).totalLessons} lições
                  </span>
                </div>
                <Link to="/curriculum">
                  <Button size="sm" className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Continuar Módulo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem de Motivação */}
        {overallProgress.completedLessons === 0 && (
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">Comece Sua Jornada!</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Aprenda inglês do básico ao avançado com um currículo estruturado
            </p>
            <Link to="/curriculum">
              <Button size="sm" className="w-full">
                Iniciar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
