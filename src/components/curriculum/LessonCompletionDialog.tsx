import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { Trophy, Star, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LessonCompletionDialogProps {
  open: boolean;
  onClose: () => void;
  moduleId: string;
  lessonId: string;
  xpReward: number;
  lessonTitle: string;
}

export function LessonCompletionDialog({
  open,
  onClose,
  moduleId,
  lessonId,
  xpReward,
  lessonTitle,
}: LessonCompletionDialogProps) {
  const { completeLesson, userLevel, totalXP } = useCurriculumProgress();
  const navigate = useNavigate();
  const [leveledUp, setLeveledUp] = React.useState(false);

  useEffect(() => {
    if (open) {
      const previousLevel = Math.floor(totalXP / 100) + 1;
      completeLesson(moduleId, lessonId, xpReward);
      const newLevel = Math.floor((totalXP + xpReward) / 100) + 1;

      if (newLevel > previousLevel) {
        setLeveledUp(true);
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            {leveledUp ? '🎉 Você Subiu de Nível!' : '✨ Lição Concluída!'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {leveledUp
              ? `Parabéns! Você alcançou o nível ${userLevel}!`
              : `Você completou "${lessonTitle}" com sucesso!`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">+{xpReward}</p>
              <p className="text-sm text-muted-foreground">XP Ganhos</p>
            </div>

            {leveledUp && (
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">Nível {userLevel}</p>
                <p className="text-sm text-muted-foreground">Novo Nível</p>
              </div>
            )}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-green-900 mb-1">Continue aprendendo!</p>
                <p className="text-green-700">
                  Volte para a sua jornada de aprendizado e continue progredindo com novas lições.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Continuar Aqui
          </Button>
          <Button onClick={() => navigate('/curriculum')}>
            Ver Jornada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
