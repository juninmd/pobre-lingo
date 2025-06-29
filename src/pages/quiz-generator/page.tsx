import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

export default function QuizGeneratorPage() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="mr-2" />
          Quiz Personalizado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          A funcionalidade de geração de quiz personalizado requer um back-end e não está disponível em um ambiente de hospedagem estática.
        </p>
        <p className="text-muted-foreground mt-2">
          Para usar esta funcionalidade, o back-end (Genkit) precisa ser implantado separadamente, por exemplo, usando funções serverless.
        </p>
      </CardContent>
    </Card>
  );
}