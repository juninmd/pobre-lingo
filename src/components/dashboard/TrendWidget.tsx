import { type LucideIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TrendWidgetProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  xpReward?: number;
}

export function TrendWidget({
  title,
  description,
  icon: Icon,
  actionText = "Explorar",
  onAction,
  xpReward = 10,
}: TrendWidgetProps) {
  const [completed, setCompleted] = useState(false);
  const { addXp } = useGamification();
  const { notify } = useNotifications();

  const handleAction = () => {
    if (completed) return;

    if (onAction) {
      onAction();
    }

    addXp(xpReward);
    notify({
      title: "Trend Explorada!",
      body: `Você ganhou ${xpReward} XP.`,
      category: "achievement",
    });
    setCompleted(true);
  };

  return (
    <Card className="glass-card hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button
          variant={completed ? "secondary" : "default"}
          className="w-full gap-2"
          onClick={handleAction}
          disabled={completed}
        >
          {completed ? (
            <>
              <Sparkles className="w-4 h-4" />
              Concluído
            </>
          ) : (
            actionText
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
