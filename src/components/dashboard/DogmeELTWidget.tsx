import { MessageCircle } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DogmeELTWidget() {
  return (
    <TrendWidget
      title="Dogme ELT"
      description="Foco na comunicação real sem dependência excessiva de materiais."
      icon={MessageCircle}
      actionText="Acessar"
    />
  );
}
