# OwnShelf

> Uma plataforma de compra e leitura de livros digitais e físicos onde os livros realmente pertencem ao usuário.

---

## Sobre o projeto

O **OwnShelf** é uma plataforma de ecommerce focada na venda de livros físicos e digitais. Diferente de muitas plataformas atuais baseadas em licenças temporárias, o objetivo do projeto é oferecer ao usuário a verdadeira posse do conteúdo adquirido.

Na plataforma, o usuário poderá:

- Comprar livros físicos
- Comprar livros digitais
- Ler livros diretamente pelo navegador
- Baixar o PDF do livro digital adquirido
- Gerenciar sua biblioteca pessoal
- Acompanhar pedidos e entregas

O sistema foi pensado utilizando uma arquitetura moderna, escalável e modular, mantendo simplicidade no desenvolvimento inicial.

---

# Tecnologias

## Front-end

- React
- Next.js
- TypeScript
- Tailwind CSS

## Back-end

- Node.js
- NestJS
- Prisma ORM
- JWT Authentication

## Banco de dados

- PostgreSQL

## Infraestrutura

- Vercel (Front-end)
- Docker (Back-end)
- AWS S3 (armazenamento de PDFs e imagens)
- Nginx

---

# Arquitetura

O projeto utiliza inicialmente uma arquitetura de **monólito modular**, permitindo evolução futura para microserviços caso necessário.

```txt
Usuário
   ↓
Frontend Next.js (Vercel)
   ↓
Backend NestJS API
   ↓
PostgreSQL
   ↓
AWS S3
```

---

# Estrutura do projeto

```txt
/apps
├── frontend
└── backend

/backend
├── src
│   ├── modules
│   │   ├── auth
│   │   ├── users
│   │   ├── books
│   │   ├── payments
│   │   ├── shipping
│   │   └── library
│   │
│   ├── common
│   ├── config
│   ├── prisma
│   └── main.ts
│
├── Dockerfile
├── package.json
└── tsconfig.json
```

---

# Funcionalidades planejadas

## Usuário

- Cadastro e login
- Biblioteca pessoal
- Histórico de compras
- Download de PDFs
- Leitura online
- Favoritos

## Livros

- Catálogo
- Busca por nome/categoria/autor
- Avaliações
- Estoque de livros físicos
- Upload de PDFs

## Pagamentos

- PIX
- Cartão de crédito
- Confirmação automática
- Histórico de transações

## Entregas

- Endereços
- Rastreamento
- Cálculo de frete
- Integração com transportadoras

---

# Segurança

O sistema foi planejado considerando proteção dos arquivos digitais:

- Autenticação JWT
- Rotas protegidas
- URLs temporárias para download
- Controle de acesso aos PDFs
- Hash de senhas com bcrypt

---

# Armazenamento de arquivos

Os arquivos digitais não serão armazenados diretamente no banco de dados.

Estrutura planejada:

```txt
Usuário → Backend → AWS S3 → PDF
```

---

# Deploy

## Front-end

O front-end será hospedado na Vercel, aproveitando a integração nativa com Next.js:

- Deploy automático via GitHub
- HTTPS automático
- CDN global
- Preview deployments

## Back-end

O back-end será containerizado utilizando Docker.

Estrutura inicial planejada:

```yaml
services:
  backend:
  postgres:
```

---

# Objetivos do projeto

- Criar uma experiência moderna para compra de livros
- Garantir posse real dos livros digitais
- Oferecer leitura online e download
- Construir uma arquitetura escalável

---

# Status do projeto

Em desenvolvimento.

