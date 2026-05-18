import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

// Middlewares
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('tiny'));

  app.useGlobalPipes(
    new ValidationPipe({
      /** Remove silenciosamente propriedades que não estão no DTO */
      whitelist: true,

      /** Força erro quando propriedades não estão no DTO */
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(console.error);
