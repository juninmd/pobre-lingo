import { type ReactNode, useState } from "react";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";

interface TrendWidgetProps {
    title: string;
    description: string;
    icon: ReactNode;
    xpReward?: number;
    actionText?: string;
    content?: ReactNode;
}

export function TrendWidget({ title, description, icon, xpReward = 10, actionText = "Praticar", content }: TrendWidgetProps) {
    const { addXp } = useGamification();
    const { notify } = useNotifications();
    const [completed, setCompleted] = useState(false);

    const handleAction = () => {
        if (!completed) {
            addXp(xpReward);
            notify({
                title: "Prática Concluída!",
                body: `Você ganhou ${xpReward} XP.`,

                category: "achievement"
            });
            setCompleted(true);
        }
    };

    return (
        <div className="flex h-full flex-col items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring glass-card">
            <div className="flex items-center gap-3 w-full">
                <span className="rounded-lg bg-primary/10 p-2 text-primary">
                    {icon}
                </span>
                <div className="min-w-0 flex-1">
                    <span className="block font-semibold text-foreground">
                        {title}
                    </span>
                    <span className="block text-sm text-muted-foreground line-clamp-2">
                        {description}
                    </span>
                </div>
            </div>
            {content && <div className="w-full text-sm mt-2">{content}</div>}
            <button
                onClick={handleAction}
                disabled={completed}
                className="mt-auto w-full rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
                {completed ? "Concluído" : actionText}
            </button>
        </div>
    );
}
