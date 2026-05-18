import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Utils
import { parseBoolean, parseNumber } from 'src/common/utils';

/** Verifica se o banco de dados está habilitado */
export const isDatabaseEnabled = parseBoolean(
  process.env.DB_ENABLED,
  process.env.NODE_ENV !== 'test',
);

/** Retorna a configuração do TypeORM */
export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST') ?? 'localhost',
  port: parseNumber(configService.get<string>('DB_PORT'), 5432),
  username: configService.get<string>('DB_USERNAME') ?? 'postgres',
  password: configService.get<string>('DB_PASSWORD') ?? 'postgres',
  database: configService.get<string>('DB_NAME') ?? 'postgres',
  autoLoadEntities: true,
  synchronize: parseBoolean(configService.get<string>('DB_SYNCHRONIZE'), true),
  logging: parseBoolean(configService.get<string>('DB_LOGGING'), false),
  retryAttempts: parseNumber(configService.get<string>('DB_RETRY_ATTEMPTS'), 3),
  retryDelay: parseNumber(configService.get<string>('DB_RETRY_DELAY'), 1000),
});
