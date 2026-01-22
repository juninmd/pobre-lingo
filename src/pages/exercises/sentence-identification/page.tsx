import { CorrectSentenceIdentification } from '@/components/exercises/CorrectSentenceIdentification';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { CheckSquare } from 'lucide-react';

export default function SentenceIdentificationPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Identificar Frases Corretas"
        description="Selecione as frases que estão gramaticalmente corretas."
        icon={CheckSquare}
        iconClassName="text-green-500"
        backLink="/"
        backLabel="Voltar ao Início"
      >
        <Badge variant="secondary">
          Marque todas as opções corretas
        </Badge>
      </PageHeader>

      <CorrectSentenceIdentification />
    </PageContainer>
  );
}
