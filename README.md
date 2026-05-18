# NestJS + TypeORM Template

Template para iniciar APIs com NestJS e TypeORM usando uma estrutura pronta para escalar com consistência.

## Objetivo

Este repositório é um ponto de partida para novos projetos backend com:

- arquitetura em camadas por módulo
- integração com PostgreSQL via TypeORM
- padrão de validação com `class-validator`
- testes unitários e de integração com banco real (Testcontainers)
- pipeline de Pull Request no GitHub Actions

## Stack

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Jest
- Testcontainers

## Estrutura

- `src/common`: recursos compartilhados (utils, DTOs, config de banco)
- `src/modules`: módulos de negócio
- `src/modules/module-example`: módulo de referência com CRUD completo

Camadas do módulo de exemplo:

- `domain`
- `application`
- `infrastructure`
- `presentation`

## Configuração de ambiente

```bash
cp .env.example .env
```

Variáveis de banco:

- `DB_ENABLED`
- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_SYNCHRONIZE`
- `DB_LOGGING`
- `DB_RETRY_ATTEMPTS`
- `DB_RETRY_DELAY`

Para subir sem banco:

```env
DB_ENABLED=false
```

## Execução

Instalar dependências:

```bash
npm install
```

Desenvolvimento:

```bash
npm run start:dev
```

Rodar com Docker:

```bash
cp .env.example .env
docker compose up --build
```

No Docker, a API usa `DB_DOCKER_HOST` para conectar no serviço `postgres` da rede do Compose. Fora do Docker, use `DB_HOST`.

Parar containers:

```bash
docker compose down
```

Remover também o volume do PostgreSQL:

```bash
docker compose down -v
```

Build e produção:

```bash
npm run build
npm run start:prod
```

## Testes

- `npm test`: roda unit + integration
- `npm run test:unit`: roda somente unitários
- `npm run test:integration`: roda integração com Testcontainers
- `npm run test:e2e`: suíte e2e separada

Pré-requisito para integração:

- Docker instalado e em execução

## CI (Pull Request)

Workflow: `.github/workflows/pull-request.yml`

Executa em PR para `main` (exceto draft):

1. `quality`
- instala dependências
- lint
- build
- testes unitários

2. `integration-tests`
- valida Docker no runner
- executa testes de integração com Testcontainers

## Endpoints de exemplo

- `POST /examples`
- `GET /examples`
- `GET /examples/:id`
- `PATCH /examples/:id`
- `DELETE /examples/:id`

## Como usar como base

1. Clone este template.
2. Renomeie/remova o `module-example`.
3. Crie seus módulos mantendo o mesmo padrão de camadas.
4. Ajuste `.env` e regras de negócio.
5. Expanda a cobertura de testes.
