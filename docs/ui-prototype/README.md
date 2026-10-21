# Protótipo de melhorias de UI

Protótipo navegável (Claude Design canvas) de uma nova interface para "Minha Jornada". Não altera o app: serve de referência para a implementação em `src/`.

Link do canvas (privado): https://claude.ai/artifact/GWaPfHWPSHDfQhWnTQ2fM4

## Telas

| Arquivo | Conteúdo |
|---------|----------|
| `Main.dc.html` | Minha Jornada, desktop (sidebar completa, header, saudação, estatísticas, widgets, abas de prática) |
| `Mobile.dc.html` | Minha Jornada, mobile |
| `Menu.dc.html` | Gaveta de navegação mobile |
| `Lesson.dc.html` | Exercício de múltipla escolha, mobile |
| `Sistema.dc.html` | Pesquisa global, notificações, onboarding, offline, PWA, assistente, sincronização |
| `Pobrelingo.dc.html` | Componente do mascote (mesma arte de `src/components/mascot`) |
| `canvas.json` | Índice e posição das telas no canvas |

## Decisões

- Um foco por tela: "Onde parei" e "Plano de hoje" vêm antes dos widgets; nenhuma funcionalidade foi removida.
- Tema por variáveis (`light`, `dark`, `pobre-lingo`), com contraste AA e alvos de toque de 44px.
- Dados (XP, moedas, sequência, palavras) e alguns textos (notificações, instalação, sincronização) são de exemplo.
- Os arquivos `.dc.html` são fonte do canvas, não código do app; o limite de 150 linhas de `AGENTS.md` vale para `src/`.
