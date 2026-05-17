## NestJS + TypeORM Starter

Template base para iniciar novos projetos com NestJS + TypeORM, com estrutura modular por camadas:

- `domain`
- `application`
- `infrastructure`
- `presentation`

O projeto já inclui um `module-example` funcional com CRUD para servir de referência.

## 1. Instalação

```bash
npm install
```

## 2. Configuração de ambiente

Crie seu `.env` a partir do exemplo:

```bash
cp .env.example .env
```

## 3. Rodar em desenvolvimento

```bash
npm run start:dev
```

## 4. Banco de dados

Por padrão, o projeto usa PostgreSQL via TypeORM (`autoLoadEntities: true`).

Variáveis usadas:

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

Se quiser subir a API sem banco, configure:

```env
DB_ENABLED=false
```

## 5. Endpoints de exemplo

Com banco habilitado:

- `POST /examples`
- `GET /examples`
- `GET /examples/:id`
- `PATCH /examples/:id`
- `DELETE /examples/:id`

## 6. Testes

```bash
npm run test
npm run test:e2e
npm run test:integration
```

Nos testes (`NODE_ENV=test`), a conexão com banco é desabilitada automaticamente.
Nos testes de integração, um PostgreSQL é iniciado via Testcontainers (Docker necessário).
