import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Database
import {
  getTypeOrmConfig,
  isDatabaseEnabled,
} from 'src/common/database/typeorm/config/typeorm.config';

// Modules
import { ModuleExampleModule } from 'src/modules/module-example/module-example.module';

const databaseImports = isDatabaseEnabled
  ? [TypeOrmModule.forRoot(getTypeOrmConfig()), ModuleExampleModule]
  : [];

@Module({
  imports: [...databaseImports],
})
export class AppModule {}
