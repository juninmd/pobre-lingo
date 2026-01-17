import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { Trophy, Star, Target, Flame, Award, Zap, Crown, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  color: string;
}

export function AchievementsCard() {
  const { overallProgress, totalXP, userLevel } = useCurriculumProgress();
  const progress = overallProgress;

  const achievements: Achievement[] = [
    {
      id: 'first-lesson',
      title: 'Primeira Lição',
      description: 'Complete sua primeira lição',
      icon: <Star className="h-6 w-6" />,
      unlocked: progress.completedLessons > 0,
      color: 'text-yellow-600',
    },
    {
      id: 'beginner',
      title: 'Iniciante',
      description: 'Complete o primeiro módulo',
      icon: <Target className="h-6 w-6" />,
      unlocked: progress.completedModules > 0,
      color: 'text-green-600',
    },
    {
      id: 'dedicated',
      title: 'Dedicado',
      description: 'Alcance o nível 5',
      icon: <Flame className="h-6 w-6" />,
      unlocked: userLevel >= 5,
      color: 'text-orange-600',
    },
    {
      id: 'advanced',
      title: 'Avançado',
      description: 'Complete 50% do currículo',
      icon: <Award className="h-6 w-6" />,
      unlocked: progress.overallPercentage >= 50,
      color: 'text-blue-600',
    },
    {
      id: 'expert',
      title: 'Expert',
      description: 'Alcance o nível 10',
      icon: <Zap className="h-6 w-6" />,
      unlocked: userLevel >= 10,
      color: 'text-purple-600',
    },
    {
      id: 'master',
      title: 'Mestre',
      description: 'Complete todo o currículo',
      icon: <Crown className="h-6 w-6" />,
      unlocked: progress.overallPercentage === 100,
      color: 'text-yellow-700',
    },
    {
      id: 'xp-500',
      title: 'Colecionador de XP',
      description: 'Ganhe 500 XP',
      icon: <Medal className="h-6 w-6" />,
      unlocked: totalXP >= 500,
      color: 'text-cyan-600',
    },
    {
      id: 'xp-1000',
      title: 'Lenda do XP',
      description: 'Ganhe 1000 XP',
      icon: <Trophy className="h-6 w-6" />,
      unlocked: totalXP >= 1000,
      color: 'text-red-600',
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conquistas</CardTitle>
        <CardDescription>
          {unlockedCount} de {achievements.length} conquistas desbloqueadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "relative p-4 rounded-lg border-2 transition-all",
                achievement.unlocked
                  ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700 shadow-md"
                  : "bg-gray-50 dark:bg-muted/20 border-gray-200 dark:border-border opacity-60"
              )}
            >
              <div className="text-center">
                <div className={cn(
                  "mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2",
                  achievement.unlocked ? "bg-white dark:bg-card shadow-sm" : "bg-gray-100 dark:bg-muted"
                )}>
                  <div className={achievement.unlocked ? achievement.color : "text-gray-400"}>
                    {achievement.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && (
                  <Badge variant="outline" className="mt-2 text-xs">
                    <Trophy className="h-3 w-3 mr-1" />
                    Desbloqueada
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
