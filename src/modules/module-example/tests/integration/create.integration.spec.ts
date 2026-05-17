import request from 'supertest';
import { App } from 'supertest/types';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleExampleModule } from 'src/modules/module-example/module-example.module';
import { PostgresTestContainer } from 'src/modules/module-example/tests/integration/support/postgres-test-container';

jest.setTimeout(120000);

const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

describe('ModuleExample integration (Testcontainers)', () => {
  let app: INestApplication<App>;
  const postgresContainer = new PostgresTestContainer();

  beforeAll(async () => {
    await postgresContainer.start();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST ?? 'localhost',
          port: Number(process.env.DB_PORT ?? 5432),
          username: process.env.DB_USERNAME ?? 'postgres',
          password: process.env.DB_PASSWORD ?? 'postgres',
          database: process.env.DB_NAME ?? 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
        }),
        ModuleExampleModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  it('creates and lists examples using a real postgres container', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/examples')
      .send({
        name: 'Integration example',
        description: 'created in testcontainers',
      })
      .expect(201);

    const createdBody: unknown = createResponse.body;
    expect(isObjectRecord(createdBody)).toBe(true);

    if (!isObjectRecord(createdBody)) {
      throw new Error('Expected a JSON object in create response');
    }

    expect(typeof createdBody.id).toBe('number');
    expect(createdBody.name).toBe('Integration example');
    expect(createdBody.description).toBe('created in testcontainers');

    const findAllResponse = await request(app.getHttpServer())
      .get('/examples')
      .expect(200);

    const listBody: unknown = findAllResponse.body;
    expect(Array.isArray(listBody)).toBe(true);

    if (!Array.isArray(listBody)) {
      throw new Error('Expected an array in findAll response');
    }

    const containsCreated = listBody.some(
      (item) => isObjectRecord(item) && item.name === 'Integration example',
    );
    expect(containsCreated).toBe(true);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    await postgresContainer.stop();
  });
});
