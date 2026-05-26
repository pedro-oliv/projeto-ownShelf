# OwnShelf

Uma plataforma de compra e leitura de livros digitais e físicos onde os livros realmente pertencem ao usuário.

---

# Sobre o projeto

O OwnShelf é uma plataforma de ecommerce focada na venda de livros físicos e digitais.

Diferente de muitas plataformas atuais baseadas em licenças temporárias e DRM restritivo, o objetivo do projeto é oferecer ao usuário a verdadeira posse do conteúdo adquirido.

Na plataforma, o usuário poderá:

* Comprar livros físicos
* Comprar livros digitais
* Ler livros diretamente pelo navegador
* Baixar o PDF do livro digital adquirido
* Gerenciar sua biblioteca pessoal
* Acompanhar pedidos e entregas

O sistema foi planejado utilizando uma arquitetura moderna baseada em microserviços, permitindo escalabilidade, modularidade e separação clara de responsabilidades.

---

# Tecnologias

## Front-end

* React
* Next.js
* TypeScript
* Tailwind CSS
* Axios
* react-pdf
* pdf.js

---

## Back-end

* Node.js
* NestJS
* TypeScript
* Prisma ORM
* JWT Authentication
* bcrypt
* RabbitMQ
* dotenv

---

## Banco de dados

* PostgreSQL
* Neon

---

## Infraestrutura

* Vercel (Front-end)
* Railway (Microserviços)
* Docker
* Docker Compose
* Nginx
* AWS S3
* GitHub Actions

---

# Arquitetura

O projeto utiliza arquitetura baseada em microserviços.

Cada serviço possui responsabilidade isolada e comunicação desacoplada através de eventos utilizando RabbitMQ.

```txt
Usuário
   ↓
Frontend Next.js (Vercel)
   ↓
API Gateway / Nginx
   ↓
Microserviços NestJS
   ├── User Service
   ├── Book Service
   ├── Transaction Service
   └── Delivery Service
   ↓
RabbitMQ
   ↓
PostgreSQL (Neon)
   ↓
AWS S3
```

---

# Serviços

## User Service

Responsável por:

* Cadastro
* Login
* Autenticação JWT
* Gerenciamento de usuários

---

## Book Service

Responsável por:

* Catálogo de livros
* Biblioteca do usuário
* Upload de PDFs
* Upload de capas
* Leitura online
* Download de PDFs
* Watermark personalizada

---

## Transaction Service

Responsável por:

* Checkout
* Transações
* Pagamentos simulados
* Histórico de compras
* Aprovação/rejeição de pagamentos

---

## Delivery Service

Responsável por:

* Entregas
* Rastreamento
* Atualização de status
* Endereços

---

# Estrutura do projeto

```txt
/
├── front-end
│   └── ownshelf-front
│
├── back-end
│   ├── api-gateway
│   ├── user-service
│   ├── book-service
│   ├── transaction-service
│   └── delivery-service
│
├── .github
│   └── workflows
├── docker-compose
├── LICENSE
└── README.md
```

---

# Fluxo de compra

```txt
Usuário compra livro
↓
Transaction Service cria transação
↓
Pagamento aprovado
↓
RabbitMQ publica evento
↓
Book Service libera acesso
↓
Delivery Service cria entrega
↓
Usuário recebe livro na biblioteca
```

---

# Biblioteca do usuário

A biblioteca do usuário armazenará:

* Livros digitais adquiridos
* Livros físicos adquiridos
* Histórico de compras
* Informações de entrega

Para livros digitais:

* Leitura online
* Download permanente
* Acesso offline

Para livros físicos:

* Rastreamento
* Histórico de entrega

---

# PDFs e arquivos

Os PDFs e imagens não serão armazenados diretamente no banco de dados.

Estrutura planejada:

```txt
Usuário
↓
Book Service
↓
AWS S3
↓
PDF / Imagem
```

---

# Segurança dos PDFs

Os livros digitais utilizarão:

* Signed URLs temporárias
* Controle de acesso por compra
* Watermark personalizada

A ideia do projeto é oferecer posse real do arquivo digital sem utilizar DRM invasivo.

Exemplo de watermark:

```txt
Comprado legalmente por:
usuario@email.com
```

---

# Comunicação entre serviços

Os serviços se comunicarão utilizando RabbitMQ.

Exemplos de eventos:

```txt
payment.approved
book.purchased
delivery.created
pdf.unlocked
```

---

# Banco de dados

Cada microserviço possui seu próprio domínio e responsabilidade.

Exemplos:

## User Service

* users

## Book Service

* books
* library

## Transaction Service

* transactions
* transaction_items

## Delivery Service

* deliveries

---

# Deploy

## Front-end

O front-end será hospedado na Vercel.

Recursos:

* Deploy automático via GitHub
* HTTPS automático
* CDN global
* Preview deployments

---

## Back-end

Os microserviços serão hospedados na Railway utilizando Docker.

Estrutura inicial:

```txt
Docker Compose
├── api-gateway
├── user-service
├── book-service
├── transaction-service
├── delivery-service
├── rabbitmq
└── nginx
```

---

## Banco de dados

O PostgreSQL será hospedado utilizando Neon.

---

## Arquivos

PDFs e imagens serão armazenados no AWS S3.

---

# Testes

## Front-end

* Vitest
* React Testing Library

## Back-end

* Jest

---

# CI/CD

O projeto utilizará GitHub Actions para:

* Build automático
* Execução de testes
* Lint
* Deploy automatizado

---

# Status do projeto

Em desenvolvimento.

