<h1 align="center">
  FinTrack
</h1>

## Sobre o Projeto

FinTrack é uma aplicação web de gestão financeira pessoal desenvolvida com React e Vite. O sistema permite aos usuários criar contas, fazer login de forma segura e gerenciar suas finanças pessoais. A aplicação implementa autenticação completa com refresh tokens, validação de formulários com Zod, e uma interface moderna construída com Tailwind CSS e componentes do shadcn/ui.

O projeto utiliza React Query para gerenciamento de estado assíncrono, React Router para navegação, e Axios para comunicação com APIs REST. A arquitetura prioriza boas práticas de desenvolvimento com ESLint, Prettier, Husky para git hooks, e validação automática de mensagens de commit.

---

## Funcionalidades

- **Autenticação Completa** - Sistema de login e registro com JWT tokens e refresh token automático
- **Validação de Formulários** - Validação robusta usando React Hook Form e Zod schemas
- **Gerenciamento de Estado** - Cache inteligente e sincronização de dados com TanStack Query
- **Interface Moderna** - UI responsiva com Tailwind CSS e componentes reutilizáveis do shadcn/ui
- **Proteção de Rotas** - Navegação protegida com redirecionamento automático baseado em autenticação
- **Feedback Visual** - Notificações toast para ações do usuário
- **Code Quality** - Linting, formatting e commit hooks configurados

---

## Tecnologias

### Frontend
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para interfaces de usuário
- **[Vite](https://vitejs.dev/)** - Build tool moderna e rápida
- **[React Router](https://reactrouter.com/)** - Roteamento declarativo para React
- **[TanStack Query](https://tanstack.com/query/)** - Gerenciamento de estado assíncrono e cache
- **[React Hook Form](https://react-hook-form.com/)** - Validação performática de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI acessíveis e customizáveis
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[Axios](https://axios-http.com/)** - Cliente HTTP com interceptors

### DevOps & Ferramentas
- **[ESLint](https://eslint.org/)** - Linting e análise estática de código
- **[Prettier](https://prettier.io/)** - Formatação automática de código
- **[Husky](https://typicode.github.io/husky/)** - Git hooks para automação
- **[lint-staged](https://github.com/lint-staged/lint-staged)** - Lint apenas em arquivos staged
- **[git-commit-msg-linter](https://github.com/legend80s/git-commit-msg-linter)** - Validação de mensagens de commit

---

## Estrutura do Projeto

```
fintrack/
├── src/
│   ├── assets/           # Recursos estáticos (fontes, imagens)
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── ui/          # Componentes base do shadcn/ui
│   │   └── password-input.jsx
│   ├── contexts/        # Context API (AuthContext)
│   ├── constants/       # Constantes da aplicação
│   ├── lib/            # Utilitários e configurações (axios, utils)
│   ├── pages/          # Páginas da aplicação (home, login, signup)
│   ├── App.jsx         # Componente raiz
│   ├── main.jsx        # Entry point da aplicação
│   └── index.css       # Estilos globais
└── public/             # Arquivos públicos estáticos
```

---

## English Version

### About

FinTrack is a personal finance management web application built with React and Vite. The system allows users to create accounts, login securely, and manage their personal finances. The application implements complete authentication with refresh tokens, form validation with Zod, and a modern interface built with Tailwind CSS and shadcn/ui components.

The project uses React Query for asynchronous state management, React Router for navigation, and Axios for REST API communication. The architecture prioritizes development best practices with ESLint, Prettier, Husky for git hooks, and automatic commit message validation.

### Features

- Complete authentication system with JWT and automatic token refresh
- Robust form validation using React Hook Form and Zod schemas
- Intelligent caching and data synchronization with TanStack Query
- Responsive UI with Tailwind CSS and reusable shadcn/ui components
- Protected routes with automatic redirect based on authentication
- Toast notifications for user feedback
- Code quality tools with linting, formatting, and commit hooks

### Tech Stack

**Frontend:** React 19, Vite, React Router, TanStack Query, React Hook Form, Zod, Tailwind CSS, shadcn/ui, Lucide React, Axios

**DevOps:** ESLint, Prettier, Husky, lint-staged, git-commit-msg-linter
