# Diretrizes e Boas Práticas do PobreLingo 🇧🇷

Este documento serve como guia de arquitetura, convenções e boas práticas para o desenvolvimento do projeto **PobreLingo**.

## 1. Visão Geral e Arquitetura

O projeto é uma aplicação **React** (Single Page Application) construída com **Vite** e **TypeScript**. A estilização utiliza **Tailwind CSS** e **Shadcn/UI**.

### Estrutura de Diretórios

*   `src/lib/`: Contém lógica de negócios, dados estáticos (currículo, dicionário) e utilitários.
    *   `curriculumData.ts`: Define a estrutura de unidades, módulos e lições.
    *   `exerciseData.ts`: Contém o conteúdo dos exercícios.
    *   `utils.ts`: Funções auxiliares gerais (e.g., `cn` para Tailwind).
*   `src/components/`: Componentes React reutilizáveis.
    *   `ui/`: Componentes base do Shadcn (Button, Card, etc.).
    *   `exercises/`: Componentes específicos para cada tipo de exercício (Listening, Sentence Ordering, etc.).
    *   `common/`: Layouts e wrappers comuns (`PageContainer`, `PageHeader`).
*   `src/pages/`: Páginas da aplicação, organizadas por rota.
*   `src/contexts/`: Gerenciamento de estado global (Gamification, Auth - se houver).

## 2. Gerenciamento de Estado e Performance

### Render-Time Updates
Para evitar "flickering" e problemas com `useEffect` em cascata (especialmente no Strict Mode), preferimos atualizar estados derivados durante a renderização quando possível, ou usar `useMemo` para objetos complexos.

### Memoização
O currículo e dados estáticos grandes devem ser memoizados.
```typescript
// Exemplo em src/pages/curriculum/page.tsx
const stats = React.useMemo(() => getCurriculumStats(curriculumData), []);
```
Isso previne recálculos desnecessários a cada renderização, já que `curriculumData` é estático.

### Listas Grandes
Para listas longas (como o Dicionário), utilize paginação ou "infinite scroll" virtualizado para não travar a DOM.
*   Carregue itens em blocos (chunks).
*   Use `IntersectionObserver` para carregar mais itens ao rolar.

## 3. Estilização e UI (Tailwind CSS)

### Dark Mode
Todo componente deve suportar modo escuro. Use o modificador `dark:` do Tailwind.
*   Texto: `text-foreground` (automático) ou `text-slate-900 dark:text-slate-100`.
*   Fundo: `bg-background` ou `bg-white dark:bg-zinc-950`.

### Mobile-First e Safe Areas
O aplicativo é usado em mobile (PWA).
*   **Safe Area:** Use a classe utilitária `.pb-safe` (definida em `globals.css`) para garantir que o conteúdo não fique escondido atrás da barra de navegação do iPhone (`env(safe-area-inset-bottom)`).
*   **Navegação:** Em mobile, a navegação é inferior (`MobileNav`). Em desktop, é lateral (`Sidebar`). O layout deve se adaptar automaticamente (`hidden md:flex`, etc.).
*   **Padding:** Certifique-se de que a última seção da página tenha `pb-24` ou similar em mobile para não ficar atrás da `MobileNav` fixa.

## 4. Convenções de Código

### TypeScript
*   Sempre defina interfaces para as props dos componentes.
*   Evite `any`. Use tipos estritos para dados de exercícios (`ListeningPhrase`, `MatchingPair`).

### Componentes
*   Prefira componentes funcionais pequenos.
*   Componentes de página (`src/pages/*`) devem focar em buscar dados e passar para componentes de apresentação (`src/components/*`).

### Acessibilidade (a11y)
*   Use tags semânticas (`<main>`, `<header>`, `<nav>`).
*   Botões que são apenas ícones devem ter `aria-label`.
*   Cores devem ter contraste suficiente (verifique com ferramentas do Chrome DevTools).

## 5. Peculiaridades do Projeto

### Conteúdo "Hardcoded" vs Dinâmico
Embora o conteúdo seja estático (`.ts` files), ele é estruturado como um banco de dados relacional (IDs ligando Lições -> Exercícios).
*   Ao adicionar uma nova lição em `curriculumData.ts`, certifique-se de criar o exercício correspondente em `exerciseData.ts` ou garantir que o tipo de exercício (e.g., `listening`) tenha conteúdo genérico suficiente para não quebrar.

### Gamificação
O contexto `GamificationContext` gerencia vidas, XP e ofensiva.
*   **Vidas Infinitas:** Atualmente, a lógica de perder vidas pode estar visualmente ativa, mas o bloqueio de jogar pode estar desabilitado para facilitar testes. Mantenha isso em mente ao ajustar a dificuldade.

### Armazenamento Local
Use `src/lib/localStorage.ts` para interagir com o `localStorage`. Isso evita erros durante SSR (se migrarmos para Next.js no futuro) e encapsula tratamento de erros de JSON.

---
*Gerado por Gemini para a equipe de engenharia do PobreLingo.*
