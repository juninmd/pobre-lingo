"use client";

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarkedRules } from '@/hooks/useBookmarkedRules';
import { useToast } from '@/hooks/use-toast';

interface BookmarkButtonProps {
  ruleId: string;
  size?: "sm" | "default" | "lg" | "icon";
}

export function BookmarkButton({ ruleId, size = "icon" }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarkedRules();
  const { toast } = useToast();
  const bookmarked = isBookmarked(ruleId);

  const handleToggleBookmark = () => {
    toggleBookmark(ruleId);
    toast({
      title: bookmarked ? "Removido dos Favoritos" : "Adicionado aos Favoritos",
      description: bookmarked ? "A regra foi removida da sua lista." : "A regra foi adicionada à sua lista.",
    });
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleToggleBookmark}
      aria-label={bookmarked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className="text-accent hover:text-accent/80"
    >
      {bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
      {size !== "icon" && <span className="ml-2">{bookmarked ? "Favoritado" : "Favoritar"}</span>}
    </Button>
  );
}
