import { Heart } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function MindfulWidget() {
  return (
    <TrendWidget
      title="Mindfulness no Ensino"
      description="Reduza a ansiedade ao falar inglês com práticas de presença."
      icon={Heart}
      actionText="Acessar"
    />
  );
}
