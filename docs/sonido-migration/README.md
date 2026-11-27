# Troca das primitivas locais pelo Sonido

O app mantinha cópias shadcn das mesmas peças que o
[`@juninmd/sonido`](https://github.com/juninmd/sonido) publica. Esta pasta guarda a
comparação lado a lado usada na revisão: o lado **Antes** importa cópias literais de
`origin/master` em `legacy/`; o **Depois** importa os arquivos do app já apoiados no
Sonido 2.4.0.

## Componentes trocados

| Componente        | Antes (pobre-lingo)                                                  | Depois (`@juninmd/sonido`)                                                        | Arquivos                                                                                   |
| ----------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `Button`          | `cva` local: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `gamified`; `asChild` e `href` | `Button` com `variant`/`size`/`appearance`, `press` e `loading`; adaptador mantém `asChild`, `href`, `type="button"` e `gamified` | `src/components/ui/button.tsx`                                                             |
| `Badge`           | `<div>` com `variant`: `default`, `secondary`, `destructive`, `outline` | `Badge` (tone/appearance); adaptador aceita `variant` antigo, `tone`, `appearance="count"`, `dot` e `live` | `src/components/ui/badge.tsx`, `src/components/notifications/NotificationCenter.tsx`       |
| `Card`            | `<div class="rounded-lg border bg-card …">`                           | `Card surface="solid" padding="none"`; cabeçalho/corpo/rodapé seguem wrappers de layout do app | `src/components/ui/card.tsx`                                                               |
| `Progress`        | Radix Progress, `value` 0–100, `indicatorColor`, `aria-label`         | `ProgressBar` (0–1, `label` obrigatório); adaptador converte faixa/altura e mantém `indicatorColor` | `src/components/ui/progress.tsx`                                                           |
| `EmptyState`      | `<div>` central com ícone + `p` + `p` no Caderninho vazio              | `EmptyState` com ícone, título e descrição                                        | `src/pages/NotebookPage.tsx`                                                               |

O `Button` cobre as 118 importações do app; `Card` cobre 82 e `Badge` 33. O adaptador
de `Progress` mantém a API antiga (`max`, `value` em 0–100, `indicatorColor`) para não
mexer nas 27 telas que o usam, e as barras continuam com `role="progressbar"` e
`aria-valuenow`.

## Tema e tokens

- `@juninmd/sonido/styles.css` é importado **uma vez** em `src/globals.css`, dentro da
  camada `sonido`: `utils` continuam vencendo o design system, e o Sonido vence os
  componentes antigos do app.
- `data-theme` no `<html>` agora é a pele do Sonido: `light` → `light`,
  `dark` e `pobre-lingo` → `canto`. A identidade do app saiu de
  `[data-theme="pobre-lingo"]` para a classe `.pobre-lingo` (o `ThemeProvider` e o
  `public/boot.js` aplicam `dark` + `pobre-lingo`).
- `src/styles/sonido-bridge.css` mapeia os tokens `--sn-*` para os tokens do app
  (`--primary`, `--card`, `--border`, `--radius`, fontes) e recria a variante
  `gamified` em ouro. O gradiente de ação do Sonido nasce da dupla
  `--primary`/`--accent` do app, então a marca não troca de cor.

## Capturas

`preview.html` + `preview.tsx` montam a mesma página com os dois lados, usando o CSS
real do app (`src/globals.css`) e o `styles.css` instalado do Sonido.

```bash
corepack pnpm exec vite --config docs/sonido-migration/vite.config.mts
# http://localhost:5311/preview.html          (tema esmeralda)
# http://localhost:5311/preview.html?theme=light
node C:/caminho/para/full.cjs "http://localhost:5311/preview.html" "docs/sonido-migration/antes-depois.png"
```

As capturas `antes-depois.png` e `antes-depois-claro.png` foram feitas em Chromium
1180×900, `fullPage`, device scale 2, com dados fictícios.

## Verificação

```text
corepack pnpm install                → OK (pnpm 8.14.3, lockfile v6.0; sonido 2.4.0)
corepack pnpm lint                   → exit 0 (79 warnings pré-existentes)
corepack pnpm exec tsc --noEmit      → exit 0
corepack pnpm test:run               → 234 arquivos, 1000 testes, todos passando
corepack pnpm build                  → exit 0
```

O `pnpm` global desta máquina é 12.x, que bloquearia o 2.4.0 recém-publicado por
`minimumReleaseAge` e reescreveria o lockfile para v9 — o CI usa o `packageManager`
(pnpm 8.14.3) e `pnpm install --frozen-lockfile`. Por isso o install foi feito com
`corepack pnpm` (o pnpm fixado no repositório); nenhum `minimumReleaseAgeExclude` foi
necessário porque o pnpm 8 não tem esse bloqueio.

O `pnpm lint` também falhava antes da migração neste checkout: o `core.autocrlf`
entrega CRLF e o Biome espera LF. Depois de normalizar o working tree, sobraram 21
arquivos com formatação/ordem de imports fora do padrão (nenhuma mudança de lógica);
eles foram corrigidos em um commit separado para o `pnpm lint` ficar verde.

## O que ficou de fora

- `Tabs`: o app usa Radix Tabs com `TabsContent`/`aria-controls`; o `Tabs` do Sonido é
  um tablist controlado e não tem item desabilitado. Trocar exigiria refazer as telas
  que dependem dos painéis.
- `Dialog`, `Toast`, `TextField`/`SearchField`: o app tem Fluxos próprios (Radix,
  toaster e campos com validação); ficam para uma segunda passagem.
- `Skeleton`: o Sonido publica um bloco de linhas fixas; o app usa placeholders com
  altura/largura arbitrárias (`h-10 w-full`), então a peça continua local.
- `SidebarMenuBadge` e os chips internos do sidebar: o posicionamento é do sidebar e
  não há ganho visual claro.
