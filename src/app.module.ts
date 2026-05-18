import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as loadDotenv } from 'dotenv';

// Config
import { validateEnvironment } from 'src/config/environment.validation';

// Database
import {
  getTypeOrmConfig,
  isDatabaseEnabled,
} from 'src/common/database/typeorm/config/typeorm.config';

// Modules
import { ModuleExampleModule } from 'src/modules/module-example/module-example.module';

loadDotenv();

const databaseImports = isDatabaseEnabled
  ? [
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: getTypeOrmConfig,
      }),
      ModuleExampleModule,
    ]
  : [];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
    }),
    ...databaseImports,
  ],
})
export class AppModule {}
