# QueroHouse

Plataforma de anúncios e gestão de imóveis. Este repositório é um monorepo com:

- API (Fastify + TypeScript + Prisma + Stripe)
- Web (Next.js 15 + React 19 + Tailwind v4 + React Query)

### Sumário
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Requisitos](#requisitos)
- [Configuração Rápida](#configuração-rápida)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Banco de Dados](#banco-de-dados)
- [Executar em Desenvolvimento](#executar-em-desenvolvimento)
- [Scripts Úteis](#scripts-úteis)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [API (visão geral)](#api-visão-geral)
- [Build e Produção](#build-e-produção)
- [Contribuição](#contribuição)
- [Licença](#licença)

### Arquitetura
- `api/`: servidor Fastify em TypeScript com autenticação, pagamentos (Stripe), propriedades e Prisma ORM.
- `web/`: aplicação Next.js (App Router) que consome a API e integra Stripe no frontend.

### Tecnologias
- API: Fastify, TypeScript, Prisma, Zod, JWT, Stripe, Pino, Swagger UI
- Web: Next.js 15, React 19, Tailwind v4, TanStack Query, Axios, Stripe.js

### Requisitos
- Node.js 20+
- PNPM, NPM ou Yarn (exemplos abaixo com NPM)
- Banco de dados PostgreSQL (recomendado em produção). Em desenvolvimento é possível usar um banco local.

### Configuração Rápida
1) Clone o repositório e instale dependências

```bash
git clone https://github.com/sua-org/querohouse.com.br.git
cd querohouse.com.br
npm --prefix api install
npm --prefix web install
```

2) Configure as variáveis de ambiente copiando os exemplos

```bash
cp api/env.example api/.env
cp web/env.local.example web/.env.local
```

3) Ajuste `DATABASE_URL` no `api/.env` para apontar ao seu Postgres (ou banco local de desenvolvimento)

```env
# Exemplo Postgres local
DATABASE_URL="postgresql://user:password@localhost:5432/querohouse?schema=public"
```

### Variáveis de Ambiente
- API (`api/.env` – ver `api/env.example`):
  - `PORT`, `HOST`, `NODE_ENV`, `LOG_LEVEL`
  - `FRONTEND_URL`, `API_URL`
  - `DATABASE_URL` (PostgreSQL em produção)
  - Autenticação social: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
  - SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
  - Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

- Web (`web/.env.local` – ver `web/env.local.example`):
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Banco de Dados
O schema Prisma está em `api/prisma/schema.prisma`.

Aplicar migrações e gerar cliente:

```bash
cd api
npm run db:generate
npm run db:migrate
```

Opcional: abrir o Prisma Studio

```bash
npm run db:studio
```

### Executar em Desenvolvimento
Em dois terminais:

Terminal 1 – API
```bash
cd api
npm run dev
```

Terminal 2 – Web
```bash
cd web
npm run dev
```

Por padrão:
- API: `http://localhost:3001`
- Web: `http://localhost:3000`

### Scripts Úteis
- API (`api/package.json`):
  - `dev`: inicia Fastify com TSX watch
  - `build`: compila TypeScript para `dist/`
  - `start`: roda a API a partir de `dist/`
  - `lint` / `lint:fix`: lint do código
  - `db:generate`, `db:migrate`, `db:studio`: comandos Prisma

- Web (`web/package.json`):
  - `dev`: Next.js em modo desenvolvimento (Turbopack)
  - `build`: build de produção
  - `start`: servidor Next.js de produção
  - `lint`: lint do projeto

### Estrutura de Pastas
```
api/
  src/
    controllers/    # controladores HTTP (auth, payments, properties)
    services/       # regras de negócio
    routes/         # rotas Fastify
    middleware/     # middlewares (ex.: auth)
    config/         # logger, database
  prisma/
    schema.prisma   # schema do banco
web/
  src/app/          # rotas App Router (Next.js)
  src/components/   # componentes UI
  src/providers/    # Providers (Auth, Query, Stripe)
  src/lib/          # utils e lib de API
```

### API (visão geral)
Rotas principais (conforme `api/src/routes/`):

- `auth`:
  - `POST /auth/login`
  - `POST /auth/register`
  - `GET /auth/me` (protegida)

- `properties`:
  - `GET /properties` – listar
  - `GET /properties/:id` – detalhar
  - `POST /properties` – criar (protegida)

- `payments` (Stripe):
  - `POST /payments/checkout`
  - `POST /payments/webhook`

Documentação interativa: Swagger UI pode estar disponível (ver configuração em `api/src/index.ts`).

### Build e Produção
API
```bash
cd api
npm run build
npm start
```

Web
```bash
cd web
npm run build
npm start
```

Recomendações de deploy:
- API: Docker ou serviço Node gerenciado; configure `DATABASE_URL`, chaves Stripe e SMTP.
- Web: Vercel ou similar; definir `NEXT_PUBLIC_API_URL` e chave publicável do Stripe.

### Contribuição
Contribuições são bem-vindas! Abra uma issue com contexto e passos para reproduzir (quando aplicável). Para PRs, mantenha o escopo focado e adicione descrição do que mudou e por quê.

### Licença
MIT. Consulte o arquivo `LICENSE`.

