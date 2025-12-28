# 🎨 Guia de Customização do Sistema de Currículo

Este guia mostra como personalizar e estender o sistema de currículo do PobreLingo.

## 📝 Estrutura de Dados

### Módulo (Module)

```typescript
{
  id: string;                    // ID único (ex: 'foundations')
  title_pt: string;              // Título em português
  title_en: string;              // Título em inglês
  description_pt: string;        // Descrição do módulo
  difficulty: DifficultyLevel;   // 'basico' | 'intermediario' | 'avancado'
  icon: string;                  // Nome do ícone Lucide (ex: 'Rocket')
  color: string;                 // Classe Tailwind (ex: 'bg-blue-500')
  order: number;                 // Ordem de exibição
  prerequisites?: string[];      // IDs dos módulos pré-requisitos
  lessons: Lesson[];             // Array de lições
}
```

### Lição (Lesson)

```typescript
{
  id: string;                    // ID único (ex: 'present-simple-intro')
  title_pt: string;              // Título em português
  title_en: string;              // Título em inglês
  description_pt: string;        // Descrição da lição
  type: ModuleType;              // 'grammar' | 'vocabulary' | 'exercise' | 'reading' | 'quiz'
  estimatedMinutes: number;      // Tempo estimado em minutos
  xpReward: number;              // XP ganho ao completar
  order: number;                 // Ordem dentro do módulo

  // Campos opcionais
  grammarRuleIds?: string[];     // IDs de regras em grammarRules.ts
  exerciseType?: string;         // Tipo de exercício ('sentence-ordering', etc.)
  vocabularyTopics?: string[];   // Tópicos de vocabulário
}
```

## 🎨 Personalizando Cores

### Cores por Nível de Dificuldade

Edite em `src/pages/curriculum/page.tsx`:

```typescript
const difficultyConfig = {
  basico: {
    label: 'Básico',
    color: 'bg-green-500',      // Fundo
    textColor: 'text-green-600', // Texto
    borderColor: 'border-green-500', // Borda
  },
  // ... outros níveis
};
```

### Cores dos Módulos

Escolha qualquer cor do Tailwind:

```typescript
{
  color: 'bg-blue-500',    // Azul
  color: 'bg-purple-500',  // Roxo
  color: 'bg-pink-500',    // Rosa
  color: 'bg-cyan-500',    // Ciano
  // ... etc
}
```

### Gradientes Personalizados

Para cards especiais:

```typescript
className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
className="bg-gradient-to-br from-yellow-50 to-orange-50"
```

## 🎯 Personalizando XP e Recompensas

### Definir XP por Tipo de Lição

Recomendações:

```typescript
{
  type: 'vocabulary',
  xpReward: 50-75,       // Vocabulário básico
}
{
  type: 'grammar',
  xpReward: 100-150,     // Gramática importante
}
{
  type: 'exercise',
  xpReward: 100-200,     // Exercícios práticos
}
{
  type: 'reading',
  xpReward: 150-200,     // Leitura e compreensão
}
{
  type: 'quiz',
  xpReward: 150-500,     // Quiz de avaliação
}
```

### Ajustar Níveis

Edite `useCurriculumProgress.ts`:

```typescript
// Alterar XP necessário por nível
const calculateLevel = (xp: number) => {
  return Math.floor(xp / 100) + 1;  // 100 XP por nível (padrão)
  // return Math.floor(xp / 150) + 1;  // 150 XP por nível (mais difícil)
  // return Math.floor(xp / 50) + 1;   // 50 XP por nível (mais fácil)
};
```

## 🏆 Personalizando Conquistas

Edite `src/components/curriculum/AchievementsCard.tsx`:

```typescript
const achievements: Achievement[] = [
  {
    id: 'minha-conquista',           // ID único
    title: 'Título da Conquista',   // Nome
    description: 'Descrição...',     // Descrição
    icon: <Star className="h-6 w-6" />, // Ícone Lucide
    unlocked: progress.completedLessons > 5, // Condição
    color: 'text-yellow-600',        // Cor do ícone
  },
];
```

### Exemplos de Condições

```typescript
// Por número de lições
unlocked: progress.completedLessons >= 10

// Por número de módulos
unlocked: progress.completedModules >= 3

// Por nível do usuário
unlocked: userLevel >= 5

// Por XP total
unlocked: totalXP >= 500

// Por porcentagem de progresso
unlocked: progress.overallPercentage >= 75

// Combinação de condições
unlocked: userLevel >= 10 && progress.completedModules >= 5
```

## 📱 Personalizando Layout

### Timeline de Módulos

Ajuste espaçamento em `src/pages/curriculum/page.tsx`:

```typescript
<div className="space-y-8">  {/* Espaço entre módulos */}
  {filteredModules.map((module, moduleIndex) => (
    // ...
  ))}
</div>
```

### Cards de Lição

```typescript
<div className="space-y-3">  {/* Espaço entre lições */}
  {module.lessons.map((lesson) => (
    <div className="p-4">  {/* Padding interno */}
      {/* ... */}
    </div>
  ))}
</div>
```

### Responsividade

```typescript
// Grid responsivo
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

// Esconder em mobile
<div className="hidden md:block">

// Mostrar apenas em mobile
<div className="md:hidden">

// Tamanho de texto responsivo
<h1 className="text-xl md:text-2xl lg:text-3xl">
```

## 🎨 Ícones Personalizados

### Ícones Lucide Recomendados

