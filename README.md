<div align="center">

<img src="public/favicon.svg" width="96" alt="PobreLingo" />

# PobreLingo

### Inglês do zero ao C2 — grátis, em português, direto no navegador.

<p>
  <img alt="React 19" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=for-the-badge" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white&style=for-the-badge" />
  <img alt="Vite 8" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=for-the-badge" />
  <img alt="Tailwind 4" src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge" />
</p>
<p>
  <img alt="PWA" src="https://img.shields.io/badge/PWA-offline--ready-8B5CF6?style=flat-square" />
  <img alt="CEFR" src="https://img.shields.io/badge/CEFR-A1%E2%86%92C2-2DD4BF?style=flat-square" />
  <img alt="E2E" src="https://img.shields.io/badge/Playwright-170%20e2e-45BA4B?logo=playwright&logoColor=white&style=flat-square" />
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-50%20unit-6E9F18?logo=vitest&logoColor=white&style=flat-square" />
  <img alt="Custo" src="https://img.shields.io/badge/pre%C3%A7o-R%24%200-F5B301?style=flat-square" />
</p>

<img src="docs/screenshots/home.png" width="860" alt="Painel Minha Jornada" />

</div>

---

## 💡 Por que existe

Aprender inglês não deveria custar uma assinatura. O **PobreLingo** é um app de estudo completo, feito para quem **nunca viu gramática**: explicações em português, exemplos traduzidos, áudio em cada frase e uma trilha clara do **A1 ao C2** — sem paywall, sem anúncio, sem login obrigatório.

O desenho pedagógico segue evidência, não moda:

| Princípio | Onde aparece no app |
|---|---|
| **As 4 vertentes de Nation** — input, output, fluência e foco na forma | Leitura, Escrita, Fluência e Regras |
| **CEFR / can-do** | Trilha da Fluência e Checkpoints por nível |
| **Repetição espaçada (SRS)** | Revisar e Cofre de Vocabulário |
| **Carga cognitiva baixa** | Design system Aurora: tokens consistentes, chunking, hierarquia |
| **Gamificação integrada** | XP, streak, PobreCoins, missões diárias e conquistas |

---

## ✨ O que tem dentro

<table>
<tr>
<td width="50%" valign="top">

### 🗺️ Trilha da Fluência
15 capítulos mapeados em **A1 → C2**, com progresso por nível, marcador “Onde parei” e teste de nivelamento.

### 📚 Gramática para leigos
**57 regras em 16 categorias** — do verbo TO BE à voz passiva — com estrutura, exemplos traduzidos, áudio e erros comuns.

### 📖 Leitura & Escuta
Textos graduados A1–C1 com TTS sincronizado, play contínuo e tradução por linha.

</td>
<td width="50%" valign="top">

### 🧠 Vocabulário
Frequência 1k–5k, metas por nível e “palavras que já sei” persistidas.

### ✍️ Escrita & 🗣️ Fluência
Ditado com diff palavra a palavra, redação com feedback, técnica **4/3/2** cronometrada e *shadowing*.

### 🏁 Checkpoints
Checklist can-do + prova por nível: passou, libera o próximo.

</td>
</tr>
</table>

### 🎮 Arcade

Oito jogos para fixar sem perceber: **Bubble Pop · Speed Match · Memory Match · Word Scramble · Flashcards · Word Search · Sentence Rush · Hangman** — mais sete tipos de exercício (listening, conversação, ordenar frases, pares, notícias, achar o erro, identificar frases).

---

## 📸 Telas

<div align="center">

| Leitura extensiva | Tempos verbais |
|:---:|:---:|
| <img src="docs/screenshots/reading.png" width="420" /> | <img src="docs/screenshots/rules-tenses.png" width="420" /> |
| **Arcade** | **Cofre de Vocabulário** |
| <img src="docs/screenshots/arcade.png" width="420" /> | <img src="docs/screenshots/vocabulary-vault.png" width="420" /> |
| **Fluência 4/3/2** | **Checkpoints** |
| <img src="docs/screenshots/fluency.png" width="420" /> | <img src="docs/screenshots/checkpoints.png" width="420" /> |

<img src="docs/screenshots/mobile-home.png" width="240" alt="Versão mobile" />

<sub>Mobile-first de verdade: auditado sem overflow horizontal em 38 rotas.</sub>

</div>

---

## 🚀 Rodando localmente

> Requer **Node.js 20.19+** (exigência do Vite 8).

```bash
git clone git@github.com:juninmd/pobre-lingo.git
cd pobre-lingo
pnpm install          # ou: npm install
pnpm dev              # http://localhost:5173
```

| Comando | O que faz |
|---|---|
| `pnpm dev` | servidor de desenvolvimento com HMR |
| `pnpm build` | `tsc` + build de produção em `dist/` |
| `pnpm preview` | serve o build localmente |
| `pnpm lint` | Biome em `src/` |
| `pnpm test:run` | testes unitários (Vitest) |
| `npx playwright test` | suíte E2E completa, desktop + mobile |

---

## 🏗️ Arquitetura

```text
src/
├── pages/        # uma rota = uma página (lazy)
├── components/   # UI por feature + primitives shadcn/Radix
├── hooks/        # usePersistentState, useKnownWords, useCanDo…
├── contexts/     # tema, progresso, gamificação
├── lib/          # conteúdo e lógica pura
│   ├── curriculumData.ts      # capítulos → módulos → lições
│   ├── grammar*.ts            # 57 regras em 16 categorias
│   ├── gradedReaders*.ts      # leitores graduados A1–C1
│   ├── coreVocabulary*.ts     # listas de frequência
│   ├── srs.ts · levels.ts     # repetição espaçada e níveis CEFR
│   └── tts.ts                 # Web Speech API
└── Router.tsx    # 37 rotas
tests-e2e/        # Playwright: auditoria de todas as telas + fluxos
```

- **100% client-side**: progresso em `localStorage`, áudio via Web Speech API — nada de servidor para estudar.
- **Conteúdo como dados**: adicionar uma regra, leitura ou lição é editar um arquivo em `src/lib/` (veja [`docs/curriculum-system.md`](docs/curriculum-system.md)).
- **Arquivos pequenos**: limite de 150 linhas por arquivo, separação de responsabilidades por feature.

### 🎨 Design system “Aurora”

Obsidian ink + violeta + aqua + ouro solar, tipografia **Sora** (títulos) + **Inter** (texto), três temas, tudo via tokens em `globals.css` e `tailwind.config.ts`.

---

## 🧪 Qualidade

- **170 testes E2E** — auditoria de 38 rotas em desktop **e** mobile (erro de JS, overflow horizontal, print de cada tela) + fluxos de estudo.
- **50 testes unitários** — SRS, proficiência, lógica dos jogos.
- **Integridade de conteúdo** — toda lição de gramática precisa resolver uma regra existente; o teste falha se um link quebrar.

---

## 🛣️ Roadmap

Veja [`ROADMAP.md`](ROADMAP.md). Próximos passos: condicionais separados (zero → third), exercícios dedicados por regra, mais leitores graduados e correção de escrita com IA.

## 🤝 Contribuindo

1. Crie uma branch a partir de `master`.
2. Mantenha arquivos com até 150 linhas e use os tokens do design system.
3. Rode `pnpm lint`, `pnpm build`, `pnpm test:run` e `npx playwright test` antes do PR.

<div align="center">

---

<sub>Feito com ☕ para quem quer aprender inglês sem gastar nada.</sub>

</div>
