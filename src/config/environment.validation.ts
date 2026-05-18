import { parseBoolean } from 'src/common/utils';

type EnvironmentVariables = Record<string, string | undefined>;

/**
 * Valida e converte uma variável de ambiente para um número.
 *
 * @param config - As variáveis de ambiente.
 * @param key - A chave da variável de ambiente.
 * @param fallback - O valor padrão em caso de erro.
 * @returns O valor convertido para número.
 */
const validateNumber = (
  config: EnvironmentVariables,
  key: string,
  fallback: number,
): number => {
  const value = config[key];

  if (value === undefined) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${key} must be a valid number.`);
  }

  return parsed;
};

/**
 * Valida e converte uma variável de ambiente para um booleano.
 *
 * @param config - As variáveis de ambiente.
 * @param key - A chave da variável de ambiente.
 * @param fallback - O valor padrão em caso de erro.
 * @returns O valor convertido para booleano.
 */
const validateBoolean = (
  config: EnvironmentVariables,
  key: string,
  fallback: boolean,
): boolean => {
  const value = config[key];

  if (value === undefined) {
    return fallback;
  }

  if (value !== 'true' && value !== 'false') {
    throw new Error(`${key} must be either "true" or "false".`);
  }

  return parseBoolean(value, fallback);
};

/**
 * Valida e converte todas as variáveis de ambiente.
 *
 * @param config - As variáveis de ambiente.
 * @returns As variáveis de ambiente validadas e convertidas.
 */
export const validateEnvironment = (
  config: EnvironmentVariables,
): EnvironmentVariables => {
  const nodeEnv = config.NODE_ENV ?? 'development';
  const databaseEnabled = validateBoolean(
    config,
    'DB_ENABLED',
    nodeEnv !== 'test',
  );

  const validated = {
    ...config,
    NODE_ENV: nodeEnv,
    PORT: String(validateNumber(config, 'PORT', 3000)),
    DB_ENABLED: String(databaseEnabled),
    DB_HOST: config.DB_HOST ?? 'localhost',
    DB_PORT: String(validateNumber(config, 'DB_PORT', 5432)),
    DB_USERNAME: config.DB_USERNAME ?? 'postgres',
    DB_PASSWORD: config.DB_PASSWORD ?? 'postgres',
    DB_NAME: config.DB_NAME ?? 'postgres',
    DB_SYNCHRONIZE: String(validateBoolean(config, 'DB_SYNCHRONIZE', true)),
    DB_LOGGING: String(validateBoolean(config, 'DB_LOGGING', false)),
    DB_RETRY_ATTEMPTS: String(validateNumber(config, 'DB_RETRY_ATTEMPTS', 3)),
    DB_RETRY_DELAY: String(validateNumber(config, 'DB_RETRY_DELAY', 1000)),
  };

  if (!databaseEnabled) {
    return validated;
  }

  const requiredKeys = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'];
  const missingKeys = requiredKeys.filter((key) => !validated[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingKeys.join(', ')}.`,
    );
  }

  return validated;
};
