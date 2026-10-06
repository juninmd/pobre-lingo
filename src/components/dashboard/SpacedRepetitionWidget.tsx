import { CalendarClock } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function SpacedRepetitionWidget() {
  return (
    <TrendWidget
      title="Repetição Espaçada"
      description="Fixe vocabulário revisando no momento exato antes de esquecer."
      icon={CalendarClock}
      actionText="Acessar"
    />
  );
}
