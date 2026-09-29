import { Search } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function InquiryBasedLearningWidget() {
  return (
    <TrendWidget
      title="Aprendizado por Investigação"
      description="Desenvolva o idioma formulando perguntas investigativas."
      icon={Search}
      actionText="Acessar"
    />
  );
}
