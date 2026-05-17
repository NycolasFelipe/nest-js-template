import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';

export class PostgresTestContainer {
  private container: StartedPostgreSqlContainer | null = null;

  async start(): Promise<StartedPostgreSqlContainer> {
    if (this.container) {
      return this.container;
    }

    const image =
      process.env.TESTCONTAINERS_POSTGRES_IMAGE ?? 'postgres:16-alpine';

    this.container = await new PostgreSqlContainer(image)
      .withDatabase('template_integration')
      .withUsername('postgres')
      .withPassword('postgres')
      .start();

    process.env.DB_ENABLED = 'true';
    process.env.DB_HOST = this.container.getHost();
    process.env.DB_PORT = String(this.container.getPort());
    process.env.DB_USERNAME = this.container.getUsername();
    process.env.DB_PASSWORD = this.container.getPassword();
    process.env.DB_NAME = this.container.getDatabase();
    process.env.DB_SYNCHRONIZE = 'true';
    process.env.DB_LOGGING = 'false';

    return this.container;
  }

  async stop(): Promise<void> {
    if (!this.container) {
      return;
    }

    await this.container.stop();
    this.container = null;
  }
}