```typescript
// Para módulos
import {
  Rocket,      // Início/Fundamentos
  MessageCircle, // Conversação
  Clock,       // Tempos verbais
  Award,       // Perfeitos
  GitBranch,   // Condicionais
  Repeat,      // Voz passiva
  Brain,       // Gramática avançada
  Sparkles,    // Expressões
  BookOpen,    // Leitura
  Target,      // Exercícios
  Trophy,      // Quiz
  Star,        // Vocabulário
} from 'lucide-react';
```

### Adicionar Novos Ícones

1. Importe o ícone:
```typescript
import { Smile } from 'lucide-react';
```

2. Use no módulo:
```typescript
{
  icon: 'Smile',
  // ...
}
```

## 🔄 Personalizando Mensagens

### Mensagens Motivacionais

Edite em `src/pages/curriculum/page.tsx`:

```typescript
{overallProgress.overallPercentage === 100 ? (
  <Card className="...">
    <CardHeader>
      <CardTitle>
        🎉 Sua mensagem personalizada aqui!
      </CardTitle>
    </CardHeader>
  </Card>
) : (
  // Outras mensagens...
)}
```

### Dialog de Conclusão

Edite `src/components/curriculum/LessonCompletionDialog.tsx`:

```typescript
<DialogTitle className="text-center text-2xl">
  {leveledUp
    ? '🎉 Mensagem personalizada de level up!'
    : '✨ Mensagem personalizada de conclusão!'
  }
</DialogTitle>
```

## 📊 Personalizando Estatísticas

### Card de Progresso

Edite `src/components/curriculum/CurriculumProgressCard.tsx`:

```typescript
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {/* Adicione novas estatísticas */}
  <div>
    <p className="text-sm text-muted-foreground">Sua Stat</p>
    <p className="text-2xl font-bold">{seuValor}</p>
  </div>
</div>
```

### Métricas Personalizadas

```typescript
// Tempo total estudado
const totalMinutes = modules.reduce(
  (sum, m) => sum + m.lessons.reduce(
    (s, l) => s + (isCompleted(l) ? l.estimatedMinutes : 0), 0
  ), 0
);

// Média de XP por lição
const avgXP = totalXP / completedLessons.length;

// Módulos desbloqueados
const unlockedCount = modules.filter(m => isUnlocked(m)).length;
```

## 🎯 Pré-requisitos Customizados

### Simples (um módulo)

```typescript
{
  prerequisites: ['foundations'],
}
```

### Múltiplos módulos

```typescript
{
  prerequisites: ['foundations', 'daily-conversations'],
}
```

### Lógica Personalizada

Edite `useCurriculumProgress.ts`:

```typescript
const isModuleUnlocked = (module: Module) => {
  // Sempre desbloqueado
  if (module.id === 'foundations') return true;

  // Requer nível mínimo
  if (module.difficulty === 'avancado' && userLevel < 5) {
    return false;
  }

  // Lógica padrão de pré-requisitos
  return module.prerequisites?.every(prereqId => {
    // ...
  });
};
```

## 🔔 Notificações Personalizadas

### Toast de Conquista

```typescript
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

// Ao desbloquear conquista
toast({
  title: "🏆 Nova Conquista!",
  description: "Você desbloqueou 'Mestre do Inglês'",
});
```

### Alertas de Progresso

```typescript
// Ao completar módulo
toast({
  title: "✅ Módulo Completo!",
  description: `Você completou "${module.title_pt}"`,
  variant: "success",
});
```

## 💾 Persistência de Dados

### Chaves do LocalStorage

```typescript
const PROGRESS_KEY = 'pobrelingo_curriculum_progress';
const XP_KEY = 'pobrelingo_total_xp';
const LEVEL_KEY = 'pobrelingo_user_level';

// Adicionar nova chave
const CUSTOM_KEY = 'pobrelingo_custom_data';
setLocalStorageItem(CUSTOM_KEY, yourData);
```

### Exportar/Importar Progresso

```typescript
// Exportar
const exportProgress = () => {
  const data = {
    progress: getLocalStorageItem(PROGRESS_KEY, []),
    xp: getLocalStorageItem(XP_KEY, 0),
    level: getLocalStorageItem(LEVEL_KEY, 1),
  };
  return JSON.stringify(data);
};

// Importar
const importProgress = (jsonData: string) => {
  const data = JSON.parse(jsonData);
  setLocalStorageItem(PROGRESS_KEY, data.progress);
  setLocalStorageItem(XP_KEY, data.xp);
  setLocalStorageItem(LEVEL_KEY, data.level);
};
```

## 🎨 Temas Personalizados

### Modo Escuro

```typescript
// Ajustar cores para dark mode
<Card className="dark:bg-gray-800 dark:border-gray-700">
  <CardTitle className="dark:text-white">
    Título
  </CardTitle>
</Card>
```

### Tema Personalizado

```typescript
// Em globals.css
.theme-custom {
  --primary: 220 70% 50%;
  --accent: 280 60% 50%;
  /* ... outras variáveis */
}
```

## 🚀 Dicas de Performance

1. **Lazy Loading de Módulos**
```typescript
const CurriculumPage = lazy(() => import('./pages/curriculum/page'));
```

2. **Memoização**
```typescript
const filteredModules = useMemo(
  () => modules.filter(m => m.difficulty === selectedDifficulty),
  [selectedDifficulty]
);
```

3. **Debounce em Buscas**
```typescript
const debouncedSearch = useMemo(
  () => debounce((term) => setSearchTerm(term), 300),
  []
);
```

## 📚 Recursos Adicionais

- [Lucide Icons](https://lucide.dev/icons/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)

---

**Divirta-se personalizando seu currículo! 🎉**
