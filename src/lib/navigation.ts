import {
  Map,
  Gamepad2,
  BookOpen,
  BookA,
  ListChecks,
  CheckSquare,
  SearchX,
  FileText,
  GraduationCap,
  Compass
} from 'lucide-react';

export const navigationConfig = {
  desktop: [
    {
      title: 'Principal',
      items: [
        { href: '/', label: 'Minha Jornada', icon: Map },
        { href: '/arcade', label: 'Arcade', icon: Gamepad2, badge: 'Fun' },
      ]
    },
    {
      title: 'Referência',
      items: [
        { href: '/rules', label: 'Regras', icon: BookOpen },
        { href: '/dictionary', label: 'Dicionário', icon: BookA },
      ]
    },
    {
      title: 'Exercícios',
      items: [
        { href: '/exercises/sentence-ordering', label: 'Ordenar Frases', icon: ListChecks },
        { href: '/exercises/sentence-identification', label: 'Identificar Frases', icon: CheckSquare },
        { href: '/exercises/find-incorrect-words', label: 'Encontrar Erros', icon: SearchX },
        { href: '/exercises/news-comprehension', label: 'Interpretação', icon: FileText },
      ]
    },
    {
      title: 'Status',
      items: [
        { href: '/proficiency', label: 'Teste de Nível', icon: GraduationCap },
      ]
    },
  ],
  mobile: [
    { href: '/', label: 'Jornada', icon: Compass },
    { href: '/arcade', label: 'Jogos', icon: Gamepad2 },
    { href: '/rules', label: 'Regras', icon: BookOpen },
    { href: '/proficiency', label: 'Nível', icon: GraduationCap },
  ]
};
