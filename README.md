# NestJS + TypeORM Template

Template de API para acelerar o bootstrap de novos projetos com **NestJS + TypeORM + PostgreSQL**.

## Objetivo

Este repositório existe para servir como ponto de partida padronizado, com:

- Estrutura modular por camadas.
- Configuração de banco pronta para desenvolvimento.
- Exemplo funcional de módulo com CRUD.
- Base de testes unitários e de integração com banco real via Testcontainers.
- Convenções de organização e imports para escalar o código com consistência.

## Stack

- Node.js + TypeScript
- NestJS
- TypeORM
- PostgreSQL
- Jest
- Testcontainers

## Estrutura do Projeto

Organização principal em `src`:

- `common`: utilitários e componentes compartilhados.
- `modules`: módulos de negócio.
- `config`: espaço para configurações globais futuras.

Módulo de exemplo (`module-example`) seguindo camadas:

- `application`: DTOs de aplicação e casos de uso.
- `domain`: entidades, contratos e regras de domínio.
- `infrastructure`: implementação de persistência (TypeORM).
- `presentation`: controllers e DTOs HTTP.
- `tests`: testes unitários e integração do módulo.

## Configuração de Ambiente

Crie seu arquivo `.env`:

```bash
cp .env.example .env
```

Variáveis usadas pela conexão TypeORM:

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

Se quiser subir a API sem banco local:

```env
DB_ENABLED=false
```

## Como Executar

Instalar dependências:

```bash
npm install
```

Rodar em desenvolvimento:

```bash
npm run start:dev
```

Build de produção:

```bash
npm run build
npm run start:prod
```

## Endpoints de Exemplo

Com a API no ar:

- `POST /examples`
- `GET /examples`
- `GET /examples/:id`
- `PATCH /examples/:id`
- `DELETE /examples/:id`

## Testes

Comandos principais:

- `npm test`: roda **unit + integration**.
- `npm run test:unit`: roda apenas unitários.
- `npm run test:integration`: roda integração com PostgreSQL em container.
- `npm run test:e2e`: suíte e2e separada.

### Testes de Integração com Testcontainers

Os testes de integração iniciam um PostgreSQL real em container Docker.

Pré-requisitos:

- Docker instalado.
- Docker daemon em execução.

## Convenções do Template

- Imports internos via alias `src/...`.
- Validação com `class-validator` nos DTOs.
- `ValidationPipe` global com `whitelist` e `forbidNonWhitelisted`.
- Sem conversão implícita global de tipos na validação.

## Como Usar Este Repositório como Base

Fluxo recomendado para novos projetos:

1. Faça um clone deste template.
2. Renomeie o módulo de exemplo para o contexto do domínio real.
3. Substitua casos de uso, entidade e controller do exemplo.
4. Ajuste `.env` para o ambiente do projeto.
5. Expanda os testes mantendo a mesma estratégia de unit + integration.
