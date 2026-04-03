import { BookOpen, Target, Trophy, Globe, Headphones, Mic, Star } from 'lucide-react';

export const lessonTypeConfig = {
  grammar: { label: 'Gramática', icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  vocabulary: { label: 'Vocabulário', icon: Star, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  exercise: { label: 'Exercício', icon: Target, color: 'text-green-600', bgColor: 'bg-green-100' },
  reading: { label: 'Leitura', icon: BookOpen, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
  quiz: { label: 'Quiz', icon: Trophy, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  culture: { label: 'Cultura', icon: Globe, color: 'text-teal-600', bgColor: 'bg-teal-100' },
  listening: { label: 'Escuta', icon: Headphones, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  speaking: { label: 'Fala', icon: Mic, color: 'text-rose-600', bgColor: 'bg-rose-100' },
};
