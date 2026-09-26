import { type ReactNode, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";

interface TrendWidgetProps {
    title: string;
    description: string;
    icon: ReactNode;
    actionText?: string;
    xpReward?: number;
}

export function TrendWidget({
    title,
    description,
    icon,
    actionText = "Praticar",
    xpReward = 10
}: TrendWidgetProps) {
    const { addXp } = useGamification();
    const { notify } = useNotifications();
    const [isCompleted, setIsCompleted] = useState(false);

    const handleAction = () => {
        if (isCompleted) return;
        addXp(xpReward);
        notify({
            category: "quest",
            title: "Atividade Concluída!",
            body: `Você ganhou ${xpReward} XP explorando ${title}.`
        });
        setIsCompleted(true);
    };

    return (
        <Card className="glass-card hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{description}</p>
                <Button
                    onClick={handleAction}
                    disabled={isCompleted}
                    variant={isCompleted ? "outline" : "default"}
                    className="w-full"
                >
                    {isCompleted ? "Concluído" : actionText}
                </Button>
            </CardContent>
        </Card>
    );
}
