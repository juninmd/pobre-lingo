import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanLine } from 'lucide-react';

export default function SentenceCheckerPage() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ScanLine className="mr-2" />
          Verificador de Frases
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          A funcionalidade de verificação de frases requer um back-end e não está disponível em um ambiente de hospedagem estática.
        </p>
        <p className="text-muted-foreground mt-2">
          Para usar esta funcionalidade, o back-end (Genkit) precisa ser implantado separadamente, por exemplo, usando funções serverless.
        </p>
      </CardContent>
    </Card>
  );
}