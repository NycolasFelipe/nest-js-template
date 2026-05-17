import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Utils
import { parseBoolean, parseNumber } from 'src/common/utils';

export const isDatabaseEnabled = parseBoolean(
  process.env.DB_ENABLED,
  process.env.NODE_ENV !== 'test',
);

export const getTypeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseNumber(process.env.DB_PORT, 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'postgres',
  autoLoadEntities: true,
  synchronize: parseBoolean(process.env.DB_SYNCHRONIZE, true),
  logging: parseBoolean(process.env.DB_LOGGING, false),
  retryAttempts: parseNumber(process.env.DB_RETRY_ATTEMPTS, 3),
  retryDelay: parseNumber(process.env.DB_RETRY_DELAY, 1000),
});
