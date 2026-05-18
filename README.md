# OwnShelf

> Uma plataforma de compra e leitura de livros digitais e físicos onde os livros realmente pertencem ao usuário.

---

# Sobre o projeto

O **OwnShelf** é uma plataforma de ecommerce focada na venda de livros físicos e digitais. Diferente de muitas plataformas atuais baseadas em licenças temporárias, o objetivo do projeto é oferecer ao usuário a verdadeira posse do conteúdo adquirido.

Na plataforma, o usuário poderá:

- Comprar livros físicos
- Comprar livros digitais
- Ler livros diretamente pelo navegador
- Baixar o PDF do livro digital adquirido
- Gerenciar sua biblioteca pessoal
- Acompanhar pedidos e entregas

O sistema foi projetado utilizando uma arquitetura baseada em microserviços, permitindo escalabilidade, separação de responsabilidades e maior flexibilidade para evolução futura da plataforma.

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
- Redis
- RabbitMQ

---

# Arquitetura

O projeto utiliza arquitetura baseada em microserviços.

Cada serviço possui sua própria responsabilidade dentro do sistema:

- Conta Service
- Livro Service
- Pagamento Service
- Entrega Service

Arquitetura geral:

```txt
Usuário
   ↓
Frontend Next.js (Vercel)
   ↓
API Gateway
   ↓
------------------------------------------------
|               |               |              |
Conta Service   Livro Service   Pagamento      Entrega
                                  Service       Service
------------------------------------------------
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
│
├── api-gateway
│
├── conta-service
│
├── livro-service
│
├── pagamento-service
│
├── entrega-service
│
└── notification-service

/packages
├── shared
├── types
├── config
└── utils
```

---

# Serviços

## Conta Service

Responsável por:

- Cadastro de usuários
- Login
- Autenticação JWT
- Biblioteca pessoal
- Histórico de compras
- Gerenciamento de contas

---

## Livro Service

Responsável por:

- Catálogo de livros
- Upload de PDFs
- Controle de estoque
- Busca de livros
- Categorias
- Leitura online
- Gerenciamento dos arquivos digitais

---

## Pagamento Service

Responsável por:

- Checkout
- Processamento de pagamentos
- PIX
- Cartão de crédito
- Confirmação de pagamento
- Histórico de transações

---

## Entrega Service

Responsável por:

- Endereços
- Rastreamento
- Cálculo de frete
- Integração com transportadoras

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
- Comunicação segura entre serviços

---

# Armazenamento de arquivos

Os arquivos digitais não serão armazenados diretamente no banco de dados.

Estrutura planejada:

```txt
Usuário → Livro Service → AWS S3 → PDF
```

---

# Comunicação entre serviços

Inicialmente, os serviços se comunicarão via HTTP REST APIs.

No futuro, a plataforma poderá utilizar filas e mensageria para comunicação assíncrona:

- RabbitMQ
- Redis Queues

Exemplo:

```txt
Pagamento aprovado
        ↓
Pagamento Service
        ↓
RabbitMQ
        ↓
Livro Service libera PDF
        ↓
Conta Service atualiza biblioteca
```

---

# Deploy

## Front-end

O front-end será hospedado na Vercel, aproveitando a integração nativa com Next.js:

- Deploy automático via GitHub
- HTTPS automático
- CDN global
- Preview deployments

---

## Back-end

Cada microserviço será containerizado utilizando Docker.

Estrutura inicial planejada:

```yaml
services:
  api-gateway:
  
  conta-service:

  livro-service:

  pagamento-service:

  entrega-service:

  postgres:

  redis:

  rabbitmq:
```

---

# Objetivos do projeto

- Criar uma experiência moderna para compra de livros
- Garantir posse real dos livros digitais
- Oferecer leitura online e download
- Construir uma arquitetura escalável
- Separar responsabilidades utilizando microserviços
- Facilitar evolução futura da plataforma

---

# Status do projeto

Em desenvolvimento.
