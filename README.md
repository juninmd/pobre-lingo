# PobreLingo

PobreLingo é uma aplicação web dedicada ao aprendizado e aprimoramento da língua portuguesa, oferecendo diversas ferramentas e exercícios interativos para auxiliar o usuário em sua jornada de aprendizado.

## Funcionalidades Principais

A aplicação PobreLingo oferece as seguintes funcionalidades:

- **Início**: Página inicial com um resumo do progresso e informações relevantes.
- **Regras Gramaticais**: Uma seção dedicada a regras gramaticais detalhadas, organizadas por categorias e regras específicas.
- **Glossário**: Um glossário de termos e definições importantes.
- **Dicionário**: Uma ferramenta para pesquisar e entender o significado de palavras.
- **Verificador de Frases**: Ajuda a verificar a correção gramatical de frases.
- **Quiz Personalizado**: Gere quizzes personalizados para testar seus conhecimentos.
- **Exercícios Interativos**:
    - **Ordenar Frases**: Exercícios para praticar a ordem correta das palavras em frases.
    - **Identificar Frases**: Ajuda a identificar tipos de frases ou erros.
    - **Procurar Palavras Erradas**: Exercícios para encontrar palavras incorretas em um texto.
    - **Interpretação de Artigos**: Exercícios de compreensão de texto baseados em artigos de notícias.
- **Meu Progresso**: Acompanhe seu desempenho e progresso ao longo do tempo, incluindo sua sequência de aprendizado.

## Tecnologias Utilizadas

O PobreLingo é construído com as seguintes tecnologias:

- **Frontend**:
    - React (com Vite para desenvolvimento rápido)
    - TypeScript
    - Tailwind CSS (para estilização)
    - Radix UI (componentes de UI acessíveis)
    - Lucide React (ícones)
    - React Router DOM (para roteamento)
    - Recharts (para gráficos de progresso)
- **Backend/Serviços**:
    - Firebase (para hospedagem e possivelmente outros serviços como autenticação, banco de dados, etc.)
- **Gerenciamento de Pacotes**:
    - pnpm

## Como Rodar o Projeto

Para configurar e executar o PobreLingo localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Node.js (versão 18 ou superior) e o pnpm instalados em sua máquina.

### Instalação

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd pobre-lingo
   ```
2. Instale as dependências usando pnpm:
   ```bash
   pnpm install
   ```

### Executando em Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta disponível).

### Construindo para Produção

Para construir a aplicação para produção:

```bash
pnpm build
```

Os arquivos de produção serão gerados na pasta `dist`.

### Visualizando a Build de Produção

Para visualizar a build de produção localmente:

```bash
pnpm preview
```

## Estrutura de Pastas

Uma visão geral da estrutura de pastas do projeto:

```
.
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes React reutilizáveis (UI, exercícios, etc.)
│   ├── contexts/           # Contextos React (ex: ThemeContext)
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Funções utilitárias, dados (dicionário, regras, exercícios)
│   ├── pages/              # Páginas da aplicação (rotas principais e sub-rotas)
│   ├── globals.css         # Estilos globais
│   ├── Layout.tsx          # Componente de layout principal
│   ├── main.tsx            # Ponto de entrada da aplicação
│   └── Router.tsx          # Configuração de roteamento
├── apphosting.yaml         # Configuração de hospedagem (Firebase App Hosting)
├── package.json            # Dependências e scripts do projeto
├── pnpm-lock.yaml          # Lockfile do pnpm
├── postcss.config.mjs      # Configuração do PostCSS
├── tailwind.config.ts      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
├── vite.config.ts          # Configuração do Vite
└── README.md               # Este arquivo
```

## Créditos

Desenvolvido com a ajuda do Firebase Studio da Google.
