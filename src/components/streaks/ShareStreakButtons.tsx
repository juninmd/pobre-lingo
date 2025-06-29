"use client";

import { Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareStreakButtonsProps {
  streak: number;
}

export function ShareStreakButtons({ streak }: ShareStreakButtonsProps) {
  const { toast } = useToast();
  const message = `Estou numa sequência incrível de ${streak} ${streak === 1 ? 'dia' : 'dias'} no PobreLingo! 🚀📚 #PobreLingo #AprendendoIngles`;

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message)
      .then(() => {
        toast({
          title: "Copiado!",
          description: "Mensagem copiada para a área de transferência. Cole no Instagram!",
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Erro",
          description: "Não foi possível copiar a mensagem.",
          variant: "destructive",
        });
      });
  };

  if (streak === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-md font-semibold text-foreground mb-2">Compartilhe sua conquista!</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleShareWhatsApp} variant="outline" className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white">
          <Share2 className="mr-2 h-4 w-4" /> WhatsApp
        </Button>
        <Button onClick={handleCopyToClipboard} variant="outline" className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white">
          <Copy className="mr-2 h-4 w-4" /> Copiar para Instagram
        </Button>
      </div>
    </div>
  );
}
