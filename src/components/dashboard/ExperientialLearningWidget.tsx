import { Compass } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function ExperientialLearningWidget() {
  return (
    <TrendWidget
      title="Aprendizado Experiencial"
      description="Aprenda fazendo e refletindo sobre suas experiências."
      icon={Compass}
      actionText="Acessar"
    />
  );
}
